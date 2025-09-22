import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { store } from '../store';
import { tokenRefreshed, clearCredentials } from '../slices/authSlice';
import { exponentialBackoff } from '../utils/retry';

const API_BASE = (import.meta.env.VITE_API_BASE_URL as string) ?? 'http://localhost:8080';

interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  retry?: number;
  _retry?: boolean;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' }
});

let isRefreshing = false;
let queuedRequests: Array<(token: string | null, err?: any) => void> = [];

const processQueue = (token: string | null, err?: any) => {
  queuedRequests.forEach((cb) => cb(token, err));
  queuedRequests = [];
};

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers = config.headers ?? {};
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry | undefined;
    if (!originalRequest) return Promise.reject(error);

    // Retry network errors with exponential backoff if retry flag present
    if (!error.response && (originalRequest.retry ?? 0) > 0) {
      try {
        return await exponentialBackoff(originalRequest.retry!, () =>
          axiosInstance.request({ ...originalRequest, retry: 0 })
        );
      } catch (e) {
        return Promise.reject(e);
      }
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const resp = await axios.post(`${API_BASE}/api/auth/refresh`, {}, { withCredentials: true });
          const newToken = resp.data?.accessToken;
          if (newToken) {
            store.dispatch(tokenRefreshed(newToken));
            processQueue(newToken, null);
          } else {
            processQueue(null, new Error('No token'));
            store.dispatch(clearCredentials());
          }
        } catch (err) {
          processQueue(null, err);
          store.dispatch(clearCredentials());
          isRefreshing = false;
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        queuedRequests.push((token: string | null, err?: any) => {
          if (token) {
            if (!originalRequest.headers) originalRequest.headers = {};
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          } else {
            reject(err || error);
          }
        });
      });
    }

    return Promise.reject(error);
  }
);

export function createCancelTokenSource() {
  return axios.CancelToken.source();
}

export type { AxiosRequestConfigWithRetry };
export default axiosInstance;

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Note: Redux/store logic moved to authInterceptor.ts to avoid circular imports
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




export function createCancelTokenSource() {
  return axios.CancelToken.source();
}

export type { AxiosRequestConfigWithRetry };
export default axiosInstance;

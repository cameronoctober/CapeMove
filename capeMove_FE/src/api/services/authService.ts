import axiosInstance, { createCancelTokenSource } from '../axiosInstance';

export interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user: { id: string; email: string; name?: string; role: 'user' | 'moderator' | 'admin' };
}

export async function login(payload: LoginRequest, cancelToken?: any): Promise<LoginResponse> {
  const res = await axiosInstance.post('/api/auth/login', payload, {
    cancelToken: cancelToken?.token,
    withCredentials: true
  });
  return res.data;
}

export async function register(payload: { email: string; password: string; name?: string }) {
  const res = await axiosInstance.post('/api/auth/register', payload);
  return res.data;
}

export async function refresh(): Promise<{ accessToken: string }> {
  const res = await axiosInstance.post('/api/auth/refresh', {}, { withCredentials: true });
  return res.data;
}

export async function logout(): Promise<void> {
  await axiosInstance.post('/api/auth/logout', {}, { withCredentials: true });
}

export async function getProfile() {
  const res = await axiosInstance.get('/api/user/profile');
  return res.data;
}

export { createCancelTokenSource };

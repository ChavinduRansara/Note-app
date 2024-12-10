import { api } from './client';
import { LoginCredentials, User } from '../types/auth';

export async function login(credentials: LoginCredentials) {
  const { data } = await api.post<{ token: string; user: User }>('api/users/login', credentials);
  localStorage.setItem('token', data.token);
  return data;
}

export function logout() {
  localStorage.removeItem('token');
}

export async function getCurrentUser() {
  const { data } = await api.get<User>('api/users/profile');
  return data;
}
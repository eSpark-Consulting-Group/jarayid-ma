import api from './api';

interface LoginPayload {
  email: string;
  password: string;
  loginType: 'local' | 'social';
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post('/users/login', payload);
  return response.data;
};

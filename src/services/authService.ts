import api from './api';

interface LoginPayload {
  email: string;
  password: string;
  loginType: 'local' | 'social';
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
  loginType: 'local' | 'social';
}

interface forgotPassPayload {
  email: string;
}

export const login = async (payload: LoginPayload) => {
  const response = await api.post('/users/login', payload);
  return response.data;
};

export const signup = async (payload: SignupPayload) => {
  const response = await api.post('/users/signup', payload);
  return response.data;
};

export const forgotPassword = async (payload: forgotPassPayload) => {
  const response = await api.post('/users/forgot-password', payload);
  return response.data;
};

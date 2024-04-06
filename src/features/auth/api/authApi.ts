import axios from 'axios';

import { GenericResponse, User } from '../types/authTypes';

import { BASE_URL } from '../../../config';
import useAuthStore from '../../../state/useAuthStore';

const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';
export const refreshAccessTokenFn = async () => {
  const response = await authApi.post('/Account/refresh-token');
  return response.data;
};
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the failed request was to the /refresh-token endpoint
    if (originalRequest.url.includes('refresh-token')) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshedTokenResponse = await refreshAccessTokenFn();
        
        // Update axios default header with new token
        authApi.defaults.headers.common['Authorization'] = `Bearer ${refreshedTokenResponse.token}`;
        
        // Retry the original request with the new token
        return authApi(originalRequest);
      } catch (refreshError) {
        // If refreshing the token also fails, handle logout or redirect to login page
        useAuthStore.setState({ user: null }); 

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
export const registerUser = async (email: string,  username: string, password: string) => {
  const response = await authApi.post(`Account/register`, { email, username, password });
  return response.data;
};

export const loginUser = async (username: string, password: string) => {
  const response = await authApi.post<User>('/Account/login', { username, password });
  return response.data;
};

export const loginFacebookFn = async () => {
  const response = await authApi.post<User>('/Account/login');
  return response.data;
};

export async function getUser(): Promise<User | null> {
  try {
    
    const response = await  authApi.get(`/Account/authenticate`)
    if (response.status === 200 && response.data) {
        return response.data; 
    }
    return null; 
} catch (error) {
    console.error("Error fetching user:", error);
    return null; 
}
}

export const verifyEmailFn = async (verificationCode: string) => {
  const response = await authApi.get<GenericResponse>(
    `auth/verifyemail/${verificationCode}`
  );
  return response.data;
};

export const logoutUserFn = async (userId: string) => {

  await authApi.post('/Account/revoke-token');
  const response = await authApi.post('/Account/logout', userId);
  return response.data;
};


export const checkEmailExists = async (email: string) => {
  const response = await authApi.post(`Account/check-email?email=${email}`);
  return response.data;
};



import axios, { AxiosInstance } from 'axios';

export const createAxiosInstance = (): AxiosInstance => {
  const version = process.env.API_VERSION || 'v1';
  const baseURL = new URL(process.env.API_HOSTNAME || 'http://localhost:8877/');
  baseURL.pathname = version;

  const instance = axios.create({
    baseURL: baseURL.toString(),
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  instance.interceptors.response.use(
    (response) => response.data,
    (error) => Promise.reject(error)
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();
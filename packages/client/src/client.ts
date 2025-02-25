import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export class ApiClient {
  private instance: AxiosInstance;
  private authURL: string;

  constructor() {
    const version = process.env.API_VERSION || 'v1';
    const hostname = process.env.API_HOSTNAME || 'http://localhost:8877/';
    this.authURL = process.env.AUTH_URL || 'http://localhost:9876/';
    const baseURL = new URL(hostname);

    baseURL.pathname = version;

    this.instance = axios.create({
      baseURL: baseURL.toString(),
      timeout: Number(process.env.API_TIMEOUT) || 5000,
    });

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          console.log('Refreshing Token');

          try {
            const refreshResponse = await this.instance.post('/auth/refresh');

            if (refreshResponse.status === 401) {
              console.warn('Refresh token expired. Redirecting to auth page.');
              window.location.href = this.authURL;
            } else {
              console.log('Token Refreshed. Retrying request...');
              return this.instance.request(error.config);
            }
          } catch (refreshError) {
            console.error('Refresh token request failed:', refreshError);
            window.location.href = this.authURL;
          }
        }
        return Promise.reject(error);
      },
    );
  }

  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.request<T>(config);

    return response.data;
  }
  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

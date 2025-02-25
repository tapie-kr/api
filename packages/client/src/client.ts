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
  }
  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.request<T>(config);

    if (response.status == 401) {
      const refreshResponse = await this.instance.post('/auth/refresh');

      if (refreshResponse.status == 404) {
        location.href = this.authURL;
      } else {
        await this.request(config);
      }
    }

    return response.data;
  }
  public getInstance(): AxiosInstance {
    return this.instance;
  }
}

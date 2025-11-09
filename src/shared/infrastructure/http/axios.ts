import axios, { type AxiosInstance, type ResponseType } from 'axios';
import { setupInterceptors } from './interceptors';

type HttpClientOptions = {
  baseURL?: string;
  timeout?: number;
  responseType?: ResponseType;
  headers?: Record<string, string>;
};

const axiosInstances: { [key: string]: AxiosInstance } = {};

const getAxiosInstance = (baseURL: string, options: HttpClientOptions = {}): AxiosInstance => {
  if (!axiosInstances[baseURL]) {
    const instance = axios.create({
      baseURL,
      timeout: options.timeout || 10000,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
        ...options.headers,
      },
      responseType: options.responseType || 'json',
    });

    setupInterceptors(instance);
    axiosInstances[baseURL] = instance;
  }

  return axiosInstances[baseURL];
};

const defaultBaseURL = import.meta.env.VITE_API_BASE_URL || '';
const defaultInstance = getAxiosInstance(defaultBaseURL);

export const httpClient = defaultInstance;

export const getHttpClient = (baseURL?: string, options?: HttpClientOptions): AxiosInstance => {
  const url = baseURL || defaultBaseURL;
  return getAxiosInstance(url, options);
};

export const clearHttpClient = (baseURL: string): void => {
  delete axiosInstances[baseURL];
};

export const clearAllHttpClients = (): void => {
  Object.keys(axiosInstances).forEach((key) => {
    delete axiosInstances[key];
  });
};

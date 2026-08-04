import "axios";

declare module "axios" {
  interface AxiosRequestConfig {
    requiresAuth?: boolean;
    abc?: string;
  }

  interface InternalAxiosRequestConfig {
    requiresAuth?: boolean;
    abc?: string;
  }
}
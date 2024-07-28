import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});

api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// レスポンスインターセプター
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // トークンが無効な場合、ログアウト処理を行う
      localStorage.removeItem('token');
      // ログインページにリダイレクト
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// APIメソッドの型定義
export interface ApiMethods {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

// レスポンスの型からデータを抽出するユーティリティ関数
const extractData = <T>(response: AxiosResponse<T>): T => response.data;

// APIメソッドの実装
const apiMethods: ApiMethods = {
  get: (url, config) => api.get(url, config).then(extractData),
  post: (url, data, config) => api.post(url, data, config).then(extractData),
  put: (url, data, config) => api.put(url, data, config).then(extractData),
  delete: (url, config) => api.delete(url, config).then(extractData),
};

export default apiMethods;

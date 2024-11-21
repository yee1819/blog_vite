# 拦截器

拦截器分为两种：请求拦截器、响应拦截器

常见用于身份效验（请求拦截器  拦截请求后携带token、响应拦截器接受响应后是否携带正确的 token 选择跳转任意界面）

```typescript
export interface AxiosInterceptorOptions {
  synchronous?: boolean;
  runWhen?: (config: InternalAxiosRequestConfig) => boolean;
}

export interface AxiosInterceptorManager<V> {
  use(onFulfilled?: ((value: V) => V | Promise<V>) | null, onRejected?: ((error: any) => any) | null, options?: AxiosInterceptorOptions): number;
  eject(id: number): void;
  clear(): void;
}
```
示例：

```javascript
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

实际应用可以如此：

请求时自动携带token

```javascript
import axios from 'axios';

// 创建一个 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'https://your-api-base-url.com', // 你的 API 基础 URL
});

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    // 假设你有一个函数来获取当前的 token
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 检查响应状态码是否为 401（未授权）
    if (error.response && error.response.status === 401) {
      // 进行跳转，例如重定向到登录页面
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
```

移除拦截器：

```javascript
const myInterceptor = axios.interceptors.request.use(function () {/*...*/});
axios.interceptors.request.eject(myInterceptor);
```





实例也可以添加拦截器

```javascript
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```
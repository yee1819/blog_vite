# 封装拦截器

可以通过封装 `fetch` 方法，来实现类似拦截器的功能。以下是一些常见场景及实现方式：

#### 1. **请求拦截器**

在请求发送前插入一些逻辑，比如添加 Token、统一设置 Headers 等。

```javascript
function customFetch(url, options = {}) {
  // 在请求发送前修改配置
  const token = localStorage.getItem('token'); // 获取 Token
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // 合并 Headers
  options.headers = {
    ...defaultHeaders,
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };

  return fetch(url, options);
}

// 使用示例
customFetch('https://api.example.com/data', { method: 'GET' })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

------

#### 2. **响应拦截器**

在响应返回后处理数据，比如统一处理错误状态码、解析数据等。

```javascript
function customFetch(url, options = {}) {
  // 添加请求拦截逻辑（如上例所示）
  const token = localStorage.getItem('token');
  options.headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : '',
  };

  // 返回一个 Promise，处理响应
  return fetch(url, options)
    .then(async response => {
      if (!response.ok) {
        // 统一错误处理
        const error = await response.text();
        throw new Error(`HTTP Error: ${response.status} - ${error}`);
      }
      return response.json(); // 默认解析为 JSON
    })
    .catch(error => {
      console.error('响应拦截器捕获错误:', error);
      throw error;
    });
}

// 使用示例
customFetch('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

------

#### 3. **完整的请求-响应拦截封装**

通过组合的方式，模拟 Axios 拦截器的功能：

```javascript
class FetchInterceptor {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }

  // 添加请求拦截器
  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }

  // 添加响应拦截器
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }

  // 发送请求
  fetch(url, options = {}) {
    let modifiedOptions = { ...options };

    // 执行所有请求拦截器
    this.requestInterceptors.forEach(interceptor => {
      modifiedOptions = interceptor(modifiedOptions) || modifiedOptions;
    });

    return fetch(this.baseURL + url, modifiedOptions)
      .then(async response => {
        let modifiedResponse = response;

        // 执行所有响应拦截器
        for (const interceptor of this.responseInterceptors) {
          modifiedResponse = (await interceptor(modifiedResponse)) || modifiedResponse;
        }
        return modifiedResponse;
      })
      .catch(error => {
        console.error('Fetch 错误:', error);
        throw error;
      });
  }
}

// 创建实例
const apiClient = new FetchInterceptor('https://api.example.com');

// 添加请求拦截器
apiClient.addRequestInterceptor(options => {
  const token = localStorage.getItem('token');
  return {
    ...options,
    headers: {
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// 添加响应拦截器
apiClient.addResponseInterceptor(async response => {
  if (!response.ok) {
    const error = await response.text();
    console.error('统一错误处理:', error);
    throw new Error(`HTTP Error: ${response.status}`);
  }
  return response.json(); // 统一解析 JSON
});

// 使用示例
apiClient.fetch('/data', { method: 'GET' })
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
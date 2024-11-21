JavaScript 内置的 一个请求 资源 、网络请求的api

基于 Promise

优质教程：[Fetch API 教程 - 阮一峰的网络日志 (ruanyifeng.com)](https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html)

## 基本使用

```javascript
fetch(url[, options])
    .then(response => {
      // 处理响应
    }).catch(error => {
      // 处理错误
    });
```

fetch返回一个 Respond 的 Promise

参数说明

- **`url`**：请求的资源地址。
- **`options`**：一个可选对象，用于配置请求（如方法、头信息、请求体等）

常见options选项

1. **method**：请求方法（如 `GET`、`POST`、`PUT`、`DELETE`）。
2. **headers**：请求头信息（如 `Content-Type`）。
3. **body**：请求体（用于 `POST` 或 `PUT` 请求，一般为 JSON 格式字符串）。



示例：

::: code-group

```javascript[get请求]
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // 解析 JSON 数据
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Fetch error:', error);
  });

```

```javascript[post请求]
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    key1: 'value1',
    key2: 'value2',
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

```javascript[异步]
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchData();

///

async function getJSON() {
  let url = 'https://api.github.com/users/ruanyf';
  try {
    let response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.log('Request Failed', error);
  }
}

//
(async () => {
  try {
    const response = await fetch('https://api.github.com/users/ruanyf');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json(); // 解析数据
    console.log(json);
  } catch (err) {
    console.error('Request Failed', err);
  }
})();

```

```javascript[设置响应格式]
// 处理文本
fetch('https://example.com/data.txt')
  .then(response => response.text())
  .then(text => console.log(text));

// 处理二进制数据
fetch('https://example.com/image.png')
  .then(response => response.blob())
  .then(blob => {
    const url = URL.createObjectURL(blob);
    console.log(url); // 可用作图片的 src
  });
```



```javascript[设置超时]
const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 5000); // 5 秒后取消请求

fetch('https://api.example.com/data', { signal: controller.signal })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    if (error.name === 'AbortError') {
      console.error('Fetch aborted due to timeout');
    } else {
      console.error('Fetch error:', error);
    }
  })
  .finally(() => clearTimeout(timeout));

```



:::

注意事项：

- **跨域问题**：`fetch` 遵循同源策略，跨域请求时需要服务器支持 CORS。

- **默认不发送 cookies**：如果需要发送 cookies，必须设置 `credentials`：

```javascript
fetch('https://api.example.com/data', { credentials: 'include' });
```

- **错误处理**：`fetch` 仅在网络错误或请求被取消时会进入 `catch`。HTTP 状态码错误（如 404 或 500）不会自动抛出异常，需要手动检查 `response.ok`。


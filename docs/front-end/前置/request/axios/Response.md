# 响应

响应的参数：

```javascript
{
  // `data` 由服务器提供的响应
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 是服务器响应头
  // 所有的 header 名称都是小写，而且可以使用方括号语法访问
  // 例如: `response.headers['content-type']`
  headers: {},

  // `config` 是 `axios` 请求的配置信息
  config: {},

  // `request` 是生成此响应的请求
  // 在node.js中它是最后一个ClientRequest实例 (in redirects)，
  // 在浏览器中则是 XMLHttpRequest 实例
  request: {}
}
```

示例：

```javascript
axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
```

react中实际使用：

::: code-group


```jsx
import {axiosDef} from "./config";
import axios from "axios";
import { useEffect, useState } from "react";


export default () => {
  const [date, setDate] = useState<undefined | any>(undefined);
  const [config,setConfig]  = useState({})
  useEffect(() => {
    const getdate = async () => {
      try {
        const response = await axiosDef.get('/encoding/utf8');
        setDate(response.data); // 将axios请求的结果设置为state
        setConfig(response.config)  // 请求配置
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getdate(); // 调用异步函数
  }, []);
  const markup = { __html:date };
  return (
    <>
      <pre>{JSON.stringify(config,null,5)}</pre>
      <hr />
      <div dangerouslySetInnerHTML={markup} />
      {}
      {/* {JSON.stringify(date)} */}
    </>
  );
};
```



```json[结果]
{
     "transitional": {
          "silentJSONParsing": true,
          "forcedJSONParsing": true,
          "clarifyTimeoutError": false
     },
     "adapter": [
          "xhr",
          "http",
          "fetch"
     ],
     "transformRequest": [
          null
     ],
     "transformResponse": [
          null
     ],
     "timeout": 0,
     "xsrfCookieName": "XSRF-TOKEN",
     "xsrfHeaderName": "X-XSRF-TOKEN",
     "maxContentLength": -1,
     "maxBodyLength": -1,
     "env": {},
     "headers": {
          "Accept": "application/json, text/plain, */*"
     },
     "baseURL": "https://httpbin.org",
     "method": "get",
     "url": "/encoding/utf8"
}
```

:::

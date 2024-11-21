Axios

官网：[Axios中文文档 | Axios中文网 (axios-http.cn)](https://www.axios-http.cn/)

一个基于[_promise_](https://javascript.info/promise-basics)_的网络_请求库

是[_isomorphic_](https://www.lullabot.com/articles/what-is-an-isomorphic-application) 的(即同一套代码可以运行在浏览器和node.js中)。在服务端它使用原生 node.js `http` 模块, 而在客户端 (浏览端) 则使用 XMLHttpRequests。

特点：

+ 不同环境不同实现：nodejs( [http](http://nodejs.org/api/http.html) 请求)、浏览器( [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest))
+ 基于 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 也支持 Promise API
+ 拦截请求和响应
+ 转换请求和响应数据
+ 取消请求
+ 超时处理
+ 查询参数序列化支持嵌套项处理
+ 自动将请求体序列化为：
    - JSON (`application/json`)
    - Multipart / FormData (`multipart/form-data`)
    - URL encoded form (`application/x-www-form-urlencoded`)
+ 将 HTML Form 转换成 JSON 进行请求
+ 自动转换JSON数据
+ 获取浏览器和 node.js 的请求进度，并提供额外的信息（速度、剩余时间）
+ 为 node.js 设置带宽限制
+ 兼容符合规范的 FormData 和 Blob（包括 node.js）
+ 客户端支持防御[XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)



模块化安装：

```bash
npm install axios

bower install axios

yarn add axios
```

cdn

```javascript
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

导入:

Es6:

```javascript
import axios from "axios";
```

`require` 导入预构建的 CommonJS 模块:

```js
const axios = require('axios/dist/browser/axios.cjs'); // browser

const axios = require('axios/dist/node/axios.cjs'); // node
```

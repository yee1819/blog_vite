引入axios时，引入的是一个实例axios。

可以直接请求数据

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
        const response = await axios.request({
          baseURL:'https://httpbin.org',
          url:'/encoding/utf8',
          method:'get' //不填写默认get

        })
        // const response = await axiosDef.get('/encoding/utf8');
        setDate(response.data); // 将axios请求的结果设置为state
        setConfig(response.config)
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
此时requset可以根据请求的`method`切换成不同的方法

例如get

```javascript
 const response = await axios.request({
          baseURL:'https://httpbin.org',
          url:'/encoding/utf8',
          method:'get' //不填写默认get
        })
//可以转化为
 const response = await axios.get('/encoding/utf8',{
          baseURL:'https://httpbin.org',
        })

//同样的 post请求
 const response = await axios.request({
          baseURL:'https://httpbin.org',
          url:'/encoding/utf8',
          method:'post' 
        })
//可以转化为
 const response = await axios.post('/encoding/utf8',{
          baseURL:'https://httpbin.org',
        })
```
简略了一些步骤

这些api都有以下：

+ axios.request(config)
+ axios.get(url[, config])
+ axios.delete(url[, config])
+ axios.head(url[, config])
+ axios.options(url[, config])
+ axios.post(url[, data[, config]])
+ axios.put(url[, data[, config]])
+ axios.patch(url[, data[, config]])
+ axios.postForm(url[, data[, config]])
+ axios.putForm(url[, data[, config]])
+ axios.patchForm(url[, data[, config]])

一些示例：

```javascript
const axios = require('axios');

// 向给定ID的用户发起请求
axios.get('/user?ID=12345')
  .then(function (response) {
    // 处理成功情况
    console.log(response);
  })
  .catch(function (error) {
    // 处理错误情况
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });

// 上述请求也可以按以下方式完成（可选）
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // 总是会执行
  });  

// 支持async/await用法
async function getUser() {
  try {
    const response = await axios.get('/user?ID=12345');
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}
```

## 链式调用
### then
请求成功后的回调函数

```javascript
await axios.get('/ip')
  .then((response)=>{
    setIp(response.data)
  })
```

等同于

```javascript
const response = await axios.get('/json');
setIp(response.data); // 确保从响应中提取 origin 属性
```

返回值作为回调函数的参数。



### catch
请求失败后回调函数,接受一个error作为参数

```javascript
axios.get('/user/12345')
  .catch(function (error) {
    if (error.response) {
      // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // 请求已经成功发起，但没有收到响应
      // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
      // 而在node.js中是 http.ClientRequest 的实例
      console.log(error.request);
    } else {
      // 发送请求时出了点问题
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```
error 是一个对象包含错误信息、请求参数、响应内容、配置信息。



定义错误响应状态码

```javascript
axios.get('/ip2',{
  validateStatus:  (status) =>{
    return status == 200; 
  }
})
axios.get('/ip2',{
  validateStatus:  (status) =>{
    return status < 400; 
  }
})
```

validateStatus 返回一个 boolean ，为true 触发 then，false则 catch

### finally
无论请求是否成功，都会回调

```javascript
axios.get('/ip2')
  .finally(()=>{
    console.log("请求发生")
  })
```
### 按顺序调用
then、catch、finally非必选，但是需要 顺序调用，其中then、catch不止一条时，则按顺序执行



```javascript
axios.get('/user/12345')
  .then(response => {
    console.log('Request succeeded:', response);
  })
  .then(response => {
    // 这个 then 会在第一个 then 之后执行
    console.log('Another then after the first one');
  })
  .catch(error => {
    console.log('Request failed:', error);
  })
  .catch(error => {
    // 这个 catch 会在前一个 catch 之后执行
    console.log('Another catch after the first one');
  })
  .finally(() => {
    console.log('This will always be executed, regardless of the request outcome.');
  });
```

## post 请求

如果没有data，也没有配置项

```javascript
axios.post('/user/12345')
.then(...)
```

一般第二个参数为data参数，第三个参数为配置项（可省略）

```javascript
axios.post('/user', {
  firstName: 'Kimi',
  lastName: 'AI'
})
```

如果没有data但是需要配置项 需要设置为null

```javascript
axios.post('/user/12345', null, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here'
  },
  timeout: 5000, // 设置超时时间为5000毫秒（5秒）
})
```

全都有的时候:

```javascript
axios.post('/user', data, {
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  console.log(response);
})
.catch(error => {
  console.log(error);
});
```

### 并发请求
```javascript
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

const [acct, perm] = await Promise.all([getUserAccount(), getUserPermissions()]);

// OR

Promise.all([getUserAccount(), getUserPermissions()])
  .then(function ([acct, perm]) {
    // ...
  });
```

### json
将 HTML Form 转换成 JSON 进行请求

```javascript
const {data} = await axios.post('/user', document.querySelector('#my-form'), {
  headers: {
    'Content-Type': 'application/json'
  }
})
```

### Forms
+ Multipart (`multipart/form-data`)

```plain
const {data} = await axios.post('https://httpbin.org/post', {
    firstName: 'Fred',
    lastName: 'Flintstone',
    orders: [1, 2, 3],
    photo: document.querySelector('#fileInput').files
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
)
```

+ URL encoded form (`application/x-www-form-urlencoded`)

```plain
const {data} = await axios.post('https://httpbin.org/post', {
    firstName: 'Fred',
    lastName: 'Flintstone',
    orders: [1, 2, 3]
  }, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
})
```
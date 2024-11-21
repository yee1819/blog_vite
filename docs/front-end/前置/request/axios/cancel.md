有时候请求超时、请求参数改变、多次请求，需要取消上一次的请求时

```javascript
const controller = new AbortController();

axios.get('/foo/bar', {
   signal: controller.signal
}).then(function(response) {
   //...
});
// 取消请求
controller.abort()
```

react示例:

```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // 创建一个 AbortController 实例
    const controller = new AbortController();
    const signal = controller.signal;

    // 发送请求
    const fetchData = async () => {
      try {
        const response = await axios.get('/user/12345', { signal });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    // 清理函数，在组件卸载时调用
    return () => {
      // 取消请求
      controller.abort();
    };
  }, []); // 空依赖数组表示这个 effect 只在组件挂载时运行一次

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default MyComponent;
```
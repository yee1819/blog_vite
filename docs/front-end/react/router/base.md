首先需要下载安装

```bash
npm install  react-router-dom 
```

因为react 本质上还是js模块化。

react-router 可以作为一个组件而存在，在router组件内跳转不同组件。

所以为了方便管理，可以新建一个router文件。（当然，这不是必须）

react-Router 提供了两种方式来定义路由：

- 对象形式：v6版本新引入，作为简洁的路由配置
- 标签形式

使用那种方式全凭个人喜好。

## 基本使用





### 对象形式

::: code-group



```javascript[router.js]
import { createBrowserRouter } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Profile from './Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

export default router;
```

```javascript[app.js]
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```





:::

### 组件/标签形式

```javascript
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
```


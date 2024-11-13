# 路由匹配



## 完全匹配

```jsx
const router = createHashRouter([

    {
        path: '*', // 捕获所有未匹配的路由
        element: <Nofound></Nofound>
    },
    {
        path: '/user',
        element: <Layout />,
        children: [
            {
                path: '/main',   //   /user/main
                element: <Main />,  
                errorElement: '<div>404</div>',

            },
            {
                path: '/home',   //     /user/home
                element: <Home />
            },
            {
                path: '/about',  //     /user/about
                element: <About />
            }
        ]
    },

]);
```

只有匹配正确才会显示正确内容



## 动态匹配

```jsx
const router = createHashRouter([

    {
        path: '*', // 捕获所有未匹配的路由
        element: <Nofound></Nofound>
    },
    {
        path: '/user',
        element: <Layout />,
        children: [
            {
                path: '/main',   //   /user/main
                element: <Main />,  
                errorElement: '<div>404</div>',
                children: [
                    {
                        path: '/:post',   //   /user/main/  1
                        element: <Main />,  
                        errorElement: '<div>404</div>',
                    }
			]
            },

        ]
    },

]);
```

使用`:`表示这是一个动态路由，`/user/main/  1` ...  ，最后一个参数为可变参数

多层： `/user/:id/space/:post` 匹配：`/user/15624/space/13`

## 可为空

```jsx
{
        path: '/',
        element: <Layout />,
        children: [
            {
                path: 'main?',
                element: <Main />,
                //  index: true,  与children冲突  不能同时使用
                errorElement: '<div>404</div>',
                children: [ // 确保这里是一个数组
                    {
                        path: '', // 子路由的相对路径
                        children: [
                            {
                                path: 'space/:post?/:id',
                                element: <Post />
                            }, {
                                path: 'post',
                                element: <Post></Post>
                            }
                        ]

                    }
                ]
            },
}
```

路由后加上`?`代表可加可不加的路由

这种情况下，以下都可以匹配到对应的 路由：

- `/main/space/1/1`
- `/main/space/1`
- `/space/1/1`
- `/space/1`

因为？是可以省略的路由属性



## 重定向

可以利用` <Navigate to="/user/:userId" /> `重定向

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';

function User() {
  const { userId } = useParams();
  if (userId === '0') {
    // 如果 userId 为 0，进行重定向
    return <Navigate to="/not-found" />;
  }
  return <h2>用户 ID: {userId}</h2>;
}

function NotFound() {
  return <h2>页面未找到</h2>;
}

const routes = [
  { path: '/', element: <h2>首页</h2> },
  { path: '/user/:userId', element: <User /> },
  { path: '/not-found', element: <NotFound /> },
  { path: '/old-user/:userId', element: <Navigate to="/user/:userId" /> }, // 重定向动态路由
];

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;

```

....`useNavigate`  好像也可以

除此之外，也有重定向函数使用





## 通配符

404 界面 就可以通过这个实现:

```jsx
{
        path: '*', // 捕获所有未匹配的路由
        element: <Nofound></Nofound>
},
```

react-router 会智能的匹配其他可以匹配的路由，最后才执行通配符，所以不需要在意存放位置

在raect-router中，通配符`*`一定要写在路由的最后！！！！

因为`*` 默认匹配所有路由，写在中间或前面导致后面的路由失效！

::: code-group

```jsx[正确 ]

{
        path: '/tpf/:id/*',
        element: <TPF />
    }
```

```jsx[错误]
    {
        path: '/tpf/*/:id',
        element: <TPF />
    }
```



:::
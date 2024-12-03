# 错误界面



## 404 NotFound

使用` *` 匹配所有路由，react-router 会优先匹配符合条件的路由，如果没有匹配到才会匹配通配符`*`

```jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Index/>
    ),
    errorElement: <h1>ERROR</h1>
  },
  {
    path:'/*',
    element: <UnderFind></UnderFind>
  }
]);
```



## 错误 

`errorElement` 是一种匹配路由错误的选项,也可以用匹配 404， `useRouterError`可以捕获错误的情况



```jsx
function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return <div>{error.message}</div>;
}

<Route
  errorElement={<ErrorBoundary />}
  loader={() => {
    // unexpected errors in loaders/actions
    something.that.breaks();
  }}
  action={() => {
    // stuff you throw on purpose in loaders/actions
    throw new Response("Bad Request", { status: 400 });
  }}
  element={
    // and errors thrown while rendering
    <div>{breaks.while.rendering}</div>
  }
/>;
```

在路由 404 找不到的情况下，俩者均配置时，通配符`*` 优先级 大于 `errorElement `
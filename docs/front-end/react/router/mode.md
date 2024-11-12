路由分为不同的模式，显示出来的url也有所不同

## `BrowserRouter`

（基于 HTML5 History API）

`BrowserRouter` 使用 HTML5 的 `history.pushState` 和 `history.replaceState` API 来控制浏览器的历史记录，并且不依赖 URL 中的哈希（`#`）。这种模式允许在 URL 中进行清晰、干净的路径（没有 `#` 符号）。

 适用场景：

- 适用于大多数现代 Web 应用，尤其是部署在支持 HTML5 路由的服务器上。
- 需要设置适当的服务器配置，确保所有路径都指向入口 HTML 页面（例如 `index.html`）。

 优点：

- URL 干净，没有 `#` 符号。
- 更符合现代应用的用户体验。

 缺点：

- 需要服务器支持 URL 重写。比如，当用户直接访问 `example.com/about` 时，服务器必须配置为返回入口 HTML 页面（通常是 `index.html`），否则会返回 404 错误。

使用方式:

::: code-group

```tsx{6}[对象形式]
import { RouterProvider, Route, Routes, createBrowserRouter} from "react-router-dom";

import Layout from "./layout";
....

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
      }.......
]);

const App = () => {
    return <RouterProvider router={router} />;

};

export default App;
```

```tsx[组件形式]{5,10}
import { RouterProvider, BrowserRouter, Route, Routes, } from "react-router-dom";
import Layout from "./layout";

const App = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
            </Route>
        </Routes>
    </BrowserRouter>    
};

export default App;
```



:::

::: danger

其他俩种路由就是把高亮部分改为其他模式，不多赘述

例如哈希对象形式：

```tsx{2}
import {createHashRouter} from "react-router-dom";
const router = createHashRouter([
    {
        path: '/',
        element: <Layout />,
      }.......
]);
```



::: 

## `HashRouter`

（基于 URL Hash）

`HashRouter` 使用 URL 的 hash 部分（即 `#` 后的部分）来模拟不同的路径。这种模式不依赖于服务器配置，因为浏览器会忽略 URL 中的 hash 部分，所有请求都会返回给客户端应用。

适用场景：

- 适用于没有服务器配置支持的应用，特别是在静态网站托管时。
- 在静态页面或者不允许修改服务器配置的环境中使用。

 优点：

- 不需要服务器配置支持，适用于静态网站或者无法修改服务器的场景。
- 在早期的单页面应用中常用。

::: warning  区别：

BrowserRouter ： `http://localhost:5174/post/1`

HashRouter：`	http://localhost:5174/#/post/1`

哈希路由会多一个`#`

:::

##  **MemoryRouter**

（基于内存的路由）

`MemoryRouter` 不是将路由信息存储在 URL 中，而是将其存储在内存中。也就是说，所有的路由状态都保存在 JavaScript 的内存中，而不是反映到浏览器的地址栏中。

适用场景：

- **测试**：`MemoryRouter` 通常用于单元测试或服务端渲染（SSR）等场景，因为它不依赖于浏览器的历史记录，也不影响浏览器的地址栏。
- **嵌入式应用**：当 React 应用嵌入到其他系统中，且不需要控制地址栏时，可以使用 `MemoryRouter`。例如，嵌入到某个桌面应用或者其他环境中。

```tsx
import { MemoryRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <MemoryRouter initialEntries={['/home']}>  {/* initialEntries 用于设置初始路径 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
}
```

 关键点：

- `MemoryRouter` 不会改变浏览器的 URL 地址栏，它将路由的状态保存在内存中。
- 你可以通过 `initialEntries` 属性设置路由的初始路径（相当于历史记录中的初始位置）。
- 在没有浏览器的环境中（如 Node.js 或者在 SSR 中），`MemoryRouter` 是一个理想的选择，因为它不依赖于 URL。

 优点：

- **无 URL 依赖**，适合用在不需要显示路径的场景。
- 对浏览器地址栏不产生影响，适用于嵌入式环境或测试环境。

 缺点：

- 用户无法直接使用浏览器的地址栏进行页面刷新或导航，因为路由状态不反映在 URL 中。
- 适用范围有限，主要用于非浏览器环境或特定场景。

## 总结：

- **`BrowserRouter`**：适用于常规的 Web 应用，使用 HTML5 History API，路由信息在浏览器的地址栏中体现。
- **`HashRouter`**：适用于没有服务器配置支持的环境，使用 URL 中的 hash 部分（`#` 后面的内容）来控制路由。
- **`MemoryRouter`**：适用于测试、服务端渲染（SSR）或嵌入式应用，路由信息保存在内存中，不依赖于浏览器的地址栏。
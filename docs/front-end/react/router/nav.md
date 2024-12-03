# 导航



和vue-router一样，react-router也有编程式导航、声明式导航之分

## 声明式导航

### `<Link></Link>`

react-router的类似a标签,to属性必选作为href

需要从`react-router-dom`引入

```typescript
export declare const Link: React.ForwardRefExoticComponent<LinkProps & React.RefAttributes<HTMLAnchorElement>>;

export interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
    reloadDocument?: boolean;
    replace?: boolean;  //是否取代而非 push
    state?: any;    
    preventScrollReset?: boolean;
    relative?: RelativeRoutingType;
    to: To;
    unstable_viewTransition?: boolean;
}

export type RelativeRoutingType = "route" | "path";

export type To = string | Partial<Path>;

export interface Path {
    
    pathname: string;
    search: string;
    hash: string;
    
}
```





::: code-group

```jsx[字符串]
import { Link} from 'react-router-dom';


export default () => {
  return (
    <>
      <h1>About</h1>
      <Link to='/'>首页</Link>
      <Link to='/about'>关于</Link>
    </>
  );
};
```



```jsx[模板字符串]
import { Link} from 'react-router-dom';


export default () => {
  return (
    <>
      <h1>About</h1>
      <Link to={`/${name}`}>首页</Link>
      <Link to={`/user/${name}/profile`}>Profile</Link>
    </>
  );
};      
```



```jsx[函数、第三方链接]
import { Link} from 'react-router-dom';
import { useState } from 'react';

export default () => {
  const [name,setName]  = useState('')
  const getRoute1 = (id:any) => `/item/${id}`;
  const getRoute2 = (id:any) => "/item/"+id;
  const itemId = 123;

  return (
    <>
      <h1>About</h1>
        <Link to="https://life.kiko2568.top">w </Link>
        <Link to={`/user/${name}/profile`}>Profile</Link>
        <Link to={getRoute1(itemId)}>Item Details</Link>
        <Link to={getRoute2(itemId)}>Item Details</Link>
        <Link to={name}>name</Link>
    </>
  );
};      
```

```jsx[对象]
 <Link
              to={{
                pathname: '/about',
                search: '?ref=home',
                state: { from: 'Home Page' }
              }}
            >
              Go to About Page
            </Link>
```



:::



#### RelativeRoutingType

Router 和 path 的区别

- [ ]  待续 TODO



#### `preventScrollReset`

默认为 false

设置为true 时，	路由切换时，不会重置视图到顶部

切换tab时滚动视图到顶部，停留于此 

```
      ┌─────────────────────────┐
      │                         ├──┐
      │                         │  │
      │                         │  │ scrolled
      │                         │  │ out of view
      │                         │  │
      │                         │ ◄┘
    ┌─┴─────────────────────────┴─┐
    │                             ├─┐
    │                             │ │ viewport
    │   ┌─────────────────────┐   │ │
    │   │  tab   tab   tab    │   │ │
    │   ├─────────────────────┤   │ │
    │   │                     │   │ │
    │   │                     │   │ │
    │   │ content             │   │ │
    │   │                     │   │ │
    │   │                     │   │ │
    │   └─────────────────────┘   │ │
    │                             │◄┘
    └─────────────────────────────┘
```

#### `replace`

取代而非push

push(-1)则不能返回

#### `state`

携带 值

```javascript
<Link to="new-path" state={{ some: "value" }} />

//访问

let { state } = useLocation();
```

#### `reloadDocument`

跳过客户端路由，让浏览器正常处理转换（如同 `<a href>` ）。



### **`<NavLink/>`**

一个特殊的 `<Link/>`

```javascript
export declare const NavLink: 
  React.ForwardRefExoticComponent<NavLinkProps & React.RefAttributes<HTMLAnchorElement>>;



export interface NavLinkProps extends Omit<LinkProps, "className" | "style" | "children"> {
    children?: React.ReactNode | ((props: NavLinkRenderProps) => React.ReactNode);
    caseSensitive?: boolean;
    className?: string | ((props: NavLinkRenderProps) => string | undefined);
    end?: boolean;
    style?: React.CSSProperties | ((props: NavLinkRenderProps) => React.CSSProperties | undefined);
}

export type NavLinkRenderProps = {
    isActive: boolean;
    isPending: boolean;
    isTransitioning: boolean;
};
```

用作激活状态的标记，处于激活状态时，自动加上` active`class。用来作为菜单导航、面包屑这类场景

```javascript
<nav id="sidebar">
  <NavLink to="/messages" />
</nav>
```

```css
#sidebar a.active {
  color: red;
}
```

点击该`<NavLink/>`时，自动激活`active`

#### `className`

`className` 属性的作用与普通 className 类似，但您也可以将函数传递给它，以便根据链接的活动和待定状态自定义应用的 classNames。

会调用一个函数

根据不同情况返回不同的 class 

```jsx
<NavLink
  to="/messages"
  className={({ isActive, isPending, isTransitioning }) =>
    [
      isPending ? "pending" : "",
      isActive ? "active" : "",
      isTransitioning ? "transitioning" : "",
    ].join(" ")
  }
  >
  Messages
</NavLink>
```

#### `style`

`style` 属性的工作方式与普通样式属性类似，但您也可以通过一个函数，根据链接的活动和待定状态自定义应用的样式。

```jsx
<NavLink
  to="/messages"
  style={({ isActive, isPending, isTransitioning }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
    };
  }}
>
  Messages
</NavLink>
```

#### `children`

您可以传递一个呈现属性作为子元素，以便根据活动和待定状态自定义 `<NavLink>` 的内容，这对更改内部元素的样式非常有用。？？？

```jsx
<NavLink to="/tasks">
  {({ isActive, isPending }) => (
    <span className={isActive ? "active" : ""}>Tasks</span>
  )}
</NavLink>
```

#### `end`

`end` 属性更改了 `active` 和 `pending` 状态的匹配逻辑，使其只匹配到导航链接 `to` 路径的 "末端"。如果 URL 长于 `to` ，将不再被视为激活状态。

即添加了`end`匹配效果就只到 `to`

例子：

| **Link**                       | **Current URL** | **isActive** |
| ------------------------------ | --------------- | ------------ |
| `<NavLink to="/tasks" />`      | `/tasks`        | true         |
| `<NavLink to="/tasks" />`      | `/tasks/123`    | true         |
| `<NavLink to="/tasks" end />`  | `/tasks`        | true         |
| `<NavLink to="/tasks" end />`  | `/tasks/123`    | false        |
| `<NavLink to="/tasks/" end />` | `/tasks`        | false        |
| `<NavLink to="/tasks/" end />` | `/tasks/`       | true         |


**其中：**

**关于根路由链接的说明**

`<NavLink to="/">` 是一个特例，因为每个 URL 都匹配`/` 。为了避免默认情况下每条路由都匹配，它实际上忽略了 `end`属性，只在根路由上匹配。

#### `caseSensitive`

添加后区分大小写

| **Link**                                     | **URL**       | **isActive** |
| -------------------------------------------- | ------------- | ------------ |
| `<NavLink to="/SpOnGe-bOB" />`               | `/sponge-bob` | true         |
| `<NavLink to="/SpOnGe-bOB" caseSensitive />` | `/sponge-bob` | false        |
| `<NavLink to="/SpOnGe-bOB" caseSensitive />` | `/SpOnGe-bOB` | true         |

其余....



### 其他

声明式导航时。

在嵌套路由下使用
+ `<NavLink to="/home">`

回到`/home`

+ `<NavLink to="./post">`

如果此时路径为`/home`点击此时会在原路由上加上post，`/home/post`

可以省略为`<NavLink to="post">`





##  编程式导航

### useNavigate

::: tip

在 [`loaders`](https://baimingxuan.github.io/react-router6-doc/route/loader) 和[`actions`](https://baimingxuan.github.io/react-router6-doc/route/action)中使用[`redirect`](https://baimingxuan.github.io/react-router6-doc/fetch/redirect)比使用此钩子更好。

:::

```jsx
import {  useNavigate} from "react-router-dom"
import { useState } from "react";

export default ()=>{
  const [id,setID] =useState('0')

  const nav = useNavigate()

  return (<div>
    <h1>Hello World</h1>
    post: <input type="text" onChange={(e)=>setID(e.target.value)}/>

    <button onClick={()=>nav('/item/'+id)}>跳转</button>

  </div>)
}
```

先引入`useNavigate`,接收对应的值，利用接收的值进行跳转。可以用作一些特殊触发事件（例如：倒计时跳转）跳转页面

接口:

```typescript
export declare function useNavigate(): NavigateFunction;

export interface NavigateFunction {
    (to: To, options?: NavigateOptions): void;
    (delta: number): void;
}

export type To = string | Partial<Path>;
export interface Path {
    pathname: string;
    search: string;
    hash: string;
}



export interface NavigateOptions {
    replace?: boolean; 	//如果设置为 true，则导航将替换当前历史记录条目，而不是添加一个新的条目。
    state?: any;	//一个对象，包含要传递给目标位置的状态信息。
    preventScrollReset?: boolean;	//如果设置为 true，则在导航后不会重置滚动位置。
    relative?: RelativeRoutingType; 	//用于指定导航是相对于当前位置的 或 表示相对于当前路由的位置。
    flushSync?: boolean;	//设置为 true，则导航操作将同步执行，而不是等待当前宏任务（如当前事件循环）完成。
    viewTransition?: boolean;	//如果设置为 true，则启用视图转换效果
}

export type RelativeRoutingType = "route" | "path";
```



这是内部实现函数

```javascript
function useNavigateStable(): NavigateFunction {
  let { router } = useDataRouterContext(DataRouterHook.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable);

  let activeRef = React.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });

  let navigate: NavigateFunction = React.useCallback(
    (to: To | number, options: NavigateOptions = {}) => {
      warning(activeRef.current, navigateEffectWarning);

      // Short circuit here since if this happens on first render the navigate
      // is useless because we haven't wired up our router subscriber yet
      if (!activeRef.current) return;

      if (typeof to === "number") {
        router.navigate(to);
      } else {
        router.navigate(to, { fromRouteId: id, ...options });
      }
    },
    [router, id]
  );

  return navigate;
}
```

可以看到navigate的参数有两个，其一：`to`和`options`，其中options默认为空对象，也就是说可以为空。

其二 是  number 如果是number，就是相对路由，根据历史路由前进后退。



::: code-group

```jsx[number]
import {  useNavigate} from "react-router-dom"
export default ()=>{
  const nav = useNavigate()
  return (<div>
    <h1>Hello World</h1>
    
   <button onClick={()=>nav(-1)}>后退一步</button>
    
  </div>)
}
```

```jsx[To]
navigate('/home'); // 绝对路径
navigate('../profile'); // 相对路径
navigate('/user/:id', { id: '123' }); // 带参数的路径
navigate('/item/'+id) //字符串拼接参数
navigate(`/item/${id}`) //模版字符串

//路由对象
const match = useMatches();
const userMatch = match['/user/:id'];
if (userMatch) {
  navigate(userMatch);
}

//对象 即useLcation()对象
navigate({
  pathname: '/about',
  search: '?query=param',
  hash: '#section1',
  state: { fromDashboard: true },
});

//url对象
navigate(new URL('/about', 'https://example.com'));
```

```javascript[配置项]
// 基本用法，添加一个新的历史记录条目
navigate('/about');
// 使用 replace 选项，替换当前历史记录条目
navigate('/about', { replace: true });
//替代，而非添加。此时 navigate(-1) 就不会是替代前的路由而是替代前上一级路由

// state
nav(`/item/${id}`,{state:{meg:'hello',name:'小明'},}) //传递一个对象
nav(`/item/${id}`,{state:"hello",})//字符串

// 混用
nav(`/item/${id}`,{state:{meg:'hello',name:'小明'},replace:true})


//目标路由获取state
import { useLocation ,} from 'react-router-dom';
export default () => {
  const location = useLocation()
  return (
    <>
       <br /> 
       {JSON.stringify(location)}    
       <br />
       {JSON.stringify(location.state)}
    </>
  );
};

```





:::

一些实例

```javascript
// 在某些情况下，你可能需要立即执行导航操作
const handleSyncNavigate = () => {
  navigate('/new-page', { flushSync: true });
};
```

### useNavigationType

获取用户如何来到该路由，返回值“pop”、“push”、“replace”

+ **<font style="color:rgb(6, 6, 7);">"POP"</font>**<font style="color:rgb(6, 6, 7);">：表示用户通过历史堆栈上的弹出操作到达当前页面，通常意味着用户点击了浏览器的后退按钮或执行了后退操作</font><font style="color:rgb(6, 6, 7);">。</font>
+ **<font style="color:rgb(6, 6, 7);">"PUSH"</font>**<font style="color:rgb(6, 6, 7);">：表示用户通过推送操作到达当前页面，通常意味着用户点击了链接或使用了一些方式前进到新页面</font><font style="color:rgb(6, 6, 7);">。</font>
+ **<font style="color:rgb(6, 6, 7);">"REPLACE"</font>**<font style="color:rgb(6, 6, 7);">：表示用户通过替换操作到达当前页面，通常意味着用户刷新了页面或通过某种方式替换了当前页面的历史记录条目。</font>

```jsx
import React from 'react';
import { useNavigationType } from 'react-router-dom';

function MyComponent() {
  // 使用 useNavigationType 钩子获取当前的导航类型
  const navigationType = useNavigationType();

  // 根据导航类型执行不同的逻辑
  React.useEffect(() => {
    if (navigationType === 'POP') {
      console.log('用户通过后退按钮到达了这个页面');
      // 执行一些操作，比如恢复之前的状态
    } else if (navigationType === 'PUSH') {
      console.log('用户通过点击链接或其他方式前进到了这个页面');
      // 执行一些操作，比如初始化数据
    } else if (navigationType === 'REPLACE') {
      console.log('用户通过替换当前历史记录条目到达了这个页面');
      // 执行一些操作，比如重置某些状态
    }
  }, [navigationType]); // 依赖项数组中包含 navigationType，以便在导航类型变化时重新运行 effect

  return (
    <div>
      <h1>My Component</h1>
      {/* 组件的其他内容 */}
    </div>
  );
}

export default MyComponent;
```

### useHref

生成一个a链接的href的文本

```typescript
export declare function useHref(to: To, { relative }?: {
    relative?: RelativeRoutingType;
}): string;
//参数二可选

export type RelativeRoutingType = "route" | "path";
```

```jsx
import { useHref } from 'react-router-dom';

function MyComponent() {
  // 生成相对于当前路径的 URL
  const hrefPath = useHref('/section', { relative: 'path' });
  const hrefRoute = useHref('/section', { relative: 'route' });

  return (
    <div>
      <a href={hrefPath}>Relative Path Link</a>
      <a href={hrefRoute}>Relative Route Link</a>
    </div>
  );
}
```



### `<Navigate/>`

```typescript
<Navigate to="/"></Navigate>

export declare function Navigate({ to, replace, state, relative, }: NavigateProps): null;

export interface NavigateProps {
    to: To;
    replace?: boolean;
    state?: any;
    relative?: RelativeRoutingType;
}

export type RelativeRoutingType = "route" | "path";
```

规则同`useNavigate()`

但是与函数不同，只要组件被渲染到页面就会跳转到路由所指向视图。

而函数需要被调用。


# 嵌套路由

管理系统、菜单导航...这类的，一部分页面不变化，但是某部分的数据、页面变化的情况。

通过嵌套路由实现

实现步骤

::: code-group

```tsx[对象形式]
// 对象形式  使用 children 属性 定义一个router对象实现
const router = createBrowserRouter([

    {
        path: '*', // 捕获所有未匹配的路由
        element: <Nofound></Nofound>
    },
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Main />,
                //  index: true,  与children冲突  不能同时使用
                errorElement: '<div>404</div>',
                children: [ // 确保这里是一个数组
                    {
                        path: '', // 子路由的相对路径
                        children: [
                            {
                                path: 'post/:id',
                                element: <Post />
                            }, {
                                path: 'post',
                                element: <Post></Post>
                            }, {
                                path: 'post?:id&'
                            }
                        ]

                    }
                ]
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            }
        ]
    },

]);
```



```tsx[组件形式]
// 组件形式  通过 标签内
const App = () => {
   
    return <BrowserRouter>
        <Routes>
            <Route path="*" element={<Nofound />} />
            <Route path="/" element={<Layout />}>
                <Route index element={<Main />} />
                <Route path="post" element={<Post />}>
                    <Route path=":id" element={<Post />} />
                </Route>
                <Route path="home" element={<Home />} />
                <Route path="about" element={<About />} />
            </Route>
        </Routes>
    </BrowserRouter>    
};
```



:::

此时定义好嵌套路由后，在需要显示的tsx 内嵌入` <Outlet></Outlet>` ，作为路由视图的出口，这个时候，跳转子路由时，父路由的内容不会消失，变化的只有 ` <Outlet></Outlet>`之内视图根据路由变化。

```tsx
import { Link, Outlet,useNavigate } from "react-router-dom";
import { useState,useRef} from "react";

// const list = [{'主页':'/'},{'关于':'/about'},{'家':'/home'}]
const list = [
    {key:'主页',value:'/'},
    {key:'关于',value:'/about'},
    {key:'家',value:'/home'}
]

export default () => {
    
const pathInput  = useRef<HTMLInputElement | null>(null); 
const [pathText,setPathText] = useState('')

const nav = useNavigate()
const toPath = ()=>{
    if(pathInput.current==null)
        return
    setPathText(pathInput.current.value)
    nav(pathText)
}
    return (
        <>
            <input type="text" ref={pathInput}></input>
            <button onClick={toPath}>跳转</button>
            <h1>Layout</h1>
            
            <ul>
                {list.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link to={item.value}>{item.key}</Link>
                        </li>
                    );
                })}
            </ul>
            <Outlet></Outlet>
        </>
    );
};
```



::: tip

`<Post />`、`<Home/>`、`<About/>`，在`<Outlet/>`中根据路由匹配展示

以下路由结构中`<Layout />`组件一直显示，切换`/post`、`/post/:id`、`/home`、`/about` 只会改变`<Layout />`中的`<Outlet></Outlet>`

::: code-group

```tsx[对象]
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Main />,
                //  index: true,  与children冲突  不能同时使用
                errorElement: '<div>404</div>',
                children: [ // 确保这里是一个数组
                    {
                        path: '', // 子路由的相对路径
                        children: [
                            {
                                path: 'post/:id',
                                element: <Post />
                            }, {
                                path: 'post',
                                element: <Post></Post>
                            }
                        ]

                    }
                ]
            },
            {
                path: 'home',
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            }
        ]
    },
```







```tsx[组件]
<Route path="/" element={<Layout />}>
    <Route index element={<Main />} />
    <Route path="post" element={<Post />}>
        <Route path=":id" element={<Post />} />
    </Route>
    <Route path="home" element={<Home />} />
    <Route path="about" element={<About />} />
</Route>
```

:::





> 嵌套 可以实现  再  套N层  嵌套
>
> 子路由的子路由同样通过 `<Outlet/>`



::: danger

因为一个对象实例只有一个`children`属性，一个组件实例只有一个标签内插槽，所以一个组件不会出现俩个不同的`<Outlet/>`

:::





### 默认界面

index


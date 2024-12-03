# 参数

路由的参数莫过于两种，路径参数和get请求的参数

两种参数的实现可以参考跳转那篇

路劲参数需要先通过配置动态匹配

```javascript
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Index/>
    ),
  },
  {
    path: "/about",
    element: <About/>,
  },
  {
    path:'/post/:id/:dd?', //加入?意味着？号  参数可选
    element: <Post></Post>
  },
  {
    path:'/user/post?/:id',		//？ 问号在中间，意味着 /user/1 也可以访问
    element:<Post/>
  }，
  {
    path:'/user/post/:id',   //以: 开头 表示这是动态路由
    element:<Post/>
  },
  {
    path:'/post/:id/:dd',
    element:<Post/>
  },
  {
    path:'/post/:id/space',
    element:<Post/>
  },
  {
    path:'/:name',
    element:<About/>
  },{
    path:'/item/:id',
    element:<Post/>
  }
]);
```

可以通过字符串拼接直达目标路由

```javascript
import { Link ,useNavigate} from "react-router-dom"

 const navigate = useNavigate()

navigate('/item/'+id) //字符串拼接参数
navigate(`/item/${id}`) //模版字符串     
<Link to={`/user/${name}/profile`}>Profile</Link>
<Link to={`/user/${name}/profile`}>Profile</Link>
//  ....省略

navigate('/user/:id', { id: '123' }); // 带参数的路径
//路由参数
const match = useMatches();
const userMatch = match['/user/:id'];
if (userMatch) {
  navigate(userMatch);
}

//Location 对象
navigate({
  pathname: '/about',
  search: '?query=param',
  hash: '#section1',
  state: { fromDashboard: true },
});

```

get参数：

::: code-group

```javascript[api]


// 使用 URLSearchParams（推荐）

const searchParams = new URLSearchParams({ q: 'example' });
navigate(`/search?${searchParams.toString()}`);



//其二   createSearchParams  对new URLSearchParams();的封装

const location = useLocation(); // useLocation 返回一个对象
const searchParams =  createSearchParams(location.search)
navigate(`/search?${searchParams.toString()}`);
```

```javascript[字符串拼接]
//字符串拼接

navigate('/search?q=example');

const id = 123
navigate('/search?q='+id);

<Link to="/search?q=example">Search</Link>

```

```javascript[模板字符串]
// 模板 字符串
const queryParams = `q=example`;
navigate(`/search?${queryParams}`);
```





:::

## 读取参数

使用useLocation钩子读取参数

通过调用useLocation返回一个对象

```jsx
import { useLocation } from 'react-router-dom';
export default ()=>{
 const location =  useLocation()
}
```



包括以下内容

```typescript
interface Location {
  pathname: string;	//路由路径，不包括get
  search: string;  //URL 的查询字符串部分
  hash: string;//字符串类型，表示 URL 的哈希部分，即 # 后面的部分。
  state?: any; // 状态可以是任何类型，因此使用 any 来表示
  key: string;//字符串类型，React Router 内部使用，用于区分不同的导航动作。
}
```

示例：

```json
{
  pathname: '/about',
  search: '?name=xiaoming&age=123',
  hash: '',
  state: null, 
  key: 'default'
}
```

### 对象形式的参数

#### `useParams`读取路径参数


```jsx
import { useLocation ,useParams,} from 'react-router-dom';

export default () => {
  const params =  useParams();
  const location = useLocation()
  return (
    <>
      <h1>Post  {params.id}</h1>
      {JSON.stringify(params)}
      <br /> 
      {JSON.stringify(location)}    
      <br />
      {JSON.stringify(location.state)}
    </>
  );
};
```

读取 的参数如下

```json
{ 
  "id":"1",
  "dd":"dasda"
}
{
  "pathname":"/post/1/dasda",
  "search":"",
  "hash":"",
  "state":null,
  "key":"default"
}
null
```

### 读取查询参数



`URLSearchParams` 读取

```jsx
import { useLocation ,useHref,useResolvedPath,Link} from 'react-router-dom';
import { useState } from 'react';

export default () => {
  const location = useLocation(); // useLocation 返回一个对象

  const searchParams = new URLSearchParams(location.search);

  /**
也可以获取
const name = searchParams.get('name');
console.log(name)
  */

  // 将查询字符串转换为对象
  const searcher = Object.fromEntries(searchParams);

  return (
    <>
      {JSON.stringify(location)}
      <br></br>
      <pre>{JSON.stringify(searcher, null, 2)}</pre> {/* 格式化输出对象 */}
    </>
  );
};
```

结果 示例

```json
{
  "pathname": "/about",
  "search": "?name=xiaoming&age=123",
  "hash": "",
  "state": null,
  "key": "default"
}
{
  "name": "xiaoming",
  "age": "123"
}
```

##### ` useSearchParams`

可以获取 参数 和修改参数

修改后路由默认 加入堆栈

类似useState的用法

示例：

```jsx
import {  useSearchParams} from 'react-router-dom';

//url  http://localhost:3000/post/1?name=zhansan&age=18&gmile=124564548
export default () => {
//类似  useState
  const [search,setSearch] = useSearchParams()
 // 单个获取
  const name =  search.get('name')
  const age = search.get('age');
  const gmile = search.get('gmile');
  const all = search.getAll('name')

  //换为对象获取
  const searchparams = Object.fromEntries(search);

  return (
    <>
      <h1>{name}-{age}-{gmile}-{all}</h1>

      <p>this search</p>
      // 修改
      <button onClick={()=>setSearch({
      ...searchparams,          // 保留现有参数
      name: 'zhansan',          // 更新 name 参数
    })}>set Search</button>       


      <pre>{JSON.stringify(searchparams,null,2)}</pre>
    </>
  );
};
```

```tsx
declare function useSearchParams(
  defaultInit?: URLSearchParamsInit
): [URLSearchParams, SetURLSearchParams];

type ParamKeyValuePair = [string, string];

type URLSearchParamsInit =
  | string
  | ParamKeyValuePair[]
  | Record<string, string | string[]>
  | URLSearchParams;

type SetURLSearchParams = (
  nextInit?:
    | URLSearchParamsInit
    | ((prev: URLSearchParams) => URLSearchParamsInit),
  navigateOpts?: : NavigateOptions
) => void;

interface NavigateOptions {
  replace?: boolean;
  state?: any;
  preventScrollReset?: boolean;
}
```

`SetURLSearchParams`可以接收 第二个参数，与  `navigate`第二个参数一致

运行与`navigate`类似，但是只针对查询参数部分

##### `createSearchParams`

对`new URLSearchParams();`的封装

```javascript
declare function createSearchParams(
  init?: URLSearchParamsInit
): URLSearchParams;

export type URLSearchParamsInit =
  string | 
  ParamKeyValuePair[] |
  Record<string, string |string[]> | 
  URLSearchParams;

//  API
interface URLSearchParams {
   
    append(name: string, value: string): void;
   
    delete(name: string): void;
  
    get(name: string): string | null;
  
    getAll(name: string): string[];
 
    has(name: string): boolean;
 
    set(name: string, value: string): void;
    sort(): void;
 
    toString(): string;
    forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
}

```

使用 示例：

```jsx
import { useLocation ,useParams,createSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export default () => {
  const location = useLocation(); // useLocation 返回一个对象
  const searchParams =  createSearchParams(location.search)
  useEffect(
    ()=>alert(  searchParams.get('name'))
   ,[]
  )
  const ss = Object.fromEntries(searchParams)

  return (
    <>
      <pre>{JSON.stringify(ss,null,2)}</pre>
    </>
  );
};
```

### useMatch

传入一个路由模式匹配对象or 字符串，根据当前路由进行匹配并返回参数！

```javascript
export declare function useMatch<ParamKey extends ParamParseKey<Path>, Path extends string>
  (pattern: PathPattern<Path> | Path): PathMatch<ParamKey> | null;

export interface PathPattern<Path extends string = string> {

    path: Path;

    caseSensitive?: boolean;

    end?: boolean;
}

export interface PathPattern<Path extends string = string> {

    path: Path;

    caseSensitive?: boolean;

    end?: boolean;
}
//返回值结构
export interface PathMatch<ParamKey extends string = string> {

    params: Params<ParamKey>;

    pathname: string;

    pathnameBase: string;

    pattern: PathPattern;
}
```



示例  

```javascript
const match = useMatch('post/:id')
```

路由此时是`/post/1`

```json
{
     "params": {
          "id": "1"
     },
     "pathname": "/post/1",
     "pathnameBase": "/post/1",
     "pattern": {
          "path": "post/:id",
          "caseSensitive": false,
          "end": true
     }
}
```

### `useResolvedPath`

解析路由的一种方法

```javascript
declare function useResolvedPath(
  to: To,
  options?: { relative?: RelativeRoutingType }
): Path;

export type RelativeRoutingType = "route" | "path";

export interface Path {
    pathname: string;
    search: string;
    hash: string;
}
```

老办法了，传入一个 To 返回一个 Path
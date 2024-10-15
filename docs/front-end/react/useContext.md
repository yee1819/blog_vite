# useContext

React内置的状态管理器

定义后后代组件均可使用定义的State

具体示例：

```javascript{1,2,10,16,26,37-40}
import { useContext, createContext } from "react";
const context = createContext<string | undefined>(undefined); // 可以是 string 或 undefined
/**
 * 以上是 ts 写法
 * js 写法 const context = createContext()
 * 即可
 * 
 */
function Son() {
    const meg = useContext(context);
    console.log(meg);
    return <h1>{meg}</h1>;
}

function Father() {
    const meg = useContext(context);
    return (
        <>
            <h1>{meg}</h1>
            <Son />
        </>
    );
}

function Grandfather() {
    const meg = useContext(context);
    return (
        <>
            <h1>{meg}</h1>
            <Father />
        </>
    );
}

function Demo() { // 将函数命名为 Demo
    const meg = "hello, world";
    return (
        <context.Provider value={meg}>16
            <Grandfather />
        </context.Provider>
    );
}

export default Demo;
```

## 步骤

1. 祖宗组件中引入`createContext`，并创建Context实例
1. 利用实例的`Provider`API以及value属性传递上下文（传递多个值时使用对象形式）,并且把context实例使用prop传递下去
1. 子孙组件接收，并使用`useContext`获取传递过来的value值







::: code-group

```typescript[祖宗组件]{1,9,12,15-17}
import  {  createContext } from "react";
import Grandfather from "./Context"; // 假设 Grandfather 在另一个文件中

interface ContextType {
    meg: string,
    age:number;
}

const Context = createContext<ContextType | undefined>(undefined);

function Demo() {
    const value: ContextType = { meg: "hello, world",age:18 }; // 创建符合 ContextType 的对象

    return (
        <Context.Provider value={value}>
            <Grandfather context={Context} />
        </Context.Provider>
    );
}

export default Demo;
```



```typescript[子组件]{10,17,23,29,40,46,39,22,9}
import { useContext } from "react";

// 定义上下文的类型
interface ContextType {
    meg: string,
    age: number;
}

function Son({ context }: { context: React.Context<ContextType | undefined> }) {
    const contextValue = useContext(context);
    
    // 进行类型检查
    if (!contextValue) {
        return <h1>Error: Context not provided</h1>;
    }

    const { meg } = contextValue;
    console.log(meg);
    return <h1>{meg}</h1>;
}

function Father({ context }: { context: React.Context<ContextType | undefined> }) {
    const contextValue = useContext(context);

    if (!contextValue) {
        return <h1>Error: Context not provided</h1>;
    }

    const { meg ,age} = contextValue;
    return (
        <>
            <h1>{meg}</h1>
            <p>my age is : {age}</p>
            <Son context={context} />
        </>
    );
}

export default function Grandfather({ context }: { context: React.Context<ContextType | undefined> }) {
    const contextValue = useContext(context);

    if (!contextValue) {
        return <h1>Error: Context not provided</h1>;
    }

    const { meg } = contextValue;
    return (
        <>
            <h1>{meg}</h1>
            <Father context={context} />
        </>
    );
}
```

```javascript[js版根组件]
import  {  createContext } from "react";
import Grandfather from "./Context"; // 假设 Grandfather 在另一个文件中

const Context = createContext();

function Demo() {
    const value = { meg: "hello, world",age:18 }; // 创建符合 ContextType 的对象

    return (
        <Context.Provider value={value}>
            <Grandfather context={Context} />
        </Context.Provider>
    );
}

export default Demo;
```

```javascript[js版子孙组件]
import React, { useContext } from "react";

function Son({ context }) {
    const contextValue = useContext(context);
    
    const { meg } = contextValue;
    console.log(meg);
    return <h1>{meg}</h1>;
}

function Father({ context }) {
    const contextValue = useContext(context);

    const { meg ,age} = contextValue;
    return (
        <>
            <h1>{meg}</h1>
            <p>my age is : {age}</p>
            <Son context={context} />
        </>
    );
}

export default function Grandfather({ context }) {
    const contextValue = useContext(context);

    const { meg } = contextValue;
    return (
        <>
            <h1>{meg}</h1>
            <Father context={context} />
        </>
    );
}
```



:::


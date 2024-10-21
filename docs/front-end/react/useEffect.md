---
title: useEffect
---

处理副作用Hook

副作用即某件事情发生了的时候，导致的副作用

可用于`axios`请求等等





## 基本使用

一个页面渲染时请求数据的例子：

```jsx
import { useEffect, useState } from "react";

//渲染时执行
const url = "http://geek.itheima.net/v1_0/channels"

export default () => {

    let [list, setList] = useState([]);

    useEffect(() => {
        async function getList() {
            const res = await fetch(url);
            const resJson = await res.json()
            setList(resJson.data.channels);
        }
        getList();
    }, [])

    return (<>
        <>{JSON.stringify(list)}</>
        <ul> {list.map((item: any) => (
            <li key={item.id}>{item.name}</li>// 直接使用 item.name
        ))}</ul>
    </>);
}
```

可以看出来useEffect是一个hook函数，由俩个参数可选

第一个参数为函数，决定了副作用执行的操作

第二个参数是数组，决定了监听的数据，也就是函数依赖项，当依赖项进行变化时，执行函数内容

不是由事件引起的操作而是由渲染本身



## 依赖数组

useEffect数组参数可选

### 依赖数组为空

为空时，组件渲染+组件更新时都会执行

例如：

```jsx
import { useEffect, useRef,useState } from'react';

export default ()=>{

    const inputRef = useRef<HTMLInputElement>(null);
    const [str,setStr] = useState('123');
    const handleChange = ()=>{
        if(inputRef.current===null){
                return;
            }
            setStr(inputRef.current.value)
    }
    const [count,setCount] = useState(0);

    useEffect(()=>{
        console.log("调用了"+count+"次")
        setCount(count+1);
        if(inputRef.current===null){
            return;
        }
        inputRef.current.value = '123';
    },)

    return(<>
        <input ref={inputRef} onChange={handleChange}/>
        <h1>{str}</h1>
    </>)
}
```

会发现无论怎么输入，输入框的值都会一直显示“123”，因为每次更新都执行一次useEffect , 造成无限循环

### 依赖数组不为空

依赖数组不为空时，根据依赖数组的依赖项进行更新渲染

#### 依赖数组是空数组

意味着不监听任何元素，仅在组件渲染时执行一次

```jsx
import { useEffect, useRef,useState } from'react';

export default ()=>{

    const inputRef = useRef<HTMLInputElement>(null);
    const [str,setStr] = useState('123');
    const handleChange = ()=>{
        if(inputRef.current===null){
                return;
            }
            setStr(inputRef.current.value)
    }
    const [count,setCount] = useState(0);

    useEffect(()=>{
        console.log("调用了"+count+"次")
        setCount(count+1);
        if(inputRef.current===null){
            return;
        }
        inputRef.current.value = '123';
    },[])

    return(<>
        <input ref={inputRef} onChange={handleChange}/>
        <h1>{str}</h1>
    </>)
}
```



#### 依赖于基本类型时

```jsx
    import { useEffect, useRef,useState } from'react';

    export default ()=>{

        const inputRef = useRef<HTMLInputElement>(null);
        const [str,setStr] = useState('123');
        const handleChange = ()=>{
            if(inputRef.current===null){
                    return;
                }
                setStr(inputRef.current.value)
        }
        const [count,setCount] = useState(0);

        useEffect(()=>{
            console.log("调用了"+count+"次")
            setCount(count+1);
            if(inputRef.current===null){
                return;
            }
            inputRef.current.value = '123';
        },[str])

        return(<>
            <input ref={inputRef} onChange={handleChange}/>
            <h1>{str}</h1>
        </>)
    }
```

当输入的str发生改变时才会进行函数调用



::: danger 注意

不要拿依赖项放置执行函数中进行改变，造成无限循环无依赖那样的无限循环

```jsx
const [count,setCount] = useState(0);

useEffect(()=>{
    console.log("调用了"+count+"次")
    setCount(count+1);
 
},[count])
```



:::

数组内容为多个元素时，每个元素变化都会执行副作用

```jsx
    import { useEffect, useRef,useState } from'react';

    export default ()=>{

        const inputRef = useRef<HTMLInputElement>(null);
        const [str,setStr] = useState('123');
        const handleChange = ()=>{
            if(inputRef.current===null){
                    return;
                }
                setStr(inputRef.current.value)
        }
        const [count,setCount] = useState(0);

        const [num,setNum] = useState(0);



        useEffect(()=>{
            console.log("调用了"+count+"次")
            setCount(count+1);
            if(inputRef.current===null){
                return;
            }
            inputRef.current.value = '123';
        },[str,num])

        return(<>
            <input ref={inputRef} onChange={handleChange}/>
            <h1>{str}</h1>
            <h2>{num}</h2>
            <button onClick={()=>{setNum(num+1)}}>点击+1</button>

        </>)
    }
```

此时点击按钮num+1、输入str 都会执行一次副作用

#### 对象

浅比较

```jsx
import React, { useEffect, useState } from 'react';

function ExampleComponent() {

    const gamer = {name: '张三', age: 18, sex: '男'}

    const [game, setGame] = useState(gamer);

    const change = ()=>{
        console.log(game);
        setGame({...game,age:19}); 
    }
    useEffect(()=>{
        console.log("game改变了");
    },[game])

    const change2 = ()=>{
        game.age = 20;
        game.name = '李四';
        console.log(game);
    }


    return (
        <div>

            <h1>{game.name}</h1>
            <h1>{game.age}</h1>
            <h1>{game.sex}</h1>
            <button onClick={()=>change()}>改变</button>
            <button onClick={()=>change2()}>改变</button>

        </div>
    );
}

export default ExampleComponent;
```

只有对象地址更改 的change   函数才会让依赖的game产生副作用，如果是深层次的改变，即使change2 就不能进行副作用

- [x] 待续



## 清理副作用



```jsx

    useEffect(() => {
        console.log("num现在是: " + num);
        console.log("=================");
        
        return () => {
            // 清理函数
            console.log("**************************")
            console.log("清理函数被调用，num现在是: " + num);
            console.log("+++++++++++++++++++++++++++++++++")
        };
        console.log("------------------");

    }, [num]);
```

可以看出 清理副作用函数在依赖值被修改时，进行上一次useEffect函数中return函数的一次调用，而在清理函数使用后的动作不会执行

渲染时：

```yacas
num现在是: 0
=================
```
修改一次 num 时

```yacas
**************************
清理函数被调用，num现在是: 0
+++++++++++++++++++++++++++++++++
num现在是: 1
=================
```



实例，可以用来做输入防抖

```jsx
import React, { useState, useEffect } from 'react';

const DebouncedInput: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300); // 延迟300毫秒

    return () => {
      clearTimeout(handler); // 清除上一个定时器
    };
  }, [inputValue]); // 依赖于 inputValue

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="输入内容..."
      />
      <p>防抖后的值: {debouncedValue}</p>
    </div>
  );
};

export default DebouncedInput;
```

输入新的值以后把上一个输入的值的定时器给去掉





### 组件卸载

卸载组件时也会执行一次清除函数

::: code-group

```tsx[app.tsx]
import { useState } from 'react';
import EffectShow from './EffectShow.tsx';
function App() {
  const [show, setShow] = useState(true); // 在组件内部使用 useState

  const changeShow = () => {
    setShow(!show); // 更新计数
  };

  return (
    <>
    {show? <EffectShow/> : <></>}
    <button onClick={changeShow}>改变</button>
      </>
  );
}
```



```tsx[EffectShow.tsx]
import { useState,useEffect } from "react";


export default ()=>{

    useEffect(()=>{
        console.log("渲染时执行")
        const Timer =  setInterval(()=>{
            console.log("计时器执行中...")

        }
        ,1000)

        return ()=>{
            console.log("组件卸载时执行")
            clearInterval(Timer)
            
        }
    },[])
    return <div>UseEffect</div>
}
```



::: 

## 多个副作用

一个组件中可以存在多个 useEffect 

```jsx
    import { useEffect, useRef,useState } from'react';

    export default ()=>{

        const inputRef = useRef<HTMLInputElement>(null);
        const [str,setStr] = useState('123');
        const handleChange = ()=>{
            if(inputRef.current===null){
                    return;
                }
                setStr(inputRef.current.value)
        }
        const [count,setCount] = useState(0);

        const [num,setNum] = useState(0);


        useEffect(()=>{
            console.log("num现在是"+num)        
        },[num])

        useEffect(()=>{
            console.log("调用了"+count+"次")
            setCount(count+1);
            if(inputRef.current===null){
                return;
            }
            inputRef.current.value = '123';
        },[str,num])

        return(<>
            <input ref={inputRef} onChange={handleChange}/>
            <h1>{str}</h1>
            <h2>{num}</h2>
            <button onClick={()=>{setNum(num+1)}}>点击+1</button>

        </>)
    }
```


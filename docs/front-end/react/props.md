---
title: Prop
---





用于不同组件中进行通信。父子间通信、状态提升实现兄弟通信。

## 父子通信

父亲可传送多个prop 给子组件，任意类型：数字，文本，数组，对象，函数，甚至是组件

有两种接收办法

- 使用 props (随意命名接收)

- 解构接收

(因为传过来是一个对象)所以可以用一个变量接收，也可以解构

::: code-group

```js[主组件]
import Demo1 from './demo1';
import Demo2 from './demo2';
import Child from './children'
import { useState,useRef } from 'react';


function Hello (){
    return <>hello,world</>
}
export default ()=>{

    const [count,setCount]  = useState(0);
    
    function changeCount(){
        setCount(count+1)
    }

    const person = {name:'张三',age :18}
    
    const inputRef = useRef<HTMLInputElement|null>(null)
    
    const  num = [1,2,3,4,5]


    const changeInputCount = ()=>{
        if (inputRef.current) {
            const value = parseInt(inputRef.current.value, 10); // 将字符串转换为数字
            if (!isNaN(value)) { // 检查转换是否成功
                setCount(value);
            } else {
                console.error('输入的值不是一个有效的数字');
            }
        }
    }
    return <>
        <button onClick={changeCount}>count+1</button><br></br>
        <input ref={inputRef}></input><button onClick={changeInputCount}>修改count</button><br></br>
    this is 父组件：
        <h1>count:{count}</h1>
        <h1>person:{JSON.stringify(person)}</h1>
        <h1>input:{inputRef.current?.value}</h1>
        {num.map(item=><li key={item}>{item}</li>)}
    <hr></hr>
    <Demo1  hello={<Hello/>} count={count} changeCount={changeCount} person={person} inputRef={inputRef} num={num} />
    <hr />
    <Demo2  hello={<Hello/>}  count={count} changeCount={changeCount} person={person} inputRef={inputRef} num={num}/>
    <hr></hr>
    {/* <Child>  count={count} changeCount={changeCount} person={person} inputRef={inputRef} num={num}</Child> */}
</>
}
```

```js[props接收]


export default (props:any)=>{
    return <>
    <h1>这是子组件一:</h1>
    
        <h1>hello:{props.hello}</h1>
        <h1>count:{props.count}</h1>
        <h1>changeCount:{props.changeCount}</h1>
        <h1>person:{JSON.stringify(props.person)}</h1>
        <h1>input:{props.inputRef.current?.value}</h1>
        {props.num.map((item:any)=><li key={item}>{item}</li>)}
    </>
}
```

```js[解构]

interface Props {
    count: number; // 假设 count 是一个数字
    changeCount: () => void; // 假设 changeCount 是一个函数
    person: { name: string; age: number }; // 假设 person 是一个对象
    inputRef: React.RefObject<HTMLInputElement>; // 使用 RefObject 来定义 inputRef
    num: number[]; // 假设 num 是一个数字数组
    hello: React.ReactNode;
}

const MyComponent: React.FC<Props> = ({ hello,count, changeCount, person, inputRef, num }) => {
    return (
        <>
            <h1>这是子组件二:</h1>
            <h1>hello: {hello}</h1>
            <h1>count: {count}</h1>
            <h1>changeCount: <button onClick={changeCount}>更新计数</button></h1>
            <h1>person: {JSON.stringify(person)}</h1>
            <h1>input: {inputRef.current?.value}</h1>
            <ul>
                {num.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </>
    );
};


export default MyComponent;
```





:::





这是父亲传给儿子

儿子传给父亲（父亲给function操作的函数儿子，儿子通过操作function来传递给父亲值

::: tip 一个快速传递props的办法

```js{18,22}
function Hello (){
    return <>hello,world</>
}
export default ()=>{

    const [count,setCount]  = useState(0);
    
    function changeCount(){
        setCount(count+1)
    }

    const person = {name:'张三',age :18}
    
    const inputRef = useRef<HTMLInputElement|null>(null)
    
    const  num = [1,2,3,4,5]

    const childProps = {person,num,inputRef,count,changeCount}

    return <>

    <Demo2 {...childProps} hello={<Hello/>} />

</>
}
```



:::



## 兄弟通信

状态提升

兄弟两用来通信的变量交给父亲，由父亲保管，兄弟两通过函数来操作更改

具体细节都在上面的代码

## Children

类似Vue中的插槽

可以传递：

- 单个元素

  你可以传递一个单一的 React 元素，例如一个组件或 HTML 标签。

  ```js
  <Child>
      <h1>标题</h1>
  </Child>
  ```

- 多个元素

  ```js
  <Child>
      <h1>标题1</h1>
      <h1>标题2</h1>
  </Child>
  ```

- 字符串

  ```js
  <Child>
      这是一些文本内容。
  </Child>
  ```

- 数组

  ```js
  <Child>
      {[<h1 key="1">标题1</h1>, <h1 key="2">标题2</h1>]}
  </Child>
  ```

- Fragment 

  也就是react的空标签

  ```js
  <Child>
      <>
          <h1>标题1</h1>
          <h1>标题2</h1>
      </>
  </Child>
  ```

- 函数

  ```js
  <Child>
      {() => <h1>动态标题</h1>}
  </Child>
  ```

- 条件渲染

  ```js
  <Child>
      {isLoggedIn ? <h1>欢迎回来!</h1> : <h1>请登录</h1>}
  </Child>
  ```

- 对象

  比较特殊,其实也是多个不同类型混合插入的方式

  ::: code-group

  ```js[index]
      const person = {name:'张三',age :18}
      
      return <>
      <Child>{person}</Child>
  </>
  ```

  

  ```js[子组件]
      return (<>
       <div>ChildrenDemo:</div>
          {Props.children.name}
          {Props.children.age}
      </>)
  ```

  ```js[以上大部分数据类型集合]
  function Hello (){
      return <>hello,world</>
  }
  export default ()=>{
  
      const [count,setCount]  = useState(0);
      
      function changeCount(){
          setCount(count+1)
      }
  
      const person = {name:'张三',age :18}
      
      const inputRef = useRef<HTMLInputElement|null>(null)
      
      const  num = [1,2,3,4,5]
  
      const childProps = {person,num,inputRef,count,changeCount}
  
      return <>
  
      <Child >{childProps}</Child>
  
  </>
  }
  ```

  

  ```js[样例]
  export default function ChildrenDemo(Props:any) {
      console.log(Props.children)
  
      return (<>
       <div>ChildrenDemo:</div>
          {Props.children.num}
          {Props.children.person.name}
      </>)
  }
  ```

  

  :::

具体使用：

props对象中有一个children的key，通过解构或`Props.children`都可以获取类似插槽的东西



::: code-group

```js[props]
export default function ChildrenDemo(Props:any) {
    console.log(Props.children)
    return (<>
     <div>ChildrenDemo:</div>
        {Props.children}
    </>)
}
```

```js[解构]
export default function ChildrenDemo({
    children,
}) {
    console.log(children)
    return (<>
     <div>ChildrenDemo:</div>
        {children}
    </>)
}
```



:::


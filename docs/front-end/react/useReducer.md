React 内置的状态管理

## 基本使用

`useReducer` 有至少需要两个参数，`reducer` 状态变化函数、`initialState` 初始值、以及可以省略的初始化函数

`reducer` 自定义，有俩个入参(state、action)状态与动作

通过自定义的动作来自定义操作state。在状态更新时就可以选择自定义的动作来更新state了。

::: danger

- 使用第三个参数，初始化函数不需要参数就可以计算出初始值，初始值也就是第二个参数就可以设置null

- 初始化函数需要传参时，初始值（第二个参数）自动传递给初始化函数(第三个参数)

- 设置初始化函数  的优势：初始化函数只会在初次渲染的时候进行调用。后续更新渲染不会再次调用。而初始值传入的是一个函数返回值时，每次更新渲染都会重新调用该函数。

:::

`useReducer` 返回两个值 `[ state ]` 状态 和 `[ dispatch ]` 触发更新操作函数。dispatch 函数在调用时一般需要传入一个action作为参数。

::: tip

- `action`：用户执行的操作。可以是任意类型的值。通常来说 action 是一个对象，其中 `type` 属性标识类型，其它属性携带额外信息。

- 可以通过type 实现不同操作state的方式

你可以任意命名，但是约定俗称是如下操作

:::

使用方法：

```typescript

import {useReducer,useState} from 'react'


const countReducer = (state:any,action:any)=>{
    switch(action.type){
        case 'increment':
            return state+1
        case 'decrement':
            return state-1
    }

}

const personReducer = (state:any,action:any)=>{
    if(action.type === 'changeName'){
        return {...state,name:action.payload}
    }
    if(action.type === 'changeAge'){
        return {...state,age:action.payload}
    }
    if(action.type === 'changePhone'){
        return {...state,phone:action.payload}
    }
    if(action.type ==='changeAgeName'){
        return {...state,age:action.payload.age,name:action.payload.name}
    }
    if(action.type === 'changeAll'){
        return action.payload
    }
    if(action.type === 'changeAll2'){
        return {...state,name:action.name,age:action.age,phone:action.phone}
    }
   
}

const gg = ()=>{
    const initialState = {name:'小明',age:18,phone:'123'}
    // const [state,dispatch] = useReducer(reducer,initialState)
    const [person,setPerson] = useReducer(personReducer,initialState)
    const [count,setCount] = useReducer(countReducer,0)

    const [name,setName] = useState('')
    const [age,setAge] = useState('')    
    const [phone,setPhone] = useState('')
    return (<>
        <h1> {count}</h1>
        <button onClick={()=>setCount({type:'increment'})}>+</button>
        <button onClick={()=>setCount({type:'decrement'})}>-</button>
        <h1>{JSON.stringify(person)}</h1>
        姓名：
        <input type="text"  onChange={(e)=>setName(e.target.value)}/>
        <br />
        年龄：
        <input type="text"  onChange={(e)=>setAge(e.target.value)}/>
        <br />
        电话：
        <input type="text" onChange={(e)=>setPhone(e.target.value)}/>
        <br />
        <button onClick={()=>setPerson({type:'changeName',payload:name})}>changeName</button>
        <button onClick={()=>setPerson({type:'changeAge',payload:age})}>changeAge</button>
        <button onClick={()=>setPerson({type:'changePhone',payload:phone})}>changePhone</button>
        <button onClick={()=>setPerson({type:'changeAgeName',payload:{name,age}})}>changeAgeName</button>
        <button onClick={()=>setPerson({type:'changeAll',payload:{name,age,phone}})}>changeAll</button>
        <button onClick={()=>setPerson({type:'changeAll2',name:name,age:age,phone:phone})}>changeAll</button>
        </>)    
}


export default gg
```



使用useReduce实现一个useState的效果

::: code-group

```typescript[useReducer]
    const reducer = (state:any,action:any)=>{
        return action.payload
    }
    const [state,setState] =  useReducer(reducer,'hello')
    
    return <>
          <h1>{state}</h1>
        <input onChange={e=>setState({payload:e.target.value})}></input>
        </>
```



```typescript[useState]
    const [state,setState] = useState('hello')
      return (<>
        <h1>{state}</h1>
        <input onChange={e=>setState(e.target.value)}></input>
</>)
```



:::

与useState 一样，应该用替代的思想更新State而不是改变。此时执行更新State操作的时候，对象、数组这类复杂类型就需要新对象新数组来实现。

## 配合useContext实现全页面状态管理


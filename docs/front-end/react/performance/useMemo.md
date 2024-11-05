缓存计算结果

如下所示

```typescript
import { useState, useMemo, useEffect } from "react";
import Demo from "./demo1";
export default () => {

    function fib (n:number):number{
        console.log('费波马切数列计算....')
        if(n<3)return 1;
        return fib(n-1)+fib(n-2);
    }
    const [count1,setCount1] = useState(0)
    const [count2,setCount2] =  useState(0)
    const result  = fib(count1)
    console.log("---------------------------")
    console.log("组件重新渲染")



    return (
        <>
           <button onClick={()=>setCount1(count1+1)}>count1++</button>
           <button onClick={()=>setCount2(count2+1)}>count2++</button>
           <br></br>
           {result}
        </>
    )
};
```

按下count1时，每次重新渲染界面重新计算数列。

此时我再按下count2，这个时候与count1无关，但是我还是重新渲染了界面内，并且导致count1重新计算，浪费了额外的性能。

优化:

```typescript
import { useState, useMemo, useEffect } from "react";
import Demo from "./demo1";
export default () => {

    function fib (n:number):number{
        console.log('费波马切数列计算....')
        if(n<3)return 1;
        return fib(n-1)+fib(n-2);
    }
    const [count1,setCount1] = useState(0)
    const [count2,setCount2] =  useState(0)
    
    console.log("---------------------------")
    console.log("组件重新渲染")

    const result  = useMemo(()=>{
      return  fib(count1)
    },[count1])

    return (
        <>
           <button onClick={()=>setCount1(count1+1)}>count1++</button>
           <button onClick={()=>setCount2(count2+1)}>count2++</button>
           <br></br>
           {result}
        </>
    )
};
```

此时按下count2、react会缓存count1所计算的值，不需要重新计算。

当count1改变时才会重新计算

::: tip

useMemo 是需要一个变量接收数据的

```typescript
 const result  = useMemo(()=>{
      return  fib(count1)
    },[count1])
```

参数是回调函数、监听数组（依赖项）

:::
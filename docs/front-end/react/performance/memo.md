react 的渲染机制：

在父组件发生渲染时，子组件跟着渲染。

如果子组件不需要渲染，此时会造成性能浪费。

memo是React 的实例

Memo可以实现缓存组件，如果父组件发生改变且此时传给子组件的props也发生改变时，子组件才会重新渲染，否则缓存子组件，不重新渲染。

::: code-group

```typescript[父亲]
import { useState, useMemo, useEffect } from "react";
import Demo from "./demo1";
export default () => {


    const [count1,setCount1] = useState(0)
    const [count2,setCount2] =  useState(0)
    
    console.log("---------------------------")
    console.log("父组件重新渲染")

    const result  = useMemo(()=>{
      return  fib(count1)
    },[count1])

    return (
        <>
           <button onClick={()=>setCount1(count1+1)}>count1++</button>
           <button onClick={()=>setCount2(count2+1)}>count2++</button>
           <br></br>
           {result}
           <br></br>
           <Demo count1={count1}/>
        </>
    )
};
```

```typescript
import { useState, useMemo, useEffect } from "react";

const MyComponent = ({count1}) => {


    console.log('子组件渲染了')
    return (
        <>
           {count1}
        </>
    );
};

export default MyComponent;
```





:::

此时无论是按钮1还是按钮2都会让子组件全部渲染

优化：

```typescript
import { useState, useMemo, useEffect, memo } from "react";
import Demo from "./demo1";

const MemoDemo1 = memo(Demo);
export default () => {

    function fib (n:number):number{
        // console.log('费波马切数列计算....')
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
           <br></br>
           {/* <Demo count1={count1}/> */}
            <MemoDemo1 count1={count1}/>
        </>
    )
};
```

此时改变count1 才会让 子组件 重新渲染了。

原理：经过memo包裹的组件生成了一个新的组件。

## props 变化的比较

对于普通类型：number、string、boolean如此

对比前后值是否相同

对于复杂类型：list、object....

对比引用地址是否相同



对于复杂类型

::: code-group

```typescript
import { useState, useMemo, useEffect, memo } from "react";
import Demo from "./demo1";

const MemoDemo1 = memo(Demo);
export default () => {

    const [count1,setCount1] = useState(0)
    const [count2,setCount2] =  useState(0)
    
    console.log("---------------------------")
    console.log("组件重新渲染")


    const person = {
      name:'jack',age:18
    }
  
    return (
        <>
           <button onClick={()=>setCount1(count1+1)}>count1++</button>
           <button onClick={()=>setCount2(count2+1)}>count2++</button>
           <br></br>
           {result}
           <br></br>
           
            <MemoDemo1 person={person}/>
        </>
    )
};
```



```typescript
import { useState, useMemo, useEffect } from "react";

const MyComponent = ({person}) => {


    console.log('子组件渲染了')
    return (
        <>
           {JSON.stringify(person)}
        </>
    );
};

export default MyComponent;
```



:::

此时俩个按钮的改变都会重新渲染子组件

因为父组件在重新渲染时，修改了对象类型的地址，导致props以为自己改变了，所以跟着渲染子组件。

优化：通过usememo来实现对象类型的缓存

```typescript{15-17}
import { useState, useMemo, useEffect, memo } from "react";
import Demo from "./demo1";

const MemoDemo1 = memo(Demo);
export default () => {

    const [count1,setCount1] = useState(0)
    const [count2,setCount2] =  useState(0)
    
    console.log("---------------------------")
    console.log("组件重新渲染")



    const person = useMemo(()=>{
      return {name:'jack',age:18}
    },[])
    
    return (
        <>
           <button onClick={()=>setCount1(count1+1)}>count1++</button>
           <button onClick={()=>setCount2(count2+1)}>count2++</button>
           <br></br>
           {result}
           <br></br>
           
            <MemoDemo1 person={person}/>
        </>
    )
};
```

缓存复杂类型后，每次父组件重新渲染不改变复杂类型的地址引用，此时子组件也就不会跟着重新渲染了。
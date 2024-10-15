# Jsx/Tsx

Jsx ：JavaScript and Xml

JavaScript 的扩展

允许在Js中写入Html代码

Tsx：TypeScript and Xml ，Jsx 的 扩展，增加了类型声明。

## 要求

::: danger

- 只返回一个根元素，需要标签包裹，标签必须闭合----jax原理被转化为js对象，js只允许返回对对象
- `<></>`也可以
- 使用`{}`可以嵌入Js代码
- class 属性需命名为className ----jax原理被转化为js对象，class是保留字
- `{ {插入对象} }`用于标签属性的插入单大括号之间可以插入对象（再带一个{}
- html内插入对象则使用json转换
- html标签中属性的值、html变量可通过`{}`来插入

:::





::: code-group

```javascript[jsx插值{}]
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```



```javascript[插入html中]
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}
```

```javascript[插入api/表达式]
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'zh-CN',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}

```

```javascript[插入对象]
export default function TodoList() {
  return (
    <ul style={
  	  {
    	  backgroundColor: 'black',
    	  color: 'pink'
   	 }
    }>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}

```

```javascript[插入对象也可以使用模板字符串]
export default function TodoList() {
  const uiStyle = {
    	  backgroundColor: 'black',
    	  color: 'pink'
   	 };
  const ss = "abc";
  return (
   <ul style={uiStyle} className={`${ss} aa bb`}> // 此时可以使用多个class且某个class 是变量的形式
    此时 ul的class 为 abc  aa  bb  三个
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

```javascript[显示对象/转化json]
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  },
  info:{
    className:"avatar",
    src:"https://i.imgur.com/7vQD0fPs.jpg",
    alt:"Gregorio Y. Zara"
  }
};
export default function TodoList() {
  return (
	<>
      {JSON.stringify(person)}
    </>
  );
}


```

```typescript[v-html效果]{7,11}
import { useState } from 'react'

import './App.css'

function App() {

  const hhtml = `<h1>这个是测试</h1>`

  return (
    <>
      <div dangerouslySetInnerHTML={{__html:hhtml}}></div>
    </>
  )
}

export default App

```



:::





::: warning 警告

如果属性是a-b形式需要写成驼峰命名

```
<ul style={{ border-radius: 14px;}}>
```
改为
```
<ul style={{ borderRadius: 14px; }}>
```

:::



### 函数作为子组件、组件可以变量值

```javascript{10,12-18,27,29,31}
import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const add = () => {
    setCount((count) => count + 1)
  }
  const hello = <ShowHello/>
  
  function ShowHello() {
    return (
      <div>
        <h1>hello</h1>
      </div>
    );
  }
  
  const card = 'card'
  return (
    <>
      <div className={` ${card} ${aa} bb `}>
        <button onClick={add}>
          count is {count}
        </button>
        <p><ShowHello/></p>
        
        <p>{hello}</p>
        
       <p>7:{ShowHello() }</p>
      </div>
    </>
  )
}
export default App
```



### 事件

示例

::: code-group

```javascript[调用]{15}
import { useState } from 'react'

import './App.css'

function App() {
  

  const [hello,setHello] = useState("hello world")
  function change(e){
  	console.log(e)
    setHello("hello react")
  }
  return (
    <>
      <h1>{hello}</h1>
      <button onClick={change}>点击</button>
    </>
  )
}

export default App
```

```typescript[传参函数]{7-9,14-15}
import { useState } from 'react'

import './App.css'

function App() {

  const [hello,setHello] = useState("hello world")
  function change(name:string){
    setHello("hello "+name)
  }
  
    function change(name:string,e){  // 事件e
    	console.log(e)
    setHello("hello "+name)
  }

  return (
    <>
      <h1>{hello}</h1>
      <button onClick={()=>change('react')}>点击</button> // 需要使用匿名函数
      <button onClick={(e)=>change2('react',e)}>点击</button> // 事件e
    </>
  )
}

export default App

```

```typescript[泛型]{8-10}
import { useState } from 'react'

import './App.css'

function App() {

  const [hello,setHello] = useState("hello world")
  const change =  <T,>(name:T)=>{  //需要加上 ， 才识别泛型
    setHello("hello "+name)
  }

  return (
    <>
      <h1>{hello}</h1>
      <button onClick={()=>change('react')}>点击</button>
    </>
  )
}

export default App

```





:::

### 分支

三元判断 或 if判断

```javascript{13,15-20,42,46,48}
import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const add = () => {
    setCount((count) => count + 1)
  }

  const hello = <ShowHello/>
  const hello2 = count > 10?<ShowHello/>:''
  
  let hello3 = null
    if(count>10){
      hello3=  <ShowHello/>
    }else {
      hello3 = null
    }
  


  function ShowHello() {
    return (
      <div>
        <h1>hello</h1>
      </div>
    );
  }

  return (
    <>
    
      <div className={` ${card} ${aa} bb `}>
        <button onClick={add}>
          count is {count}
        </button>

        <p><ShowHello/></p>
        
        <p>{count>10?<ShowHello></ShowHello>:''}</p>
        
        <p>{hello}</p>
        
        <p>{count>10?hello:''}</p>
        
        <p>7:{count>10?ShowHello():''}</p>
        
        <p>{hello2}</p>
        
        <p>{hello3}</p>
        
      </div>

    </>
  )
}
export default App
```





### 且运算符 &

jsx把false视为null、undefined这样的空值。那么有值则为true

```javascript{4}
function Item({ name, isPacked }) {
  return (
    <li className="item">
      {name} {isPacked && '✅'} //当true时返回右边  特殊用法
    </li>
  );
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item 
          isPacked={true} 
          name="宇航服" 
        />
        <Item 
          isPacked={true} 
          name="带金箔的头盔" 
        />
        <Item 
          isPacked={false} 
          name="Tam 的照片" 
        />
      </ul>
    </section>
  );
}
```



:::  warning 提示

&的左边不能为数字，如果是 0 会优先显示0 。例如`0 & '你好'`则输出0而不是空白。

:::



### 循环、遍历

使用Js的map函数实现遍历







> 过滤器
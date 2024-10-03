# 模块化

众所周知，js在早期是没有模块化的概念的 

> [!Danger]
>
> 多个js文件引入时需要特别注意顺序，否则会导致依赖链对不上，依赖覆盖、数据安全等等问题

NodeJs的出现让js可以实现后端开发

需要规范的管理代码



## 导入与导出

在Js中模块化的理念是导入（引入）和导出（暴露）

一个js文件有需要导出暴露出去的变量、函数、方法等等可以使用导出

如果需要使用其他js文件的变量、函数、方法等等则导入

## CommonJS

导入使用`require`

导出使用`exports`

具体使用方法：

::: code-group

```javascript[b.js 导入]{1,7}
let aJs =  require('./a.js')

console.log("a.js:")
console.log(aJs)


let cJs =  require('./c.js')

console.log("\nc.js:")
console.log(cJs)
```

```javascript[a.js导出1]{16-18}
const name = "小明"

const age = 18

const info = {
    phone: 13123123123,
    address: "北京市海淀区",
    friends: ["小红", "小刚", "小绿"],
    hobbies: {
        sport: "篮球",
        music: "音乐",
        movie: "跑步"
    }
}

exports.name = name
exports.age = age
exports.info = info
```

```javascript[c.js导出2]{23-27}
const name = "小明"

const age = 18

const info = {
    phone: 13123123123,
    address: "北京市海淀区",
    friends: ["小红", "小刚", "小绿"],
    hobbies: {
        sport: "篮球",
        music: "音乐",
        movie: "跑步"
    }
}
/**
 * 与之前的区别：
 * 
 */
//module.exports.name = name
//module.exports.age = age
//module.exports.info = info

module.exports = {
    name,
    age,
    info
}
```

```txt[输出结果]
a.js:
{
  name: '小明',
  age: 18,
  info: {
    phone: 13123123123,
    address: '北京市海淀区',
    friends: [ '小红', '小刚', '小绿' ],
    hobbies: { sport: '篮球', music: '音乐', movie: '跑步' }
  }
}

c.js:
{
  name: '小明',
  age: 18,
  info: {
    phone: 13123123123,
    address: '北京市海淀区',
    friends: [ '小红', '小刚', '小绿' ],
    hobbies: { sport: '篮球', music: '音乐', movie: '跑步' }
  }
}
```





:::

---

::: tip 如果没有导出只有导入时
输出空对象
::: code-group

```javascript
let aJs =  require('./a.js')

console.log("a.js:")
console.log(aJs)
```
```javascript
const name = "小明"

const age = 18

const info = {
    phone: 13123123123,
    address: "北京市海淀区",
    friends: ["小红", "小刚", "小绿"],
    hobbies: {
        sport: "篮球",
        music: "音乐",
        movie: "跑步"
    }
}
```
此时输出结果为：`{}`
:::

---

> [!danger] 注意
>
> 如果有多个`module.exports`或`exports.`的形式导出
>
> 只导出最后一个`module.exports`的对象

### 示例

::: code-group

```javascript[导入]
let aJs =  require('./a.js')

console.log("a.js:")
console.log(aJs)
```

```javascript[导出1]{16-100}
const name = "小明"

const age = 18

const info = {
    phone: 13123123123,
    address: "北京市海淀区",
    friends: ["小红", "小刚", "小绿"],
    hobbies: {
        sport: "篮球",
        music: "音乐",
        movie: "跑步"
    }
}

module.exports = {
    name,
}
exports.info = info

/**
* 输出内容是：
 a.js:
 { name: '小明' }
*/
```

```javascript[导出2]{16-100}
const name = "小明"

const age = 18

const info = {
    phone: 13123123123,
    address: "北京市海淀区",
    friends: ["小红", "小刚", "小绿"],
    hobbies: {
        sport: "篮球",
        music: "音乐",
        movie: "跑步"
    }
}

module.exports = {
    name,
    info
}

module.exports = {
    name,
}

exports.info = info

/**
导出内容是：
a.js:
{ name: '小明' }

可以发现只导出最后一个module对象
*/
```

```javascript[导出3]{19-100}
const name = "小明"

const age = 18

const info = {
    phone: 13123123123,
    address: "北京市海淀区",
    friends: ["小红", "小刚", "小绿"],
    hobbies: {
        sport: "篮球",
        music: "音乐",
        movie: "跑步"
    }
}

exports.info = info
module.exports.name = name

/**
 * a.js:
{
  info: {
    phone: 13123123123,
    address: '北京市海淀区',
    friends: [ '小红', '小刚', '小绿' ],
    hobbies: { sport: '篮球', music: '音乐', movie: '跑步' }
  },
  name: '小明'
}
使用exports的时候会保留并添加新的属性，使用module.exports的时候会覆盖之前的属性

 */
```





:::

---

>[!IMPORTANT] 初始化时
>
>`this`、`module.exports`、`exports`均指向`{}`

---

也可以导出函数

解构赋值

::: code-group

```javascript[导入]{12}
let aJs =  require('./a.js')

console.log("a.js:")
console.log(aJs)

aJs.hello()

console.log("----------")
/**
 * 解构
 */
let {name, age, info, hello} = aJs
console.log("\n解构:")
console.log(name, age, info, hello)
hello()

```



```javascript[导出]{15-17}
const name = "小明"

const age = 18

const info = {
    phone: 13123123123,
    address: "北京市海淀区",
    friends: ["小红", "小刚", "小绿"],
    hobbies: {
        sport: "篮球",
        music: "音乐",
        movie: "跑步"
    }
}
function hello() {
    console.log("hello")
}
module.exports = {
    name,
    age,
    info,
    hello
}
```



```yacas[输出结果]
a.js:
{
  name: '小明',
  age: 18,
  info: {
    phone: 13123123123,
    address: '北京市海淀区',
    friends: [ '小红', '小刚', '小绿' ],
    hobbies: { sport: '篮球', music: '音乐', movie: '跑步' }
  },
  hello: [Function: hello]
}
hello
----------

解构:
小明 18 {
  phone: 13123123123,
  address: '北京市海淀区',
  friends: [ '小红', '小刚', '小绿' ],
  hobbies: { sport: '篮球', music: '音乐', movie: '跑步' }
} [Function: hello]
hello
```



:::

---

### 原理

Js模块化的原理是把每一个Js文件当作一个函数，在我们看不见的地方（即Js自动帮我们把一个Js文件转化为Js函数

也是为什么可以直接使用`exports`、`require`、`module` 的原因

::: code-group 



```javascript[输出]{1,27}
function (exports, require, module, __filename, __dirname) {
    const name = "小明"

    const age = 18

    const info = {
        phone: 13123123123,
        address: "北京市海淀区",
        friends: ["小红", "小刚", "小绿"],
        hobbies: {
            sport: "篮球",
            music: "音乐",
            movie: "跑步"
        }
    }
    function hello() {
        console.log("hello")
    }
    module.exports = {
        name,
        age,
        info,
        hello
    }

    console.log(arguments.callee.toString())
}
```
```javascript[导出文件]
const name = "小明"

const age = 18

const info = {
    phone: 13123123123,
    address: "北京市海淀区",
    friends: ["小红", "小刚", "小绿"],
    hobbies: {
        sport: "篮球",
        music: "音乐",
        movie: "跑步"
    }
}
function hello() {
    console.log("hello")
}
module.exports = {
    name,
    age,
    info,
    hello
}

//查看
console.log(arguments.callee.toString())
```


:::

---

### 浏览器中

`CommonJS`默认运行咋爱Node.JS中

浏览器端默认不认识`CommonJS`

需要用到

官网：[Browserify](https://browserify.org/)

Github仓库：[browserify：浏览器端 require（）](https://github.com/browserify/browserify)

来转化为可以被浏览器所认识的代码

官网中介绍了使用方法，不多赘述。



## ES6 模块

JavaScript 6 官方规范

即支持NodeJS、也支持浏览器

::: danger  浏览器 或 NodeJs 运行需要配置

- 浏览器：

引入的时候修改type为module

`    <script type="module" src="./b.js"></script>`

---

- NodeJs:

有两种方法

1. 修改`.js`文件名为 `.mjs`,意为 module js

2. 添加`package.json`配置文件，添加配置

   ```json
   {
       "type":"module"
   }
   ```
   二选一即可
   

:::

### 导出

- 分别导出
- 整体导出
- 默认导出

```javascript{1,2,26-28,30-32}
//分别导出
export const name = "小明"

const age = 18

const info = {
    phone: 13123123123,
    address: "北京市海淀区",
    friends: ["小红", "小刚", "小绿"],
    hobbies: {
        sport: "篮球",
        music: "音乐",
        movie: "跑步"
    }
}
const num = [1,2,3]

const hello = () => {
    console.log("hello")
}

const sum = (a,b) => {
    return a+b
}

//统一导出
export {age,info}
export {sum}

// 默认导出 只能有一个
export default {hello,num}
// 如果只有一个时可以不使用花括号 export default hello

```

选择你需要导出/暴露的代码（变量、函数、对象...)



---

### 导入

- 导入全部(通用)

    > [!Warning] 示例
    >
    > ::: code-group
    >
    > ```javascript[全部导入]{1}
    > import * as hh from './a.js'  //全部导入as后是要起别名
    > console.log(hh.name,hh.age, hh.info)
    > console.log(hh.default.hello())
    > console.log(hh.default.num)
    > console.log(hh.sum(1,2))
    > 
    > 
    > console.log("-----")
    > console.log(hh)
    > ```
    >
    > ```javascript[导出]
    > //分别导出
    > export const name = "小明"
    > 
    > const age = 18
    > 
    > const info = {
    >     phone: 13123123123,
    >     address: "北京市海淀区",
    >     friends: ["小红", "小刚", "小绿"],
    >     hobbies: {
    >         sport: "篮球",
    >         music: "音乐",
    >         movie: "跑步"
    >     }
    > }
    > const num = [1,2,3]
    > 
    > const hello = () => {
    >     console.log("hello")
    > }
    > 
    > const sum = (a,b) => {
    >     return a+b
    > }
    > 
    > //统一导出
    > export {age,info}
    > export {sum}
    > 
    > // 默认导出 只能有一个
    > export default {hello,num}
    > // 如果只有一个时可以不使用花括号 export default hello
    > 
    > ```
    >
    > ```yacas[输出]
    > 小明 18 {
    >   phone: 13123123123,
    >   address: '北京市海淀区',
    >   friends: [ '小红', '小刚', '小绿' ],
    >   hobbies: { sport: '篮球', music: '音乐', movie: '跑步' }
    > }
    > hello
    > undefined
    > [ 1, 2, 3 ]
    > 3
    > -----
    > [Module: null prototype] {
    >   age: 18,
    >   default: { hello: [Function: hello], num: [ 1, 2, 3 ] },
    >   info: {
    >     phone: 13123123123,
    >     address: '北京市海淀区',
    >     friends: [ '小红', '小刚', '小绿' ],
    >     hobbies: { sport: '篮球', music: '音乐', movie: '跑步' }
    >   },
    >   name: '小明',
    >   sum: [Function: sum]
    > }
    > ```
    >
    > 
    >
    > :::





- 命名导入（仅支持分别导出、统一导出）

  > ::: code-group
  >
  > ```javascript[导入]
  > import {age as nianling } from './a.js'    // 给age取别名
  > 
  > console.log(nianling)
  > 
  > import {info} from './a.js'
  > 
  > console.log(info)
  > ```
  >
  > ```javascript[导出]
  > //分别导出
  > export const name = "小明"
  > 
  > const age = 18
  > 
  > const info = {
  >     phone: 13123123123,
  >     address: "北京市海淀区",
  >     friends: ["小红", "小刚", "小绿"],
  >     hobbies: {
  >         sport: "篮球",
  >         music: "音乐",
  >         movie: "跑步"
  >     }
  > }
  > const num = [1,2,3]
  > 
  > const hello = () => {
  >     console.log("hello")
  > }
  > 
  > const sum = (a,b) => {
  >     return a+b
  > }
  > 
  > //统一导出
  > export {age,info}
  > export {sum}
  > ```
  >
  > ```yacas[输出]
  > 18
  > {
  >   phone: 13123123123,
  >   address: '北京市海淀区',
  >   friends: [ '小红', '小刚', '小绿' ],
  >   hobbies: { sport: '篮球', music: '音乐', movie: '跑步' }
  > }
  > ```
  >
  > 
  >
  > :::

  

- 默认导入

  > [!danger] 示例
  >
  > :::code-group
  >
  > ```javascript[导入]
  > import xx from './a.js' // 默认导出名称随意取
  > 
  > console.log(xx)
  > 
  > xx.hello()
  > console.log(xx.num)
  > 
  > const {hello,num} = xx
  > hello()
  > console.log(num)
  > ```
  >
  > ```javascript[导出]
  > //分别导出
  > export const name = "小明"
  > 
  > const age = 18
  > 
  > const info = {
  >     phone: 13123123123,
  >     address: "北京市海淀区",
  >     friends: ["小红", "小刚", "小绿"],
  >     hobbies: {
  >         sport: "篮球",
  >         music: "音乐",
  >         movie: "跑步"
  >     }
  > }
  > const num = [1,2,3]
  > 
  > const hello = () => {
  >     console.log("hello")
  > }
  > 
  > const sum = (a,b) => {
  >     return a+b
  > }
  > 
  > //统一导出
  > export {age,info}
  > export {sum}
  > 
  > // 默认导出 只能有一个
  > export default {hello,num}
  > // 如果只有一个时可以不使用花括号 export default hello
  > ```
  >
  > ```yacas[输出]
  > { hello: [Function: hello], num: [ 1, 2, 3 ] }
  > hello
  > [ 1, 2, 3 ]
  > hello
  > [ 1, 2, 3 ]
  > ```
  >
  > 
  >
  > :::

  

- 命名导入 与 默认导入 混合使用
  
  ::: code-group
  
  ```javascript[混合导入]{1}
  import xx,{sum,info} from './a.js'
  console.log(xx)
  console.log(sum(1,2))
  console.log(info)
  
  
  const {hello,num} = xx
  hello()
  console.log(num)
  ```
  
  ```javascript[导出]
  //分别导出
  export const name = "小明"
  
  const age = 18
  
  const info = {
      phone: 13123123123,
      address: "北京市海淀区",
      friends: ["小红", "小刚", "小绿"],
      hobbies: {
          sport: "篮球",
          music: "音乐",
          movie: "跑步"
      }
  }
  const num = [1,2,3]
  
  const hello = () => {
      console.log("hello")
  }
  
  const sum = (a,b) => {
      return a+b
  }
  
  //统一导出
  export {age,info}
  export {sum}
  
  // 默认导出 只能有一个
  export default {hello,num}
  // 如果只有一个时可以不使用花括号 export default hello
  ```
  
  ```yacas[输出]
  { hello: [Function: hello], num: [ 1, 2, 3 ] }
  3
  {
    phone: 13123123123,
    address: '北京市海淀区',
    friends: [ '小红', '小刚', '小绿' ],
    hobbies: { sport: '篮球', music: '音乐', movie: '跑步' }
  }
  hello
	[ 1, 2, 3 ]
  ```
  :::
  
  
  
- 动态导入

  > [!CAUTION] 示例
  >
  > ::: code-group
  >
  > ```javascript[动态导入]
  > //动态导入
  > //在某一个时间端内导入
  > const btn = document.getElementById("btn")
  > 
  > btn.addEventListener("click", async () => {
  >     const {hello} = await import("./a.js")
  >     //此时的引入类似全部导入
  >     hello()
  > })
  > ```
  >
  > ```javascript[导出]
  > //分别导出
  > export const name = "小明"
  > 
  > const age = 18
  > 
  > const info = {
  >     phone: 13123123123,
  >     address: "北京市海淀区",
  >     friends: ["小红", "小刚", "小绿"],
  >     hobbies: {
  >         sport: "篮球",
  >         music: "音乐",
  >         movie: "跑步"
  >     }
  > }
  > const num = [1,2,3]
  > 
  > const hello = () => {
  >     console.log("hello")
  > }
  > 
  > const sum = (a,b) => {
  >     return a+b
  > }
  > 
  > //统一导出
  > export {age,info}
  > export {sum}
  > 
  > // 默认导出 只能有一个
  > export default {hello,num}
  > // 如果只有一个时可以不使用花括号 export default hello
  > ```
  >
  > 
  >
  > :::

- import 不接收数据直接运行

> [!tip] 示例
>
>   ::: code-group
>
>   ```javascript[导入]
>   import './d.js'
>   ```
>
>   ```javascript[导出]
>   console.log("hello")
>   ```
>
>   
>
>   :::
>
>   运行后输出`hello`
>
>   直接执行导入的代码












### ES6 和 CommonJS

CommonJS 原理是 函数，被调用后Js文件的数据独立不共用

而ES6 引入的 是 类似 地址 的东西，修改后原来的文件的变量也会修改。

如果不想修改源文件的数值，源文件的数据类型设置`const`



## 其他

AMD

CMD

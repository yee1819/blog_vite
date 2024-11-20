# reactive

与`ref`不同，`reactive` 在`<script/>`中不需要使用`.value`

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })
const num = reactive([1,4,2,3,,5])
const person =reactive({name:'小明',age:18,address:{'国籍':'中国','省份':'浙江','城市':'杭州'}})
console.log(state)
console.log(person)
const changesf = ()=>{
  person.address['省份'] = '江苏'
}
const change = ()=>{
  num[2]++
}
</script>

<template>
  {{person}}
  <button @click="changesf">改变</button>
<button @click="state.count++">
  {{ state.count }}
</button>
<p>{{num}}</p>
 <button @click="change">修改数组</button>
</template>

```

底层是一个代理对象

```yaml
Proxy {count: 0}
  [[Handler]]: MutableReactiveHandler
  [[Target]]: Object
    count: 0
  [[Prototype]]: Object
  [[IsRevoked]]: false

Proxy {name: '小明', age: 18, address: {…}}
  [[Handler]]: MutableReactiveHandler
  [[Target]]: Object
    address: {国籍: '中国', 省份: '浙江', 城市: '杭州'}
    age: 18
    name: "小明"
  [[Prototype]]: Object
  [[IsRevoked]]: false
```

所以

```vue
const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
```
因为`reactive`是代理对象响应式，创建`reactive`会通过响应式传播

+ Vue 3 的响应式系统通过代理（Proxy）实现。当你使用`reactive`函数时，Vue 会创建一个代理对象，该对象包含原始数据的响应式副本。
+ 这个代理对象会拦截对属性的访问和修改操作，并将这些操作转换为对原始数据的响应式更新。
+ 由于 `address`是 `person` 的一个属性，Vue 在创建 `person`的代理时，也会递归地将 `address` 转换为响应式对象。

解构时，子项是复杂类型自动转为响应式类型，如果是基本类型则会解除响应式

```vue
<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })
const num = reactive([1,4,2,3,,5])
const person =reactive({name:'小明',age:18,address:{info:'cs','国籍':'中国','省份':'浙江','城市':'杭州'}})

const changesf = ()=>{
  person.address['省份'] = '江苏'
}


const change = ()=>{
  num[2]++
}
let i = 0

const {address} = person  //因为是对象 获得响应式
const {info} = address  //b失去响应式
const changexys = ()=>{
  
  address['省份'] = '广东'+ i++
}
let { count } = state
</script>

<template>
  {{person}}
  <button @click="changesf">改变</button>
  <hr/>
  <button @click="state.count++">
  {{ state.count }}
    <hr/>
</button>
{{info}}
<button @click="info=1"> 修改info</button>
  <hr/>
<button @click="count++">
  {{ count }}
</button>
    <hr/>
<p>{{num}}</p>
 <button @click="change">修改数组</button>
    <hr/>
{{address}}
  <button @click="changexys">改变</button>
</template>
```

## shallowReactive()
`reactive`默认深层次，`<font style="color:rgb(33, 53, 71);">shallowReactive</font>`是浅层次响应式形式

```vue
const raw = {}
const proxy = reactive(raw)

// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false
```

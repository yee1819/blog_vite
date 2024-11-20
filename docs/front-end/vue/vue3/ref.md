# ref

在 vue 3 中 需要使用`ref`来声明响应式数据

在`<script/>`中`.value` 来访问该响应式数据

在`<template/>`中会自动解包，不需要`.value`

```vue
<script setup>
import { ref } from 'vue'

const message = "hhha"
const msg = ref('Hello World!')
const num = ref(18)

const addNum = ()=>{
  num.value ++
}
const jianNum = ()=>{
  num --
}
</script>

<template>
  <h1>{{ message }}</h1>  <!-- 没有响应式--->
  <input v-model="message" />
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <h1>{{ num }}</h1>
  <input v-model.number="num" />
  <button @click="addNum">+</button>
  <button @click="jianNum">-</button>
</template>

```
如果是选项式 api 

```vue
<script>
import { ref } from 'vue'

export default {
  
    setup() {
      const message = 'hhha'
      const msg = ref('Hello World!')
      const num = ref(18)

      const addNum = () => {
        num.value++
      }
      const jianNum = () => {
        num -- // 修正这里
      }

      return {  //暴露方法
        message,
        msg,
        num,
        addNum,
        jianNum
      }
    },
  
}
</script>

<template>
  <h1>{{ message }}</h1>
  <input v-model="message" />
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <h1>{{ num }}</h1>
  <input v-model.number="num" />
  <button @click="addNum">+</button>
  <button @click="jianNum">-</button>
</template>
```

使用ref定义响应式元素后，vue会追踪这个ref，在修改后及时接收到消息并重新渲染界面。

`ref`可用于基础类型的响应式定义：

- number
- boolean
- string
- .......


实际底层

```yaml
RefImpl
  dep: Dep {computed: undefined, version: 0, activeLink: undefined, subs: Link, map: undefined, …}
  __v_isRef: true
  __v_isShallow: false
  _rawValue: "Hello World!"
  _value: "Hello World!"
  value: "Hello World!"
```

所以需要加一个value



## 复杂类型

对象、数组、List、Map、Set等等一系列Js数据

模版访问不需要加value、`<script/>`则需要加`.value`

```vue
<script setup>
import { ref,toRef } from 'vue'

const num = ref([1,4,2,3,,5])
const person = ref({name:'小明',age:18,address:{'国籍':'中国','省份':'浙江','城市':'杭州'}})
var m = new Map([['Michael', 95], ['Bob', 75], ['Tracy', 85]]);
const l  = toRef(m)
console.log(num)
console.log(person)
console.log(l)
const change = ()=>{
  num.value = [2,5,8,4,,15]
}
</script>

<template>
  {{l}}
  <h1>{{ num }}</h1>
  <button @click="change">修改数组</button>

</template>
```


可以看到在复杂类型使用`ref`时，底层的`value`是一个代理对象

```yaml
RefImpl {dep: Dep, __v_isRef: true, __v_isShallow: false, _rawValue: Array(6), _value: Proxy}
  dep: Dep {computed: undefined, version: 0, activeLink: undefined, subs: Link, map: undefined, …}
  __v_isRef: true
  __v_isShallow: false
  _rawValue: (6) [1, 4, 2, 3, empty, 5]
  _value: Proxy {0: 1, 1: 4, 2: 2, 3: 3, 5: 5}
  value: Proxy

RefImpl {dep: Dep, __v_isRef: true, __v_isShallow: false, _rawValue: {…}, _value: Proxy}
  dep: Dep {computed: undefined, version: 0, activeLink: undefined, subs: undefined, map: undefined, …}
  __v_isRef: true
  __v_isShallow: false
  _rawValue: {name: '小明', age: 18, address: {…}}
  _value: Proxy {name: '小明', age: 18, address: {…}}
  value: Proxy
  
RefImpl {dep: Dep, __v_isRef: true, __v_isShallow: false, _rawValue: Map(3), _value: Proxy}
  dep: Dep {computed: undefined, version: 0, activeLink: undefined, subs: Link, map: undefined, …}
  __v_isRef: true
  __v_isShallow: false
  _rawValue: Map(3) {'Michael' => 95, 'Bob' => 75, 'Tracy' => 85}
  _value: Proxy {'Michael' => 95, 'Bob' => 75, 'Tracy' => 85}
  value: Proxy
```











## shallowRef()

`ref`定义的复杂类型响应式  默认具有深层次响应式

使用`shallowRef`放弃深层次响应式









## next tick





## 解包


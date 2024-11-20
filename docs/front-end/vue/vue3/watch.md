# watch

wacth系列api作为vue3监听语法



对比一下vue2 选项式 与 vue3组合式的写法区别

::: code-group
```vue[vue3]
<script setup>
import {watch, ref } from 'vue';
  const text = ref(1)
  const msg = ref("hello,world!")
  const color = ref("balck")
  watch(msg, (newVal,old)=>{
    text.value = newVal
  });
  watch(text,(newVal,old)=>{
    if(text.value.length>15){
      color.value = "red"
    }
  });
  
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <h1 :style="`color:${color}`">{{text}}</h1>
</template>
```

```vue[vue2]
<script >
  export default {
    data(){
       return{
          msg:"hello,world",
          color:"balck",
          text:"1"
      }
    },
    watch:{
      msg(){
        this.text = this.msg 
      },
      text:'changeColor'
    },
    methods:{
       changeColor(old){
        console.log(old)
        if (this.text.length>15){
          this.color = "red"
        }
      }
    }
  };
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
  <h1 :style="`color:${color}`">{{text}}</h1>
</template>
```



:::



watch只监听以下元素：

1. 一个ref、reactive定义的响应式基本元素、响应式对象类型
2. 一个函数
3. 以上类型组成的数组

---



watch()函数有三个参数：

1. 数组  or 对象  or 元素 ，定义监听对象

2. 一个回调函数，监听相关数据发生变化后执行的函数，该回调函数有参数可选，分别为（无参，单个参数，俩个参数）（单个参数时数值为改变后的新数据）（两个参数时,前者为新数据，后者为旧数据）（特别的，开启监听对象深层次监听后时，新旧数据都为响应式对象）

   第三个参数 ，清除函数。下面介绍

3. 一个对象，配置watch()项，常见用于监听响应式对象，设置监听层数深度（deep）

## 回调函数的参数
### 俩个参数时
前新后旧

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const newq = ref('')
const oldq = ref('')

// watch works directly on a ref
watch(question,  ( newVal,oldVal) => {
  newq.value = newVal
  oldq.value = oldVal
})
</script>

<template>
  <p>
    <input v-model="question"/>
  </p>
  <p>{{question}}</p>
  <hr>
  new：{{newq}}
  <br>
  old：{{oldq}}
</template>
```

### 单个参数时
为修改后的新值

```vue
<script setup>
import { ref, watch } from 'vue'

const question = ref('')
const newq = ref('')
const oldq = ref('')

// watch works directly on a ref
watch(question,  ( newVal) => {
  newq.value = newVal
 // oldq.value = oldVal
})
</script>

<template>
  <p>
    <input v-model="question"/>
  </p>
  <p>{{question}}</p>
  <hr>
  new：{{newq}}
  <br>
  old：{{oldq}}
</template>
```
## 监听响应式对象


### ref
#### 不开启deep
首先不开启deep

```vue
<script setup>
import { ref, watch } from 'vue'

const newp = ref('')
const oldp = ref('')
const person = ref({name:'小明',age:19})
watch(person,(newVal,oldVal)=>{
    newp.value = newVal
    oldp.value = oldVal
},
//{deep:true}
)

const i = ref(1)

const change=()=>{
  i.value = i.value+1
  person.value.age = 99 + i.value
  person.value.name = "哈哈"+i.value

}
const replace= ()=>{
  person.value = {name:'大张',age:20}
}


</script>

<template>

  <button @click="change">修改person</button>
  <button @click="replace">替换person</button>
  <hr>
  {{person}}
  <hr>
  new：{{newp}}
  <br>
  old：{{oldp}}

  <hr>
</template>
```
此时点击修改，并未触发监听，可以看出此时监听是浅层次的，只能监听对象是否变化

点击替换时，响应式对象发生改变，触发监听，新值和旧值分别为新对象与旧对象



{ "name": "大张", "age": 20 }

---
new：{ "name": "大张", "age": 20 }

old：{ "name": "哈哈12", "age": 111 }

----

此时点击修改，发现旧对象未变化，新对象值改变，确认此时监听为浅层次

{ "name": "哈哈22", "age": 121 }

---

new：{ "name": "哈哈22", "age": 121 }  

old：{ "name": "哈哈12", "age": 111 }

---



#### 开启deep 

```vue
<script setup>
import { ref, watch } from 'vue'

const newp = ref('')
const oldp = ref('')
const person = ref({name:'小明',age:19})
watch(person,(newVal,oldVal)=>{
    newp.value = newVal
    oldp.value = oldVal
},
{deep:true}
)

const i = ref(1)

const change=()=>{
  i.value = i.value+1
  person.value.age = 99 + i.value
  person.value.name = "哈哈"+i.value

}
const replace= ()=>{
  person.value = {name:'大张',age:20}
}


</script>

<template>

  <button @click="change">修改person</button>
  <button @click="replace">替换person</button>
  <hr>
  {{person}}
  <hr>
  new：{{newp}}
  <br>
  old：{{oldp}}

  <hr>
</template>
```

此时点击修改person

{ "name": "哈哈28", "age": 127 }

---

new：{ "name": "哈哈28", "age": 127 }   

old：{ "name": "哈哈28", "age": 127 }

发现被监听深层次对象，且新值旧值一致为一个对象

---

点击替换

{ "name": "大张", "age": 20 }

---

new：{ "name": "大张", "age": 20 }  

old：{ "name": "哈哈28", "age": 127 }

成功替换



:::  tip

vue 3.5 后 deep的值可为数字。

`{deep:1}`

0相当于不开启，只监听浅层次的整个响应式对象。

1监听第一层，即`{ "name": "哈哈28", "age": 127 }`

以此类推

:::



#### 监听响应式对象的属性
```vue
<script setup>
import { ref, watch } from 'vue'

const newp = ref('')
const oldp = ref('')
const person = ref({name:'小明',age:19})

watch(person.name,(newVal,oldVal)=>{
    newp.value = newVal
    oldp.value = oldVal
})

const i = ref(1)

const change=()=>{
  i.value = i.value+1
  person.value.age = 99 + i.value
  person.value.name = "哈哈"+i.value

}
const replace= ()=>{
  person.value = {name:'大张',age:20}
}


</script>

<template>

  <button @click="change">修改person</button>
  <button @click="replace">替换person</button>
  <hr>
  {{person}}
  <hr>
  new：{{newp}}
  <br>
  old：{{oldp}}

  <hr>
</template>
```
发现并不生效，因为响应式对象的属性不属于响应式的ref或响应式对象，也不是一个函数

那该怎么办呢？

把它变成函数

```vue
<script setup>
import { ref, watch } from 'vue'

const newp = ref('')
const oldp = ref('')
const person = ref({name:'小明',age:19})

watch(
  ()=>person.value.name,
  (newVal,oldVal)=>{
    newp.value = newVal
    oldp.value = oldVal
})

const i = ref(1)

const change=()=>{
  i.value = i.value+1
  person.value.age = 99 + i.value
  person.value.name = "哈哈"+i.value

}
const replace= ()=>{
  person.value = {name:'大张',age:20}
}


</script>

<template>

  <button @click="change">修改person</button>
  <button @click="replace">替换person</button>
  <hr>
  {{person}}
  <hr>
  new：{{newp}}
  <br>
  old：{{oldp}}

  <hr>
</template>
```
### Reactive


```vue
<script setup>
import { reactive, watch } from 'vue'

// 使用 reactive 创建一个响应式对象数组
const state = reactive([
  {
    name: 'xiaoming',
    info: {
      age: 18,
      food: 'apple'
    }
  },
  {
    name: 'zhangsan',
    info: {
      age: 20,
      food: 'apple'
    }
  }
])

// 监听 state 数组中每个对象的 info.age 属性变化
state.forEach((person) => {
  watch(() => person.info.age, (newValue, oldValue) => {
    console.log(`Age changed from ${oldValue} to ${newValue} for ${person.name}`);
  });
});

// 监听 state 数组中每个对象的 info.food 属性变化
state.forEach((person) => {
  watch(() => person.info.food, (newValue, oldValue) => {
    console.log(`Food changed from ${oldValue} to ${newValue} for ${person.name}`);
  });
});
</script>

<template>
  <div>
    <!-- 遍历 state 数组并展示每个对象的信息 -->
    <div v-for="(item, index) in state" :key="index">
      <p>姓名: {{ item.name }}</p>
      <p>年龄: {{ item.info.age }}</p>
      <p>喜欢的食物: {{ item.info.food }}</p>
      <button @click="item.info.age++">Increment age</button>
      <button @click="item.info.food = item.info.food === 'apple' ? 'banana' : 'apple'">Toggle food</button>
    </div>
  </div>
</template>
```

默认监听所有层次

```vue
<script setup>
import { reactive, watch } from 'vue'

// 使用 reactive 创建一个响应式对象数组
const state = reactive([
  {
    name: 'xiaoming',
    info: {
      age: 18,
      food: 'apple'
    }
  },
  {
    name: 'zhangsan',
    info: {
      age: 20,
      food: 'apple'
    }
  }
])

watch(state,()=>{
  //发现所有层次修改都会变化
  console.log("发生了修改")
  console.log(state[0])
  console.log(state[1])
})

</script>

<template>
  <div>
    <!-- 遍历 state 数组并展示每个对象的信息 -->
    <div v-for="(item, index) in state" :key="index">
      <p>姓名: {{ item.name }}</p>
      <p>年龄: {{ item.info.age }}</p>
      <p>喜欢的食物: {{ item.info.food }}</p>
      <button @click="item.name = item.name === 'xiaoming' ? 'lalalala' : 'xiaoming'">change name</button>
      <button @click="item.info.age++">Increment age</button>
      <button @click="item.info.food = item.info.food === 'apple' ? 'banana' : 'apple'">Toggle food</button>
    </div>
  </div>
</template>
```


使用函数表示只监听当前层次，加入deep监听所有层次

```vue
<script setup>
import { reactive, watch } from 'vue'

// 使用 reactive 创建一个响应式对象数组
const state = reactive([
  {
    name: 'xiaoming',
    info: {
      age: 18,
      food: 'apple'
    }
  },
  {
    name: 'zhangsan',
    info: {
      age: 20,
      food: 'apple'
    }
  }
])

watch(()=>state[0].info.age,()=>{
 
  console.log("age修改...")
  console.log(state[0])
  console.log(state[1])
})



watch(()=>state[0].name,()=>{
 
  console.log("name发生了修改")
  console.log(state[0])
  console.log(state[1])
})


watch(()=>state,()=>{
 //使用  deep 监听所有层次
  console.log("全部修改")
  console.log(state[0])
  console.log(state[1])
},{deep:true})

</script>

<template>
  <div>
    <!-- 遍历 state 数组并展示每个对象的信息 -->
    <div v-for="(item, index) in state" :key="index">
      <p>姓名: {{ item.name }}</p>
      <p>年龄: {{ item.info.age }}</p>
      <p>喜欢的食物: {{ item.info.food }}</p>
      <button @click="item.name = item.name === 'xiaoming' ? 'lalalala' : 'xiaoming'">change name</button>
      <button @click="item.info.age++">Increment age</button>
      <button @click="item.info.food = item.info.food === 'apple' ? 'banana' : 'apple'">Toggle food</button>
    </div>
  </div>
</template>
```

::: tip

因为reactive是代理对象，接受的`oldvalue`和`newvalue`其实都是同一个代理对象

所以使用getter 函数监听reactive里面的属性才能获得`oldvalue`和`newvalue`

:::

## 监听上述类型组合的数组

```vue
<script setup>
import { ref, watch } from 'vue'


const question = ref('')
const newq = ref('')
const oldq = ref('')


const newp = ref('')
const oldp = ref('')
const person = ref({name:'小明',age:19})

const food = ref({g:'牛奶',m:'面条',d:'蛋炒饭'})



watch(
  [()=>person.value.name,question,food],
  (newVal,oldVal)=>{
    newp.value = newVal
    oldp.value = oldVal
})



const i = ref(1)

const change=()=>{

  i.value = i.value+1
  person.value.age = 99 + i.value
  person.value.name = "哈哈"+i.value

}
const replace= ()=>{

  person.value = {name:'大张',age:20}
}
const change1 = (str)=>{
  food.value = {g:'牛奶',m:'面条',d:'蛋炒饭'}

  if(str==='G'){
    food.value.g = "豪华早餐"
  }
  if(str==='M'){
    food.value.m =  "豪华午餐"
  }
  if(str==='D'){
    food.value.d =  "豪华晚餐"
  }
}

</script>

<template>
<p>
    <input v-model="question"/>
  </p>
  <p>{{question}}</p>
  <hr>
  new：{{oldp}}
  <br>
  old：{{oldp}}
  <hr>
  <button @click="change">修改person</button>
  <button @click="replace">替换person</button>
  <hr>
  {{person}}
  <hr>
  new：{{newp}}
  <br>
  old：{{oldp}}

  <hr>
  明天吃什么呢？
   <button @click="change1('G')"> 改善早餐</button>
   <button @click="change1('M')"> 改善午餐</button>
   <button @click="change1('D')"> 改善晚餐</button>
  <br>
  明天：{{newp}}<br>
  今天：{{oldp}}
</template>
```








需要注意的点：

1. 不开启deep时，对于响应式对象只会浅层次监听
2. 此时的old、new为这几个元素组成的数组

```json
new：[ "小明", "1", { "g": "牛奶", "m": "面条", "d": "蛋炒饭" } ]
old：[ "小明", "", { "g": "牛奶", "m": "面条", "d": "蛋炒饭" } ]
```

## watchEffet

自动监听回调函数内所有值

```vue
<script setup>
import { ref,watchEffect ,watch} from 'vue'

const selected = ref('A')

const thisSelect = ref()
const thisSelect2 = ref()
const thisSelect3 = ref()
watchEffect(()=>{
  thisSelect.value = selected.value
})

watch(selected,()=>{
thisSelect2.value = selected.value
})
watch(null,()=>{
thisSelect3.value = selected.value
})

const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
</script>

<template>
  <select v-model="selected">
    <option v-for="option in options" :value="option.value">
      {{ option.text }}
    </option>
  </select>

	<div>Selected: {{ selected }}</div>
  选择的是：{{thisSelect}}
  选择的是：{{thisSelect2}}
  选择的是：{{thisSelect3}}
</template>
```

如果是多层数据，出现的是高层次的，那么子层次变化均会变化。比如以下，name，age修改都会触发

```vue
<script setup>
import { reactive, watch,watchEffect } from 'vue'

// 使用 reactive 创建一个响应式对象数组
const state = reactive([
  {
    name: 'xiaoming',
    info: {
      age: 18,
      food: 'apple'
    }
  },
  {
    name: 'zhangsan',
    info: {
      age: 20,
      food: 'apple'
    }
  }
])

watchEffect(()=>{
  console.log("全部修改")
  console.log(state)
})
</script>

<template>
  <div>
    <!-- 遍历 state 数组并展示每个对象的信息 -->
    <div v-for="(item, index) in state" :key="index">
      <p>姓名: {{ item.name }}</p>
      <p>年龄: {{ item.info.age }}</p>
      <p>喜欢的食物: {{ item.info.food }}</p>
      <button @click="item.name = item.name === 'xiaoming' ? 'lalalala' : 'xiaoming'">change name</button>
      <button @click="item.info.age++">Increment age</button>
      <button @click="item.info.food = item.info.food === 'apple' ? 'banana' : 'apple'">Toggle food</button>
    </div>
  </div>
</template>
```

如果是低层次，只有当前层次以及子层级变化才触发。例如name变化才会触发

```vue
watchEffect(()=>{
  console.log("name")
  console.log(state[0].name)
})
```

## 停止监听

监听效果自动绑定到宿主组件实例会随着组件卸载而自动结束

但是如果想要手动结束

接受监听函数并调用即可

```vue
<script setup>
import { ref, watch ,reactive} from 'vue'
const count = ref(0)
const newVal = ref()
const increment = () => {
  count.value++
}
const watchStop = watch(count,(newV)=>{
  newVal.value = newV
})
const stop = ()=>{
  watchStop() //即停止监听
}

</script>

<template>
  <h1>{{count}}</h1>
  <button @click="increment">+1</button>
  <button @click="stop">停止监听</button>
  <h1>新值：{{newVal}}</h1>
</template>
```

甚至可以放在监听函数里

```vue
<script setup>
import { ref, watch ,reactive} from 'vue'
const count = ref(0)
const newVal = ref()
const increment = () => {
  count.value++
}
const watchStop = watch(count,(newV)=>{
  newVal.value = newV
  if(newV>=10){
    watchStop()
  }
})
</script>

<template>
  <h1>{{count}}</h1>
  <button @click="increment">+1</button>

  <h1>新值：{{newVal}}</h1>
</template>
```

特殊情况，异步创建的监听器不会随着组件卸载而销毁

需要手动销毁

```vue
<script setup>
import { watchEffect } from 'vue'

// 它会自动停止
watchEffect(() => {})

// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)
</script>
```
所以，可以选择使用`watchEffect`

```vue
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```









## 清理副作用



使用方法：

::: code-group

```vue[3.5以后]
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // 回调逻辑
  })

  onWatcherCleanup(() => {
    // 终止过期请求
    controller.abort()
  })
})
```

```vue[3.5以前]
//onCleanup 函数还作为第三个参数传递给侦听器回调，以及 watchEffect 作用函数的第一个参数：

watch(id, (newId, oldId, onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})

watchEffect((onCleanup) => {
  // ...
  onCleanup(() => {
    // 清理逻辑
  })
})
```







:::

示例：

```js
import { watch, onWatcherCleanup } from 'vue'

watch(id, (newId) => {
  const controller = new AbortController()

  fetch(`/api/${newId}`, { signal: controller.signal }).then(() => {
    // 回调逻辑
  })

  onWatcherCleanup(() => {
    // 终止过期请求
    controller.abort()
  })
})
```



当id 变化后，执行清理函数，结束请求。

避免过期id请求错误数据

## 配置项


watch 其他配置

### 只监听一次
```vue
watch(
  source,
  (newValue, oldValue) => {
    // 当 `source` 变化时，仅触发一次
  },
  { once: true }
)
```

### 即时回调的侦听器

`watch` 默认是懒执行的：仅当数据源变化时，才会执行回调。但在某些场景中，我们希望在创建侦听器时，立即执行一遍回调。举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。

我们可以通过传入 `immediate: true` 选项来强制侦听器的回调立即执行：

类似onMounted



```js
watch(
  source,
  (newValue, oldValue) => {
    // 立即执行，且当 `source` 改变时再次执行
  },
  { immediate: true }
)
```







### 修改回调的触发时机

默认情况下，侦听器回调会在父组件更新 (如有) 之后、所属组件的 DOM 更新之前被调用。

如果想在侦听器回调中能访问被 Vue 更新之后的所属组件的 DOM。此时回调时机在Dom更新之后、修改`{ flush: 'post' }`

默认为 pre

使用方法



```js
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

watchEffect 还有一种实现方法：

```js
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```

回调时机的显示


```vue
<script setup>
import {ref, reactive, watch,watchEffect } from 'vue'

const count = ref(0);

watch(count, (newValue, oldValue) => {
  console.log(`post：count changed from ${oldValue} to ${newValue}`);
}, { flush: 'post' }); // 使用post策略

watch(count, (newValue, oldValue) => {
  console.log(`pre：count changed from ${oldValue} to ${newValue}`);
}, { flush: 'pre' }); 

watch(count, (newValue, oldValue) => {
  console.log(`默认：count changed from ${oldValue} to ${newValue}`);
}); 
watch(count, (newValue, oldValue) => {
  console.log(`sync：count changed from ${oldValue} to ${newValue}`);
}, { flush: 'sync' }); 


</script>

<template>
  {{count}}
  <button @click="()=>count++">+1</button>
</template>
```

同步触发的侦听器，它会在 Vue 进行任何更新之前触发

```js
watch(count, (newValue, oldValue) => {
  console.log(`sync：count changed from ${oldValue} to ${newValue}`);
}, { flush: 'sync' }); 
```

 watchEffect 另一种方法

```js
import { watchSyncEffect } from 'vue'

watchSyncEffect(() => {
  /* 在响应式数据变化时同步执行 */
})
```


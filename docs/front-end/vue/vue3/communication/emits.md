# **emits-自定义事件**

使用 v-on 定义自定义事件传给子组件

推荐使用 kebab-case 形式来编写监听器

可以使用v-on 事件 的修饰符 ，例如 `.once`

使用实例：

模板中调用，script 标签内调用

带参数，不带参数

::: code-group 

```vue[父组件]
<script setup>
import { ref } from 'vue'
import Comp from './Comp.vue'
const msg = ref('Hello World!')

const hahaemits = ()=>{
  alert('hahahahaha!!!')
}

const hahaemits2 = (str)=>{
  alert(str)
}


</script>

<template>
  <Comp @haha="hahaemits"  @lala = "hahaemits2"/>
    <Comp v-on:haha="hahaemits"  v-on:lala = "hahaemits2"/>
  <h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>
```

```vue[子组件]
<script setup>
const emits = defineEmits(['haha','lala'])

const emitHaha = ()=>{
  emits('haha')
}


const xixi = ()=>{
  emits('lala','这是definEmits带参数')
}


</script>

<template>
  <div>
    <button @click="emitHaha">点击</button>
    <button @click="xixi">带参数</button>
  </div>
  <button @click="$emit('haha')">这是$emit</button>
  <button @click="$emit('lala','参数')">这是为什么呢</button>
</template>
```

:::



选项式的用法

```vue
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  }
}
```

可以解构

```vue
export default {
  emits: ['inFocus', 'submit'],
  setup(props, { emit }) {
    emit('submit')
  }
}
```

自定义事件可以在任意地方调用

```vue
setTimeout(() => {
   emits('haha')
}, "1000");
```
- [ ] TODO

ts

声明事件

事件校验
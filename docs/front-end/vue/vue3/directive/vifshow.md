---

---



# **v-if系列与v-show**

​	关于根据判断条件来选择显示内容的v指令

## v-if系列

`v-if`为真则显示

`v-else` 与 `v-if-else`  依附于 `v-if` 或 `v-if-else` 出现

例子：

<script>
    import Ifelseif from './ifelseif.vue';
    import IFTep from './iftemplate.vue';
    import Show from './show.vue';
</script>


---





<Ifelseif/>



```vue
<template>
  <p>
    this is V-if Demo: 
    <span v-if="isA">A</span>
    <span v-else-if="isB">B</span>
    <span v-else>C</span>
  </p>

  <button @click="toggleA">!isA</button>
  <button @click="toggleB">!isB</button>
  <button @click="toggleC">!isC</button>

  <p :class="{ vifisfalse: !isA }">A: {{ isA }}</p>
  <p :class="{ vifisfalse: !isB }">B: {{ isB }}</p>
  <p :class="{ vifisfalse: !isC }">C: {{ isC }}</p>
</template>

<script setup>
import { ref } from 'vue';

const isA = ref(true);
const isB = ref(true);
const isC = ref(true);

const toggleA = () => { isA.value = !isA.value; };
const toggleB = () => { isB.value = !isB.value; };
const toggleC = () => { isC.value = !isC.value; };

console.log(isA);
</script>

<style scoped>
.vifisfalse {
  color: red;
}
</style>



```
>如果一个v-if想控制多个标签 ，则使用`<template></template>`包裹，在组件内类似React的`<>         </>`
是一个不被渲染的空标签
v-else 和 v-else-if 也可以在 `<template/>` 上使用。

示例：
<IFTep/>

```vue
<script setup>
import { ref } from 'vue'


const isShow = ref(true)
const isShowText = ref(isShow.value?"隐藏":"显示")
const change = ()=>{
    isShow.value = !isShow.value
    isShowText.value = isShow.value?"隐藏":"显示"
}
</script>

<template>
  <button @click="change">{{isShowText}}</button>
  <template v-if="isShow">
	<h1>Hello </h1>
		<p> vue </p>
	</template>

 
</template>
```



## show
<Show/>

```vue

<script setup>

import { ref } from 'vue'

const isShow = ref(true)
const isShowText = ref(isShow.value?"隐藏":"显示")
const change = ()=>{
    isShow.value = !isShow.value
    isShowText.value = isShow.value?"隐藏":"显示"
}

</script>
  
<template>
  <button @click="change">{{isShowText}}</button>
  <p v-show="isShow">hello,world</p>

</template>
```



## 不同

::: tip 

两者都是符合条件才显示出来，取值为any，即数字、字符、boolean均可，隐式转化为 true 或 false
不同之处：
v-show 会被渲染出来，只是设置了css样式 `display: none`
v-if 系列则是不渲染，如果条件为false时，则会进行销毁

:::

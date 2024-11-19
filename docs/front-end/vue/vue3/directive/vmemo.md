# **v-memo**

类似`react`的`memo`

缓存模板的子树。可以在元素和组件上使用。该指令期望一个固定长度的依赖值数组，用于比较缓存。如果数组中的每个值都与上次渲染相同，则将跳过整个子树的更新。

接收的参数是：`any[]`

如果接受的 是 空数组 则表示重新渲染第一次效果同`v-once`

例如：

```vue
<div v-memo="[valueA, valueB]">
  ...
</div>
```

示例：

::: code-group

```vue[app.vue]
<script setup>
import { ref } from 'vue'
import Comp from './Comp.vue'
const msg = ref('Hello World!')
const msg2 = ref('Hello World!')
</script>

<template>

  <input  v-model="msg" />
    <h1>{{msg}}</h1>
  <Comp :message="msg" v-memo="[msg]" ></Comp>

  
  <input v-model="msg2" />
    <h1>{{msg2}}</h1>
  <Comp v-memo="[]" :message="msg2"></Comp>

</template>
```

```vue[comp.vue]
<script setup>
import {watch} from 'vue'
const { message } = defineProps(['message']);

watch(()=>message, (newValue, oldValue) => {
  alert('comp渲染' + newValue);
}
);
</script>

<template>
  <div >
    {{message}}
    <slot />
  </div>
</template>
```

:::


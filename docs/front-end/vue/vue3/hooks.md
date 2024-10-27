这个也就是提取方法到公共地方例如util 进行代码复用

一般以 use 开头命名

有返回值，利用返回值来服用

例如

::: code-group

```vue[App]
<script setup lang="ts">
import { ref } from 'vue'

import { useAdd } from './components/useAdd'

const a = ref(1)
const b = ref(2)
const sum = useAdd(a, b)


</script>

<template>

{{ sum }}
<button @click="a=a+1">a+1</button>

<button @click="b=b+1">b+1</button>

</template>
```

```js[useAdd.js]
import { computed } from 'vue'

export const useAdd = (num1, num2) => {
  return computed(() => num1.value + num2.value)
}
```









:::

此时每当需要使用useAdd时只需要引入且接收返回而不是在写一次方法
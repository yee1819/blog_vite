# v-once

只渲染一次

```vue
<script setup>
import { ref,reactive,computed } from 'vue'

const count1 =ref(0)
const count2 =ref(0)
</script>

<template>
<span v-once>This will never change: {{count1}}</span>

<div v-once>
  <h1>Comment</h1>
  <p>{{count1}}</p>
</div>
<!-- component -->
<MyComponent v-once :comment="count1"></MyComponent>
<!-- `v-for` directive -->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>

<button @click="count1++">count1 ++</button>
<p>{{count2}}</p>
<button @click="count2++">count2 ++</button>
</template>

```




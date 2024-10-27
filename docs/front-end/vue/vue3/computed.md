# computed 


## 基本使用

computed 接收一个函数，返回一个ref

根据所给的属性值进行计算属性

```vue
<script setup>
import { reactive, computed ,ref} from 'vue'

const a = ref(0)
const b = ref(0)
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

const sum = computed(
  ()=>
    a.value+b.value
)
// a computed ref
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})
</script>

<template>
  <p>Has published books:</p>
  <span>{{ publishedBooksMessage }}</span>
  <br>
 a: <input v-model.number="a" /> <br>
   b: <input v-model.number="b" /> <br>
   a+b:<h1>{{sum}}</h1>
</template>
```

<font style="color:#000000;background-color:#FFFFFF;">也可以接受一个对象，重写里面的get方法</font>

```js
const sum = computed({
  get(){
    return a.value+b.value
  }
})
```

明明使用方法也可以实现相同效果，为什么需要这个

例如:

```vue
<script setup lang="ts">
import { reactive, computed ,ref} from 'vue'
const a = ref(0)
const b = ref(0)

const add = (x: number, y: number) => {
  return x + y
}

</script>

<template>
 a: <input v-model.number="a" /> <br>
   b: <input v-model.number="b" /> <br>
   a+b:<h1>{{add(a,b)}}</h1>
</template>
```

因为函数在每次渲染的时候都会执行一次
计算属性值会基于其响应式依赖被缓存，一个计算属性仅会在其响应式依赖更新时才重新计算
相比这下会发现，计算属性可以优化很多的性能

## SET、GET

计算属性依赖于给定的属性生成，默认是只读不可更改的
使用set方法，在修改计算属性值时，把新的修改值传入set函数，并分配给所依赖的属性，修改所依赖的属性，让计算属性值随着依赖值的修改而修改

```vue
<script setup>
import { ref, computed } from 'vue'

const a = ref(0)
const b = ref(0)

// 计算属性，计算 a + b 的值
const sum = computed({
  get() {
    return a.value + b.value
  },
  set(val) {
		console.log(val)
    // 将 val 分配给 a 和 b，可以根据需要调整
		// 用a,b 的更改来变成 sum的更改
    a.value = val
    b.value = 0 
		
		//不要放入 sum 否则循环触发 set 导致set不生效
		//sum.value	= val
  }
})

// 更新 a 的函数
const add = () => {
  a.value += 1
}
</script>

<template>
  <label>
    a: <input v-model.number="a" />
  </label>
  <br />
  <label>
    b: <input v-model.number="b" />
  </label>
  <h1>A + B = {{ sum }}</h1>
  <button @click="add">+1</button>
  <button @click="sum = sum + 1">Increment Sum</button>
</template>
```

::: danger

 不要放入 sum 否则循环触发 set 导致set不生效
 例如 sum.value = val



:::
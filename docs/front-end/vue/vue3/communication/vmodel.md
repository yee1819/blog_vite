# 组件中的v-model

通过v-model进行组件通信

::: code-group

```vue[父]
<script setup>
import Child from './Child.vue'
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
  <Child v-model="msg" />
</template>

```

```vue[子]
<script setup>
const model = defineModel()
</script>

<template>
  <span>My input</span> <input v-model="model">
</template>
```

:::

在vue 3.4之前，是使用props 与Emits进行这样的操作的 

::: code-group

```vue[父]
<script setup>
import Child from './Child.vue'
import { ref } from 'vue'

const msg = ref('Hello World!')
</script>

<template>
  <h1>{{ msg }}</h1>
<Child
  :modelValue="msg"
  @update:modelValue="$event => (msg = $event)"
/>
</template>

```

```vue[子]
<script setup>
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
  />
</template>
```



:::

自定义事件名必须以`update:`开头

defineModel() 简化了这一步骤

配置：

```js
// 使 v-model 必填
const model = defineModel({ required: true })

// 提供一个默认值
const model = defineModel({ default: 0 })
```



## 绑定参数

为设定的defineModel绑定特定的值

::: code-group



```vue[父]
<script setup>
import { ref } from 'vue'
import MyComponent from './MyComponent.vue'
  
const bookTitle = ref('v-model argument example')
</script>

<template>
  <h1>{{ bookTitle }}</h1>
  <MyComponent v-model:title="bookTitle" />
</template>
```

```vue[子]
<script setup>
const title = defineModel('title')
</script>

<template>
  <input type="text" v-model="title" />
</template>
```





:::

如果需要配置项

```js
const title = defineModel('title', { required: true })
```

```vue
<script setup>
defineProps({
  title: {
    required: true
  }
})
defineEmits(['update:title'])
</script>

<template>
  <input
    type="text"
    :value="title"
    @input="$emit('update:title', $event.target.value)"
  />
</template>
```



可以实现多个v-model的绑定



::: code-group

```vue[父]
<script setup>
import { ref } from 'vue'
import UserName from './UserName.vue'

const first = ref('John')
const last = ref('Doe')
</script>

<template>
  <h1>{{ first }} {{ last }}</h1>
  <UserName
    v-model:first-name="first"
    v-model:last-name="last"
  />
</template>
```

```vue[子]
<script setup>
const firstName = defineModel('firstName')
const lastName = defineModel('lastName')
</script>

<template>
  <input type="text" v-model="firstName" />
  <input type="text" v-model="lastName" />
</template>
```



```vue[旧父]
<script setup>
import { ref } from 'vue'
import UserName from './UserName.vue'

const first = ref('John')
const last = ref('Doe')
</script>

<template>
  <h1>{{ first }} {{ last }}</h1>
  <UserName
    :first-name="first"
    :last-name="last"
    @update:firstName="$event => (first = $event)"
    @update:lastName="$event => (last = $event)"
  />
</template>
```



```vue[旧子]
<script setup>
defineProps({
  firstName: String,
  lastName: String
})

defineEmits(['update:firstName', 'update:lastName'])
</script>

<template>
  <input
    type="text"
    :value="firstName"
    @input="$emit('update:firstName', $event.target.value)"
  />
  <input
    type="text"
    :value="lastName"
    @input="$emit('update:lastName', $event.target.value)"
  />
</template>
```





:::





::: tip

这就是组件库的制作方法

:::



## 自定义修饰符

可以使用原先v-model的修饰符

也可以自定义修饰符

::: code-group

```vue[父]
<script setup>
import { ref } from 'vue'
import MyComponent from './MyComponent.vue'
  
const mytext = ref('hello')
const mynum = ref(1)
</script>

<template>
  <h1>{{mytext}}</h1>
  <h1>{{mynum}}</h1>

  <MyComponent v-model:mytext.capitalize="mytext"  v-model:mynum.number="mynum"/>

</template>
```

```vue[子]
<script setup>
import { defineModel } from 'vue'

// 使用 defineModel 来处理 v-model 和修饰符
const [mytext, { capitalize }] = defineModel('mytext',{
  set(value) {
    if (capitalize) {
      return value.toUpperCase()  // 处理 capitalize 修饰符
    }
    return value
  }
})
console.log(capitalize) // { capitalize: true }


const num = defineModel('mynum')  // 处理数字类型的 v-model

</script>

<template>
  <!-- 使用 v-model 来实现双向绑定 -->
  <input type="text" v-model="mytext" />
  <input type="number" v-model="num" />
</template>

```





:::

3.4 版本以前

```vue
<script setup>
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
})

const emit = defineEmits(['update:modelValue'])

function emitValue(e) {
  let value = e.target.value
  if (props.modelModifiers.capitalize) {
    value = value.charAt(0).toUpperCase() + value.slice(1)
  }
  emit('update:modelValue', value)
}
</script>

<template>
  <input type="text" :value="modelValue" @input="emitValue" />
</template>
```

使用参数时

::: code-group

```vue[父]
<UserName
  v-model:first-name.capitalize="first"
  v-model:last-name.uppercase="last"
/>

```



```vue[新版本]
<script setup>
const [firstName, firstNameModifiers] = defineModel('firstName')
const [lastName, lastNameModifiers] = defineModel('lastName')

console.log(firstNameModifiers) // { capitalize: true }
console.log(lastNameModifiers) // { uppercase: true }
</script>
```



```vue[旧]
<script setup>
const props = defineProps({
firstName: String,
lastName: String,
firstNameModifiers: { default: () => ({}) },
lastNameModifiers: { default: () => ({}) }
})
defineEmits(['update:firstName', 'update:lastName'])

console.log(props.firstNameModifiers) // { capitalize: true }
console.log(props.lastNameModifiers) // { uppercase: true }
</script>
```



:::
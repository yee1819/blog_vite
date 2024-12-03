# 依赖注入

 provide()

 inject()

祖宗代给子孙代传递数值

解决了一步步使用Props 透传的烦恼

## Provide (提供)

要为组件后代提供数据，需要使用到 [`provide()`](https://cn.vuejs.org/api/composition-api-dependency-injection.html#provide) 函数：

```vue
<script setup>
import { provide } from 'vue'

provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
</script>
```



```typescript
export declare function provide<T, K = InjectionKey<T> | string | number>(key: K, value: K extends InjectionKey<infer V> ? V : T): void;

export type InjectionKey<T> = symbol & InjectionConstraint<T>;
```



整个 应用使用：

```javascript
import { createApp } from 'vue'

const app = createApp({})

app.provide(/* 注入名 */ 'message', /* 值 */ 'hello!')
```







## Inject (注入)





```typescript
export declare function inject<T>(key: InjectionKey<T> | string): T | undefined;
export declare function inject<T>(key: InjectionKey<T> | string, defaultValue: T, treatDefaultAsFactory?: false): T;
export declare function inject<T>(key: InjectionKey<T> | string, defaultValue: T | (() => T), treatDefaultAsFactory: true): T;	
```

基本使用 ：

```vue
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>
```

::: tip

依赖如果是  ref 响应式，不会为它解包失去响应式

:::

默认值：如果祖宗没有提供依赖，指定默认值以免出现警告

```javascript
// 如果没有祖先组件提供 "message"
// `value` 会是 "这是默认值"
const value = inject('message', '这是默认值')
```

在一些场景中，默认值可能需要通过调用一个函数或初始化一个类来取得。为了避免在用不到默认值的情况下进行不必要的计算或产生副作用，我们可以使用工厂函数来创建默认值：

```javascript
const value = inject('key', () => new ExpensiveClass(), true)
```







## 示例



::: code-group

```vue[app]
<script setup>
import { ref, provide } from 'vue'
import Child from './Child.vue'

// by providing a ref, the GrandChild
// can react to changes happening here.
const message = ref('hello')
provide('message', message)
</script>

<template>
  <input v-model="message">
  <Child />
</template>
```

```vue[Child]
<script setup>
import GrandChild from './GrandChild.vue'
</script>

<template>
  <GrandChild />
</template>
```



```vue[GrandChild]
<script setup>
import { inject } from 'vue'

const message = inject('message')
</script>

<template>
  <p>
    Message to grand child: {{ message }}
  </p>
</template>
```



:::









## 子孙修改祖宗



传递一个修改函数 

::: code-group

```vue[祖宗]
<!-- 在供给方组件内 -->
<script setup>
import { provide, ref } from 'vue'

const location = ref('North Pole')

function updateLocation() {
  location.value = 'South Pole'
}

provide('location', {
  location,
  updateLocation
})
</script>
```



```vue[子孙]
<!-- 在注入方组件 -->
<script setup>
import { inject } from 'vue'

const { location, updateLocation } = inject('location')
</script>

<template>
  <button @click="updateLocation">{{ location }}</button>
</template>
```





:::





## 不允许修改

可以使用`readonly`

```vue
<script setup>
import { ref, provide, readonly } from 'vue'

const count = ref(0)
provide('read-only-count', readonly(count))
</script>
```



## Symbol保证名称独特

大型项目可能有多个依赖，名称可能重复，使用Symbol 解决名称重复问题

```js
// keys.js
export const myInjectionKey = Symbol()

//供给
import { myInjectionKey } from './keys.js'
provide(myInjectionKey, { 
  /* 要提供的数据 */
})

//z
import { myInjectionKey } from './keys.js'
const injected = inject(myInjectionKey)
```


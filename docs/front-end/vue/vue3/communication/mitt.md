# mitt

安装

```bash
npm install mitt
```

mitt实例

```js
export interface Emitter<Events extends Record<EventType, unknown>> {
    all: EventHandlerMap<Events>;
    on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
    on(type: '*', handler: WildcardHandler<Events>): void;
    off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void;
    off(type: '*', handler: WildcardHandler<Events>): void;
    emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;
    emit<Key extends keyof Events>(type: undefined extends Events[Key] ? Key : never): void;
}
```

其中all是一个Map对象拥有方法：

```js
console.log(emitter.all)
emitter.all.clear()
emitter.all.size
emitter.all.forEach(function (v, k) {})
emitter.all.get(Symbol())
emitter.all.has(Symbol())
emitter.all.delete(Symbol())
emitter.all.set(Symbol(), {})
emitter.all.entries()
emitter.all.values()
```





## 基本使用

发布、订阅

使用导出一个mitt实例

```typescript
import mitt from 'mitt'
const emitter = mitt()
export default emitter
```

在要使用 的地方导入

此时只需引入这个emitt实例就可以在任何地方调用


::: code-group

```vue[发布]
<script setup>
import mitter from '@/utils/mitter'
import { ref,onUnmounted } from 'vue'

const haha = ref('hello')
const sub = (haha) => {
    mitter.emit('test', haha)
}

onUnmounted(() => {
  // 组件卸载时记得移除事件
    mitter.off('test')
})
</script>

<template>
    <input type="text" v-model="haha"> </input>
  <button @click="sub(haha)">点击发布</button>
</template>
```

```vue[订阅]
<script setup>
import mitter from '@/utils/mitter'
import {ref} from 'vue'
const str = ref('')
mitter.on('test',(data)=>{
    str.value = data
})

</script>

<template>
    <hr>
    <div>mitt demo</div>
    {{ str }}
    <hr>
</template>
```





:::

发布时绑定事件名，订阅时根据事件名找到对应事件

发布时携带的参数作为订阅时回调函数参数
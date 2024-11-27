插槽 顾名思义

子组件提供了一个入口，提供给父组件插入

## 普通使用

::: code-group


```vue[父]
<script setup>
import { reactive } from 'vue'
import Comp from './Comp.vue'
import { ref } from 'vue';



const count = ref(0)
const change = ()=>{
  count.value = count.value+1
}
</script>

<template>
  <Comp> 
    <h1>{{count}}</h1>
    <button @click="change">+1</button>
   </Comp>

</template>
```

```vue[子]
<script setup>
</script>

<template>
  <div>
    <slot/>
  </div>
</template>
```





:::



子组件使用双标签包含需要插入的信息

通过子组件的 `<v-slot/>`标签作为插槽出口进行插入

插槽的样式由父组件可覆盖控制子组件样式

插槽可以为任意合法模版，例如组件、多个标签、字符串、vue模版....



### 通过Props，实现子组件控制父组件的插槽
> 与之对应，父组件不可以访问子组件内容。可以通过Prop进行状态提升为父组件用于父组件访问，如下
>

---和原来一样，好像多余了

::: code-group

```vue[父]
<script setup>
import { reactive } from 'vue'
import Comp from './Comp.vue'
import { ref } from 'vue';



const count = ref(0)
const change = ()=>{
  count.value = count.value+1
}
</script>

<template>
  <Comp :count="count" :change="change"> 
    <h1>{{count}}</h1>
    <button @click="change">+1</button>
  
  
   </Comp>

</template>
```

```vue[子]
<script setup>
 defineProps(['count','change'])

</script>

<template>
  <div>
    <slot />
  </div>
  <hr>
  {{count}}
  <br>
  <button @click="change">
    +1
  </button>
</template>
```

:::

### 默认内容

v-slot  是 一个双标签，可以包含默认内容

::: code-group

```vue[父]
<script setup>
import { reactive } from 'vue'
import Comp from './Comp.vue'
import { ref } from 'vue';



const count = ref(0)
const change = ()=>{
  count.value = count.value+1
}
</script>

<template>
  <Comp> 
   </Comp>

</template>
```

```vue[子]
<script setup>
</script>

<template>
  <div>
    <slot>没有东西插进来！</slot>
  </div>
</template>
```

:::



## 具名插槽
插槽是有名字的，默认名称为  <font style="color:rgb(33, 53, 71);">default，即现在的父组件的所有没有定义名称的内容，以及子组件的</font>

<font style="color:rgb(33, 53, 71);"></font>

<font style="color:rgb(33, 53, 71);">原来的内容</font>

::: code-group

```vue[父]
<script setup>

import Comp from './Comp.vue'

</script>

<template>
  <Comp> 
    <h1 style="color: black;">{{count}}</h1>
   </Comp>

</template>
```

```vue[子]
<script setup>
</script>

<template>
  <div style="color: red;">
    <slot></slot>
  </div>
</template>
```

:::

使用默认名字

::: code-group

```vue[父]
<script setup>

import Comp from './Comp.vue'

</script>

<template>
  <Comp>
    <!-- <template v-slot:default>  这是插槽命名第一种方式</template>  -->
    <!-- <template #default>  v-slot可以省略为 # </template> -->
    <!-- 除此之外没有命名的内容均为 default -->
   </Comp>

</template>
```

```vue[子]
<script setup>
</script>

<template>
  <div style="color: red;">
    <slot name="default"></slot>
    <hr>
    <slot></slot>
  </div>
</template>
```

:::

> 在父组件，每一个名称的插值只能存在一个，否则报错
>
> 子组件则支持同一种插件插入多个插槽
>
> 即 ↓



```javascript

FancyButton('Click me!')


function FancyButton(slotContent,slotContent) {   //不允许多个入参一致
  return `<button class="fancy-btn">
  ${slotContent}
</button>`
}

function FancyButton(slotContent) {   
  return `<button class="fancy-btn">
  ${slotContent},${slotContent}   //支持多个参数调用
</button>`
}

```

### 多个插槽
各自找到自己的位置

::: code-group

```vue[示例1]
<script setup>

import Comp from './Comp.vue'


</script>

<template>
  <Comp>
    <template #default> 默认默认默认默认</template> 
    <template #footer>  脚部脚部脚部脚部</template> 
    <template #head>头部头部头部头部</template>
   </Comp>

</template>
```

```vue[示例2]
<script setup>

import Comp from './Comp.vue'

</script>

<template>
  <Comp>
    默认默认默认默认
    <template #footer>  脚部脚部脚部脚部</template> 
    <template #head>头部头部头部头部</template>
   </Comp>

</template>
```

:::

上面俩个效果是一样的

```vue
<script setup>
</script>

<template>
  <div style="color: red;">
    <slot name="head">这是头部</slot>
    <hr>
    <slot name="default">这是默认</slot>
    <hr>
    <slot>这是默认</slot>
    <hr>
    <slot name="footer">这是足部</slot>
  </div>
</template>
```



没有使用 #default时随意乱放也会识别为 default

```vue
<script setup>
import Comp from './Comp.vue'
</script>

<template>
  <Comp>
    默认默认默认默认
    <template #footer>  脚部脚部脚部脚部</template> 
    哈哈哈哈
    <template #head>头部头部头部头部</template>
    随便乱放位置
   </Comp>

</template>
```










## 获取插槽
在组合式中，模板通过`$slots`获取插槽，在`<script setup></script>`获取插槽使用`useSlots`api

```vue
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    {{$slots.header}}
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
    {{ss.header}}
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup>
import {useSlots} from 'vue'
const ss = useSlots()
console.log(ss)
</script>
```





##  条件插槽
可以用做判断存在这个插槽

```vue
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    {{$slots.header}}
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
    {{ss.header}}
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
```



## 动态插槽
动态的用变量定义插槽

```vue
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>

  <!-- 缩写为 -->
  <template #[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

示例

::: code-group

```vue[父]
<script setup>
import Card from './Card.vue'
import { ref } from 'vue'

const slotname = ref('footer')
</script>

<template>
  <input type="radio" v-model="slotname" value="header" id="header" />
  <label for="header">Header</label>
  
  <input type="radio" v-model="slotname" value="default" id="default" />
  <label for="default">Default</label>
  
  <input type="radio" v-model="slotname" value="footer" id="footer" />
  <label for="footer">Footer</label>
  
  <Card>
    <template #[slotname]>
      <h1>This is the {{ slotname }}</h1>
    </template>
  </Card>
</template>
```

```vue[子]
<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>
    <div v-if="$slots.default" class="card-content">
      <slot />
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup>

<style>
  .card {
    border: 1px solid black;
    padding: 0;
  }

  .card-header {
    background-color: skyblue;
    padding: 4px;
  }

  .card-content {
    padding: 4px;
  }

  .card-footer {
    background-color: lightgray;
    padding: 4px;
  }

</style>
```

:::



## <font style="color:rgb(33, 53, 71);">defineSlots() </font>
<font style="color:rgb(13, 13, 13);">定义组件的插槽类型</font>

::: code-group

```vue[父]
<template>
  <Child>
    <template #header="{ title }">
      <h1>{{ title }}</h1>
    </template>

    <template #default="{ content }">
      <p>{{ content }}</p>
    </template>

    <template #footer="{ footerText }">
      <p>{{ footerText }}</p>
    </template>
  </Child>
</template>

<script setup>
import Child from './Child.vue'
</script>
```

```vue[子]
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  slots: {
    header: { title: String },
    default: { content: String },
    footer: { footerText: String }
  }
})


</script>


<template>
  <div>
    <header>
      <slot name="header" :title="'Welcome to my page'"></slot>
    </header>

    <main>
      <slot name="default" :content="'This is the main content of the page.'"></slot>
    </main>

    <footer>
      <slot name="footer" :footerText="'Footer information goes here.'"></slot>
    </footer>
  </div>
</template>
```

:::

复杂示例：

::: code-group

```vue[父]
<template>
  <Child>
    <template #header="{ title, subtitle }">
      <h1>{{ title }} - ID: 101</h1>
      <p>{{ subtitle }}</p>
    </template>

    <template #default="{ content, items }">
      <p>{{ content }}</p>
      <!-- 渲染 items 数组 -->
      <ul>
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
      </ul>
    </template>

    <template #footer="{ footerText, date }">
      <p>{{ footerText }} ({{ date.toLocaleDateString() }})</p>
    </template>
  </Child>
</template>

<script setup>
import Child from './Child.vue'
</script>
```

```vue[子]
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  header: {
    type: Object,
    required: false,
    default: () => ({
      title: 'Main Title',
      subtitle: 'Subtitle goes here'
    })
  },
  default: {
    type: Object,
    required: false,
    default: () => ({
      content: 'Some content here',
      items: ['Item 1', 'Item 2', 'Item 3']
    })
  },
  footer: {
    type: Object,
    required: false,
    default: () => ({
      footerText: 'This is the footer text',
      date: new Date()
    })
  }
})
</script>

<template>
  <header>
    <slot name="header" :title="props.header.title" :subtitle="props.header.subtitle"></slot>
  </header>

  <main>
    <slot name="default" :content="props.default.content" :items="props.default.items"></slot>
  </main>

  <footer>
    <slot name="footer" :footerText="props.footer.footerText" :date="props.footer.date"></slot>
  </footer>
</template>
```

:::

## 作用域插槽

父组件访问子组件的内容

子组件通过在`slot`标签传递<font style="color:rgb(33, 53, 71);">attributes给父组件，父组件提供</font>`<font style="color:rgb(33, 53, 71);">v-slot</font>`<font style="color:rgb(33, 53, 71);">来获取</font>

<font style="color:rgb(33, 53, 71);">此时父组件只能在插槽的标签内调用子组件传递的值</font>

::: code-group

```vue[父]
<script setup>
const greetingMessage = 'hello'
</script>

<template>
  <div>
    <slot :text="greetingMessage" :count="1"></slot>
  </div>
</template>
```

```vue[子]
<script setup>
import MyComponent from './MyComponent.vue'
</script>

<template>
  
  <MyComponent v-slot="slotProps">
    {{ slotProps.text }} {{ slotProps.count }}
  </MyComponent>
解构：
  <MyComponent v-slot="{ text, count }">
    {{ text }} {{ count }}
  </MyComponent>
</template>
```

:::

具名插槽

```vue
<MyComponent>
  <template v-slot:name="slotProps">
    {{ headerProps }}
  </template>
  简写：
  <template #header="headerProps">
    {{ headerProps }}
  </template>

  <template #default="defaultProps">
    {{ defaultProps }}
  </template>


</MyComponent>
```

子组件传入指定 name

```vue
<slot name="header" message="hello"></slot>
```
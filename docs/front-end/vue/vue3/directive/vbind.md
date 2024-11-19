# **v-bind**

动态属性

`v-bind:属性名.修饰符=属性值`

省略 `v-bind`:

`:属性名.修饰符=属性值`

用于：

- 绑定属性

  ```vue
  <script setup>
  const style ={
    color:'red',
    padding:'50px'
  }
  const num = 11
  </script>
  
  <template>
    <h1 :style="style">hello</h1>
    <input type="text" :value="num"/>
  </template>
  ```

- 通过对象一次绑定多个属性

  ```vue
  <script setup>
  const types={
    type:"password",
    value:'123456'
  }
  </script>
  
  <template>
    <input v-bind="types" />
  </template>
  ```

  > [!TIP]
  >
  > `v-bind` 对象语法会忽略对象中的函数和特殊属性（如 `class` 和 `style`），并且它不会处理对象属性的动态变化。如果你需要绑定一个对象的属性，并且这些属性可能会变化，你应该像第一个例子那样分别绑定每个属性。
  > 

- 数组

  ```vue
  <script setup>
  import { ref } from 'vue'
  
  const msg = ref('Hello World!')
  const classes = ['aa','bb']
  const activeClass = ref('active')
  const errorClass = ref('text-danger')
  </script>
  
  <template>
    <div :class="classes">{{ msg }}</div>
    <div :class="[activeClass,errorClass]">123456</div>
    <input v-model="msg" />
  
  </template>
  
  <style >
  .aa{
    color: red;
  }
  .bb{
    font-size: 100px;
  }
  .active{
    color: aqua;
  }
  .text-danger{
    font-size: 100px;
  }
  </style>
  ```

- Props

  ```vue
  <script setup lang="ts">
  import { ref } from 'vue'
  import Comp from './Comp.vue'
    
  const msg = ref('Hello World!')
  const age = ref(18)
  const person = ref({name:"小明",gender:1})
    
  </script>
  <template>
    <h1>{{ msg }}</h1>
    <input v-model="msg" />
    
    <Comp :title="msg" :age="age" :person="person"/>
    
  </template>
  ```

---

官方的示例：

```vue
<!-- 绑定 attribute -->
<img v-bind:src="imageSrc" />

<!-- 动态 attribute 名 -->
<button v-bind:[key]="value"></button>

<!-- 缩写 -->
<img :src="imageSrc" />

<!-- 缩写形式的动态 attribute 名 (3.4+)，扩展为 :src="src" -->
<img :src />

<!-- 动态 attribute 名的缩写 -->
<button :[key]="value"></button>

<!-- 内联字符串拼接 -->
<img :src="'/path/to/images/' + fileName" />

<!-- class 绑定 -->
<div :class="{ red: isRed }"></div>
<div :class="[classA, classB]"></div>
<div :class="[classA, { classB: isB, classC: isC }]"></div>

<!-- style 绑定 -->
<div :style="{ fontSize: size + 'px' }"></div>
<div :style="[styleObjectA, styleObjectB]"></div>

<!-- 绑定对象形式的 attribute -->
<div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>

<!-- prop 绑定。“prop” 必须在子组件中已声明。 -->
<MyComponent :prop="someThing" />

<!-- 传递子父组件共有的 prop -->
<MyComponent v-bind="$props" />

<!-- XLink -->
<svg><a :xlink:special="foo"></a></svg>
```

## 示例

### 动态class

::: code-group

```vue
<script setup>
import { ref } from 'vue'

const  isActive =ref(true)
const hasError = ref(true)

</script>

<template>
<div
  class="static"
  :class="{ active: isActive, 'text-danger': hasError }"
>Hello</div>
<button @click="()=>{isActive = !isActive}">
<template v-if="isActive" >销毁</template>
<template v-else>激活</template>

</button>
<button @click="()=>{hasError = !hasError}">
<template v-if="hasError" >取消</template>
<template v-else>警告</template>

</button>
</template>

<style >


.static{
  font-size: 100px;
  color: orange;
}
.active{
  color: red;
  
}
.text-danger{
  background-color: lawngreen;
}
</style>
```



```vue[对象形式]
<script setup>
import { ref,reactive } from 'vue'

const classObject = reactive({
  active: true,
  'text-danger': false
})
</script>

<template>
<div
  class="static"
  :class="classObject"
>Hello</div>
<button @click="()=>{classObject.active = !classObject.active}">
<template v-if="classObject.active" >销毁</template>
<template v-else>激活</template>

</button>
<button @click="()=>{classObject['text-danger'] = !classObject['text-danger']}">
<template v-if="classObject['text-danger']" >取消</template>
<template v-else>警告</template>

</button>
</template>

<style >


.static{
  font-size: 100px;
  color: orange;
}
.active{
  color: red;
  
}
.text-danger{
  background-color: lawngreen;
}
</style>
```

```vue[计算属性]
<script setup>
import { ref,reactive,computed } from 'vue'

const isActive = ref(true)
const error = ref('')

const classObject = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value === 'fatal'
}))
</script>

<template>
<div
  class="static"
    :class="{ active: isActive, 'text-danger': error }"
>Hello</div>
<button @click="()=>{isActive=!isActive;}">
<template v-if="classObject.active" >销毁</template>
<template v-else>激活</template>

</button>
<button @click="()=>{error===''?error='fatal':error='';}">
<template v-if="classObject['text-danger']" >取消</template>
<template v-else>警告</template>

</button>
</template>

<style >


.static{
  font-size: 100px;
  color: orange;
}
.active{
  color: red;
  
}
.text-danger{
  background-color: lawngreen;
}
</style>
```

```vue[数组形式绑定动态class]
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
const classes = ['aa','bb']
const activeClass = ref('active')
const errorClass = ref('text-danger')
</script>

<template>
  <div :class="classes">{{ msg }}</div>
  <div :class="[activeClass,errorClass]">123456</div>
  <input v-model="msg" />

</template>

<style >
.aa{
  color: red;
}
.bb{
  font-size: 100px;
}
.active{
  color: aqua;
}
.text-danger{
  font-size: 100px;
}
</style>
```

```vue[数组+三元运算]
<div :class="[isActive ? activeClass : '', errorClass]"></div>
```

```vue[数组对象]
<div :class="[{ [activeClass]: isActive }, errorClass]"></div>
```



:::



## 修饰符

TODO




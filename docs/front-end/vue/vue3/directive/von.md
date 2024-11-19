# **v-on** 

`v-on:事件名.修饰符=事件`

可以简单写成

` @事件名.修饰符=事件 `

事件处理

可以使用 `@` 代替前面的  `v-on:`

 

俩种函数定义方式与事件两种的定义方式

::: code-group

```vue[基本]
<script setup>
import { ref } from 'vue'

const num = ref(1)
function add(){
  num.value = num.value +1
}
const jian = ()=>{
  num.value = num.value -1
}
</script>

<template>
  {{num}}
  <br>
  <br>

  <hr>
  <button @click="jian">-1</button>
  <button @click="num++">+1</button>
  <button v-on:click="add">+1</button>
</template>
```

```vue[传参]
<script setup >
import { ref } from 'vue'

const num = ref(1)
const lll = ref()
const click = (hello)=>{
  //alert(e.target.tagName)
  alert(hello)
  //alert(e.target)
 // console.log(e.target.value)
}
const hehe = ref("点击查看输入框")

</script>

<template>
  <input v-model="hehe" />
  <button    @click="click('helllll')">{{hehe}}</button>
</template>
```

```vue[js语法]
<script setup >
import { ref } from 'vue'
const num = ref(1)
const lll = ref()
const click = (wuwuw,...hello)=>{
  alert(hello)
  alert(wuwuw)
}
const hehe = ref("点击查看输入框")
</script>

<template>
  <input v-model="hehe" />
    <button @click="num++">+1</button>
  <button    @click="click('helllll','adasdd','dasdffffff','ffsadd')">{{hehe}}</button>
</template>
```

```vue[事件对象为参数]
<script setup>
import { ref } from 'vue'

const num = ref(1)
const lll = ref()
const click = (e)=>{
  //alert(e.target.tagName)
  alert(e.target.value)
  console.log(e.target.value)
}
const hehe = ref("点击查看输入框")

</script>

<template>
  <input v-model="hehe" />
  <button    @click="click">{{hehe}}</button>
</template>
```

```vue[事件参数+普通参数]
<script setup >
import { ref } from 'vue'

const num = ref(1)
const lll = ref()
const click = (e,hello)=>{
  //alert(e.target.tagName)
  alert(hello)
  alert(e.target)
  console.log(e.target.value)
}
const hehe = ref("点击查看输入框")

</script>

<template>
  <input v-model="hehe" />
  <button    @click="click($event,'helllll')">{{hehe}}</button>
</template>
```

```vue[内联]
<script setup >
import { ref } from 'vue'

const num = ref(1)
const hehe = ref("点击查看输入框")
const alert2 = (l,e)=>{
  alert(l)
  console.log(e)
}
</script>

<template>
  {{num}}
  <button @click="num++">+1</button>
  <br>
  <input v-model="hehe" />
  <button @click="(e)=>alert2('eeee',e)">{{hehe}}</button> 
  <!--  <button @click="(event)=>alert2('eeee',event)">{{hehe}}</button>  -->

  <hr>
  <button @click="alert2('qqqq',$event)">按下</button>
</template>
```





:::



## 修饰符

各种触发事件搭配不同修饰符

例如点击事件 左键点击与右键点击 的区别

```vue
<script setup>

import { ref } from 'vue'

const key = ref('看看是哪个键按下')

function keyEventLeft (){
  key.value = "左"
}
function keyEventRight (){
  key.value = "右"
}


</script>
  
<template v-if="isShow">

<button v-on:click.left="keyEventLeft">左键按下</button>
<button v-on:click.right="keyEventRight">右键按下</button>
<br>
<button @click.left="keyEventLeft">左键按下</button>
<button @click.right="keyEventRight">右键按下</button>
<br>
{{key}}

</template>
```

### v-on 事件修饰符

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

```vue
<!-- 单击事件将停止传递 -->
<a @click.stop="doThis"></a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit"></form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat"></a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent></form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">...</div>
```

::: danger

连写的时候需要注意调用顺序

因为相关代码是以相同的顺序生成的。

因此使用 `@click.prevent.self` 会阻止**元素及其子元素的所有点击事件的默认行为**，而 `@click.self.prevent` 则只会阻止对元素本身的点击事件的默认行为。

:::



`.capture`、`.once` 和 `.passive` 修饰符与[原生 `addEventListener` 事件](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#options)相对应：

template

```
<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
```

```vue
<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">...</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis"></a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">...</div>
```

### 按键修饰符



```vue
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />
```

效果等同于

```vue
<script setup>
const change = (event)=>{
    if(event.key =='enter'){
        
    }
}
</script>

<template>
  <!-- 监听按下E键时触发change函数 -->
  <h1 @keyup="change" >
      
    </h1>{{ msg }}</h1>
  <input v-model="msg" />
</template>

```

但是不太一样，不加修饰符监听所有按键事件，对某个选定的事件实现对应逻辑。

加入修饰符以后只监听那个事件。


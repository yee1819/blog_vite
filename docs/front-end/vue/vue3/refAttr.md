# **获取dom元素**

## **基本使用**

标签上的ref属性获取dom元素

注意，渲染时 inputRef 为null，挂载好以后才会绑定



```vue
<script setup>
  
  import {ref,watch} from 'vue'
  const msg = ref('')
  const inputRef = ref() ;
  //输入十八位数字不给输入
   watch(msg, (newVal, old) => {
     if (newVal.length > 18) {
       if (inputRef.value) {
         inputRef.value.blur();
         // inputRef.value.disabled = false; 禁用
         msg.value = old;
       }
     }
     console.log(inputRef);
   });
   

  
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" ref="inputRef" />

</template>
```

vue  3.5 以后

使用 useTemplateRef来分离开属性值与变量名的关系

```vue
<script setup>
  import {ref,watch,useTemplateRef} from 'vue'
  const msg = ref('')
  const input = useTemplateRef('inputRef') ;

   watch(msg, (newVal, old) => {
     if (newVal.length > 18) {
       if (input.value) {
         input.value.blur();
         msg.value = old;
         console.log("old"+old)
console.log("new"+newVal)
       }
     }
     console.log(input);
   });
   

  
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" ref="inputRef" />

</template>
```



## **v-for**

一次性获取多个dom元素

```vue
<script setup>
  import {ref,watch,useTemplateRef} from 'vue'
  const msg = ref('')
  const items = ref([])
  const list = ref([1,2,3,4,5,6,7,8,9,10])
  function alert1  (index){
    alert(`索引是：${index}`)
    console.log(items.value)
    console.log(items.value[value])
  }


  const refs = useTemplateRef('refsList')
  
  function alert2 (index){
    alert(`索引是：${index}`)
    console.log(refs.value[index])
  }




</script>

<template>
<ul >ref
  <li  v-for="(item, index) in list" :key="index" >
    {{ item }}
    <button @click="alert1(index)" ref="items">按钮{{ index }}</button>

  </li>
</ul>
<ul >useTemplateRef
  <li  v-for="(item, index) in list" :key="index" >
    {{ item }}
    <button @click="alert2(index)" ref="refsList">按钮{{ index }}</button>
    
  </li>
</ul>

</template>
```





失败的尝试，有机会再试试：点击后禁用

```vue
<script setup>
import { ref, useTemplateRef, onMounted } from 'vue'

const list = ref([
  1,2,3,4,5,6
])

const itemRefs = useTemplateRef('items')
function clickDisabled(event,index){
  event.disabled =false
  console.log(index)
    // 阻止默认事件和冒泡
  event.preventDefault()
  event.stopPropagation()

  // 禁用对应的按钮
  if (itemRefs.value[index]) {
    itemRefs.value[index].disabled = false
  }
}



onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="(item, index) in list" :key="item" ref="items">
         <button @click="(event) => clickDisabled(event, index)">{{ item }}</button>
    </li>
  </ul>
</template>
```

## **函数模版**

```vue
<script setup>
  import {ref,watch,useTemplateRef} from 'vue'
  const msg = ref('')
  const input = useTemplateRef('inputRef') ;

   watch(msg, (newVal, old) => {
     if (newVal.length > 18) {
       if (input.value) {
         input.value.blur();
         msg.value = old;

       }
     }

   });
   

  
</script>

<template>
  <h1>{{ msg }}</h1>
  <input v-model="msg" ref="inputRef"  />
  <hr/>

  <input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */console.log(el) }">

</template>
```

此时输入上面的input标签触发组件更新，下面的input 就会触发一次:ref="(el) => { console.log(el) }"，这个时候el是标签实例

当绑定的元素被卸载时(例如v-if)，函数也会被调用一次，此时的 el 参数会是 null。

## 组件

获取组件元素

- [ ] TODO


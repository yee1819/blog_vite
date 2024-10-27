



让失去响应式（比如解构）的数据重新获得响应式

```vue
<script setup lang="ts" name="hello">
import { ref,toRef,toRefs } from 'vue'

//  普通类型
const num = ref(10)

//  数组类型
const arr = ref([1,2,3])

//  对象类型
// toRef
const obj = ref({name:'ren', age: 20})

// 对象解构
const {name:nameVal, age:ageVal} = obj.value
//输出ren 20 失去了响应式
console.log("nameVal, ageVal:",nameVal, ageVal)
    
    
//ObjectRefImpl 获得响应式
const nameToRef = toRef(obj.value,'name')
const ageToRef = toRef(obj.value,'age')
console.log("nameToRef, ageToRef:"+nameToRef, ageToRef)




// toRefs
const obj2 = ref({name:'ren', age: 20})

const objCopy = {...obj2.value}
//失去响应式
console.log("objCopy:",objCopy)

//获得响应式
const obj2Refs = toRefs(obj2.value)
console.log("obj2Refs:")
console.log(obj2Refs)
console.log("obj2Refs:name")
console.log(obj2Refs.name.value)

//  解构 refs
    
const {name:nameRefs, age:ageRefs} = toRefs(obj2.value)
//获得响应式
console.log("nameRefs, ageRefs:"+nameRefs, ageRefs)





</script>

<template>

</template>



```





待补充的reactive

```vue
const objreact = reactive({name:'ren', age: 20})
console.log("objreact:",objreact)

const objreactCopy = {...objreact}
console.log("objreactCopy:",objreactCopy)
//失去响应式
const objreactRefs = toRefs(objreact)
console.log("objreactRefs:")
console.log(objreactRefs)
```


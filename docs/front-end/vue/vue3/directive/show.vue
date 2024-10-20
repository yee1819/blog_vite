
<script setup name="Show">

import { ref } from 'vue'

const isShow = ref(true)
const isShowText = ref(isShow.value?"隐藏":"显示")
const change = ()=>{
    isShow.value = !isShow.value
    isShowText.value = isShow.value?"隐藏":"显示"
}

</script>
  
<template>
    <hr>
  <button @click="change">{{isShowText}}</button>
  <p v-show="isShow">hello,world</p>
  <hr>
</template>
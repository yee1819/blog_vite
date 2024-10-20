<script setup name="Text">
import { ref } from 'vue'

const msg = ref("123")
</script>

<template>
  <hr>
  <div v-text="msg"></div>
  输入：<input v-model="msg">
  <br>
  {{msg}}
  <hr>
</template>

<style scoped>
  input{
    border: 1px solid black;
  }

</style>
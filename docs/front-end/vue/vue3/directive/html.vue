<script setup>
import { ref } from 'vue'

const rhtml = "<font color='red'>1234123</font>"
  
</script>

<template>  <hr>
  {{rhtml}}							
  <div v-html="rhtml"></div>  <hr>
</template>
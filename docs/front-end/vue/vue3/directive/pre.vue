<script setup name="Pre">
import { ref } from 'vue'
const meg = ref('dsadasd')
</script>
  
<template >
      <hr>
{{meg}}
<p v-pre>{{msg}}</p>
<hr>
</template>
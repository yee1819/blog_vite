<template>  <hr>
  <p>
    this is V-if Demo: 
    <span v-if="isA">A</span>
    <span v-else-if="isB">B</span>
    <span v-else>C</span>
  </p>

  <button @click="toggleA">!isA</button>
  <button @click="toggleB">!isB</button>
  <button @click="toggleC">!isC</button>

  <p :class="{ vifisfalse: !isA }">A: {{ isA }}</p>
  <p :class="{ vifisfalse: !isB }">B: {{ isB }}</p>
  <p :class="{ vifisfalse: !isC }">C: {{ isC }}</p>  <hr>
</template>

<script setup name="Ifelseif">
import { ref } from 'vue';


const isA = ref(true);
const isB = ref(true);
const isC = ref(true);

const toggleA = () => { isA.value = !isA.value; };
const toggleB = () => { isB.value = !isB.value; };
const toggleC = () => { isC.value = !isC.value; };

console.log(isA);
</script>

<style scoped>
.vifisfalse {
  color: red;
}
</style>

<template>
<ul class="classnameUl">
    <li  class="classnameLi"
      v-for="item in title"
      :class="{ classnameactive: item === selectTitle }"
      @click="selecttt(item)">
      {{ item }}
    </li>
  </ul>

</template>
<script setup>
import { ref } from 'vue';
const title = ["主页", "关于", "归档"];
const selectTitle = ref("主页");
const selecttt = (item) => {
  selectTitle.value = item;
};

</script>

<style  scoped>
.classnameactive{
    color: #ff0000;
    background-color: aquamarine;
}
.classnameUl{
    border: black solid 2px;
    padding: 50px;
    border-radius: 30px;
    list-style: none;
    display: flex;
    /* justify-content: space-around; */
    width: 500px;
    list-style: none;
    display: flex;
    justify-content: space-evenly;
    width: 500px;
    align-content: space-around;
    flex-wrap: nowrap;
    flex-direction: row;
    align-items: flex-end;

}
.classnameLi{
    /* cursor: pointer; */
    border: black solid 2px;
    padding: 20px;
}

</style>
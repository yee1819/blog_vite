<script setup>
import { ref, watch,onMounted } from 'vue'
import { useRouter, useRoute } from 'vitepress'

const router = useRouter()
const route = useRoute()
const BeforeUrl = ref(router.path)
const isNoMain = ref()

onMounted(() => {


  // 监听整个 route 对象
  watch(() => route.path, (newPath, oldPath) => {
    const path = route.path;
    // console.log("watch: "+ path)
    
    isNoMain.value = path==='/main'? false:true;

    BeforeUrl.value = getStringBeforeNSlashes(path);


// 提取第一个斜杠和第二个斜杠之间的字符
    // const result = (secondSlashIndex !== -1) 
    // ? input.substring(firstSlashIndex, secondSlashIndex) 
    // : input.substring(firstSlashIndex); // 如果没有第二个斜杠，提取到字符串末尾

    // console.log(result)

    // BeforeUrl.value = "/"+result;

    })
})
// 监视路由变化

  // function getStringBeforeSecondToLastSlash(str) {
  //   // 找到最后一个 '/' 的位置
  //   const lastSlashIndex = str.lastIndexOf('/');
    
  //   if (lastSlashIndex === -1) {
  //     return '/'; // 如果没有 '/', 返回整个字符串
  //   }
    
  //   // 找到倒数第二个 '/' 的位置
  //   const secondToLastSlashIndex = str.lastIndexOf('/', lastSlashIndex - 1);
    
  //   if (secondToLastSlashIndex === -1) {
  //     return str.substring(0,lastSlashIndex); // 如果没有倒数第二个 '/', 返回整个字符串
  //   }

  //   // 返回倒数第二个 '/' 之前的子字符串
  //   return str.substring(0, secondToLastSlashIndex);
  // }

function getStringBeforeNSlashes(str) {
  let currentIndex = str.length;
  let last = str.lastIndexOf('/')
  let start  = str.indexOf('/')
  // 此时是根目录

  if(last === start){
    return '/main';
  }

  for (let i = 0; i < 1; i++) {
    const slashIndex = str.lastIndexOf('/', currentIndex - 1);
    

    if (slashIndex === -1) {
      return '/main'; // 如果没有更多的 '/', 返回整个字符串
    }

    currentIndex = slashIndex; // 更新当前索引为找到的 '/'
  }

  return str.substring(0, currentIndex); // 返回倒数第 n 个 '/' 之前的子字符串
}



const goBack = () => {
    // console.log("goBack: "+BeforeUrl.value)
  if (BeforeUrl.value) {

    router.go(BeforeUrl.value)
    
  }
}
</script>

<template >
  <!-- 不是main时触发 -->
  <div v-if="isNoMain">
  <hr>
  <button @click="()=>goBack()">返回上一级</button>
  <hr>
  </div>
  <!-- {{ route }} -->

  <!-- {{ router }} -->
</template>
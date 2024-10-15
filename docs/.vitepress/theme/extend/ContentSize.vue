<!-- <script setup>
import { onMounted, ref,nextTick ,watchEffect} from 'vue'
// import { useRouter } from 'vue-router'
import { useRouter } from 'vitepress'
import { useRoute } from 'vitepress'

const wordCount = ref(0)
const router = useRouter()
const route = useRoute()

const calculateWordCount = () => {
    const content = document.querySelector('.vp-doc')
    if (content) {
      // 计算字数，去除空白符
      wordCount.value = content.innerText.trim().split(/\s+/).length
    }
  }

onMounted(() => {
  // 初次加载时计算字数
  calculateWordCount()
  if (router.onAfterRouteChanged) {
    router.onAfterRouteChanged(() => {
      calculateWordCount()
    })
  }else{
    wordCount.value = 1231411341
  }

})

// 监听 <Content /> 组件的更新
// updated(()=>{
//   calculateWordCount()

// })

// onUpdated(() => {

//   calculateWordCount()
// })

// watchEffect(() => {
//   // 获取 <Content /> 渲染后的内容
//   const content = document.querySelector('.vp-doc')
//   if (content) {
//     // 计算字数，去除多余的空白符
//     wordCount.value = content.innerText.trim().split(/\s+/).length
//   }
// })

//   nextTick(() => {
//   // 获取 <Content /> 渲染后的内容
//   const content = document.querySelector('.vp-doc')
//   if (content) {
//     // 计算字数，去除多余的空白符
//     wordCount.value = content.innerText.trim().split(/\s+/).length
//   }
// })

</script>

<template>
  <div>
    <p>字数: {{ wordCount }}</p>
    {{ route.data }}
  </div>
</template>

<style lang="css" scoped>
/* 你的样式 */
</style> -->



<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vitepress'

const wordCount = ref(0)
const router = useRouter()
const route = useRoute()

const calculateWordCount = () => {
  const content = document.querySelector('.vp-doc')
  if (content) {
    // 计算字数，去除空白符
    const text = content.innerText.match(/\S/g);

    wordCount.value = text?text.length:0;
    // 替换多余空白符为一个空格1
    // const cleanedText = text.replace(/\s+/g, ' ');

    // 通过分割计算字数，确保非空字符串时才计算
    // wordCount.value = cleanedText.length > 0 ? cleanedText.split(' ').length : 0;
    // console.log(content.innerText)
    // console.log(wordCount.value)
  }
  
}

onMounted(() => {
  // 初次加载时计算字数
  calculateWordCount()

  // 监听整个 route 对象
  watch(
    () => route.path,
    (newPath, oldPath) => {
      // console.log('路由变化到:', newPath)
      calculateWordCount() // 路由变化后重新计算字数
    }
  )
})
</script>

<template>
  <div>
    <!-- {{ route.path }} -->
    <hr>
    <p>本篇笔记字数: {{ wordCount }}</p>
  </div>
</template> 


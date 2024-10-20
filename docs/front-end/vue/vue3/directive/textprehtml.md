---

---



<script setup>
    import Text from './text.vue';
        import Pre from './pre.vue';
        import Html from './html.vue';
     components: {
   		Text,
            Pre,
            Html
 	 }

</script>






## v-html

> 把字符串识别为html片段
> 注意：不会识别成vue组件，仅为普通html
> 官网：在[单文件组件](https://cn.vuejs.org/guide/scaling-up/sfc.html)，scoped 样式将不会作用于 v-html 里的内容，因为 HTML 内容不会被 Vue 的模板编译器解析。如果你想让 v-html 的内容也支持 scoped CSS，你可以使用 [CSS modules](https://cn.vuejs.org/api/sfc-css-features.html#css-modules) 或使用一个额外的全局 `<style/>`	 元素，手动设置类似 BEM 的作用域策略。

例如：

<Html/>

```vue
<script setup>
import { ref } from 'vue'

const rhtml = "<font color='red'>1234123</font>"
  
</script>

<template>
  {{rhtml}}							
  <div v-html="rhtml"></div>
</template>
```



## v-text

​	效果同模版插值语法<span v-pre>`{{ }}`</span>

<Text/>

```vue
<script setup>
import { ref } from 'vue'

const msg = ref("123")
</script>

<template>
  <div v-text="msg"></div>
 输入： <input v-model="msg">
  <br>
  {{msg}}
</template>
```



## v-pre

与原版`<pre></pre>`作用相似，在vue中不渲染vue组件的语法

<Pre/>

```vue
<script setup>
import { ref } from 'vue'
const meg = ref('dsadasd')
</script>
  
<template >
{{meg}}
<p v-pre>{{msg}}</p>
</template>
```


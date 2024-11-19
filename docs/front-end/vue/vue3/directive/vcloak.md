# **v-cloak**

隐藏未编译好的 DOM 模板。

仅在无构建时使用(即html文件）

当使用直接在 DOM 中书写的模板时，可能会出现一种叫做“未编译模板闪现”的情况：用户可能先看到的是还没编译完成的双大括号标签，直到挂载的组件将它们替换为实际渲染的内容。

`v-cloak` 会保留在所绑定的元素上，直到相关组件实例被挂载后才移除。配合像 `[v-cloak] { display: none }` 这样的 CSS 规则，它可以在组件编译完毕前隐藏原始模板。

```vue
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vue v-cloak 示例</title>
<style>
/* 这个样式会隐藏所有带有 v-cloak 属性的元素 */
[v-cloak] {
  display: none;
}
</style>
</head>
<body>
<div id="app" v-cloak>
  {{ message }}
</div>

<!-- 引入 Vue.js -->
<script src="https://unpkg.com/vue@next"></script>
<script>
// 创建一个新的 Vue 实例
const { createApp } = Vue;
createApp({
  data() {
    return {
      message: 'Hello Vue!'
    };
  }
}).mount('#app');
</script>
</body>
</html>
```


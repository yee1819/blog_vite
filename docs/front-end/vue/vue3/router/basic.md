## 安装

 网址（默认最新版本）： `https://unpkg.com/vue-router@4.4.5/dist/vue-router.global.js `     

指定版本：https://unpkg.com/vue-router@4.0.15/dist/vue-router.global.js 

此时vue-router为全局对象，使用方法 ` VueRouter.createRouter(...) `

项目组件添加

```bash
npm install vue-router@4
```

## 使用

vue-router目前最简便的用法是使用对象形式进行路由定义

在`router.js`配置所需路由参数

```js

import { createMemoryHistory, createRouter } from 'vue-router'    //引入创建路由所需

//引入路由所在地址组件
import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'

const routes = [                //定义路由地址 与对应组件
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]

const router = createRouter({
  history: createMemoryHistory(), //定义路由模式
  routes,
})

export default router
```



`main.js`中，使用use引入并使用  router

::: code-group

```vue
import { createApp } from 'vue'
import router from './router'
import App from './app.vue'

createApp(App)
  .use(router)
  .mount('#app')
```



```vue
import { createApp } from 'vue'
import router from './router'
import App from './app.vue'

const app = createApp(App)
app.use(router)
app.mount('#app')
```



:::

::: tip

这样做使得 router 注册为插件，接下来vue-router帮你做好了以下事情

1[全局注册](https://cn.vuejs.org/guide/components/registration.html#global-registration) RouterView 和 RouterLink 组件。

2添加全局 $router 和 $route 属性。

3启用 useRouter() 和 useRoute() 组合式函数。

4触发路由器解析初始路由。

:::



在入口vue文件 ，且认为是为app.vue ,放入一个<RouterView/>作为路由的入口



```vue
<template>
  <h1>Hello App!</h1>
  <main>
    <RouterView />  <!-- 路由  展示  渲染  -->
  </main>
</template>
```


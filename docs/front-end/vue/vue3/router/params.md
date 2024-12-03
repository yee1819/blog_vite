# 参数



## **路径参数**



使用`params`决定路径参数

在router.js定义 使用`:参数名`决定动态路由

```javascript
import { createMemoryHistory, createRouter } from 'vue-router'    //引入创建路由所需

//引入路由所在地址组件
import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'
import App from './app.vue'
import Post from './Post.vue'


const routes = [               //定义路由地址 与对应组件
  {path:'/', component: App},
  { path: '/home', component: HomeView },
  { path: '/about', component: AboutView },
  { path: '/post/:id', component: Post },
]

const router = createRouter({
  history: createMemoryHistory(), //定义路由模式
  routes,
})

export default router
```



参数跳转 与 获取

::: code-group

```vue[字符串]
<script setup>
import { computed,ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const id = ref()



const toPost = (id)=>{
  router.push("/post/"+id)
}
</script>

<template>
  <h2>AboutView</h2>
  <strong>Current route path:</strong> {{ $route.fullPath }}
   <hr/>
   <input v-model="id"/>
   <button @click="toPost(id)">Post</button>
  <RouterLink :to="`/post/${id}`">点击跳转</RouterLink>
</template>
```



```vue[对象]
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  }
})
//route.path

const goto = (search)=>{
  router.push(search)
  
  router.push({
    name: 'NotFound',
    // 保留当前路径并删除第一个字符，以避免目标 URL 以 `//` 开头。
    //params: { pathMatch: this.$route.path.substring(1).split('/') },
    params: { pathMatch: route.path.substring(1).split('/') },
    // 保留现有的查询和 hash 值，如果有的话
    query: route.query,
    hash: route.hash,
    })
}
</script>

<template>
  <h2>AboutView</h2>
  <label>
    Search: <input v-model.trim="search" maxlength="20">
  </label>
  <button @click="goto(search)">跳转</button>
  {{$router.params}}
</template>
```



````vue[template]
```vue
<script setup>

</script>

<template>
  <div>
    这是post{{$route.params.id}}
  </div>
</template>
```
````



:::

注意此时，因为组件是相同的，发生复用，不会重复渲染，不会触发生命周期。

此时刷新数据可以通过`watch`监听路由



```vue
<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

watch(() => route.params.id, (newId, oldId) => {
  // 对路由变化做出响应...
})
</script>
```



TODO  路由守卫？

#### 获取参数




::: code-group

```vue[组合式]
<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const parms = route.params.id  //如果有params为id的话
</script>

<template>
  <div>
    这是post{{$route.params.id}}
  </div>
</template>
```



```vue[选项式]
<script>
export default {
  data() {
    return {
      params: null, // 初始化 params
    };
  },
  created() {
    // 在组件创建时获取路由参数
    this.params = this.$route.params.username;
  },
};
</script>

<template>
  <div>This is User {{ params }}</div>
  <div>This is User {{ $route.params.username }}</div>
</template>
```

:::



## get 参数

`query`定义get参数

表单传递参数get的方式时，网址?参数名=参数&....的形式



::: code-group

```vue[字符串拼接]
<script>
export default {
  data() {
    return {
      usePath: '', // 定义 usePath 作为组件的数据属性
      id:'123'
    };
  },
  methods: {
    goToAbout() {
      this.$router.push('/about');
    },
  },
};
</script>

<template>
  <h2>HomeView</h2>
  <button @click="goToAbout">Go to About</button>
  <input v-model="usePath" />
<RouterLink :to="`/${id}?usePath=${usePath}`">点击跳转</RouterLink>
</template>
```



```vue[对象1]
<script>
export default {
  data() {
    return {
      usePath: '', // 定义 usePath 作为组件的数据属性
      id:'123'
    };
  },
  methods: {
    goToAbout() {
      this.$router.push('/about');
    },
  },
};
</script>

<template>
  <h2>HomeView</h2>
  <button @click="goToAbout">Go to About</button>
  <input v-model="usePath" />
<RouterLink :to="{ path: usePath ,  query: { username: 'erina',pp:id ,ss:''},params:{id:id} }">点击跳转</RouterLink>
</template>
```

```vue[对象2]
<script setup>
import { computed,ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = computed({
  get() {
    return route.query.search ?? ''
  },
  set(search) {
    router.replace({ query: { search } })
  }
})
//route.path

const goto = (search)=>{
  //router.push(search)
  
  router.push({
    name: 'id',
    query: route.query,
    params:{id:search}
    })
}
const go = (gonum)=>{
  router.go(gonum);
}
const gonum = ref(0);

</script>

<template>
  <h2>AboutView</h2>
  <label>
    Search: <input v-model.trim="search" maxlength="20">
  </label>
  <button @click="goto(search)">跳转</button>

  <br/>
  go:<input v-model.number="gonum"/>
  <button @click="go(gonum)">返回</button>
</template>
```

:::

#### 获取参数


```vue[组合式]
<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()
const uid = route.query.uid 


</script>

<template>
  <div>This is uid {{ uid }}</div>
  <div>This is uid {{ $route.query.uid }}</div>
</template>
```



```vue[选项式]
<script>
export default {
  data() {
    return {
      uid: null, // 初始化 params
    };
  },
  created() {
    // 在组件创建时获取路由参数
    this.uid = this.$route.query.uid;
  },
};
</script>

<template>
  <div>This is uid {{ uid }}</div>
  <div>This is uid {{ $route.query.uid }}</div>
</template>	
```

:::


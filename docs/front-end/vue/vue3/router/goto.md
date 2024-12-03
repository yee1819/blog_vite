# 跳转界面



## 编程式导航

vue2 中使用



```vue
<script>

export default {
  methods: {
    goToAbout2() {
      this.$router.push('/about1')
    },
  },
}
</script>
```

vue3 中没有this，所以使用 useRoute、useRouter 

useRoute  、useRouter  是一个响应式对象，如果要监听他们的变化，应该监听属性，例如route.path

且` <template/> `可以用$router

```vue


<script setup> 
import {useRoute,useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()

function back(){
  router.back();
}
function goToAbout(){
  router.push('/about')
}

</script>

<template>
  <h2>HomeView</h2>
  <button @click="$router.push('/about')">Go to About</button>
<hr/>
  <button @click="goToAbout">Go to About</button>
  
</template>

```

### **push**

加入一个路径到history

类似栈，每次push路径就是添加路径到栈里

push取值可为  字符串、route对象

```vue
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

### **go**

路径前进或退后

正数往前，负数往后，0不变化

如果数字过大或过小导致到达尽头则在路径的尽头结束

```vue
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



### **replace**

取代路径，视觉效果上类似push切换路径，但是不是添加到history中

区别：

多次push后，使用go(-1)可以一步步退回

多次replace 后，使用go(-1)不会退回，因为是取代

取值可为  字符串、route对象



```vue
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
  
  router.replace({
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











## 声明式导航







a标签类似

```vue
<template>
  <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>
  <nav>
    <RouterLink to="/">main</RouterLink>
    <RouterLink to="/home">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
  </nav>
  
</template>
```

更多样例：

::: code-group

```vue[模板字符串]
<script>
export default {
  data() {
    return {
      usePath: '', // 定义 usePath 作为组件的数据属性
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
  <RouterLink :to="`./${usePath}`">点击跳转</RouterLink>
</template>
```

```vue[对象]
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

<RouterLink :to="{ path: usePath ,  query: { username: 'erina' },params:{id:id} }">点击跳转</RouterLink>

//name 而非 path
<router-link :to="{ name: 'profile', params: { username: 'erina' } }">  User profile</router-link>

</template>
```



:::

### **active-class**

激活

```vue
<router-link to="/home" active-class="active">Home</router-link>
<router-link to="/about" active-class="active">About</router-link>
```

激活后自动添加class







### replace

```vue
<router-link :to="{ name: 'profile', params: { username: 'erina' } }" replace>
  User profile
</router-link>
```







### to

string | object

....






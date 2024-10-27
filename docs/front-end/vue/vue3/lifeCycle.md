# **生命周期**

生命周期是一个组件经历创建、挂载、使用、销毁的不同时期

只要是事物都有生命周期。
人的生命周期：

- 怀孕时期=>

- 出生=>

- 成长（每年年龄+1 / 上学、工作、结婚...）=>

- 死亡

vue 中组件大致拥有以下几种生命周期

创建=>挂载=>更新=>销毁（卸载）

每个生命周期vue都适配了前后两个钩子，进入这个生命周期前后就会自动调用

就比如人的出生前要去医院产房生产，
出生后人要取名字、打疫苗、买奶粉尿布....

每年生日时也许有生日蛋糕过生日

上学前要去办理入学手续

工作前要面试

死亡后也许火葬，也许土葬、也许要分割财产...

## **vue3**

vue3中的setup语法糖只支持，挂载、更新、卸载三个生命周期六个钩子。
钩子函数参数为回调函数
生命周期函数可为多个，均会执行
先引入才可使用

```vue
<script setup>
import {ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue'

const msg = ref()
//挂载
onBeforeMount(()=>{
console.log("挂载前...")
})

onBeforeMount(()=>{
  console.log("挂载前2...")
})

onMounted(()=>{
  console.log("挂载后...")
})

//更新
onBeforeUpdate(()=>{
  console.log("更新前...")
})
  
onBeforeUpdate(()=>{
  console.log("更新前2...")
})


onUpdated(()=>{
  console.log("更新后...")
})


//卸载
onBeforeUnmount(()=>{
  console.log("卸载前...")
})


onUnmounted(()=>{
  console.log("卸载前...")
})


</script>

<template>
  <input v-model="msg" />
  <h1>{{msg}}</h1>
</template>
```



不使用setup语法糖时



```vue
<script >
import {ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue'

export default{
  setup(){
    const msg = ref()
    //挂载
    onBeforeMount(()=>{
    console.log("挂载前...")
    })

    onBeforeMount(()=>{
      console.log("挂载前2...")
    })

    onMounted(()=>{
      console.log("挂载后...")
    })

    //更新
    onBeforeUpdate(()=>{
      console.log("更新前...")
    })
    onBeforeUpdate(()=>{
      console.log("更新前2..."+msg.value)
    })


    onUpdated(()=>{
      console.log("更新后...")
    })


    //卸载
    onBeforeUnmount(()=>{
      console.log("卸载前...")
    })


    onUnmounted(()=>{
      console.log("卸载前...")
    })
    return{
      msg
    }
  },
    
}

</script>

<template>
  <input v-model="msg" />
  <h1>{{msg}}</h1>
</template>
```

::: tip

经过v-if **不渲染也是一种卸载**

:::

## **vue2 / 选项式**

不需要引入即可使用，不能在setup中使用
可为多个，但不建议
组合式和选项式混用时，组合式调用时机在选项式前

```vue
<script >
export default{    
  setup(){
    const msg = ref()
    //挂载
    onBeforeMount(()=>{
      console.log("组合式挂载前...")
    })

    onBeforeMount(()=>{
      console.log("组合式挂载前2...")
    })

    onMounted(()=>{
      console.log("组合式挂载后...")
    })

    //更新
    onBeforeUpdate(()=>{
      console.log("组合式更新前...")
    })
    onBeforeUpdate(()=>{
      console.log("组合式更新前2..."+msg.value)
    })


    onUpdated(()=>{
      console.log("组合式更新后...")
    })


    //卸载
    onBeforeUnmount(()=>{
      console.log("组合式卸载前...")
    })


    onUnmounted(()=>{
      console.log("组合式卸载后...")
    })
    return{
      msg
    }
  },
  
  created(){ 
     console.log("选项式创建后...")
  },
  created(){ 
     console.log("选项式创建后122...")
  },
  beforeCreate(){
     console.log("选项式创建前...")
  },
  beforeMount(){
    console.log("选项式挂载前...")
  },
  mounted(){
    console.log("选项式挂载后...")
  },
  beforeUpdate(){
     console.log("选项式更新前...")
  },
  updated(){
     console.log("选项式更新后...")
  },
  beforeUnmount(){
    console.log("选项式销毁前...")
  },
  unmounted(){ 
    console.log("选项式销毁后...")
  }

    
}

</script>

<template>
  <input v-model="msg" />
  <h1>{{msg}}</h1>
</template>
```



::: tip

此外，还有一些生命周期,例如缓存树中的插入与移除Dom时的钩子函数、调试钩子（响应式依赖触发组件更新、组件渲染追踪到响应式依赖时）、组件在服务器上被渲染时调用、**后代组件传递错误后调用**，详细看[vue官方介绍生命周期](https://cn.vuejs.org/api/composition-api-lifecycle.html#onerrorcaptured)



:::





## **应用**

最常使用的应该是：
- onMounted 挂载完成钩子
用于异步获取初始化页面数据

- onUpdated 更新后钩子
用于更新页面数据

例如：

::: code-group 
```vue[axios获取数据]

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // 导入 Axios

const msg = ref([]);

onMounted(() => {
  const url = "http://geek.itheima.net/v1_0/channels"; // 确保 URL 是正确的
  async function getList() {
    try {
      const response = await axios.get(url); // 使用 Axios 发送 GET 请求
      console.log(response.data); // 打印响应数据
      msg.value = response.data; // 将响应数据赋值给 msg
    } catch (error) {
      console.error('Failed to fetch data:', error); // 错误处理
    }
  }

  getList(); // 调用函数以获取数据
});
</script>

<template>
  <div>
    <ul>
      <li v-for="(item, index) in msg" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>
```



```vue[fetch获取数据]
<script setup>
import { ref, onMounted } from 'vue'
const msg = ref([])

onMounted(() => {
  const url = "http://geek.itheima.net/v1_0/channels" // 确保URL是正确的
  async function getList() {
    try {
      const res = await fetch(url, {
        method: 'GET', // 确保请求方法是正确的
        headers: {
          'Content-Type': 'application/json' // 如果需要，添加必要的请求头
        }
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const resJson = await res.json()
      msg.value = resJson // 确保API返回的数据结构与msg.value匹配
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }
  }
  getList() // 调用函数以获取数据
})
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
  </div>
</template>
```

:::

 挂载完成时自动调用。
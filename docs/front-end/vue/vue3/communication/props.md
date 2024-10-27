父子通信

[Vue SFC Playground (vuejs.org)](https://play.vuejs.org/#eNqdVk+P20QU/yqDheSsyK4VAdJishGwqgQc2qqtxAFz8DqT2BvbY2bGm0WWJYSQ6AEoCA7QG6hI9FT11j/b9ss0m976FfrmzTieuJt2tcpq43nvN+/v7z2ncj4tip2jkjq+MxQRTwpJBJVlMQryJCsYl6QinE5ITSacZcQFqLtS7bOsMPIdTx2UJVu9zyz1Puuq55Z23lVmxWDN9sAAIpYLSTIxJXsqsp77OU1TRr5iPB2/4241gHBKATDYbc5CwLECqT/4qC8TmaTUd+el+rh1kA89nT3kDQdJsyINJYUTIcN4MKoq9FjXQw9OKFUxgRzESoonlCd5UUpytJ2xMU33AgcAgUM8VK4uEoggpaB98ezv07/uLZ/+uvjvyfL2j88ffL+4cxfwEChoIXyH+HEMj0LA48h2FPMRIdvb2+rBGIZ6X8wyGt5nreF1u/O3WvW12ctldkB5zx3sQiccYnnAAnRMYykG57M92LWtmUKoVgw9q1tO35ECGj5JpjuHguVA6woL70QAh57zK4VMgBCB4xPUKF0IBJp/iTLJS9pv5FFMo9kZ8kNxrGSBc5VTQfkRDZyVToZ8SqVWX7p+mR7D80oJnChTQL9BeY0KlpYqRg37rMzHELaFw2i/wDFJ8ukNcelY0lw0SalAFbJGfODA0KhKbUq9Dff9nQ/wXpDXUMVmms/YC/qjp6rgrFCDNaaTJKdX1an3tYsNdfsu9A3+x7H7DYwlDtbmKUPrpAcuIZIP3yNb/vAAyFJV76KPGuICKoIIvqvKklVVHBvtODlCW/AoUibN0A09LX+dKs1OapO0157OSRWC5TSXfSLZNToRa6vwY2WWHuMNwIdlit/2vR7WGgP2yao2xCoOdgrz7yFsq2mPrnGlB6Qfx+B6z0RhkOBfATlc5lAXg0Qd4lGvqFAr6JuWXFu75w9+Wf75v+6Hb8ppVgE8FSPsMlCoMt1X60+vpI1A3cPNyBsqbERiAhuAVqdNS62GYjvxJXImZckaRU190ZlPrksOg2TmS70hiF5jRhLH/pWDQxpJfayBy+cr5OLewxf3/1k8+Xdxcuvlye2qQn91/fLkZ/CCEvjWGansbKafO29DZPN+PBeTL8bgPMygMi66crE0htPrxTQnOH9XdGuriPptmXA6XluoelWZ0nfur3XCvj8JU9E1AJ2C60ammZ9RGbOxUHIQzma9LeMghIUoe4ETh/AJHGhqe6mdR4XW+EmZR2p9gpM4XlnxvNbS4o+b+q+xpuZ3kvCs60W7aadWWdSeLzCnZnHC+7JDt4Y7q5F6nVb4I2mdWS3AYt1BKSVk/kmUJtEM3sCzGbyByfKHh4ufHp/e/H3oaYC+3gWr7AB+euu35Z1HFtSe3foVaemvhA==)只有父子普通通信+对象数组通信，

props 有好几种使用方式

setup 语法糖下的defineProps、选项式、对象声明类型的，对象声明类型props的选项式



::: code-group

```vue[主]
<script setup lang="ts">
import { ref } from 'vue'
import Comp from './Comp.vue'
import CoCo from './CoCo.vue'
import Cow from './Cow.vue'
import Comp1 from './Comp1.vue'
const msg = ref('Hello World!')
const age = ref(18)
const person = ref({name:"小明",gender:1})
</script>

<template>
  
  <h1>{{ msg }}</h1>

  <input v-model="msg" />
  <Comp :title="msg" age="18" :person="person"/>
  <hr>  ---<hr>
  <CoCo  title="这是美好的一天" age="18" :person="person"></CoCo>
  <hr> ---<hr>
  <Cow title="这是美好的一天" :age="Number('18')" :person="person"/>
 <hr> ---<hr>
 <Comp1 title="这是美好的一天" :age=18 :person="person"></Comp1>
</template>

```



```vue[defineProps]
<script setup>



const props = defineProps(['title','age','person'])
const aa = 18
//解构
const {age} =  defineProps(['title','age','person'])

//或者 只定义  这一行  声明 props
defineProps(['title','age','person'])
</script>

<template>
  setup (vue 3.5+ ):<br> 
  {{$props}}
  <br>
 {{props}}
 <br/>
{{person}}
<br/>
解构的age ：{{age}} 
  


</template>

```

```vue[类型声明defineProps]
<script setup>
  

 const props = defineProps({
    title: String,
    age: Number,
    person:Object,
    })
/**
 * 
 可以只定义这个，与字符串相同
 defineProps({
    title: String,
    age: Number,
    person:Object,
    })

 */

</script>

<template>
  <div>
    defineProps形式：{{title}}，age：{{age}}<br>
    {{$props}}
    <p>{{person}}</p>
    <p>{{props}}</p>
  </div>
</template>

```

```vue[选项式]
<script>
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  props: ['title', 'age','person'],
  setup(props) {
    const { title } = toRefs(props);
    return { title,props };
  },
});
</script>

<template>
  <div>
    不用setup :

    <p>Props: {{ props }}</p>
    <p>Props: {{ $props }}</p>
    <p>Title: {{ title }}</p>
    <p>person:{{person}}</p>
  </div>
</template>
```

```vue[声明类型选项式]
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Comp1',
  props: {
    title: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: false,
    },
    person:{}
  },methods:{
   kk(){
    alert("hahah")
   }
  },
  setup(){

    function hhhh(){
    //  alert("哈哈哈")
    confirm("hahah")
    }
    return {hhhh}
  }
});
</script>

<template>
  <div>
    组合式：
    {{ title }}

    {{ age }}
  </div>
  <p>{{person}}</p>
  <button @click="kk"> 点击我</button>
  <button @click="hhhh">提示</button>
</template>
```



:::
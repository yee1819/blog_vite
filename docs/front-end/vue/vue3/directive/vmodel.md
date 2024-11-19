# **v-model** 

只能用于`input`、`textarea` 、`select`、``components`
标签以内，否则报错。用于数据绑定

![image](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202411200304292.webp)

可指定输入的类型

## **不同type的`<input/>`**

### **text**

```vue
<script setup>
import { ref } from 'vue'

const msg = ref('Hello Wor12312312ld!')

</script>

<template>
<input type="text" v-model="msg"/>
<h1 >{{ msg }}</h1>

</template>
```

### radio

```vue
<script setup>
import { ref } from 'vue'

const msg = ref('年龄是多少？')
const sex_type= ref('性别是什么？') 
const picked = ref()
</script>

<template>
  <h1 >年龄是多少？</h1>
<input type="radio" name="age" value="18" v-model="msg"/>18
<input type="radio" name="age" value="19" v-model="msg"/>19
<input type="radio" name="age" value="20" v-model="msg"/>20
<input type="radio" name="age" value="21" v-model="msg"/>21
<h1 >{{ msg }}</h1>
<hr/>
<h1>性别是什么？</h1>
<input type="radio" name="sex" value="男" v-model="sex_type"/>男
<input type="radio" name="sex" value="女" v-model="sex_type"/>女
<h1 >{{ sex_type }}</h1>
<hr/>
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>
</template>
```

### checkbox

```vue
<script setup>
import { ref } from 'vue'

const hoppy = ref([])
const hoppys = ['跳舞','跑步','跳绳','羽毛球','篮球','足球']
const checked = ref(true)
</script>

<template>
  爱好有什么？
  <br/>
<div v-for="(item, index) in hoppys" :key="index">
  <input type="checkbox" v-model="hoppy" :value="item"/> {{item}}
</div>

  <input type="checkbox" v-model="hoppy"  value="跑步" />跑步！
  <input type="checkbox" v-model="hoppy"  value="跳绳" />跳绳！
  <input type="checkbox" v-model="hoppy"  value="羽毛球" />羽毛球！
  <input type="checkbox" v-model="hoppy"  value="篮球" />篮球！
  <input type="checkbox" v-model="hoppy"  value="足球" />足球！
<h1>{{hoppy}}</h1>
<hr/>
  多选 boolean 类型
	<input type="checkbox" id="checkbox" v-model="checked" />
	<label for="checked">{{ checked }}</label>
</template>
```

### Select 

```vue
<script setup>
import { ref } from 'vue'

const hoppy = ref([])

const citys = ref(['上海','北京','重庆','成都','广州','深圳','香港','杭州'])
const city = ref()
const selected = ref()
</script>

<template>
  你来自哪里？<input v-model="city" />{{city}}<hr/>
  请选择：<select v-model="city">
    <option disabled value="">请选择城市</option>
    <option v-for="(item, index) in citys" :key="index" :value="item+'1'">
      {{ item }}
    </option>
  </select>
  <hr/>
  你想去哪里旅行？
  <select v-model="city" multiple>
    <option disabled value="">请选择目的地</option>
    <option v-for="(item, index) in citys" :key="index" :value="item">
      {{ item }}
    </option>
  </select>


<div>Selected: {{ selected }}</div>

<select v-model="selected">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>
</template>

```



### **value 属性**

可以使用`:value` 进行数据绑定

```vue
<script setup>
import { ref } from 'vue'

const  picked = ref()
const  toggle = ref()
const selected = ref()
  const ss = "hhelloo"
</script>

<template>
  
 <!-- `picked` 在被选择时是字符串 "a" -->
<input type="radio" v-model="picked" value="a" />{{picked}}
<input type="radio" v-model="picked" :value="ss" />{{picked}}
  
<!-- `toggle` 只会为 true 或 false -->
<input type="checkbox" v-model="toggle" />{{toggle}}

<!-- `selected` 在第一项被选中时为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>{{selected}}
<select v-model="selected">
  <option :value="ss">ABC</option>
</select>{{selected}}
</template>

```

对于复选框：有`true-value`和`false-value`

```vue
<script setup>
import { ref } from 'vue'

const  toggle = ref()
const  toggle2 = ref()
const dian = "取消点击"
const weidian = "我要点击"

</script>

<template>

<input type="checkbox" v-model="toggle"  true-value="hhhh"
  false-value="这是没点击" />{{toggle}}
  <input type="checkbox" v-model="toggle2"  :true-value="dian"
  :false-value="weidian" />{{toggle2}}

</template>

```

## 修饰符

### `.lazy`

默认情况下，`v-model` 会在每次 `input` 事件后更新数据 ([IME 拼字阶段的状态](https://cn.vuejs.org/guide/essentials/forms.html#vmodel-ime-tip)例外)。你可以添加 `lazy` 修饰符来改为在每次 `change` 事件后更新数据：(即，`input`事件变为``change`事件，`input`标签失去焦点或按下回车时才会数据更新。

```vue
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />
```

相当于

```vue
<script setup>
import { ref } from 'vue'

const msg = ref('Hello World!')
const msg2 = ref('Hello World!')

const localInputValue = ref('Hello World!') // 用于存储当前输入框的值

// 处理输入事件，更新 localInputValue
const onInput = (event) => {
  localInputValue.value = event.target.value
}

// 处理 change 事件，更新 msg
const onChange = () => {
  msg.value = localInputValue.value
}
</script>

<template>
  <h1>{{ msg }}</h1>
 <input :value="localInputValue" @input="onInput" @change="onChange" />
  <h1>{{ msg2 }}</h1>
  <input v-model.lazy="msg2" />

</template>

```

### `.number`

如果你想让用户输入自动转换为数字，你可以在` v-model` 后添加 `.number `修饰符来管理输入

```vue
<input v-model.number="age" />
```

如果该值无法被 `parseFloat()` 处理，那么将返回原始值。
如果输入不是数字则无法输入

> `number` 修饰符会在输入框有 `type="number" `时自动启用。



### `.trim`

如果你想要默认自动去除用户输入内容中两端的空格，你可以在 `v-model` 后添加 `.trim `修饰符：

```vue
<input v-model.trim="msg" />
```



::: wraning

修饰符可连写

```vue
  <input v-model.number.lazy.trim="msg2" />
```



:::



## 组件中使用 `v-model`

- [ ] TODO


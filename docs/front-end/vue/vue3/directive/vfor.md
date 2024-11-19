# v-for

循环渲染相同类型的标签但数据不同

形式：

::: code-group

```vue[in]
<script setup >
import { ref } from 'vue'

const num = ref(1)
const list = [1,2,3,4,5,6,7,8,9,10]
</script>

<template>
  <ul>
    <li v-for=" item in list" key="item">{{item}}</li>
     <li v-for=" (item,index) in list" key="index">{{item}}</li>
  </ul>
</template>
```

```vue[of]
<script setup >
import { ref } from 'vue'

const num = ref(1)
const list = [1,2,3,4,5,6,7,8,9,10]
</script>

<template>
  <ul>
    <li v-for=" item of list" key="item">{{item}}</li>
     <li v-for=" (item,index) of list" key="index">{{item}}</li>
  </ul>
</template>
```



:::

## 不同情况下使用

- 值
    ```vue
    <span v-for="n in 10">{{ n }}</span>
    ```

- 数组

  可以从list获得索引`index`
  
  ```vue
  <script setup >
  import { ref } from 'vue'
  
  const num = ref(1)
  const list = [1,2,3,4,5,6,7,8,9,10]
  </script>
  
  <template>
    <ul>
      <li v-for=" item in list" key="item">{{item}}</li>
       <li v-for=" (item,index) in list" key="index">{{item}}</li>
    </ul>
  </template>
  ```
  
- 对象

  对于对象可以使用`key`、`value`  获取对象信息

  ```vue
  <script setup>
  import { reactive } from 'vue'
  
  const myObject = reactive({
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
  },{
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
  })
  </script>
  
  <template>
    <ul>
      <li v-for="(value, key, index) in myObject">
        {{ index }}. {{ key }}: {{ value }}
      </li>
    </ul>
  </template>
  ```

- 对象数组嵌套

  ::: code-group

  ```vue[示例1]
  <script setup>
  import { reactive } from 'vue'
  
  const myObject = reactive([{
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
  },{
    title: 'How to do lists in React',
    author: 'Yee',
    publishedAt: '2024-14-56'
  }])
  </script>
  
  <template>
    <ul>
  		<li v-for="(v,k,i) of myObject">
  			<span>{{i}}:{{k}}:{{v}}</span>
  			<ul>
  					<li v-for="(value, key, index) in v">
  						{{ index }}. {{ key }}: {{ value }}
  					</li>
  			</ul>
      </li>
    </ul>
  	<hr>
  		<hr>
  	  <ul>
  		<li v-for="(v,k,i) of myObject">
  			<span>{{k}}-{{i}}-{{v}}</span>
  			<ul>
  					<li v-for="(value, key, index) in v">
  						{{ index }}. {{ key }}: {{ value }}
  					</li>
  			</ul>
      </li>
    </ul>
  </template>
  ```

    ```vue[示例2]
    <script setup >
    import { ref } from 'vue'
  
    const num = ref(1)
    const list = [
      { name:'xiaoming',id:112312 },
      { name:'张三',id:123 },
      { name:'李四',id:1561 }
    ]
    </script>
  
    <template>
      <ul>
        <li v-for=" (item,index) in list">
          <!-- {{item.name}}+id：{{index}} -->
            <ul >
              <li v-for="(i,key,index) of item">
                 {{index}} --- {{i}}---{{key}}----
              </li>
            </ul>
        </li>
      </ul>
    </template>
    ```
  ```vue[示例3]
  <script setup >
  import { ref } from 'vue'
  
  const num = ref(1)
  const list = [{name:'xiaoming',id:112312},{name:'张三',id:123},{name:'李四',id:1561}]
  </script>
  
  <template>
    <ul>
      <li v-for=" (item,index) in list" key="item.index">{{item.name}}+id：{{item.id}}++{{index}}</li>
    </ul>
  </template>
  ```



> `:key`作为一个`v-for`特殊的属性，作为排序，标识唯一属性的作用，最好添加

::: tip

组件中使用`v-for` 不会传入` v-for`  `:key` 进入props

```vue
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>
```



:::





### TODO



- [ ] 数组变化


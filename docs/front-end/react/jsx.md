# Jsx/Tsx

Jsx ：JavaScript and Xml

JavaScript 的扩展

允许在Js中写入Html代码

Tsx：TypeScript and Xml ，Jsx 的 扩展，增加了类型声明。

## 要求

::: danger

- 只返回一个根元素，需要标签包裹，标签必须闭合----jax原理被转化为js对象，js只允许返回对对象
- `<></>`也可以
- 使用`{}`可以嵌入Js代码
- class 属性需命名为className ----jax原理被转化为js对象，class是保留字
- `{{插入对象}}`单大括号之间可以插入对象（再带一个{}
- html标签中属性的值、html变量可通过`{}`来插入

:::





::: code-group

```javascript[jsx插值{}]
export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = 'Gregorio Y. Zara';
  return (
    <img
      className="avatar"
      src={avatar}
      alt={description}
    />
  );
}
```



```javascript[插入html中]
export default function TodoList() {
  const name = 'Gregorio Y. Zara';
  return (
    <h1>{name}'s To Do List</h1>
  );
}
```

```javascript[插入api/表达式]
const today = new Date();

function formatDate(date) {
  return new Intl.DateTimeFormat(
    'zh-CN',
    { weekday: 'long' }
  ).format(date);
}

export default function TodoList() {
  return (
    <h1>To Do List for {formatDate(today)}</h1>
  );
}

```

```javascript[插入对象]
export default function TodoList() {
  return (
    <ul style={
  	  {
    	  backgroundColor: 'black',
    	  color: 'pink'
   	 }
    }>
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}

```

```javascript[插入对象也可以使用模板字符串]
export default function TodoList() {
  const uiStyle = {
    	  backgroundColor: 'black',
    	  color: 'pink'
   	 };
  const ss = "abc";
  return (
   <ul style={uiStyle} className={`${ss} aa bb`}>
    此时 ul的class 为 abc  aa  bb  三个
      <li>Improve the videophone</li>
      <li>Prepare aeronautics lectures</li>
      <li>Work on the alcohol-fuelled engine</li>
    </ul>
  );
}
```

```javascript[显示对象/转化json]
const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  },
  info:{
    className:"avatar",
    src:"https://i.imgur.com/7vQD0fPs.jpg",
    alt:"Gregorio Y. Zara"
  }
};
export default function TodoList() {
  return (
	<>
      {JSON.stringify(person)}
    </>
  );
}


```



:::





::: warning 警告

如果属性是a-b形式需要写成驼峰命名

```
<ul style={{ border-radius: 14px;}}>
```
改为
```
<ul style={{ borderRadius: 14px; }}>
```

:::
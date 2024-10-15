

在react中响应事件中修改值是不会改变已经渲染的组建的，也就是不会更新的 ，只有当页面重新渲染时才会更新数据，使用`useState`重新渲染组件

例如原来我们认为的写法，点击事件让count 发生改变，但是这种写法并不会生效，因为没有让react组件进行重新渲染

```javascript{3,6}
export default function StateDemo() {

    let count = 0;

    const handleClick = () => {
        count = count + 1;
    }

    return (<>
        <p>count:{count}</p>
        <button onClick={handleClick}>click</button>
    </>);

}
```

使用`useState`可以刷新界面

```javascript{1,5,8}
import { useState } from "react";

export default function StateDemo() {

    const [count, setCount] = useState(0);

    const handleClick = () => {
        setCount(count + 1);
    }

    return (<>
        <h1>state</h1>
        <p>count:{count}</p>
        <button onClick={handleClick}>click</button>
    </>);

}
```

其中变量`XXX`更新通过的`setXXX`来实现，从`useState`函数中解构获取，并在参数输入初始值

> [!danger] 注意
>
> useState 是 **替换** 并非 改变

所以 对象、数组 这类数据需要**重新创建**

::: code-group

```javascript{7,11,14,15,19,23,27,29}[操作数组]
import { useState } from "react";

export default function StateDemo() {

    const [count, setCount] = useState(0);

    const [arr,setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

    const handleClick = () => {
        
        // setArr(arr.map(item => item + 1));
        // or

        // arr.push(11)
        // let newArr = [...arr];   //缺少这一步会不超过，因为不是替换数组
        // setArr(newArr);
        // or

        // let newArr2 = arr.concat(12);
        // setArr(newArr2);
        // or

        // let newArr3 = arr.splice(5);
        // setArr(newArr3);

        // or
        setArr([...arr, 11]);
        
	//只要是替换数组 而不是修改原来素组均可
	
        console.log(arr)
    }
    return (<>
        <p>arr:{arr}</p>
        <button onClick={handleClick}>click</button>
    </>);
}
```

```javascript{5,8}[对象替换]
import { useState } from "react";
		//与数组一样，替换才会生效，修改不x
export default function StateDemo() {

    const [info, setInfo]   = useState({ name: '张三', age: 18 });

    const handleClick = () => {
        setInfo({...info, age:20,name: '李四' });
    }

    return (<>
        <p>info:{JSON.stringify(info)}</p>
        <button onClick={handleClick}>click</button>
    </>);

}
```



:::

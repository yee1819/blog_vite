# UseRef

可以获得原始Dom的Hook.

简单例子:

```javascript{1,5,27}
import { useRef } from 'react';

export default function () {
    // const inputRef = useRef(null);
    const inputRef = useRef<HTMLInputElement | null>(null); // 创建一个 ref

    const handleFocus = () => {
        if (inputRef.current) {
            inputRef.current.focus(); // 给输入框聚焦
            inputRef.current.style.color = 'red'; // 给输入框设置样式
            inputRef.current.value = 'hello,react'; // 给输入框设置值
        }
    };
    
    function clear() {
        if (!inputRef.current) return;

        inputRef.current?.focus();
        inputRef.current.value = '';
        inputRef.current.style.color = 'black';
        inputRef.current.blur();// 失去焦点
    }

    return (
        <>
            <h1>useRef</h1>
            <input type="text" ref={inputRef} />
            <button onClick={handleFocus}>聚焦输入框</button>
            <button onClick={clear}>清空</button>
        </>
    );
}
```

::: tip 步骤

1. 引入`import { useRef } from 'react';`

2. 创建这个`useRef`，即`const inputRef = useRef(null);`

   ts下害怕出现null值，告诉它这就是null：` const inputRef = useRef<HTMLInputElement | null>(null);`

3. 绑定Dom元素`  <input type="text" ref={inputRef} />`

4. 使用：例如： ` inputRef.current.focus(); // 给输入框聚焦`，其中`inputRef.current`是Dom元素

:::



::: danger 注意 

在 React 中，一个 ref 只能绑定到一个 DOM 元素上。这意味着你不能将同一个 ref 同时绑定到多个元素。

解释：

单一绑定：每个 ref 对象只能关联一个 DOM 元素或类组件实例。如果你尝试将同一个 ref 绑定到多个元素，只有最后绑定的元素会被引用。

多个 ref 的使用：如果你需要引用多个元素，你可以为每个元素创建一个单独的 ref，或者使用数组或对象来存储多个 ref。 

```javascript
<Son changeString={changeString} inputRef={inputRef}/>

<Son changeString={changeString} inputRef={inputRef}>123</Son>
```



  是不会双向绑定的

:::
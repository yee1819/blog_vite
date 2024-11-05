memo是缓存组件，根据传递的props是否改变而决定是否渲染子组件。

但此时props传递的是一个函数，当子组件调用这个传递过来的函数时 ，会导致子组件的重新渲染。

参数为俩个。回调函数、依赖项。

依赖项改变时才会再次执行。

```typescript
import React, { useState, useCallback } from 'react';

const ChildComponent = React.memo(({ onClick }) => {
  console.log('子组件重新渲染');

  return (
    <div>
      <button onClick={onClick}>点击我</button>

    </div>
  );
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

const handleClick = ()=>{
    setCount(count+1)
}

  return (
    <div>
      <h1>父组件</h1>
      <ChildComponent onClick={handleClick}  />
      <p>父组件的计数: {count}</p>
      <button onClick={() => setOtherState(prev => prev + 1)}>
        更新其他状态
      </button>
      <p>其他状态: {otherState}</p>
    </div>
  );
};

export default ParentComponent;
```

此时每次父组件重新渲染时，函数是引用类型进行改变，导致子组件重新渲染。

```typescript
import React, { useState, useCallback } from 'react';

const ChildComponent = React.memo(({ onClick }) => {
  console.log('子组件重新渲染');

  return (
    <div>
      <button onClick={onClick}>点击我</button>

    </div>
  );
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

 // 使用 useCallback 来缓存 onClick 函数
  const handleClick = useCallback(() => {
    setCount(prevCount => prevCount + 1);
  }, []); // 依赖数组为空，表示 handleClick 不会在每次渲染时被重新创建

  return (
    <div>
      <h1>父组件</h1>
      <ChildComponent onClick={handleClick}  />
      <p>父组件的计数: {count}</p>
      <button onClick={() => setOtherState(prev => prev + 1)}>
        更新其他状态
      </button>
      <p>其他状态: {otherState}</p>
    </div>
  );
};

export default ParentComponent;
```

此时，函数被缓存，无论按下哪个按钮，只要props不改变，此时的子组件都不会重新渲染，直到依赖值发生改变
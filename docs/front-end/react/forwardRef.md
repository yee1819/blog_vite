props可以传递父组件的dom节点到子组件

那么forwardRef 做到了 子组件的dom暴露给父组件

具体用法：

::: code-group


```typescript[父]
import React, { useRef } from 'react';
import MyInput from './son';

export default function Form() {
  const ref = useRef<HTMLInputElement | null>(null);

  function handleClick() {
    if (ref.current) {
      ref.current.focus();
    }
  }

  return (
    <form>
      <MyInput label="Enter your name:" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

```typescript[子]
import React, { forwardRef, InputHTMLAttributes } from 'react';

interface MyInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const MyInput = forwardRef<HTMLInputElement, MyInputProps>(function MyInput(props, ref) {
  const { label, ...otherProps } = props;
  return (
    <label>
      {label}
      <input {...otherProps} ref={ref} />
    </label>
  );
});

export default MyInput;
```







:::

## 自定义的 ref 句柄

TODO
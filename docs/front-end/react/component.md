---
title: 组件
---



组件，在React中有两种定义方式（类组件、函数组件），因为Hooks的出现以及便捷，函数式组件大受欢迎

在React中，一个函数、一个类只要返回一个JSX、TSX标签就都是一个组件

由各种各样的组件组合为一个完整的界面	







## 函数组件

示例

```javascript
import React, { useState } from 'react';

function MyFunctionComponent() {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment}>Increment</button>
        </div>
    );
}

export default MyFunctionComponent;
```







## 类组件



```javascript
import React, { Component } from 'react';

class MyClassComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    increment = () => {
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return (
            <div>
                <h1>Count: {this.state.count}</h1>
                <button onClick={this.increment}>Increment</button>
            </div>
        );
    }
}

export default MyClassComponent;
```



## 比较

可以看出函数式的简洁性高得多
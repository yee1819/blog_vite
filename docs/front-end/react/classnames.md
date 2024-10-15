









经常遇到动态样式例如激活之类的需求（切换菜单栏、目录等等

传统方法 

```javascript{18,24}
import { useState} from "react";
import classNames from "classnames";

function classname (){

    const [isActive,setIsActive] =useState(true) ;
    const handleClick = (name:string) => {
        // setIsActive(!isActive);  
        setName(name)
    }
    const title = ["主页","关于",'归档']

    const [name,setName]  = useState("主页");
    return (<>
        <h1>classname</h1>
        <ul>
            {title.map((item,index)=>{
                return <li key={index} className={name==item? "active" : ""} onClick={()=>handleClick(item)}>{item}</li>
            })}
        </ul>
        <hr></hr>
        <ul>
            {title.map((item,index)=>{
                return <li key={index} className={`test ${name==item&& 'active'}`} onClick={()=>handleClick(item)}>{item}</li>
            })}
        </ul>
        <hr></hr>
    </>);
}
export default classname;
```

<script setup>
    import Classnamess from './classname.vue'
</script>

效果如下：

<Classnamess/>

我们发现这样做的话十分麻烦，在样式多了的时候，通过拼接容易出错

这时候有一个工具可以通过对象的形式来实现

与vue的`:class`相似的语法可以无痛学习



```bash
npm install classnames	
```

使用样例:

```javascript{19,2}
import { useState} from "react";
import classNames from "classnames";

function classname (){


    const [isActive,setIsActive] =useState(true) ;

    const handleClick = (name:string) => {
        // setIsActive(!isActive);  
        setName(name)
    }
    const title = ["主页","关于",'归档']

    const [name,setName]  = useState("主页");
    return (<>
        <ul>
            {title.map((item,index)=>{
                return <li key={index} className={classNames('test',{'active':name==item})} onClick={()=>handleClick(item)}>{item}</li>
            })}
        </ul>
    </>);
}
export default classname;
```

>[!Tip] 详细
>
>className={classNames("固定的class 用字符串放置",{"动态的class":展示条件,.....})}

>  更多样例详见[JedWatson/classnames: A simple javascript utility for conditionally joining classNames together (github.com)](https://github.com/JedWatson/classnames)

# Lua脚本

Lua语言是一个脚本语言

语法简单，c语言编写,设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。

特性：

- **轻量级**: 它用标准C语言编写并以源代码形式开放，编译后仅仅一百余K，可以很方便的嵌入别的程序里。
- **可扩展**: Lua提供了非常易于使用的扩展接口和机制：由宿主语言(通常是C或C++)提供这些功能，Lua可以使用它们，就像是本来就内置的功能一样。
- 其它特性:
  - 支持面向过程(procedure-oriented)编程和函数式编程(functional programming)；
  - 自动内存管理；只提供了一种通用类型的表（table），用它可以实现数组，哈希表，集合，对象；
  - 语言内置模式匹配；闭包(closure)；函数也可以看做一个值；提供多线程（协同进程，并非操作系统所支持的线程）支持；
  - 通过闭包和table可以很方便地支持面向对象编程所需要的一些关键机制，比如数据抽象，虚函数，继承和重载等。

> Windows安装地址[Releases · rjpcomputing/luaforwindows (github.com)](https://github.com/rjpcomputing/luaforwindows/releases)

## 语法

### 注释

连着俩个使用`-`开头可以注释

```lua
-- 这是注释
local a  = 123
```

多行注释：以`--`开头，和两个`[]`包裹的内容为多行注释内容

```lua
--[[
print("这是多行注释")
print("这是第二行")
--]]
```



例子:

```lua
--print("Hello World!")

print("这是注释演示")

--[[
print("这是多行注释")
print("这是第二行")
--]]
```

输出的结果是

```lua
这是注释演示
```

![image-20240706144038775](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407061440877.webp)

### 数据类型

lua的基本类型如下

| 数据类型 | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| nil      | 即空、null，变量默认为nil，命名为nil即为删除变量。表示一个无效值（在条件表达式中相当于false）。 |
| boolean  | 包含两个值：false和true。                                    |
| number   | 表示双精度类型的实浮点数，不止双精度，所有数字其他语言的int、float均为number |
| string   | 字符串由一对双引号或单引号来表示，也可以使用`[[]]`包围表示多行的字符串 |
| function | 由 C 或 Lua 编写的函数，是的函数也是变量                     |
| userdata | 表示任意存储在变量中的C数据结构                              |
| thread   | 表示执行的独立线路，用于执行协同程序                         |
| table    | Lua 中的表（table）其实是一个"关联数组"（associative arrays），数组的索引可以是数字、字符串或表类型。在 Lua 里，table 的创建是通过"构造表达式"来完成，最简单构造表达式是{}，用来创建一个空表。 |

::: tip 提示

值得一提，lua是弱类型语言，定义时不需要指定数据类型

:::

::: code-group

```lua
print(type("Hello world"))      --> string
print(type(10.4*3))             --> number
print(type(print))              --> function
print(type(type))               --> function
print(type(true))               --> boolean
print(type(nil))                --> nil
print(type(type(X)))            --> string
```

```bash[输出]
string
number
function
function
boolean
nil
string
```

:::

#### 布尔值

只有true和false

lua只认为基本类型中的false和nil为false，洽谈全是true，包括数字0

::: code-group

```lua
print(type(true))
print(type(false))
print(type(nil))
 
if false or nil then
    print("one true")
else
    print("false and nil in false")
end

if 0 then
    print(" 0 is true")
else
    print(" 0 is false")
end
```

```sh[输出]
boolean
boolean
nil
false and nil in false
 0 is true
```

:::

#### 字符串

::: code-group

```lua
a = "string"

b = "STRING"

c = [[
    wo ke yi 
    duo
    hang 
    shu
    ru 
]]

print(a)

print(b)

print(c)
print("a type:",type(a))


print("b type:",type(b))


print("c type:",type(c))

html = [[
<html>
<head></head>
<body>
    <a href="http://kiko2568.top/">Kirari</a>
</body>
</html>
]]
print(html)
```

```bash[输出]
string
STRING
    wo ke yi
    duo
    hang
    shu
    ru

a type: string
b type: string
c type: string

<html>
<head></head>
<body>
    <a href="http://kiko2568.top/">Kirari</a>
</body>
</html>
```



:::

特别的lua会把字符串的number相加转化为number、其中字符串拼接是`..`

::: code-group 

```lua
print("2" + 6)
print("2" + "6")
print("2 + 6")
print("-2e2" * "6")
print("a" .. 'b')
print(157 .. 428)
print("a",'b')
print(157 , 428)
```

```bash[输出]
8
8
2 + 6
-1200
ab
157428
a       b
157     428
```



:::

计算string长度在字符串前加上`#`

::: code-group

```lua
print(#"hello,world")
a=[[
    <html>
    <head></head>
    <body>
        <a href="http://kiko2568.top/">Kirari</a>
    </body>
    </html>
    ]]
print(#a)
```

```sh[输出]
14
118
```



:::





#### Number

::: code-group

```lua
print(type(2))
print(type(2.2))
print(type(0.2))
print(type(2e+1))
print(type(0.2e-1))
print(type(7.8263692594256e-06))
```

```bash[输出]
number
number
number
number
number
number
```



:::





#### Table

类似哈希数组，索引由数字或字符串组成

数字索引以 1 开始，不同与大部分编程语言

空值为nil

::: code-group 

```lua
table = {1,"gfg","dsa"}
print(table[1])
print(table[2])

t = {}
print(t[100])

a={}
a["key"] = "value"
key = 10
a[key] = 22
a[key] = a[key] + 11
for k, v in pairs(a) do
    print(k .. " : " .. v)
end

local tbl = {"apple", "pear", "orange", "grape"}
for key, val in pairs(tbl) do
    print(key..":"..val)
end
```

```sh[输出]
1
gfg
nil
key : value
10 : 33
1:apple
2:pear
3:orange
4:grape
```

:::

使用`.`也可以获取值

```lua
table = {"key1","key2","key3","key4"}
table2 = {"value1","value2","value3","value4"}

t={}
for i in pairs(table) do
   -- print(table.i)
    t[table[i]]=table2[i]
end

print(t.key1)--输出value1
```



#### 函数 function

在lua里，函数可作为变量交换赋值

使用function作为函数开始的标志，后面跟着函数名与变量。使用end为结束标志

::: code-group

```lua
function printf(string)
    print("string"..string)
end

printf("hahahahhhhh")

function factorial1(n)
    if n == 0 then
        return 1
    else
        return n * factorial1(n - 1)
    end
end
print(factorial1(5))
factorial2 = factorial1
print(factorial2(5))
```

```sh[输出]
stringhahahahhhhh
120
120
```

:::

function 可以以匿名函数（anonymous function）的方式通过参数传递:

::: code-group

```lua
function testFun(tab,fun)
    for k ,v in pairs(tab) do
            print(fun(k,v));
    end
end


tab={key1="val1",key2="val2"};
testFun(tab,
function(key,val)--匿名函数
    return key.."="..val;
end
);
```

```sh[输出]
key1=val1
key2=val2
```



:::



#### thread（线程）

在 Lua 里，最主要的线程是协同程序（coroutine）。它跟线程（thread）差不多，拥有自己独立的栈、局部变量和指令指针，可以跟其他协同程序共享全局变量和其他大部分东西。

线程跟协程的区别：线程可以同时多个运行，而协程任意时刻只能运行一个，并且处于运行状态的协程只有被挂起（suspend）时才会暂停。

------

#### userdata（自定义类型）

userdata 是一种用户自定义数据，用于表示一种由应用程序或 C/C++ 语言库所创建的类型，可以将任意 C/C++ 的任意数据类型的数据（通常是 struct 和 指针）存储到 Lua 变量中调用。





### 变量

默认为全局变量，无论是在函数里、语句块里。

只有加上`local` 的标识为局部变量

`local a = 123`

支持类似python的多变量赋值

::: code-group

```lua
a , b = 100,200
print("a:"..a,"b:"..b)

a,b = b,a
print("a:"..a,"b:"..b)


a1 , a2 , a3 = 10 , 20
print("a1:"..a1,"a2:"..a2,"a3:",a3) 

b1,b2 = 10,20,30
print("b1:"..b1,"b2:"..b2)


function func(a,b)
    a,b=b,a
    return a,b
end

a,b = func(99,100)

print("a:"..a,"b:"..b)


```

```sh[结果]
a:100   b:200
a:200   b:100
a1:10   a2:20   a3:     nil
b1:10   b2:20
a:100   b:99
```



:::



### 分支

#### 基本使用

```lua
if(布尔表达式)
then  -- 开始
   --[ 在布尔表达式为 true 时执行的语句 --]
end  --结束

```

#### if...else

```lua
if(布尔表达式)
then
   --[ 布尔表达式为 true 时执行该语句块 --]
else
   --[ 布尔表达式为 false 时执行该语句块 --]
end

```

#### if...elseif...else 语句

```lua
if( 布尔表达式 1)
then
   --[ 在布尔表达式 1 为 true 时执行该语句块 --]

elseif( 布尔表达式 2)
then
   --[ 在布尔表达式 2 为 true 时执行该语句块 --]

elseif( 布尔表达式 3)
then
   --[ 在布尔表达式 3 为 true 时执行该语句块 --]
else 
   --[ 如果以上布尔表达式都不为 true 则执行该语句块 --]
end

```

#### if嵌套

```lua
if( 布尔表达式 1)
then
   --[ 布尔表达式 1 为 true 时执行该语句块 --]
   if(布尔表达式 2)
   then
      --[ 布尔表达式 2 为 true 时执行该语句块 --]
   end
end

```



### 循环

#### while 循环

```lua
while( true ) --布尔表达式
do
   print("循环将永远执行下去")
end
```

#### for循环

数值循环

```lua
for var=exp1,exp2,exp3 do  
    <执行体>  
end  
```

执行完所有值，类似python的

```python
for i in range(10):

# or

a=[1,5,9,56,3]
for i in a:
```



例子：

```lua
for i=1,f(x) do
    print(i)
end
 
for i=10,1,-1 do
    print(i)
end

#!/usr/local/bin/lua  
function f(x)  
    print("function")  
    return x*2   
end  
for i=1,f(5) do print(i)  
end
```



#### 泛型for循环

泛型 for 循环通过一个迭代器函数来遍历所有值，类似 java 中的 foreach 语句。

::: code-group

```lua
a = {"one", "two", "three"}
for i, v in ipairs(a) do
    print(i, v)
end 


days = {"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"}  
for i,v in ipairs(days)
do  
    print(v)
end
```

```sh[输出]
1       one
2       two
3       three
Sunday
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday

```



:::



#### repeat...until 循环

不同于wile和for，当处于false的时候循环，且判断时机为结束一次循环后

```lua
repeat
   statements
until( condition )

```

例子：

:::code-group

```lua
--[ 变量定义 --]
a = 10
--[ 执行循环 --]
repeat
   print("a的值为:", a)
   a = a + 1
until( a > 15 )
```

```sh[结果]
a的值为:    10
a的值为:    11
a的值为:    12
a的值为:    13
a的值为:    14
a的值为:    15
```

:::



::: tip 提示 

循环支持嵌套

:::



### 函数

函数定义方式

```lua
optional_function_scope function function_name( argument1, argument2, argument3..., argumentn)
    function_body
    return result_params_comma_separated1,result_params_comma_separated2...
end
```

- **optional_function_scope:** 该参数是可选的指定函数是全局函数还是局部函数，未设置该参数默认为全局函数，如果你需要设置函数为局部函数需要使用关键字 **local**。
- **function_name:** 指定函数名称。
- **argument1, argument2, argument3..., argumentn:** 函数参数，多个参数以逗号隔开，函数也可以不带参数。
- **function_body:** 函数体，函数中需要执行的代码语句块。
- **result_params_comma_separated:** 函数返回值，Lua语言函数可以返回多个值，每个值以逗号隔开。

::: tip

变量可以为函数

使用`...`为可变数量参数

:::

### 运算符

lua运算符分为：

- 算术运算符
- 关系运算符
- 逻辑运算符
- 其他运算符

#### 算数运算符

例如a为10，b=20

| 操作符 | 描述                 | 实例                |
| :----- | :------------------- | :------------------ |
| +      | 加法                 | A + B 输出结果 30   |
| -      | 减法                 | A - B 输出结果 -10  |
| *      | 乘法                 | A * B 输出结果 200  |
| /      | 除法                 | B / A 输出结果 2    |
| %      | 取余                 | B % A 输出结果 0    |
| ^      | 乘幂                 | A^2 输出结果 100    |
| -      | 负号                 | -A 输出结果 -10     |
| //     | 整除运算符(>=lua5.3) | **5//2** 输出结果 2 |



#### 关系运算符

例如a为10，b=20

| 操作符 | 描述                                                         | 实例                  |
| :----- | :----------------------------------------------------------- | :-------------------- |
| ==     | 等于，检测两个值是否相等，相等返回 true，否则返回 false      | (A == B) 为 false。   |
| ~=     | 不等于，检测两个值是否相等，不相等返回 true，否则返回 false  | (A ~= B) 为 true。    |
| >      | 大于，如果左边的值大于右边的值，返回 true，否则返回 false    | (A > B) 为 false。    |
| <      | 小于，如果左边的值大于右边的值，返回 false，否则返回 true    | (A < B) 为 true。     |
| >=     | 大于等于，如果左边的值大于等于右边的值，返回 true，否则返回 false | (A >= B) 返回 false。 |
| <=     | 小于等于， 如果左边的值小于等于右边的值，返回 true，否则返回 false | (A <= B) 返回 true。  |



#### 逻辑运算符

设定 A 的值为 true，B 的值为 false：

| 操作符 | 描述                                                         | 实例                   |
| :----- | :----------------------------------------------------------- | :--------------------- |
| and    | 逻辑与操作符。 若 A 为 false，则返回 A，否则返回 B。         | (A and B) 为 false。   |
| or     | 逻辑或操作符。 若 A 为 true，则返回 A，否则返回 B。          | (A or B) 为 true。     |
| not    | 逻辑非操作符。与逻辑运算结果相反，如果条件为 true，逻辑非为 false。 | not(A and B) 为 true。 |



#### 其他运算符

| 操作符 | 描述                               | 实例                                                         |
| :----- | :--------------------------------- | :----------------------------------------------------------- |
| ..     | 连接两个字符串                     | a..b ，其中 a 为 "Hello " ， b 为 "World", 输出结果为 "Hello World"。 |
| #      | 一元运算符，返回字符串或表的长度。 | #"Hello" 返回 5                                              |

#### 运算符优先级

```asciiarmor
^
not    - (unary)
*      /       %
+      -
..
<      >      <=     >=     ~=     ==
and
or
```







---

## 运行方式

lua提供了俩种代码运行方式

### 交互式编程

windows系统安装好Lua后，会有一个Lua的应用程序，点击后会出现一个Lua的命令行，直接使用命令行开启交互式编程

![image-20240706142539055](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407061425215.webp)

打开Windosw的cmd等等命令行工具，输入`Lua`或`lua -i`均可以打开Lua语言的交互模式

![image-20240706142837847](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407061428939.webp)



### 脚本式编程

编辑好程序脚本后以lua为后缀，在命令行使用`lua 文件名.lua`即可编译运行

![image-20240706143548402](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407061435554.webp)































































## 参考

> 参考[Lua 教程 | 菜鸟教程 (runoob.com)](https://www.runoob.com/lua/lua-tutorial.html)
>
> 因为不是专门学习，大部分笔记由菜鸟教程copy
>
> 特此鸣谢！
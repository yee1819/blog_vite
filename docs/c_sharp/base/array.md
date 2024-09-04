# 数组

 C#的数组与其他语言类似，是一串连续的内存位置来存储信息一连串的信息

声明方式：

```c#
datatype[] arrayName;
```

声明数组时需要给数组赋值，初始化数组，并且因为数组是引用类型需要通过`new`来创建实例。

> C# 的 数组不像C语言那样初始化后需要一个一个来复制，会根据隐式初始化来赋值默认值，比如int是0，double 是0.0，bool 是 False

```C#
double[] balance = new double[10];
```

与大部分的语言一样，C#的数组也是由 0 开始取址。

```csharp
balance[0] = 1.1;
```

声明时赋值

```C#
int [] marks = new int[5]  { 99,  98, 92, 97, 95};
```

省略 数组长度：

```C#
int [] marks = new int[]  { 99,  98, 92, 97, 95};
```

省略`new`:

```C#
double[] balance = { 2340.0, 4523.69, 3421.0};
```





## 访问与遍历

使用索引号来访问

```C#
balance[0] = 4500.0;
```

遍历时可以通过循环来访问

```C#
for(int i = 0; i < balance.Length; i++){
    Console.WriteLine(balance[i]);
}
```

C# 也有 foreach 这样 的遍历方法

```C#
foreach (double i in balance){
    Console.WriteLine(i);
}
```

## 数组作为参数


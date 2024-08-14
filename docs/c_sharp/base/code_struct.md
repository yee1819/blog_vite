# 代码结构

创建一个C#项目，最基本的代码结构生成为

```C#
using System;
namespace HelloWorldApplication
{
    /* 类名为 HelloWorld */
    class HelloWorld
    {
        /* main函数 */
        static void Main(string[] args)
        {
            /* 我的第一个 C# 程序 */
            Console.WriteLine("Hello World!");
            Console.ReadKey();
        }
    }
}
```

这是一个输出`Hello,World!`的程序，此时我们可以消除一些代码

```C#
class HelloWorld
{
    /* main函数 */
    static void Main(string[] args)
    {
        /* 我的第一个 C# 程序 */
        System.Console.WriteLine("Hello World!");
        System.Console.ReadKey();
    }
}
```

这就是 C# 中最简程序

其中`class`





### C# 9 后顶级语句

![image-20240807090718679](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202408070907783.webp)

会省略命名空间等等

```c#
// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");

```

即可运行输出`Hello,World!`
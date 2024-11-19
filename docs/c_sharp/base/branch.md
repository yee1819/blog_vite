
## if、if..else /...
没啥好说 同 C、C++

if(判断) 执行语句

```csharp
public class Hello {
    public static void Main() {
        int a = 10;
        if(a>=10){
            System.Console.WriteLine("a>10");
        }else{
            System.Console.WriteLine("a<=10");
        }
        System.Console.WriteLine("hello, world");
    }
}
```

```csharp
public class Hello {
    public static void Main() {
        int a = 10;
        if(a>10){
            System.Console.WriteLine("a>10");
        }else if(a==10){
            System.Console.WriteLine("a==10");
        }else if(a<10){
            System.Console.WriteLine("a<10");
        }
        System.Console.WriteLine("hello, world");
    }
}
```

> 可嵌套
>



## Switch
同C、C++

::: danger 

不同的 是 不允许不使用 ` break `，不支持

:::



如果要实现多个条件 使用  goto 可实现跳转

::: code-group

```csharp[正常使用]
class Program
{
    static void Main()
    {
        int a = 9;
        switch (a)
        {
            case 9:
                System.Console.WriteLine("hello,9");
                break;
            case 10:
                System.Console.WriteLine("hello,10");
                break;
            case 11:
                System.Console.WriteLine("hello,11");
                break;
            default:
                System.Console.WriteLine("hello,default");
                break;
        }
    }
}
```

```csharp[没有break,错误]
class Program
{
    static void Main()
    {
        int a = 9;
        switch (a)
        {
            case 9:
                System.Console.WriteLine("hello,9");
                break;
            case 10:
                System.Console.WriteLine("hello,10");
                
            case 11:
                System.Console.WriteLine("hello,11");
                break;
            default:
                System.Console.WriteLine("hello,default");
                break;
        }
    }
}
```

```csharp[goto实现]
using System;
   class Program
   {
       static void Main()
       {
           int number = 2;
           switch (number)
           {
               case 1:
                   gg: 
                   Console.WriteLine("Case 1");
                   break;
               case 2:
                   Console.WriteLine("Case 2");
                   goto default;
                   /**
                    此时输出
                    Case 2
                    Default case

                   break;
               case 3:
                   Console.WriteLine("Case 3");
                   goto gg;
                   //此时输出
                   /*
                    Case 3
                    Case 1
                   */
                   break;
               default:
                   Console.WriteLine("Default case");
                   break;
           }
       }
   }
```

:::

> 无论是  if 还是 Switch 都支持嵌套
>


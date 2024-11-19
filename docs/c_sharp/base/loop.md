## for
```csharp
using System;
   class Program
   {
       static void Main()
       {
         /* for 循环执行 */
            for (int a = 10; a < 20; a = a + 1)
            {
                Console.WriteLine("a 的值： {0}", a);
            }
            Console.ReadLine();
       }
   }
```



## forEach
```csharp
using System;
   class Program
   {
       static void Main()
       {
           int[] arr = new int[] {1,2,3,4,5,6,7,8,9,10};

            foreach(int item in arr){
                Console.WriteLine(item);
            }
            Console.ReadLine();
       }
   }

```



> forEach  可以 使用在 对象、数组 上 
>

## while
```csharp
using System;
   class Program
   {
       static void Main()
       {
         /* while 循环执行 */
            int a = 10;
            while ( a < 20)
            {
                Console.WriteLine("a 的值： {0}", a); 
                a = a + 1;
            }

            Console.ReadLine();
       }
   }
```





## do...while
```csharp
using System;
   class Program
   {
       static void Main()
       {
         /* do...while 循环执行 */
            int a = 10;
            do{
                Console.WriteLine("a 的值： {0}", a); 
                a = a + 1;
            }while ( a < 20);

            Console.ReadLine();
       }
   }
```



## 其他

可互相嵌套






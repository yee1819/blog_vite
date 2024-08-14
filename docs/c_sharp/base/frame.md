# C#  框架

C#依赖于 .NET 进行开发

## .NET

.NET是当前微软开发的一个多平台框架，有许多组件组成

.NET 可以执行多个代码语言，并不局限与C#

### **.NET Framework**  与 **.NET Core**

**.NET Framework**是一个运行在Windows 的框架，适用于 Windows 平台的开发框架，最早发布于2002年。它包含了大量的类库和工具，帮助开发者快速构建各种类型的应用程序，包括桌面应用、Web 应用和服务应用等。用于构建 Windows 应用程序，如 Windows 窗体应用、WPF 应用和 ASP.NET 应用。

因为只在 Windows上运行的局限性，严重阻碍了C#的发展

后面出现了MONO这个多平台支持的C#框架，微软终于醒悟了在2016年推出了.NET Core多平台框架

在.NET 5 时 微软把这俩个框架给合并起来，结合了 .NET Core 的跨平台特性和性能优化，并引入了一些 .NET Framework 的特性。



### C# 和 .NET的匹配关系

| C#版本  | .NET版本             | 发布日期   | 特性                                                         |
| ------- | -------------------- | ---------- | ------------------------------------------------------------ |
| C# 1.0  | .NET Framework 1.0   | 2002-02-13 | 委托、事件                                                   |
| C# 1.1  | .NET Framework 1.1   | 2003-04-24 | APM（异步编程模型）                                          |
| C# 2.0  | .NET Framework 2.0   | 2005-11-07 | 泛型、匿名方法、迭代器、可空类型                             |
| C# 3.0  | .NET Framework 3.0   | 2007-11-06 | 隐式类型                                                     |
|         | .NET Framework 3.5   | 2007-11-19 | 对象集合初始化、自动实现属性、匿名类型、扩展方法、查询表达式、Lambda表达式、 表达式树、分部类和方法、Linq |
| C# 4.0  | .NET Framework 4.0   | 2010-04-12 | 动态绑定、命名和可选参数、泛型的协变和逆变、互操作性         |
| C# 5.0  | .NET Framework 4.5   | 2012-08-15 | 异步和等待(async和await)、调用方信息(Caller Information)     |
| C# 6.0  | .NET Framework 4.6   | 2015-07-20 | 静态导入、[C# 6 中的新增功能](https://docs.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-version-history#c-version-60) |
|         | .NET Core 1.0        | 2016-06-27 |                                                              |
| C# 7.0  | .NET Framework 4.6.2 | 2016-08-02 | 元组、[C# 7.0 中的新增功能](https://docs.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-version-history#c-version-70) |
| C# 7.1  | .NET Framework 4.7   | 2017-04-05 |                                                              |
|         | .NET Core 2.0        | 2016-08-14 | [.NET Core 2.0 的新增功能](https://docs.microsoft.com/zh-cn/dotnet/core/whats-new/dotnet-core-2-0) |
| C# 7.2  | .NET Framework 4.7.1 | 2017-10-17 |                                                              |
| C# 7.3  | .NET Framework 4.7.2 | 2018-04-30 |                                                              |
|         | .NET Core 2.1        | 2018-05-30 | [.NET Core 2.1 的新增功能](https://docs.microsoft.com/zh-cn/dotnet/core/whats-new/dotnet-core-2-1) |
|         | .NET Core 2.2        | 2018-12-04 | [.NET Core 2.2 的新增功能](https://docs.microsoft.com/zh-cn/dotnet/core/whats-new/dotnet-core-2-2) |
| C# 8.0  | .NET Framework 4.8   | 2019-04-18 | [C# 8.0 中的新增功能](https://docs.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-8) |
|         | .NET Core 3.0        | 2019-09-23 | [.NET Core 3.0 的新增功能](https://docs.microsoft.com/zh-cn/dotnet/core/whats-new/dotnet-core-3-0) |
|         | .NET Core 3.1        | 2019-12-03 | [.NET Core 3.1 的新增功能](https://docs.microsoft.com/zh-cn/dotnet/core/whats-new/dotnet-core-3-1) |
| C# 9.0  | .NET 5               | 2020-09-04 | [C# 9.0 中的新增功能](https://docs.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-9) |
|         | .NET 5               | 2020-10-13 | [What's new in .NET 5](https://docs.microsoft.com/zh-cn/dotnet/core/dotnet-five) |
| C# 10.0 | .NET 6               | 2021-11-09 | [欢迎使用 C# 10](https://devblogs.microsoft.com/dotnet/welcome-to-csharp-10) [C# 10.0 中的新增功能](https://docs.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-10) |
| C# 11.0 | .NET 7               | 2022-11-08 | [C# 11 中的新增功能](https://docs.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-11) |
| C# 12.0 | .NET 8               | 2023-06-14 | [C# 12 中的新增功能](https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-12) |
| C# 13.0 | .NET 9               | 2024-03-25 | [C# 13 中的新增功能](https://learn.microsoft.com/zh-cn/dotnet/csharp/whats-new/csharp-13) |



## 其他



### Unity




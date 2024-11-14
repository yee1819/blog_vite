NGINX 一个反代服务器

| 特性 | 正向代理 | 反向代理 |
|--|---|---|
| **代理角色** | 代表客户端 | 代表服务器 |
| **请求方** | 客户端发起请求 | 客户端发起请求，但目标服务器是代理服务器 |
| **目标方** | 目标服务器 | 客户端不直接与目标服务器交互 |
| **配置控制方** | 客户端配置 | 服务器配置 |
| **常见用途** | 隐藏客户端IP，绕过访问限制，过滤内容 | 负载均衡、缓存、隐藏后端服务器信息 |
| **应用场景** | 匿名上网，翻墙，企业网关 | 网站负载均衡，增加安全性，Web加速 |

## 参考

> [Nginx 反向代理与负载均衡详解 | 菜鸟教程 (runoob.com)](https://www.runoob.com/w3cnote/nginx-proxy-balancing.html)
>
> [深入理解 http 反向代理（nginx） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/464965616)
>
> [运维排查篇 | 访问nginx出现403错误 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/381967653)
>
> [终于有人把正向代理和反向代理解释的明明白白了！-腾讯云开发者社区-腾讯云 (tencent.com)](https://cloud.tencent.com/developer/article/1418457)
>
> [写给Web开发人员看的Nginx介绍_ngnix和服务器语言-CSDN博客](https://blog.csdn.net/david_xtd/article/details/16967837)	

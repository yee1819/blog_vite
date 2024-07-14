# Redis在Java中的使用

Redis对Java有很多适配客户端

::: tip 官网介绍

[Connect with Redis Java clients | Docs](https://redis.io/docs/latest/develop/connect/clients/java/)

:::

比较常用的是这几种：



| 客户端         | 特点                                                         | 链接                                                         |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Jedis          | 命令方法基本与Redis一样<br />简单易上手<br />线程不安全<br />**支持同步操作**：不支持异步操作。 | [redis/jedis: Redis Java client (github.com)](https://github.com/redis/jedis) |
| Lettuce        | 可以使用同步、异步和响应式 API<br />基于 Netty 实现。<br />Lettuce 实例是线程安全的<br /> | [redis/lettuce](https://github.com/redis/lettuce)            |
| Redisson       | 基于 Redis 的 Java 分布式框架，提供了许多高级功能，如分布式锁、集合、Map 等等。<br />可以使用同步和异步 API | [redisson/redisson：Redisson - Easy Redis Java 客户端和实时数据平台](https://github.com/redisson/redisson) |
| SprinDataRedis | 对于Lettuce和 Jedis的整合封装<br />[`RedisTemplate`](https://docs.spring.io/spring-data/redis/reference/redis/template.html)对Redis的命令封装类似Jdbc的统一风格 | [spring-projects/spring-data-redis:  (github.com)](https://github.com/spring-projects/spring-data-redis) |


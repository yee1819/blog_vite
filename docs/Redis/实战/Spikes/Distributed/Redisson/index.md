# Redission

> [redisson](https://github.com/redisson/redisson)
>
> 中文文档[目录 · redisson/redisson Wiki (github.com)](https://github.com/redisson/redisson/wiki/目录)

官方介绍：Redisson是一个在Redis的基础上实现的Java驻内存数据网格（In-Memory Data Grid）。它不仅提供了一系列的分布式的Java常用对象，还提供了许多分布式服务。其中包括(`BitSet`, `Set`, `Multimap`, `SortedSet`, `Map`, `List`, `Queue`, `BlockingQueue`, `Deque`, `BlockingDeque`, `Semaphore`, `Lock`, `AtomicLong`, `CountDownLatch`, `Publish / Subscribe`, `Bloom filter`, `Remote service`, `Spring cache`, `Executor service`, `Live Object service`, `Scheduler service`) Redisson提供了使用Redis的最简单和最便捷的方法。Redisson的宗旨是促进使用者对Redis的关注分离（Separation of Concern），从而让使用者能够将精力更集中地放在处理业务逻辑上。

翻译：一个 Redis 成熟的框架，实现了很多分布式锁，使用这个框架不需要自己实现锁，调用api即可

## 入门

1. 引入依赖

```xml
<!--        redission-->
        <dependency>
            <groupId>org.redisson</groupId>
            <artifactId>redisson</artifactId>
            <version>3.16.2</version>
        </dependency>
```

2. 实现Config配置类，交给IOC容器管理

   ```java
   package com.hmdp.config;
   
   import org.redisson.Redisson;
   import org.redisson.api.RedissonClient;
   import org.redisson.config.Config;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   
   @Configuration
   public class RedisConfig {
       @Bean 
       public RedissonClient redissonClient(){
           //配置类
           Config config = new Config();
           //添加redis地址，这是是单机地址config.useClusterServers()是集群地址
           config.useSingleServer().setAddress("redis://127.0.0.1:6379").setPassword("201819");//可以进行更多配置
           //创建客户端
           return Redisson.create(config);
       }
   }
   ```
	::: tip
	配置可以用yaml文件配置、
	有springboot的start包，但会覆盖原来的redis包，所以推荐使用原生java配置
	:::
	
3. 调用api

   以之前的超卖案例示例
   
   先自动分配bean`private RedissonClient redissonClient;`
   
   ::: code-group 
   
   ```java[新版]
   		RLock lock = redissonClient.getLock("order:" + userId.getId());
          
           boolean islock = lock.tryLock(500L, TimeUnit.MILLISECONDS);
   
           if (!islock){
               //获取锁失败
               return Result.fail("同一个用户只能下一单");
           }
           //如果不是阻止别人只下一单，而是之前解决超卖问题的话，需要休眠或者重复请求
           try {
               //执行逻辑
	            IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();
	            return proxy.createVoucherOrder(voucherId);
	        }finally {
	            simpleRedisLock.unlock();
	        }
	    }
	```
	
	```java[旧版]
		SimpleRedisLock simpleRedisLock = new SimpleRedisLock(stringRedisTemplate, "order:"+userId.getId());
	    boolean isLock = simpleRedisLock.tryLock(500L);
	 
	    if (!isLock){
	        //获取锁失败
	        return Result.fail("同一个用户只能下一单");
	    }
	    //如果不是阻止别人只下一单，而是之前解决超卖问题的话，需要休眠或者重复请求
	    try {
	        //执行逻辑
	        IVoucherOrderService proxy = (IVoucherOrderService) AopContext.currentProxy();
	        return proxy.createVoucherOrder(voucherId);
	    }finally {
	        simpleRedisLock.unlock();
	    }
	}
	```
	
	:::
	
	
	
	
	
	::: warning 警告
	
	其中
	
	```java
	//空参
	lock.tryLock()
	// 设置等待时间在时间内即获取失败会重新获取，设置超时时间自动过期时间，设置类型，以下是默认  //黑马老师说的
	 lock.tryLock(-1,30, TimeUnit.SECONDS);
	//以及等待时间的传参
	 lock.tryLock(30, TimeUnit.SECONDS);
	```
	
	但是我看源码，写的是默认超时时间是-1，也就是不会自动过期吗...
	![image-20240707033224824](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407070333315.webp)我后面接着看源码
	
	```java{4}
	if (leaseTime != -1L) {
	    ttlRemainingFuture = this.tryLockInnerAsync(waitTime, leaseTime, unit, threadId, RedisCommands.EVAL_NULL_BOOLEAN);
	} else {
	    ttlRemainingFuture = this.tryLockInnerAsync(waitTime, this.internalLockLeaseTime, TimeUnit.MILLISECONDS, threadId, RedisCommands.EVAL_NULL_BOOLEAN);
	}
	```
	
	点击进去
	
	```java{4}
	public RedissonLock(CommandAsyncExecutor commandExecutor, String name) {
	    super(commandExecutor, name);
	    this.commandExecutor = commandExecutor;
	    this.internalLockLeaseTime = commandExecutor.getConnectionManager().getCfg().getLockWatchdogTimeout();
	    this.pubSub = commandExecutor.getConnectionManager().getSubscribeService().getLockPubSub();
	}
	```
	
	
	
	终于找到了
	
	![image-20240707041608649](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407070417236.webp)
	
	```java{3}
	public Config() {
	    this.transportMode = TransportMode.NIO;
	    this.lockWatchdogTimeout = 30000L;
	    this.reliableTopicWatchdogTimeout = TimeUnit.MINUTES.toMillis(10L);
	    this.keepPubSubOrder = true;
	    this.useScriptCache = false;
	    this.minCleanUpDelay = 5;
	    this.maxCleanUpDelay = 1800;
	    this.cleanUpKeysAmount = 100;
	    this.nettyHook = new DefaultNettyHook();
	    this.useThreadClassLoader = true;
	    this.addressResolverGroupFactory = new DnsAddressResolverGroupFactory();
	}
	```
	
	30000L的毫秒也就是30s
	
	:::






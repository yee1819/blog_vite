# Redission源码

## tryLock原理源码

解决问题：

- 可重入：hash
- 可重试：利用信号量和pubsub订阅功能实现等待、唤醒、获取锁失败重试
- 超时续约：watchDog 看门狗，每隔一段时间重置超时时间，releaseTime/3，默认是30s/3

> [实战篇-20.分布式锁-Redisson的锁重试和WatchDog机制_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1cr4y1671t?p=67&vd_source=ae1743069d1cb97d6b6a1d21340b6497)
>
> 已弃疗





## 集群multiLock源码

给所有redis服务器一起发送锁的指令

只有所有redis服务器同时拿到锁和释放锁才算获取锁

全部拿到锁以后最后给所有服务器重置有效期

.....

[实战篇-21.分布式锁-Redisson的multiLock原理_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1cr4y1671t?p=68&vd_source=ae1743069d1cb97d6b6a1d21340b6497)


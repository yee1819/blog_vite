# PubSub实现消息队列

PubSub （发布订阅）

消费者可以订阅一个或多个频道，生产者向对应频道发送消息，订阅了这个频道的消费者就可以接收到消息，这样就能实现多消费者组群模式

指令：

- `PSUBSCRIBE pattern [pattern ...]`

  根据通配符订阅一个或多个频道

- `SUBSCRIBE channel [channel ...]`

  订阅某个或多个频道，SUBSCRIBE 频道名

- ` PUBSUB <subcommand> [argument [argument ...]]`

  查看订阅与发布系统状态

  ```sh
  127.0.0.1:6379> PUBSUB CHANNELS
  1) "order.t1"
  2) "channel"
  3) "order.t2"
  127.0.0.1:6379> pubsub channels order.*
  1) "order.t1"
  2) "order.t2"
  
  //查看订阅人数
  127.0.0.1:6379> pubsub numsub channel
  1) "channel"
  2) (integer) 3
  127.0.0.1:6379> pubsub numsub channel order.t2
  1) "channel"
  2) (integer) 3
  3) "order.t2"
  4) (integer) 2
  //不支持调配符
  127.0.0.1:6379> pubsub numsub channel order.*
  1) "channel"
  2) (integer) 3
  3) "order.*"
  4) (integer) 0
  
  //返回模式订阅的个数  即通配符订阅
  127.0.0.1:6379> pubsub numpat
  (integer) 0
  ```

- `UNSUBSCRIBE channel [channel ...]`

  退订一个或多个频道

- `PUNSUBSCRIBE [pattern [pattern ...]]`

  根据通配符退订频道



## 使用示例

![image-20240707180541800](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407071805190.webp)



## 优缺点

优点：支持多生产、多消费，基于发布订阅模型

缺点：

- 不支持持久化，宕机或其他状况会丢失消息
- 无法避免消息丢失，获取消息后出现问题后不能获得历史消息
- 消息堆积上限，缓存于客户端有上限，超出消息丢失
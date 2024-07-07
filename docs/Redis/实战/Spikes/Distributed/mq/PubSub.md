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
  
  //返回模式订阅的个数  即t
  127.0.0.1:6379> pubsub numpat
  (integer) 0
  ```

  

![image-20240707180541800](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407071805190.webp)

返回接收到消息的频道数
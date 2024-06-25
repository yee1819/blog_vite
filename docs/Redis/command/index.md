---
title: 常用命令
---

## 提示

redis官网：https://redis.io/

中文网：[Redis中文网](https://www.redis.net.cn/)

命令行指令提示：`help`

某一类别提示`help @[command]`

详细提示`help [command]`

打出一部分命令后，按下`Tab`键可以补全，如果补全不对可以切换补全的命令

```bash{1,14,29}
127.0.0.1:6379> help
redis-cli 3.2.100
To get help about Redis commands type:
      "help @<group>" to get a list of commands in <group>
      "help <command>" for help on <command>
      "help <tab>" to get a list of possible help topics
      "quit" to exit

To set redis-cli perferences:
      ":set hints" enable online hints
      ":set nohints" disable online hints
Set your preferences in ~/.redisclirc

127.0.0.1:6379> help @string

  APPEND key value
  summary: Append a value to a key
  since: 2.0.0

  BITCOUNT key [start end]
  summary: Count set bits in a string
  since: 2.6.0

  BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]
  summary: Perform arbitrary bitfield integer operations on strings
  since: 3.2.0
......省略很多行

127.0.0.1:6379> help set

  SET key value [EX seconds] [PX milliseconds] [NX|XX]
  summary: Set the string value of a key
  since: 1.0.0
  group: string

```

---

## Redis数据类型

- **string（字符串）:** 基本的数据存储单元，可以存储字符串、整数或者浮点数。
- **hash（哈希）:**一个键值对集合，可以存储多个字段。
- **list（列表）:**一个简单的列表，可以存储一系列的字符串元素。
- **set（集合）:**一个无序集合，可以存储不重复的字符串元素。
- **zset(sorted set：有序集合):** 类似于集合，但是每个元素都有一个分数（score）与之关联。
- **位图（Bitmaps）：**基于字符串类型，可以对每个位进行操作。
- **超日志（HyperLogLogs）：**用于基数统计，可以估算集合中的唯一元素数量。
- **地理空间（Geospatial）：**用于存储地理位置信息。
- **发布/订阅（Pub/Sub）：**一种消息通信模式，允许客户端订阅消息通道，并接收发布到该通道的消息。
- **流（Streams）：**用于消息队列和日志存储，支持消息的持久化和时间排序。
- **模块（Modules）：**Redis 支持动态加载模块，可以扩展 Redis 的功能。

> [Redis 数据类型 | 菜鸟教程 (runoob.com)](https://www.runoob.com/redis/redis-data-types.html)

其中前五种为五种基本数据结构


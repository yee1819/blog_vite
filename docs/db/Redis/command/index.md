---
title: 常用命令
---

# 基本命令

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

- <b>string（字符串）:</b> 基本的数据存储单元，可以存储字符串、整数或者浮点数。
- <b>hash（哈希）:</b>一个键值对集合，可以存储多个字段。
- <b>list（列表）:</b>一个简单的列表，可以存储一系列的字符串元素。
- <b>set（集合） :</b>一个无序集合，可以存储不重复的字符串元素。
- <b>zset(sorted set：有序集合) :</b> 类似于集合，但是每个元素都有一个分数（score）与之关联。
- <b>位图（Bitmaps）: </b>基于字符串类型，可以对每个位进行操作。
- <b>超日志（HyperLogLogs）: </b>用于基数统计，可以估算集合中的唯一元素数量。
- <b>地理空间（Geospatial）: </b>用于存储地理位置信息。
- <b>发布/订阅（Pub/Sub) :</b>一种消息通信模式，允许客户端订阅消息通道，并接收发布到该通道的消息。
- <b>流（Streams）:</b>用于消息队列和日志存储，支持消息的持久化和时间排序。
- <b>模块（Modules）: </b>Redis 支持动态加载模块，可以扩展 Redis 的功能。




> [Redis 数据类型 | 菜鸟教程 (runoob.com)](https://www.runoob.com/redis/redis-data-types.html)


其中前五种为五种基本数据结构

---

在redis中，数据存储有不同的实现方式

1. 字符串

   最大长度为512MB，根据长度不同而使用不同的存储方式：

   - <39字节：使用SDS（Simple Dynamic String），一个以C语言的char为基础的构建的一个数据类型，简单动态字符串，存储字符串内容及其长度。
   - `>`39字节：使用 C 语言原生的动态分配内存方式 `malloc`。

2. 列表

   列表是一个双向链表，可以在列表的两端推入或弹出元素。也分为长短存储

   - **短列表**（元素总长度小于 64 字节，且元素个数少于 512 个）：使用 `ziplist`（压缩列表）存储。
   - **长列表**（超过上述条件）：使用 `linkedlist`（双向链表）存储。

3. 集合

   无序唯一元素集合，支持交集、并集、差集操作

   - **小集合**（整数元素且元素总数少于 512 个）：使用 `intset`（整数集合）存储。

   - **大集合**（超过上述条件）：使用 `hashtable`（哈希表）存储。

4. 有序集合

   唯一元素，由score的大小进行排序

   - **小有序集合**（元素总数少于 128 个且每个元素及其分数总长度小于 64 字节）：使用 `ziplist`（压缩列表）存储。

   - **大有序集合**（超过上述条件）：使用 `skiplist`（跳跃表）和 `hashtable`（哈希表）的组合存储。跳跃表用于按分数排序，哈希表用于按元素查找。

5. 哈希

   键值对的集合，键不重复

   - **小哈希**（键值对总数少于 512 对且每个键和值的长度小于 64 字节）：使用 `ziplist`（压缩列表）存储。

   - **大哈希**（超过上述条件）：使用 `hashtable`（哈希表）存储。

6. 位图 

   位图是一个字符串，可以进行位操作。Redis 提供了位操作命令来处理位图。

   - **内部存储**：位图本质上是一个大字符串，每个位可以单独操作。

7. 超级日志

   HyperLogLog 是一种概率性数据结构，用于基数估计（例如，估算独立元素的数量）。

   - **内部存储**：使用稀疏数组和高效的算法来存储和处理数据。

8. 地理空间索引

   Geo 数据类型用于存储地理位置信息，并支持地理半径查询等操作。

   - **内部存储**：利用有序集合（Sorted Set）来存储地理位置，使用 Geohash 编码将地理坐标转换为分数。

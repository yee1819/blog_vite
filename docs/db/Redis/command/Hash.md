---
title: Hash
---

# Hash-哈希

Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。

Redis 中每个 hash 可以存储 232 - 1 键值对（40多亿）。

## 常用命令

- `HSET key field value`

  设置指定key的指定字段field的value

  ```bash{1,3}
  127.0.0.1:6379> HSET hash name xiaoming
  (integer) 1
  127.0.0.1:6379> HSET hash age 18
  (integer) 1
  ```

  

- `HMSET key field1 value1 [field2 value2] ` 

  设置指定key的多个字段值

  ```bash
  127.0.0.1:6379> HMSET hash phone 12345678910 email 1244118445@qq.com
  OK
  ```

- `HSETNX key field value`

  使用`HSET`设置字段值时不会检测是否存在直接覆盖。

  使用`HSETNX`设置指定key的value，当field不存在时才会被创建

  ```bash
  127.0.0.1:6379> HSETNX hash age 18
  (integer) 0
  127.0.0.1:6379> HSETNX hash number 2115080124
  (integer) 1
  ```

- `HGET key field`

  获取指定key指定field字段的值

  ```bash
  127.0.0.1:6379> HGET hash name
  "xiaoming"
  ```

- `HGETALL key`

  获取所有field和value

  ```bash
  127.0.0.1:6379> HGETALL hash
   1) "name"
   2) "xiaoming"
   3) "age"
   4) "18"
   5) "phone"
   6) "12345678910"
   7) "email"
   8) "1244118445@qq.com"
   9) "number"
  10) "2115080124"
  ```

- `HKEYS key`

  获取指定key的全部field

  ```bash
  127.0.0.1:6379> HKEYS hash
  1) "name"
  2) "age"
  3) "phone"
  4) "email"
  5) "number"
  ```

- ` HVALS key`

  获取指定key的所有值

  ```bash
  127.0.0.1:6379> HVALS hash
  1) "xiaoming"
  2) "18"
  3) "12345678910"
  4) "1244118445@qq.com"
  5) "2115080124"
  ```

- `HMGET key field1 field2 ....`

  获取指定的key多个或单个指定的field的值

  不存在则返回nil

  ```bash
  127.0.0.1:6379> HMGET hash name  ahe
  1) "xiaoming"
  2) (nil)
  127.0.0.1:6379> HMGET hash name age
  1) "xiaoming"
  2) "18"
  ```

- `HLEN key`

  获取指定key的长度

  ```bash
  127.0.0.1:6379> HLEN hash
  (integer) 5
  ```

- `HEXISTS key field `

  检测是否存在这个field字段，存在返回1，不存在返回0

  ```bash
  127.0.0.1:6379> HEXISTS hash name
  (integer) 1
  127.0.0.1:6379> HEXISTS hash lllddd
  (integer) 0
  ```

- `HINCRBY KEY_NAME FIELD_NAME INCR_BY_NUMBER `

- `HINCRBYFLOAT KEY_NAME FIELD_NAME INCR_BY_NUMBER `

  为指定的key的指定field添加增量，前者只能为整数，后者可以为浮点数和整数

  通过设置负数可以变成减法

  ```bash
  127.0.0.1:6379> HINCRBY hash age 4
  (integer) 22
  127.0.0.1:6379> Hget hash age
  "22"
  127.0.0.1:6379> HINCRBYFLOAT hash age 2.2
  "24.199999999999999"
  127.0.0.1:6379> HINCRBY hash age 1
  (error) ERR hash value is not an integer
  127.0.0.1:6379> HINCRBYFLOAT hash age -2.2
  "22"
  ```

- `HSCAN key cursor [MATCH pattern] [count num]`

  与scan差不多，用作迭代hash

  参考[SCAN](/Redis/command/通用命令#scan)
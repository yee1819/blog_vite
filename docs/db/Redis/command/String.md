---
title: String
---

# 字符串-String



- `set [key] [value]`

  设置字符串型key

- `get [key]`

  获取key值

  ```bash{1,3}
  127.0.0.1:6379> set test asdajfioxznnwqgdahuifqopmxaf
  OK
  127.0.0.1:6379> get test
  "asdajfioxznnwqgdahuifqopmxaf"
  ```

- `SETNX [key] [value]`

  当key不存在时，才创建键值对

  ```bash{1,3}
  127.0.0.1:6379> SETNX text 123
  (integer) 1
  127.0.0.1:6379> SETNX test 123
  (integer) 0
  ```

  

- `MGET [key1] [key2]...`

  获取一个或多个key的值

  ```bash{1}
  127.0.0.1:6379> MGET test text
  1) "asdajfioxznnwqgdahuifqopmxaf"
  2) "123"
  ```

- `SETEX [key] [second] [value]`

  设置键的时候同时设置过期时间，不做是否存在校验

  ```bash{1}
  127.0.0.1:6379> setex text 150 321
  OK
  127.0.0.1:6379> get text
  "321"
  127.0.0.1:6379> ttl text
  (integer) 137
  ```

- ` PSETEX key milliseconds value`

  设置过期时间，以毫秒为单位，类似上面

  ```bash{1.3}
  127.0.0.1:6379> PSETEX aaa 999999 lll
  OK
  127.0.0.1:6379> ttl aaa
  (integer) 993
  ```

  

- `STRLEN key`

  返回key长度

  ```bash{1,3}
  127.0.0.1:6379> STRLEN test
  (integer) 28
  127.0.0.1:6379> get test
  "asdajfioxznnwqgdahuifqopmxaf"
  ```

- `GETSET key value`

  设置key值，并返回旧key值 ,不存在的key会返回nil（空）

  ```bash{1,3,5}
  127.0.0.1:6379> STRLEN test
  (integer) 28
  127.0.0.1:6379> get test
  "asdajfioxznnwqgdahuifqopmxaf"
  127.0.0.1:6379> getset lll dsdsd1532
  (nil)
  ```

-  `setrange key index value`

  从key的index位开始覆写value

  ```bash{1,3,5}
  127.0.0.1:6379> set db hello,mysql
  OK
  127.0.0.1:6379> SETRANGE db 6 redis
  (integer) 11
  127.0.0.1:6379> get db
  "hello,redis"
  ```

- `APPEND key value`

  往key的值后添加value，如果key不存在则创建，且设置value

  ```bash{1,3,5,7,10}
  127.0.0.1:6379> set ttt aaaaaaa
  OK
  127.0.0.1:6379> append ttt bbbbb
  (integer) 12
  127.0.0.1:6379> get ttt
  "aaaaaaabbbbb"
  127.0.0.1:6379> append yyy ccccc
  (integer) 5
  #yyy不存在
  127.0.0.1:6379> get yyy
  "ccccc"
  ```

  

- `MSET  key1 value1  [key2] [value2] ...`

- `MSETNX  key1 value1  [key2] [value2] ...`

  都是同时设置一个或多个键值对，前者无论存不存在都会创建反回OK，后者相当于事务，需要设置的key都不存在才会设置成功，否则都不会设置成功，成功返回1，失败返回0

  ```bash{1,3,5,9,11,15,17}
  127.0.0.1:6379> keys *
  (empty list or set)
  127.0.0.1:6379> mset n1 123 n2 321 n3 456
  OK
  127.0.0.1:6379> keys *
  1) "n1"
  2) "n3"
  3) "n2"
  127.0.0.1:6379> MSETNX n4 645 n2 999
  (integer) 0
  127.0.0.1:6379> keys *
  1) "n1"
  2) "n3"
  3) "n2"
  127.0.0.1:6379> MSETNX n4 159 n5 654
  (integer) 1
  127.0.0.1:6379> keys *
  1) "n4"
  2) "n5"
  3) "n1"
  4) "n2"
  5) "n3"
  ```

- `INCR key`

  为整数value加上1，不存在 key则创建key并设置1

- `DECR key`

  为整数value减去1，不存在则创建key并设置value为-1

  如果不允许+1-1，或者为浮点数，都会报错error

  ```bash
  127.0.0.1:6379> decr del
  (integer) -1
  127.0.0.1:6379> get del
  "-1"
  127.0.0.1:6379> incr add
  (integer) 1
  127.0.0.1:6379> get add
  "1"
  127.0.0.1:6379> incr add
  (integer) 2
  127.0.0.1:6379> get add
  "2"
  
  127.0.0.1:6379> set num 1.5
  OK
  127.0.0.1:6379> INCR num
  (error) ERR value is not an integer or out of range
  ```

- `INCRBY key value`

- `DECRBY key value`

  为key值加上/减去 value，value必须为整数，否则报错，其他的和上面的一样，不存在key则设置创建并value

- `INCRBYFLOAT key value`

  为key加上浮点数，可以为浮点数和整数进行计算，没有`DECRBYFLOAT`，可以通过设置value来模拟

  不存在key创建并设置value

  ```bash
  127.0.0.1:6379> INCRBYFLOAT num 1.3
  "2.8"
  127.0.0.1:6379> INCRBYFLOAT num -1.3
  "1.5"
  ```

  
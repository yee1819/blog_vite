---
title: List	
---

# List-列表

redis的列表类似双向队列，可以做到左右俩边的插入和删除

一个列表可以包含2^32^-1个元素，即4294967295

## 常用命令

- `LPUSH key value1 value2 ...`

- `RPUSH key value1 value2 ...`

  从列表左边/右边按照顺序加入value

  如果不存在key自动创建

  ```bash{1,3,7,9}
  127.0.0.1:6379> LPUSH list 1 2  3
  (integer) 3
  127.0.0.1:6379> Lrange list 0 -1
  1) "3"
  2) "2"
  3) "1"
  127.0.0.1:6379> RPUSH list 4 5  6
  (integer) 6
  127.0.0.1:6379> LRANGE list 0 -1
  1) "3"
  2) "2"
  3) "1"
  4) "4"
  5) "5"
  6) "6"
  ```

- `LPUSHX key value `

  往已存在的key的list从左边存入value，不存在的key返回0失败，只能存入1一个值

  ```bash{2,4,6,12,14,21,23,25,27}
  #插入不存在的key，失败返回0
  127.0.0.1:6379> LPUSHX list1 123
  (integer) 0
  127.0.0.1:6379> LRANGE list1 0 -1
  (empty list or set)
  127.0.0.1:6379> LRANGE list 0 -1
  1) "2"
  2) "1"
  3) "4"
  4) "5"
  #插入有key的list
  127.0.0.1:6379> LPUSHX list 3
  (integer) 5
  127.0.0.1:6379> LRANGE list  0 -1
  1) "3"
  2) "2"
  3) "1"
  4) "4"
  5) "5"
  #不能插入多个值
  127.0.0.1:6379> LPUSHX list 6 5 4
  (error) ERR wrong number of arguments for 'lpushx' command
  127.0.0.1:6379> LPUSHX list 6
  (integer) 6
  127.0.0.1:6379> lpushx list 6 5
  (error) ERR wrong number of arguments for 'lpushx' command
  127.0.0.1:6379> LRANGE list 0 -1
  1) "6"
  2) "3"
  3) "2"
  4) "1"
  5) "4"
  6) "5"
  ```

- `RPUSHX key value`

  从右边插入已存在的key的list

  ```bash{1,8,10}
  127.0.0.1:6379> LRANGE list 0 -1
  1) "6"
  2) "3"
  3) "2"
  4) "1"
  5) "4"
  6) "5"
  127.0.0.1:6379> RPUSHX list 0
  (integer) 7
  127.0.0.1:6379> LRANGE list 0 -1
  1) "6"
  2) "3"
  3) "2"
  4) "1"
  5) "4"
  6) "5"
  7) "0"
  ```

  

- `LRANGE key start end`

  从列表左边根据顺序从start开始，到end结束返回value值

  列表从0开始，返回的值的下标是[start,end]，这点与大部分编程语言的[start,end)不同

  ```ascii
   ┌─┬─┬─┬─┬─┬─┬
   │3│2│1│4│5│6│
   └─┴─┴─┴─┴─┴─┴
    0 1 2 3 4 5 
  ```

  end为-1,为遍历全部

  ```bash{1,5,10,17,19}
  127.0.0.1:6379> LRANGE list 1 3
  1) "2"
  2) "1"
  3) "4"
  127.0.0.1:6379> LRANGE list 0 3
  1) "3"
  2) "2"
  3) "1"
  4) "4"
  127.0.0.1:6379> LRANGE list 0 -1
  1) "3"
  2) "2"
  3) "1"
  4) "4"
  5) "5"
  6) "6"
  127.0.0.1:6379> LRANGE list 5 6
  1) "6"
  127.0.0.1:6379> Lrange list 3 4
  1) "4"
  2) "5"
  ```

- `LPOP KEY`

- `RPOP KEY`

  从左边/右边弹出一个value，并且返回被弹出的值

  ```bash{1,3,5}
  127.0.0.1:6379> Lpop list
  "3"
  127.0.0.1:6379> Rpop list
  "6"
  127.0.0.1:6379> LRANGE list 0 -1
  1) "2"
  2) "1"
  3) "4"
  4) "5"
  ```

- `LRANGE key index `

  获取指定key的索引上的值

  ```bash{1,6,8}
  127.0.0.1:6379> LRANGE list 0 -1
  1) "2"
  2) "1"
  3) "4"
  4) "5"
  127.0.0.1:6379> LINDEX list 1
  "1"
  127.0.0.1:6379> LINDEX list 0
  "2"
  ```

- `LLEN key`

  返回指定key的长度

  ```bash{1,9}
  127.0.0.1:6379> LRANGE list 0 -1
  1) "6"
  2) "3"
  3) "2"
  4) "1"
  5) "4"
  6) "5"
  7) "0"
  127.0.0.1:6379> LLEN list
  (integer) 7
  ```

- `LSET key index value`

  设置指定key的指定index的值,超过索引或key不存在会报错

  ```bash{1,9,11,13,21,23}
  127.0.0.1:6379> LRANGE list 0 -1
  1) "6"
  2) "3"
  3) "2"
  4) "1"
  5) "4"
  6) "5"
  7) "0"
  127.0.0.1:6379> LLEN list
  (integer) 7
  127.0.0.1:6379> LSET list 0 9999
  OK
  127.0.0.1:6379> LRANGE list 0 -1
  1) "9999"
  2) "3"
  3) "2"
  4) "1"
  5) "4"
  6) "5"
  7) "0"
  127.0.0.1:6379> LSET list 10 888
  (error) ERR index out of range
  127.0.0.1:6379> LSET list1 10 888
  (error) ERR no such key
  ```

- `LREM key count value`

  删除指定key中的指定count数量的value

  返回值为删除value的数量

  - count>0时，从左到右开始查找并删除指定count数量的value

  - count<0 时，从右到左查找并删除count绝对值 数量的value
  - count = 0 时，删除所有key的value

  不存在key，或者没有value时会返回0

  ```bash{1,3,16,18,30,32}
  127.0.0.1:6379> lrem list 2 hello
  (integer) 2
  127.0.0.1:6379> LRANGE list 0 -1
   1) "9999"
   2) "3"
   3) "2"
   4) "1"
   5) "4"
   6) "5"
   7) "0"
   8) "world"
   9) "world"
  10) "hello"
  11) "world"
  12) "hello"
  127.0.0.1:6379> lrem list -1 world
  (integer) 1
  127.0.0.1:6379> LRANGE list 0 -1
   1) "9999"
   2) "3"
   3) "2"
   4) "1"
   5) "4"
   6) "5"
   7) "0"
   8) "world"
   9) "world"
  10) "hello"
  11) "hello"
  127.0.0.1:6379> lrem list 0 world
  (integer) 2
  127.0.0.1:6379> LRANGE list 0 -1
  1) "9999"
  2) "3"
  3) "2"
  4) "1"
  5) "4"
  6) "5"
  7) "0"
  8) "hello"
  9) "hello"
  ```

- `LTRIM key start end`

  对指定key进行修剪。只保留指定范围内的元素

  ```bash{1,11,13}
  127.0.0.1:6379> LRANGE list 0 -1
  1) "9999"
  2) "3"
  3) "2"
  4) "1"
  5) "4"
  6) "5"
  7) "0"
  8) "hello"
  9) "hello"
  127.0.0.1:6379> LTRIM list 7 -1
  OK
  127.0.0.1:6379> LRANGE list 0 -1
  1) "hello"
  2) "hello"
  #不属于7以后的是list被丢弃
  ```

- `LINSERT key [before|after] pivot value`

  在指定key中的指定pivot（list的存在值）的[前|后]插入value

  key不存在返回0，pivot不存在返回-1，插入成功返回list长度

  ```bash{1,3,7,9,14,16,18}
  127.0.0.1:6379> LINSERT list before hello world
  (integer) 3
  127.0.0.1:6379> LRANGE list 0 -1
  1) "world"
  2) "hello"
  3) "hello"
  127.0.0.1:6379> LINSERT list after hello redis
  (integer) 4
  127.0.0.1:6379> LRANGE list 0 -1
  1) "world"
  2) "hello"
  3) "redis"
  4) "hello"
  127.0.0.1:6379> LINSERT lsdada before ll d
  (integer) 0
  127.0.0.1:6379> LINSERT list before llll dddd
  (integer) -1
  127.0.0.1:6379> LRANGE list 0 -1
  1) "world"
  2) "hello"
  3) "redis"
  4) "hello"
  ```

- `Rpoplpush  key1 key2`

  弹出key1的尾部元素 到key2的头部

  ```bash{1,3,5,7,13}
  127.0.0.1:6379> lpush lll 1 2 3 4 5 6
  (integer) 6
  127.0.0.1:6379> lpush nnn a b c  d e f
  (integer) 6
  127.0.0.1:6379> RPOPLPUSH lll nnn
  "1"
  127.0.0.1:6379> LRANGE lll 0 -1
  1) "6"
  2) "5"
  3) "4"
  4) "3"
  5) "2"
  127.0.0.1:6379> LRANGE nnn 0 -1
  1) "1"
  2) "f"
  3) "e"
  4) "d"
  5) "c"
  6) "b"
  7) "a"
  ```
  
- `BRPOPLPUSH key1 key2 timeout` 

  在指定时间弹出key1的右边并添加key2的左边，timeout单位为秒

  超时未完成会返回(Nil)和等待时长

  完成会返回被弹出的值和等待的时长，貌似不用等待则不会返回时长直接返回被弹出的值

  

  ```bash{1,3,8}
  127.0.0.1:6379> BRPOPLPUSH lll nnn 20
  "2"
  127.0.0.1:6379> LRANGE lll 0 -1
  1) "6"
  2) "5"
  3) "4"
  4) "3"
  127.0.0.1:6379> LRANGE nnn 0 -1
  1) "2"
  2) "1"
  3) "f"
  4) "e"
  5) "d"
  6) "c"
  7) "b"
  8) "a"
  ```
  
  
  
  如果没有可以被弹出的值，即列表为空，会阻塞列表直到等待超时或者找到可以被弹出的元素
  
  ```bash{1,3,5,7}
  127.0.0.1:6379> lpush ppp 1
  (integer) 1
  127.0.0.1:6379> lpop ppp
  "1"
  127.0.0.1:6379> LRANGE ppp 0 -1
  (empty list or set)
  127.0.0.1:6379> BRPOPLPUSH ppp nnn 20
  (nil)
  (20.09s)
  ```
  
- `BLPOP key1  [key2...] timeout`
  
- `BRPOP key1 [key2...] timeout`
  
  在timeout指定的时间内按照key的顺序弹出一个可以被弹出的key的左边、右边的值
  
  找到的第一个不为空的key的左边、右边弹出一个值，返回被弹出的key和被弹出的值
  
  list均为空，在等待结束后返回nil以及等待时间
  
  ```bash{1,4,9,18,21}
  127.0.0.1:6379> BLPOP nnn lll 10
  1) "nnn"
  2) "2"
  127.0.0.1:6379> LRANGE lll 0 -1
  1) "6"
  2) "5"
  3) "4"
  4) "3"
  127.0.0.1:6379> LRANGE nnn 0 -1
  1) "1"
  2) "f"
  3) "e"
  4) "d"
  5) "c"
  6) "b"
  7) "a"
  #ppp 为空 ，所以弹出 nnn
  127.0.0.1:6379> BRPOP ppp nnn lll 10
  1) "nnn"
  2) "a"
  127.0.0.1:6379> BRPOPLPUSH ppp nnn 20
  (nil)
  (20.09s)
  ```
  
  
  
  
  
  
  
  
  
  
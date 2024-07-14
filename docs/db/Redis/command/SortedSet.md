---
title: ZSET
---

# Sorted set 有序集合

Redis 有序集合和集合一样也是 string 类型元素的集合,且不允许重复的成员。

不同的是每个元素都会关联一个 double 类型的分数。redis 正是通过分数来为集合中的成员进行从小到大的排序。

有序集合的成员是唯一的,但分数(score)却可以重复。

集合中最大的成员数为 2^32^ - 1 (4294967295, 每个集合可存储40多亿个成员)。

## 常用命令

### 向有序集合添加/设置



`ZADD key score1 member1 [score2 member]...`

```bash
127.0.0.1:6379> zadd z1 100 a 99 b 98 c
(integer) 3
```



### 查找有序集合的成员

#### 以索引来查询成员

- `Zrange key start end [WITHSCORES]`

- `ZRERANGE key start end [WITHSCORES]`

  按照索引值根据score来排序，前者从小到大，后者从大到小，索引区间是[start,end] （负数为倒数第几个成员，例-1是倒数第一个

  `WITHSCORES`可选，选了可以显示分数

  ```bash{1,5,12,16}
  127.0.0.1:6379> Zrange z1 0 -1
  1) "c"
  2) "b"
  3) "a"
  127.0.0.1:6379> ZRANGE z1 0 -1 withscores
  1) "c"
  2) "98"
  3) "b"
  4) "99"
  5) "a"
  6) "100"
  127.0.0.1:6379> ZREVRANGE z1 0 -1
  1) "a"
  2) "b"
  3) "c"
  127.0.0.1:6379> ZREVRANGE z1 0 -1 withscores
  1) "a"
  2) "100"
  3) "b"
  4) "99"
  5) "c"
  6) "98"
  ```

  

#### 以字典序来查询成员

`ZRANGEBYLEX key min max [LIMIT offset count]`

`ZREVRANGEBYLEX key min max [LIMIT offset count]`

根据我的测试来看，在内部先根据score排序后再根据你给出的字典序排序

验证如下：

::: details 点我查看

这是一个没有顺序的有序集合，我发现完全不能进行字典序排序

```bash{1,3,5,7,9}
127.0.0.1:6379> zadd zz 10 a 5 b 15 c 7 d 8 e 2 f 20 g
(integer) 7
127.0.0.1:6379> ZRANGEBYLEX zz [a [c
(empty list or set)
127.0.0.1:6379> ZREVRANGEBYLEX zz [a [c
(empty list or set)
127.0.0.1:6379> ZREVRANGEBYLEX zz [c [a
(empty list or set)
127.0.0.1:6379> ZRANGEBYLEX zz [c [a
(empty list or set)
127.0.0.1:6379>
```

接着我使用一份从大到小的有序集合

```bash{1,3,7}
127.0.0.1:6379> zadd xx  100 a 90 b 80 c
(integer) 3
127.0.0.1:6379> ZRANGEBYLEX xx [a [c
1) "c"
2) "b"
3) "a"
127.0.0.1:6379> ZREVRANGEBYLEX xx [c [a
1) "a"
2) "b"
3) "c"
```

现根据排好序的集合元素再使用字典序查询出来

但是再使用`(`就死活不能找到东西，我是实在不明白为什么

```bash{1,3,5,7,9,11,13}
127.0.0.1:6379> ZREVRANGEBYLEX xx (c [a
(empty list or set)
127.0.0.1:6379> ZREVRANGEBYLEX  xx [a [c
(empty list or set)
127.0.0.1:6379> ZRANGEBYLEX xx [a (c
(empty list or set)
127.0.0.1:6379> ZRANGEBYLEX xx (c [a
(empty list or set)
127.0.0.1:6379> ZRANGEBYLEX xx [c [a
(empty list or set)
127.0.0.1:6379> ZRANGEBYLEX xx (a (c
(empty list or set)
127.0.0.1:6379> ZREVRANGEBYLEX xx [c (a
(empty list or set)
```

如果集合的score是同一个数字的话就可以实现使用`(`

```bash{1,3,7}
127.0.0.1:6379> ZADD z100 0 a 0 b 0 c
(integer) 3
127.0.0.1:6379> ZRANGEBYLEX z1 [a [c
1) "a"
2) "b"
3) "c"
127.0.0.1:6379> ZRANGEBYLEX z1 (a [c
1) "b"
2) "c"
```

算了，不探究了，应该不怎么需要用到这个东西

:::

start 、end 使用 `[a`和 `(c` 类似的范围取值 `[`是`>=`或`<=`，`(`是`<`或`>`

俩个命令一个前者从小到大，后者从大到小

`LIMIT offset count `可选，offset是开始的索引（索引从0开始），count是个数，用来限制返回的个数



#### 以score区间来查询成员

`ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]`

`ZREVRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]`

前者从小到大，后者从大到小

按照 min，max区间返回符合区间的值 

`withSCORES`可选，选择后与分数一起返回

`LIMIT offset count `可选，offset是开始的索引（索引从0开始），count是个数，用来限制返回的个数

min、max可以是用`(`来表示，区间到这个值，但是不包括这个值 ，比如说（6和（8 ,表示分数取值是6~8 但是不包括6和8

min、max 支持浮点数

```bash{1,3,26,30,42,47}
127.0.0.1:6379> zadd z3 0  a  1 b 2 c  3 d 4 e 5 f 6 g 7 h 8 i 9 j 10 k
(integer) 11
127.0.0.1:6379> ZRANGEBYSCORE  z3 0 10 withscores
 1) "a"
 2) "0"
 3) "b"
 4) "1"
 5) "c"
 6) "2"
 7) "d"
 8) "3"
 9) "e"
10) "4"
11) "f"
12) "5"
13) "g"
14) "6"
15) "h"
16) "7"
17) "i"
18) "8"
19) "j"
20) "9"
21) "k"
22) "10"
127.0.0.1:6379> ZRANGEBYSCORE z3 0 10 limit 5 3
1) "f"
2) "g"
3) "h"
127.0.0.1:6379> ZRANGEBYSCORE z3 0 10
 1) "a"
 2) "b"
 3) "c"
 4) "d"
 5) "e"
 6) "f"
 7) "g"
 8) "h"
 9) "i"
10) "j"
11) "k"
127.0.0.1:6379> ZRANGEBYSCORE z3 (4 6  withscores
1) "f"
2) "5"
3) "g"
4) "6"
127.0.0.1:6379> ZREVRANGEBYSCORE z3 (6 4 withscores
1) "f"
2) "5"
3) "e"
4) "4"
```

### 查询有序集合的成员数

#### 查看指定key的成员数量

`ZCARD key`

返回key的成员数

```bash{1}
127.0.0.1:6379> zcard z1
(integer) 3
```

#### 指定分数区间内的成员数量

`ZCOUNT key start end`

```bash{1,8,10}
127.0.0.1:6379>  ZRANGE z1 0 1000 withscores
1) "c"
2) "80"
3) "b"
4) "90"
5) "a"
6) "100"
127.0.0.1:6379> zcount z1 80 90
(integer) 2
127.0.0.1:6379> ZCOUNT z1 (80 90
(integer) 1
```

start和end可以使用`(`

#### 查询指定字典序成员数量

`ZLEXCOUNT key start end`



```bash{1}
127.0.0.1:6379> ZLEXCOUNT z1 [a [c
(integer) 3
```

::: danger 提示

貌似还是需要按照顺序来....不管这个了

:::

### 查询某个成员的分数值

`ZSCORE key member`

```bash{1,3,5}
127.0.0.1:6379> ZSCORE z1 a
"100"
127.0.0.1:6379> ZSCORE aaadas ddd
(nil)
127.0.0.1:6379> zscore z1 dasdaf
(nil)
```

指定key不存在或者成员不存在时返回nil

### 返回某个成员的索引

以分数排名为索引，分数排名从小到大，以0开始

`ZRANK key member`

```bash{1,3}
127.0.0.1:6379> zrank zz c
(integer) 5
127.0.0.1:6379> ZRANGEBYSCORE zz 0 1000 withscores
 1) "f"
 2) "2"
 3) "b"
 4) "5"
 5) "d"
 6) "7"
 7) "e"
 8) "8"
 9) "a"
10) "10"
11) "c"
12) "15"
13) "g"
14) "20"
```

逆序排行，从大到小：

索引同样的从0开始

`ZREVRANK key  member`

```bash{1}
127.0.0.1:6379> ZREVRANK zz c
(integer) 1
```

### 给有序集合的指定成员加上指定值

指定值可以是负数，相当于减法

指定值可以为整数和浮点数

`ZINCRBY key increment member`

```bash{1,3,5,20,22}
127.0.0.1:6379> ZINCRBY  zz  12.8  c
"27.800000000000001"
127.0.0.1:6379> ZSCORE zz c
"27.800000000000001"
127.0.0.1:6379> ZRANGE zz 0 -1 withscores
 1) "f"
 2) "2"
 3) "b"
 4) "5"
 5) "d"
 6) "7"
 7) "e"
 8) "8"
 9) "a"
10) "10"
11) "g"
12) "20"
13) "c"
14) "27.800000000000001"
127.0.0.1:6379> ZINCRBY zz -19 c
"8.8000000000000007"
127.0.0.1:6379> zrange zz 0 -1 withscores
 1) "f"
 2) "2"
 3) "b"
 4) "5"
 5) "d"
 6) "7"
 7) "e"
 8) "8"
 9) "c"
10) "8.8000000000000007"
11) "a"
12) "10"
13) "g"
14) "20"
```

### 移除成员

#### 按照给定成员移除

`ZREM key member1 [member2 ...]`

移除一个或多个指定的成员

返回值为移除的数量

```bash{1,9,11,17}
127.0.0.1:6379> ZRANGE zz 0 -1
1) "f"
2) "b"
3) "d"
4) "e"
5) "c"
6) "a"
7) "g"
127.0.0.1:6379> zrem zz a c
(integer) 2
127.0.0.1:6379> ZRANGE zz 0 -1
1) "f"
2) "b"
3) "d"
4) "e"
5) "g"
127.0.0.1:6379>  zrem zz a c
(integer) 0
```

#### 按照字典区间移除

返回删除的数量，删除失败也就是删除为0 返回0

`ZREMRANGEBYLEX key start end`

::: warning 提示

依旧需要 顺序....

:::



::: details 顺序不是从小到大时

```bash{1,13,16}
127.0.0.1:6379> zrange zz 0 -1 withscores
 1) "f"
 2) "2"
 3) "b"
 4) "5"
 5) "d"
 6) "7"
 7) "e"
 8) "8"
 9) "g"
10) "20"

127.0.0.1:6379> ZREMRANGEBYLEX zz [a [e
(integer) 0

127.0.0.1:6379> zrange zz 0 -1
1) "f"
2) "b"
3) "d"
4) "e"
5) "g"
```

发现前后不变

:::

::: details 从小到大时

```bash{1,3,5}
127.0.0.1:6379> zadd tt 1 a 2 b 3 c 4 d 5 e 6 f 7 g  8 h 9 i 
(integer) 9
127.0.0.1:6379> ZREMRANGEBYLEX tt [c [g
(integer) 5
127.0.0.1:6379> zrange tt 0 -1
1) "a"
2) "b"
3) "h"
4) "i"
```

删除成功...

:::



#### 根据排名区间删除

`ZREMRANGEBYRANK key start end `

区间 是 [start，end]

返回删除的数量

```bash{1,3,5}
127.0.0.1:6379> zadd tt 1 a 2 b 3 c 4 d 5 e 6 f 7 g  8 h 9 i
(integer) 5
127.0.0.1:6379> ZREMRANGEBYRANK tt 3 7
(integer) 5
127.0.0.1:6379> zrange tt 0 -1
1) "a"
2) "b"
3) "c"
4) "i"
```

索引是从0开始的

#### 根据分数区间来删除

`ZREMRANGEBYSCORE key start end`

区间 是 [start，end]

返回删除的数量

```bash{1,3}
127.0.0.1:6379> ZREMRANGEBYSCORE tt  3 7
(integer) 5
127.0.0.1:6379> zrange tt 0 -1 withscores
1) "a"
2) "1"
3) "b"
4) "2"
5) "h"
6) "8"
7) "i"
8) "9"
```





### 交集和并集



##### 交集

`ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]`

- `numkeys`为设置的key的数量
- `destination `计算给定的一个或多个有序集的交集并将结果集存储在新的有序集合 destination 中
- `[WEIGHTS weight [weight ...]]`可选，设置权重
- `[AGGREGATE SUM|MIN|MAX]`设置模式，默认sum相加



::: details 默认模式 

```bash{1,3,5,7}
127.0.0.1:6379> Zadd qq 11 xiaoming 22 xiaohong 100 libai 99 zhangsan
(integer) 4
127.0.0.1:6379> zadd ww 50 xiaoming 90 libai 200 lisi
(integer) 3
127.0.0.1:6379>  ZINTERSTORE ee 2  qq ww
(integer) 2
127.0.0.1:6379> zrange ee 0 -1 withscores
1) "xiaoming"
2) "61"
3) "libai"
4) "190"
```

可以看出交集的数据相加在了一起，并且赋值给了ee

:::

|      | xiaoming | libai |
| ---- | -------- | ----- |
| qq   | 11       | 100   |
| ww   | 50       | 90    |



::: details 只设置Weights

 

```bash{1,3,8,10,15,17,22,24}
127.0.0.1:6379>  ZINTERSTORE ee 2 qq ww weights 2  10
(integer) 2
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
1) "xiaoming"
2) "522"
3) "libai"
4) "1100"
127.0.0.1:6379>  ZINTERSTORE ee 2  qq ww weights 1  5
(integer) 2
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
1) "xiaoming"
2) "261"
3) "libai"
4) "550"
127.0.0.1:6379>  ZINTERSTORE ee 2 qq ww weights 1  2
(integer) 2
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
1) "xiaoming"
2) "111"
3) "libai"
4) "280"
127.0.0.1:6379> ZINTERSTORE ee 2 qq ww weights 2 3
(integer) 2
127.0.0.1:6379> zrange ee 0 -1 withscores
1) "xiaoming"
2) "172"
3) "libai"
4) "470"
```

发现他们是按照比例进行权重倍数相加

:::

::: details 取最大值和最小值赋值

```bash{1,3,8,10}
127.0.0.1:6379> ZINTERSTORE ee 2 qq ww  aggregate min
(integer) 2
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
1) "xiaoming"
2) "11"
3) "libai"
4) "90"
127.0.0.1:6379>  ZINTERSTORE ee 2 qq ww  aggregate max
(integer) 2
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
1) "xiaoming"
2) "50"
3) "libai"
4) "100"
```

只取最大值或最小值

:::



::: details 加上权重后最大最小值

同时指定权重和聚合方法时，Redis 会首先根据指定的权重对每个集合中的分数进行加权计算，然后根据指定的聚合方法（`SUM`, `MIN`, `MAX`）对加权后的分数进行聚合。

```bash{1,3,8,10}
127.0.0.1:6379> ZINTERSTORE ee 2 qq ww weights  2 3 aggregate min
(integer) 2
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
1) "xiaoming"
2) "22"
3) "libai"
4) "200"
127.0.0.1:6379>  ZINTERSTORE ee 2 qq ww weights  2 3 aggregate max
(integer) 2
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
1) "xiaoming"
2) "150"
3) "libai"
4) "270"
```







:::







#### 并集

`ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE SUM|MIN|MAX]`

与交集类似，不多阐述

|      | xiaoming | libai |xiaohong|zhangsan|lisi|
| ---- | -------- | ----- |----|----|----|
| qq   | 11       | 100   |22|99||
| ww   | 50       | 90    |||200|


::: details 默认模式 

```bash{1,3,=}
127.0.0.1:6379> ZUNIONSTORE ee 2 qq ww
(integer) 5
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
 1) "xiaohong"
 2) "22"
 3) "xiaoming"
 4) "61"
 5) "zhangsan"
 6) "99"
 7) "libai"
 8) "190"
 9) "lisi"
10) "200"
```



:::



::: details 只设置Weights

``` bash{1,3}
127.0.0.1:6379> ZUNIONSTORE ee 2 qq ww weights 2 3
(integer) 5
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
 1) "xiaohong"
 2) "44"
 3) "xiaoming"
 4) "172"
 5) "zhangsan"
 6) "198"
 7) "libai"
 8) "470"
 9) "lisi"
10) "600"
```

根据所设置 的 权重来相乘后相加

:::

::: details 最大最小值

```bash{1,3,14,16}
127.0.0.1:6379> ZUNIONSTORE ee 2 qq ww aggregate min
(integer) 5
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
 1) "xiaoming"
 2) "11"
 3) "xiaohong"
 4) "22"
 5) "libai"
 6) "90"
 7) "zhangsan"
 8) "99"
 9) "lisi"
10) "200"
127.0.0.1:6379> ZUNIONSTORE ee 2 qq ww aggregate max
(integer) 5
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
 1) "xiaohong"
 2) "22"
 3) "xiaoming"
 4) "50"
 5) "zhangsan"
 6) "99"
 7) "libai"
 8) "100"
 9) "lisi"
10) "200"
```

:::

::: details 加上权重后的最大最小值

同时指定权重和聚合方法时，Redis 会首先根据指定的权重对每个集合中的分数进行加权计算，然后根据指定的聚合方法（`SUM`, `MIN`, `MAX`）对加权后的分数进行聚合。

```bash{1,3,14,16}
127.0.0.1:6379> ZUNIONSTORE ee 2   ww qq  weights 3 2 aggregate min
(integer) 5
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
 1) "xiaoming"
 2) "22"
 3) "xiaohong"
 4) "44"
 5) "zhangsan"
 6) "198"
 7) "libai"
 8) "200"
 9) "lisi"
10) "600"
127.0.0.1:6379>  ZUNIONSTORE ee 2   ww qq  weights 3 2 aggregate max
(integer) 5
127.0.0.1:6379> ZRANGE ee 0 -1 withscores
 1) "xiaohong"
 2) "44"
 3) "xiaoming"
 4) "150"
 5) "zhangsan"
 6) "198"
 7) "libai"
 8) "270"
 9) "lisi"
10) "600"
```



:::

### ZSCAN

类似SCAN

详细请看[SCAN](/db/Redis/command/通用命令#scan)
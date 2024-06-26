---
titile: SET
---

# SET-集合

Redis 的 Set 是 String 类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。

Redis 中集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。

集合中最大的成员数为 232 - 1 (4294967295, 每个集合可存储40多亿个成员)。

## 常用命令

- `sadd key  value1 value2...`  

  往key加入多个value或单个

  ```bash
  127.0.0.1:6379> Sadd s1 1 2 3 4 5 6
  (integer) 6
  ```

- `scard key`

  返回集合的value数量

  ```bash
  127.0.0.1:6379> scard s1
  (integer) 6
  ```

  

- `spop key [count]`

  随机删除count个key集合的数值，并返回结果

  不设置count则默认为1

  不存在则返回nil

  ```bash
  127.0.0.1:6379> spop s1
  "4"
  127.0.0.1:6379> spop s1 2
  1) "3"
  2) "5"
  127.0.0.1:6379> spop key
  (nil)
  ```

  

- `SMEMBERS key`

  返回集合的所有值

  ```bash
  127.0.0.1:6379> SMEMBERS s1
  1) "2"
  2) "6"
  ```

- `SRANDMEMBER key [count]`

  随机返回count个数值，不删除

  不设置count默认为1

  不存在key返回nil

  ```bash{1,11,13,17}
  127.0.0.1:6379> SMEMBERS s1
  1) "1"
  2) "2"
  3) "3"
  4) "4"
  5) "5"
  6) "6"
  7) "7"
  8) "8"
  9) "9"
  127.0.0.1:6379> SRANDMEMBER s1
  "7"
  127.0.0.1:6379> SRANDMEMBER s1 3
  1) "1"
  2) "9"
  3) "3"
  127.0.0.1:6379> SRANDMEMBER key
  (nil)
  ```

- `SREM key member1 [member2 ...] `

  删除集合key中单个或多个member，返回被删除的个数

  ```bash{1,3,5}
  127.0.0.1:6379> SREM s1 1 11
  (integer) 1
  127.0.0.1:6379> srem s1 11
  (integer) 0
  127.0.0.1:6379> SMEMBERS s1
  1) "2"
  2) "3"
  3) "4"
  4) "5"
  5) "6"
  6) "7"
  7) "8"
  8) "9"
  ```

- `SISMEMBER key member`

  判断member是否存在于集合key中

  存在返回1，不存在返回0

  ```bash
  127.0.0.1:6379> SISMEMBER s1 1
  (integer) 0
  127.0.0.1:6379> SISMEMBER s1 2
  (integer) 1
  ```

- `SMOVE key1 key2 member`

  把key1 的member转移到key2

  成功返回1，无论key2是否存在，key1的member都会被删除

  ```bash{1,3,5,15,17,19,27}
  127.0.0.1:6379> SMOVE s1 s2 2
  (integer) 1
  127.0.0.1:6379> SMEMBERS s2
  1) "2"
  127.0.0.1:6379> SMEMBERS s1
  1) "3"
  2) "4"
  3) "5"
  4) "6"
  5) "7"
  6) "8"
  7) "9"
  
  # 把2 重新加入 s1 再转移到 s2 查看是否会被删除
  127.0.0.1:6379> sadd s1 2
  (integer) 1
  127.0.0.1:6379> SMOVE s1 s2 2
  (integer) 1
  127.0.0.1:6379> SMEMBERS s1
  1) "3"
  2) "4"
  3) "5"
  4) "6"
  5) "7"
  6) "8"
  7) "9"
  127.0.0.1:6379> SMEMBERS s2
  1) "2"
  ```

  

### 交集、并集、差集

我有俩个集合s1、s2

```bash
127.0.0.1:6379> SMEMBERS s1
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
6) "6"
127.0.0.1:6379> SMEMBERS s2
1) "1"
2) "2"
3) "3"
4) "11"
```

> 无论是交集、并集还是差集，都需要俩个以上的集合进行计算
>
> 如果只给出一个则相当于`SMEMBERS`,返回集合所有值
>
> ```bash
> 127.0.0.1:6379> SINTER s1
> 1) "1"
> 2) "2"
> 3) "3"
> 4) "4"
> 5) "5"
> 6) "6"
> ```
>
> 

![image-20240626172227821](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240626172227821.webp)

#### 交集

`SINTER key1 key2 ...`

```bash
127.0.0.1:6379> SINTER s1 s2
1) "1"
2) "2"
3) "3"
```



`SINTERSTORE newKey k1 k2 ...`

把k1.....kn的交集设为newKey的值

```bash
127.0.0.1:6379> SINTERSTORE news1 s1 s2
(integer) 3
127.0.0.1:6379> SMEMBERS news1
1) "1"
2) "2"
3) "3"
```





#### 并集

`SUNION key1 key2 ...`

```bash
127.0.0.1:6379> SUNION s1 s2
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
6) "6"
7) "11"
```



`SUNIONSTORE newKey k1 k2 ...`

把k1.....kn的并集设为newKey的值

```bash
127.0.0.1:6379> SUNIONSTORE  news2 s1 s2
(integer) 7
127.0.0.1:6379> SMEMBERS news2
1) "1"
2) "2"
3) "3"
4) "4"
5) "5"
6) "6"
7) "11"
```



####   差集

差集为自身减去交集

`SDIFF key1 key2 ...`

```bash
127.0.0.1:6379> SDIFF s1 s2
1) "4"
2) "5"
3) "6"
127.0.0.1:6379> SDIFF s2 s1
1) "11"
```



`SDIFFSTORE newKey k1 k2 ...`

把k1.....kn的差集设为newKey的值

```bash
127.0.0.1:6379> SDIFFSTORE news3 s1 s2
(integer) 3
127.0.0.1:6379> SMEMBERS news3
1) "4"
2) "5"
3) "6"
```

### SSCAN

类似scan

具体参考：[SCAN](/Redis/command/通用命令#scan)

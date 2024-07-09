# HyperLogLog

HyperLogLog 是用来做基数统计的算法，它根据算法计算出key中不同的元素。优点是，在输入元素的数量或者体积非常非常多非常大的时候，计算基数所需的空间总是固定 的、并且是很小的。

无论多大的数量，在HyperLogLog中不超过16kb。但是会有一个弊端，会有误差，误差会在千分之几的范围内。

因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。

## 常用指令

### 添加元素

`PFADD key element [element ...]`



### 返回元素数量

`PFCOUNT key [key ...]`

多个key时返回不同的元素量之和，相当于交集

### 合并多个key赋值给新key

`PFMERGE destkey sourcekey [sourcekey ...]`

destkey 为新key



示例：

```bash{1,3,5,7,9,11,13}
127.0.0.1:6379> PFADD p 1 2 3 4 5 6  7 8 9
(integer) 1
127.0.0.1:6379> PFCOUNT p
(integer) 9
127.0.0.1:6379> pfadd f 1 2 3 4  5 6 11 12 13 14 15
(integer) 1
127.0.0.1:6379> PFCOUNT f
(integer) 11
127.0.0.1:6379> PFCOUNT p f
(integer) 14
127.0.0.1:6379> PFMERGE o p f
OK
127.0.0.1:6379> PFCOUNT o
(integer) 14
```



---

## 使用场景

计算不同元素且不需要知道详细信息，且接收一定误差

例如网站访客量，要求元素不同但不需要知道信息
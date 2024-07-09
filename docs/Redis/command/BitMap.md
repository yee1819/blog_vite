# BitMap-- 位图

是一串01数字串，利用string实现的bitmap，上限是2<sup>32</sup>的bit位,即512M的容量。

实际使用有布尔过滤器、签到天数计算

## 常用命令

- `SetBit key offest value`

  往指定位置设置值 , 并返回原来的值，默认值为0

- `GETBIT key offest`

  获取offest的值

  ```bash
  127.0.0.1:6379> getbit b1 0
  (integer) 0
  127.0.0.1:6379> setbit b1 0 1
  (integer) 0
  127.0.0.1:6379> GETBIT b1 0
  (integer) 1
  127.0.0.1:6379> setbit b1 0 0
  (integer) 1
  127.0.0.1:6379> getbit b1 0
  (integer) 0
  ```

  :::tip 

  值得注意的是bitmap是以string为基础实现，即最低使用一个字节，即8位。

  如果我在第14位设置1，那么他会自动填充0到16位

  ```bash
  127.0.0.1:6379> SETBIT b1 13 1
  (integer) 0
  ```

  ![image-20240710031544272](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407100316179.webp)

  :::

- `BITCOUNT  key   [start end]`    

  ```bash{3,8}
  127.0.0.1:6379> SETBIT b1 1 1
  (integer) 0
  #此时bit为 0100000000000100
  127.0.0.1:6379> bitcount b1
  (integer) 2
  127.0.0.1:6379> BITCOUNT b1 0 1
  (integer) 2
  # start 和 end  的范围是指字节范围，即n*8位的个数有多少个1
  127.0.0.1:6379> bitcount b1 0 0
  (integer) 1
  ```

  

- ` BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT | FAIL]`

  可以写、读、自增

  只解释读取

  get以十进制读取，type设置模式是读取的位数`i`为带符号读取，`u`为不带符号读取，offest为从哪位开始读取

  现在我的key对应的值为`1100000000000100`

  ```bash{1,3}
  127.0.0.1:6379> BITFIELD b1 get i2 0
  1) (integer) -1
  127.0.0.1:6379> BITFIELD b1 get u2 0
  1) (integer) 3
  ```

  很明显能看出来我的前俩位二进制数为`11`

  如果是以十进制读取，第一位是符号位，1为负数，读取是-1

  u不带符号读取的11就是3

- `bitpos key value [start end]`  

  查找第一个value出现的位置，start和end依旧是字节的范围
  
  1100000000000100
  
  ```bash{1,3,5,7}
  127.0.0.1:6379> BITPOS b1 0
  (integer) 2
  127.0.0.1:6379> bitpos b1 1
  (integer) 0
  127.0.0.1:6379> bitpos b1 0 1 1
  (integer) 8
  127.0.0.1:6379> bitpos b1  1 1 1
  (integer) 13
  ```

- `BITOP <AND | OR | XOR | NOT> destkey key [key ...]`

  对bitmap进行位运算



## 进行String指令

因为bitmap是基于string创建的，所以bitmap可以使用string的命令

```bash
127.0.0.1:6379> STRLEN b1
(integer) 2
127.0.0.1:6379> get b1
"0\x04"
```

`1100000000000100`是两字节


# GEO

GEO，地理信息定位，是redis的一个特殊数据结构，使用ZSet进行存储

有着一系列关于地理信息位置的命令，对于距离的计算等等





## 常用命令

### 添加地理位置的信息

`geoadd key longitude latitude member [longitude latitude member ...]`

- `longitude`、` latitude`是地理信息的经纬度
- `member`是地理位置的名称，自定义

```sh
127.0.0.1:6379> geoadd cities:locations 116.28 39.55 beijing
(integer) 1
```

底层基于ZSET实现，所以member默认为唯一，再次输入北京

```sh
127.0.0.1:6379> geoadd cities:locations 116.28 39.55 beijing
(integer) 0
```

可以一次性加入多个member

```bash
127.0.0.1:6379> geoadd cities:locations 117.12 39.08 tianjin 114.29 38.02 shijiazhuang 118.01 39.38 tangshan 115.29 38.51 baoding
(integer) 4
```

可视化界面查看GEO存储信息，发现redis根据特定算法把经纬度存储为一个字符串以Score存储

![image-20240709230738622](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407092307848.webp)

### 返回地理信息

`geopos key member [member ...]`

返回地理信息的经纬度,参数可以为一个或多个

```bash
127.0.0.1:6379> geopos cities:locations beijing shijiazhuang
1) 1) "116.28000229597092"
   2) "39.550000724547083"
2) 1) "114.29000169038773"
   2) "38.019999942510374"
   
127.0.0.1:6379> geopos cities:locations beijing
1) 1) "116.28000229597092"
   2) "39.550000724547083"
```

### 获取俩个地点的距离

`geodist key member1 member2 [unit]`

-  其中`unit`为单位，不添加默认为m，取值有：
  - m（meters）代表米
  - km（kilometers）代表公里
  - mi（miles）代表英里
  - ft（feet）代表尺

```sh
127.0.0.1:6379> geodist cities:locations beijing shijiazhuang
"242326.2997"
127.0.0.1:6379> geodist cities:locations beijing shijiazhuang km
"242.3263"
127.0.0.1:6379> geodist cities:locations beijing shijiazhuang m
"242326.2997"
```



### 指定范围搜索member

#### Redis 6.2 版本之前

- `GEORADIUS key longitude latitude radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]`

  根据经纬度的位置查询距离多远内的地理位置成员

- `GEORADIUSBYMEMBER key member radius m|km|ft|mi [WITHCOORD] [WITHDIST] [WITHHASH] [COUNT count] [ASC|DESC] [STORE key] [STOREDIST key]`

  根据member的位置查询距离多远内的地理位置成员

填入北京的坐标,距离北京100km内的成员

```bash
127.0.0.1:6379>  GEORADIUS cities:locations 116.28000229597092 39.550000724547083 100 km
1) "beijing"
2) "tianjin"
```

使用北京的member

```bash
127.0.0.1:6379> GEORADIUSBYMEMBER cities:locations beijing 100 km
1) "beijing"
2) "tianjin"
```

可选参数中：

- `WITHCOORD`：返回坐标值

  ```bash
  127.0.0.1:6379> GEORADIUSBYMEMBER cities:locations beijing 100 km WITHCOORD
  1) 1) "beijing"
     2) 1) "116.28000229597092"
        2) "39.550000724547083"
  2) 1) "tianjin"
     2) 1) "117.12000042200089"
        2) "39.080000053576654"
  ```

- `WITHDIST`：返回离member的距离

  ```bash
  127.0.0.1:6379> GEORADIUSBYMEMBER cities:locations beijing 100 km WITHDIST
  1) 1) "beijing"
     2) "0.0000"
  2) 1) "tianjin"
     2) "89.2061"
  ```

- `WITHHASH`：返回哈希编码

  ```bash
  127.0.0.1:6379> GEORADIUSBYMEMBER cities:locations beijing 100 km WITHHASH
  1) 1) "beijing"
     2) (integer) 4069140618056030
  2) 1) "tianjin"
     2) (integer) 4069185565231353
  ```

- `[COUNT count]`：设定返回的条数

  ```bash
  127.0.0.1:6379> GEORADIUSBYMEMBER cities:locations beijing 100 km count 1
  1) "beijing"
  ```

- `[ASC|DESC]`：选择从大到小或者从小到大

  ```bash{1,3,5,8}
  127.0.0.1:6379> GEORADIUSBYMEMBER cities:locations beijing 100 km count 1 asc
  1) "beijing"
127.0.0.1:6379> GEORADIUSBYMEMBER cities:locations beijing 100 km count 1 desc
  1) "tianjin"
  127.0.0.1:6379> GEORADIUSBYMEMBER cities:locations beijing 100 km desc
  1) "tianjin"
  2) "beijing"
  127.0.0.1:6379> GEORADIUSBYMEMBER cities:locations beijing 100 km WITHDIST  WITHCOORD  desc
  1) 1) "tianjin"
     2) "89.2061"
     3) 1) "117.12000042200089"
        2) "39.080000053576654"
  2) 1) "beijing"
     2) "0.0000"
     3) 1) "116.28000229597092"
        2) "39.550000724547083"
  ```

- store key：将返回结果的地理位置信息保存到指定键；

- storedist key：将返回结果离中心节点的距离保存到指定键。


```bash
127.0.0.1:6379>  GEORADIUSBYMEMBER cities:locations beijing 100 km store k1
(integer) 2
127.0.0.1:6379> zrange k1 0 -1
1) "beijing"
2) "tianjin"
127.0.0.1:6379> zrange k1 0 -1 withscores
1) "beijing"
2) "4069140618056030"
3) "tianjin"
4) "4069185565231353"
127.0.0.1:6379>  GEORADIUSBYMEMBER k1  beijing 100 km
1) "beijing"
2) "tianjin"
127.0.0.1:6379> GEORADIUSBYMEMBER cities:locations beijing 100 km storedist k2
(integer) 2
127.0.0.1:6379> ZRANGE k2 0 -1 withscores
1) "beijing"
2) "0"
3) "tianjin"
4) "89.206057589342976"
```



---



::: tip 

备选命令可以多个组合

:::

#### 6.2 版本之后



`GEOSEARCH key <FROMMEMBER member | FROMLONLAT longitude latitude>
  <BYRADIUS radius <M | KM | FT | MI> | BYBOX width height <M | KM |
  FT | MI>> [ASC | DESC] [COUNT count [ANY]] [WITHCOORD] [WITHDIST]
  [WITHHASH]`

其中

- `<FROMMEMBER member | FROMLONLAT longitude latitude>`

  二选一。前者是根据成员，后者根据坐标

- `<BYRADIUS radius <M | KM | FT | MI> | BYBOX width height <M | KM |FT | MI>>`

  二选一，前者是圆的半径，后者是矩形，添入距离位置的长和宽，后面是单位

- `[ASC | DESC]`

  排序顺序

- `[COUNT count [ANY]]`

  设置返回的个数，其中加上`any`代表着即使只找到少于 `count` 参数指定数量的结果也返回这些结果，而不是必须满足 `count` 参数要求的数量。如果不加 `ANY` 参数，返回的结果数量必须等于 `count` 参数指定的数量，否则会返回空结果。

- `[WITHCOORD] [WITHDIST] [WITHHASH]`

  与上面一样

```bash{1,3,8,11}
127.0.0.1:6379> geoadd c1 116.28 39.55 beijing 117.12 39.08 tianjin 114.27 38.02 shijiazhuang 118.01 39.38 tangshan 115.29 38.51 baoding
(integer) 5
127.0.0.1:6379> GEOSEARCH c1 frommember beijing byradius 100 km withdist
1) 1) "beijing"
   2) "0.0000"
2) 1) "tianjin"
   2) "89.2061"
127.0.0.1:6379> GEOSEARCH c1 frommember beijing bybox 50 50 km withdist
1) 1) "beijing"
   2) "0.0000"
127.0.0.1:6379> geosearch c1 frommember beijing bybox 100 100 km withdist
1) 1) "beijing"
   2) "0.0000"
```



---

`GEOSEARCHSTORE destination source <FROMMEMBER member |FROMLONLAT longitude latitude> <BYRADIUS radius <M | KM | FT | MI>| BYBOX width height <M | KM | FT | MI>> [ASC | DESC] [COUNT count[ANY]] [STOREDIST]`

把`source `查找出来的值存储到`destination `指定的key中

```bash{1,3,5,7,23,25}
redis> GEOADD Sicily 13.361389 38.115556 "Palermo" 15.087269 37.502669 "Catania"
(integer) 2
redis> GEOADD Sicily 12.758489 38.788135 "edge1"   17.241510 38.788135 "edge2"
(integer) 2
redis> GEOSEARCHSTORE key1 Sicily FROMLONLAT 15 37 BYBOX 400 400 km ASC COUNT 3
(integer) 3
redis> GEOSEARCH key1 FROMLONLAT 15 37 BYBOX 400 400 km ASC WITHCOORD WITHDIST WITHHASH
1) 1) "Catania"
   2) "56.4413"
   3) (integer) 3479447370796909
   4) 1) "15.08726745843887329"
      2) "37.50266842333162032"
2) 1) "Palermo"
   2) "190.4424"
   3) (integer) 3479099956230698
   4) 1) "13.36138933897018433"
      2) "38.11555639549629859"
3) 1) "edge2"
   2) "279.7403"
   3) (integer) 3481342659049484
   4) 1) "17.24151045083999634"
      2) "38.78813451624225195"
redis> GEOSEARCHSTORE key2 Sicily FROMLONLAT 15 37 BYBOX 400 400 km ASC COUNT 3 STOREDIST
(integer) 3
redis> ZRANGE key2 0 -1 WITHSCORES
1) "Catania"
2) "56.4412578701582"
3) "Palermo"
4) "190.44242984775784"
5) "edge2"
6) "279.7403417843143"
```





### Hash编码

Redis使用geohash将二维经纬度转换为一维字符串

`GEOHASH key member [member ...]`

```bash
127.0.0.1:6379> geohash cities:locations beijing
1) "wx48ypbe2q0"
```



geohash有如下特点：

- GEO的**数据类型为zset**，Redis将所有地理位置信息的geohash存放在zset中。
- 字符串越长，表示的位置更精准。
- **两个字符串越相似，它们之间的距离越近**，Redis利用字符串前缀匹配算法实现相关命令
- geohash编码和经纬度是可以相互转换的。

![1260387-20180104001429878-1161710337](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407100137179.webp)



## 通用ZSET指令

因为底层基于ZSET实现，所以ZSET的指令再GEO依然可以使用

例如查询所有城市

```bash
127.0.0.1:6379> ZRANGE cities:locations 0 -1
1) "shijiazhuang"
2) "baoding"
3) "beijing"
4) "tianjin"
5) "tangshan"
```

删除某个地理位置

```sh
127.0.0.1:6379> zrem cities:locations tangshan
(integer) 1
```


# 全局id生成器

订单号如果使用数据库自增会有规律太明显、受单表数据量限制、分布式系统限制等等局限

全局id生成器是分布系统下生成全局id的工具，需要满足

- 唯一性
- 递增性
- 安全性
- 高可用
- 高性能

----

黑马的方案：

long型数据64位字节

- 第一位是符号位默认0

- 31位的时间戳，以秒为单位能保证69年数据不重复
- 32的序列号，32bit，每秒产生2**32的不同id

实现：

```java{13-27}
@Component
public class RedisIdWorker {

//    private static final long BEGIN_TIMESTAMP = getSecond();
    //即2022.1.1
    private static final long BEGIN_TIMESTAMP = 1640995200L;

    private static final int COUNT_BITS = 32;
    private StringRedisTemplate stringRedisTemplate;
    public RedisIdWorker(StringRedisTemplate stringRedisTemplate){
        this.stringRedisTemplate = stringRedisTemplate;
    }
    public long nextId(String keyPrefix){
        //生成时间戳
        LocalDateTime now = LocalDateTime.now();
        //获取当前时间戳秒数
        long nowSecond = now.toEpochSecond(ZoneOffset.UTC);
        //减去开始时间戳     保证安全性不被人猜出来
        long timeStamp = nowSecond - BEGIN_TIMESTAMP;
        //获取当前日期
        String format = now.format(DateTimeFormatter.ofPattern("yyyy:MM:dd"));
        //可以年:月:日作为key记录每天的营业额
        //获取序列号
        long count = stringRedisTemplate.opsForValue().increment("icr:" + keyPrefix + ":" + format);
        //拼接
        return timeStamp << COUNT_BITS | count;
    }


    public long getSecond(){
        LocalDateTime time = LocalDateTime.of(2022, 1, 1, 0, 0, 0);
        long second = time.toEpochSecond(ZoneOffset.UTC);
        System.out.println(second);
        return second;
    }
}
```

---

其他实现：

- UUID
- 雪花算法

- ....






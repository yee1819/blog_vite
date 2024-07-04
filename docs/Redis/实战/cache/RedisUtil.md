# Redis工具类

无论是逻辑过期还是互斥锁在实现过程都略显复杂，要是每类信息都要来一遍编码，编码效率大大降低，所以使用编写工具类的形式变为一次实现，多次调用的快捷方式。

## 实现

新建工具类，设置`@Component`被IOC容器管理

```java
@Component
public class CacheClient {

//    @Resource
    private  final   StringRedisTemplate stringRedisTemplate;

    public CacheClient(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }
}
```

### 设置过期时间

```java
public void set(String key , Object value, Long time, TimeUnit unit){
    stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(value),time,unit);
}
```

### 封装缓存逻辑过期

```java
public void setWithLogicalExpire(String key , Object value, Long time, TimeUnit unit){
    RedisData redisData = RedisData.builder()
            .data(value)
            .expireTime(LocalDateTime.now().plusSeconds(unit.toSeconds(time)))
            .build();
    stringRedisTemplate.opsForValue().set(key, JSONUtil.toJsonStr(redisData));
}
```

### 解决缓存穿透的空对象

```java
public <R,ID>R queryWithPassThrough(String keyPrefix, ID id, Class<R> type , Function<ID,R> dbFallback,Long time,TimeUnit unit){
    String key = keyPrefix + id;
    String json = stringRedisTemplate.opsForValue().get(key);
    //判断是否存在 NULL不成立
    if (StrUtil.isNotBlank(json)){
        //存在缓存则返回
        return JSONUtil.toBean(json,type);

    }
    //为空时
    if (json != null){
        return null;
    }
    //函数式编程
    R r = dbFallback.apply(id);
    //对象为空
    if (r == null){
        //返回空值，缓存设置为空
        stringRedisTemplate.opsForValue().set(key,"",RedisConstants.CACHE_NULL_TTL, TimeUnit.MINUTES);
        return null;
    }

    set(key,r,time,unit);
     return  r;
}
```

使用时注入

```java
@Resource
CacheClient cacheClient;
```

调用方法

```java{2}
Shop shop1 = cacheClient.queryWithPassThrough(RedisConstants.CACHE_SHOP_KEY, id, Shop.class, id2 -> getById(id), RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES);
Shop shop2 = cacheClient.queryWithPassThrough(RedisConstants.CACHE_SHOP_KEY, id, Shop.class, this::getById, RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES);
```

两种方式均可



### 逻辑过期的封装

把互斥锁的设置与释放放入工具类

```java
    private boolean tryLock(String key){
        Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(key, "1", RedisConstants.LOCK_SHOP_TTL, TimeUnit.SECONDS);
        return BooleanUtil.isTrue(flag);//直接返回会拆箱有空值
    }

    private  void unLOCK(String key){
        stringRedisTemplate.delete(key);
    }
```

线程池也拉过来

```java
private static final ExecutorService CACHE_REBUILD_EXECUTOR = Executors.newFixedThreadPool(10);
```

逻辑过期函数

```java
 public <R,ID> R queryWithLogicalExpire(String keyPrefix,ID id,Class<R> type,Function<ID,R> dbFallback,Long time,TimeUnit unit){
        String key = keyPrefix + id;
        String json = stringRedisTemplate.opsForValue().get(key);
        //判断是否存在
        if (StrUtil.isBlank(json)){
//            如果不存在直接返回NULL
            return null;
        }

        //反序列化为对象
        RedisData redisData = JSONUtil.toBean(json, RedisData.class);
        R r = JSONUtil.toBean((JSONObject) redisData.getData(),type);

        //未过期返回
        if (redisData.getExpireTime().isAfter(LocalDateTime.now())){
            return r;
        }
        //获取互斥锁
        boolean lock = tryLock(RedisConstants.LOCK_SHOP_KEY + id);
        if (lock){
//            获取成功
            CACHE_REBUILD_EXECUTOR.submit(()->{
                //重建缓存
                try {
                    //查询数据库
                    R r1 = dbFallback.apply(id);
                    //写入redis
                    this.setWithLogicalExpire(key,id,time,unit);
                } catch (Exception e) {
                    throw new RuntimeException(e);
                }finally {
                    unLOCK(RedisConstants.LOCK_SHOP_KEY + id);
                }
            });
        }

        return r;
    }
```

调用方式

```java{1}
Shop shop3 = cacheClient.queryWithLogicalExpire(RedisConstants.CACHE_SHOP_KEY, id, Shop.class, id2 -> getById(id2), RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES);
Shop shop4 = cacheClient.queryWithLogicalExpire(RedisConstants.CACHE_SHOP_KEY, id, Shop.class, this::getById, RedisConstants.CACHE_SHOP_TTL, TimeUnit.MINUTES);
```

两种均可








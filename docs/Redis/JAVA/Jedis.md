# Jedis框架







## 基本使用

### 1. 引入依赖

```xml
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
</dependency>
```



### 2. 设置连接参数

```java
var jedis = new Jedis("localhost", 6379);
jedis.auth("201819");
jedis.select(0);
return jedis;
```



### 3. 使用方法

```java
System.out.println(jedis.get("name"));
jedis.set("name","kirari");
System.out.println(jedis.get("name"));
```

基本跟redis原来的命令一模一样

### 4. 释放资源

```java
if (jedis!=null){
    jedis.close();
}
```



### Spring测试类中测试

```java
    private  Jedis jedis;

	@BeforeEach
    void setUp() {
          jedis  = new Jedis("127.0.0.1",6379);
          jedis.auth("201819");
          jedis.select(0);
    }

    @Test
    public void test() {
        System.out.println(jedis.get("name"));
        jedis.set("name","kirari");
        System.out.println(jedis.get("name"));
    }

    @AfterAll
    void tearDown() {
        if (jedis!=null){
            jedis.close();
        }
    }
```



### SpringBoot 风格

把Jedis设置Bean交给IOC容器分配

配置类中

```java
@Configuration
public class JedisUtil {

    @Bean
    @ConditionalOnMissingBean
    Jedis JedisConfig(){
        var jedis = new Jedis("localhost", 6379);
        jedis.auth("201819");
        jedis.select(0);
        return jedis;
    }

}
```

测试类中自动装配

```java
    @Autowired
    private  Jedis jedis;

    @BeforeEach
    void setUp() {
//        Jedis jedis = new Jedis();
//          jedis  = new Jedis("127.0.0.1",6379);
//          jedis.auth("201819");
//          jedis.select(0);
    }

    @Test
    public void test() {
        System.out.println(jedis.get("name"));
        jedis.set("name","kirari");
        System.out.println(jedis.get("name"));
    }

    @AfterAll
    void tearDown() {
        if (jedis!=null){
            jedis.close();
        }
    }
```

测试结果

```sh
kirari
kirari

```



## 线程池

与mysql一样如果频繁创建又销毁会造成性能浪费

且Jedis线程本身不安全

使用线程池可以解决一些问题

配置线程池

```java
public class JedisConnectionFactory {
    private  static  final JedisPool jedisPool;
    static {
        // 创建连接池配置对象
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxTotal(10);//最大连接数
        jedisPoolConfig.setMaxIdle(10);//最大空闲连接数
        jedisPoolConfig.setMinIdle(0);//最小空闲连接数
        jedisPoolConfig.setMaxWaitMillis(1000);//最大等待时间

        // 创建连接池//                                 地址            端口        超时         //密码
        jedisPool = new JedisPool(jedisPoolConfig,"127.0.0.1", 6379,100,"201819");



    }
    public static Jedis getJedis()
    {
        return jedisPool.getResource();
    }

}
```

可以通过getJedis()方法直接获取线程池

```java
public class JedisTest {
    private  Jedis jedis;

    @BeforeEach
    void setUp() {
        jedis = JedisConnectionFactory.getJedis();
    }

    @Test
    public void test() {
        System.out.println(jedis.get("name"));
        jedis.set("name","kirari");
        System.out.println(jedis.get("name"));
    }

    @AfterAll
    void tearDown() {
        if (jedis!=null){
            jedis.close();
        }
    }
```

测试结果：

```sh
kirari
kirari

```






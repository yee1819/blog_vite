# SpringBoot整合Redis

::: tip 开源地址

[spring-projects/spring-data-redis：提供支持，以便在使用 Redis 时提高开发人员在 Java 中的工作效率。使用熟悉的 Spring 概念，例如用于核心 API 使用的模板类和轻量级存储库样式的数据访问。 ](https://github.com/spring-projects/spring-data-redis)

**官网**

[Spring Data Redis :: Spring Data Redis](https://docs.spring.io/spring-data/redis/reference/index.html)

:::

SpringBoot对Redis的客户端做了一个整合

对Java的两个比较常用的客户端（[Jedis](https://github.com/redis/jedis)、[Lettuce](https://github.com/redis/lettuce)）做了一个封装整合

且像JDBC一样对调用的方法做了一个同样的规定：

使用`RedisTemplate`对象对Redis某个数据类型的命令或通用命令有一套统一的API进行调用

内置了Redis连接词，只需要在配置文件中声明连接词就可以使用Redis连接池进行管理连接对象了

## 基本使用

示例：

现在可以使用配置文件来配置Redis连接了

::: code-group

```yml [未配置连接池]
spring:
  data:
    redis:
      database: 0
      host: 127.0.0.1
      port: 6379
      password: 201819
      timeout: 3000ms
```

```yml [配置连接池后]
spring:  
    data:
      redis:
        database: 0
        host: 127.0.0.1
        port: 6379
        password: 201819
        timeout: 3000ms
        lettuce:
          pool:
            enabled: true
            max-active: 8
            max-idle: 8
            min-idle: 0
            max-wait: 100ms
```

:::





如果没有配置连接池默认不使用连接池

配置连接池：



在代码中使用 ：



```java
package com.kirari.redisdemo;


import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.*;

import java.util.Set;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class SpringRedis {
    @Autowired
//    @Qualifier("redisTemplate")
    RedisTemplate redisTemplate;

    @Test
    public void test()
    {
        redisTemplate.opsForValue().set("name","pppp");
        System.out.println(redisTemplate.opsForValue().get("name"));
        
        var hashOperations = redisTemplate.opsForHash();
        hashOperations.put("hash","name","kirari");
        
        var listOperations = redisTemplate.opsForList();
        listOperations.leftPush("list","xiaoming");
        
        var setOperations = redisTemplate.opsForSet();
        setOperations.add("set","yee");
        
        var zSetOperations = redisTemplate.opsForZSet();
        zSetOperations.add("zset",1,1);
        
        Set keys = redisTemplate.keys("*");
        keys.forEach(System.out::println);
    }
}
```

::: tip 提示 

 注入`RedisTemplate`即可使用redis的命令操作
 值得注意的是`RedisTemplate`会有俩个Bean（`RedisTemplate`,`stringRedisTemplate`） 如果命名不是与Bean名称一样则需要通过指定

:::

我们可以看到`redisTemplate`模板有五个方法 以及本身可以调用不同的基本类型以及通用命令

| 方法                        | 作用               |
| --------------------------- | ------------------ |
| redisTemplate.opsForValue() | 对String类型的操作 |
| redisTemplate.opsForHash()  | 对Hash类型的操作   |
| redisTemplate.opsForList()  | 对List类型的操作   |
| redisTemplate.opsForSet();  | 对Set类型的操作    |
| redisTemplate.opsForZSet(); | 对Zset的操作       |
| redisTemplate               | 对通用命令的操作   |

## 序列化

我现在 对 redis存入以下内容

```java
redisTemplate.opsForValue().set("name","小明");
System.out.println(redisTemplate.opsForValue().get("name"));
```

发现输出的内容是

```java
小明
```

我们到Redis中 查看 `name`这个key的值是多少，结果出人意料

```sh
127.0.0.1:6379> get name
"kirari"
```

难道说我并没有把数据存储到redis吗？

其实我们使用图形化Redis客户端就能发现Redis出现了一堆十六进制的字符后面跟着我们在示例中显示的key

这是由于`redisTemplate`在底层实现了序列化，把我们原始的数据与key通过一定方式的序列化传输到了Redis之中！

我们从中获取数据的时候他就会从redis反序列化从而 获取信息

![Redis出现了一堆十六进制的Key](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240629031339115.webp)

这种默认序列化的方式不利于我们阅读与操作，接下来我们来重写序列化的方法：

```java
@Configuration
public class RedisConfig {


    @Bean
    public RedisTemplate<String,Object> redisTemplate(RedisConnectionFactory connectionFactory){
        //创建RedisTemplate对象
        RedisTemplate<String,Object> redisTemplate = new RedisTemplate<>();

        //设置连接工厂
        redisTemplate.setConnectionFactory(connectionFactory);

        //创建Json序列化工具
        GenericJackson2JsonRedisSerializer genericJackson2JsonRedisSerializer = new GenericJackson2JsonRedisSerializer();

        //设置key的序列化
        redisTemplate.setKeySerializer(RedisSerializer.string());
        redisTemplate.setHashKeySerializer(RedisSerializer.string());


        //设置value序列化
        redisTemplate.setHashValueSerializer(genericJackson2JsonRedisSerializer);
        redisTemplate.setValueSerializer(genericJackson2JsonRedisSerializer);


        return redisTemplate;
    }
}
```

序列化工具帮我们把key转化为String类型，Value数据则转化为任意类型

故此使用`RedisTemplate`时，key和Hash的field都要使用String类型

::: warning

注意此时使用RedisTemplate序列化数据时存储对象会携带对象的原始类，通过识别原始类等到反序列化时找到使用的类来反序列化

```java
@Data
public class User {
    private Integer id;
    private String name;
}
```



![image-20240629042859212](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240629042859212.webp)

:::

这个类标识可能比存储的数据还要大，这样做会造成极大的内存浪费

如果想不带上这种类标识，则需要重新配置Redis的序列化工具并且手动反序列化及序列化

比较麻烦，使用Spring为了解决这个事情，`StringRedisTemplate`出现了

### StringRedisTemplate

不使用Json序列化处理value，存储的信息从`<String,Object>`到`<String,String>`的转变

配合使用对象类往Json转化的手动序列化工具

```java
@Autowired
StringRedisTemplate stringRedisTemplate;
//手动序列化工具
@Autowired
ObjectMapper mapper;

 @Test
    public void test() throws JsonProcessingException {
  User user = new User();


        user.setName("kirari");
        user.setId(18);
		//序列化
        stringRedisTemplate.opsForValue().set("user99", mapper.writeValueAsString(user));
        //反序列化
        System.out.println(mapper.readValue(stringRedisTemplate.opsForValue().get("user99"),User.class));
    
}
```

效果：

![image-20240629044516465](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240629044516465.webp)


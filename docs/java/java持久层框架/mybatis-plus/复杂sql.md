# 复杂Sql

上上一节中的使用方法全都是基于id进行增删查改的，并没有一些复杂的判断等等

该如何进行复杂一点的增删查改呢？

## 条件构造器

在输入mapper后使用一个`.`会看到参数有一个`Wrapper`的实现类

![image-20240713193843432](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407131941970.webp)

被多个类继承实现

![image-20240713194052114](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407131941099.webp)

这个类可以实现条件的构造，用来实现复杂sql的生成。

### 示例

#### 1. 查询名字带o，存款>=1000的id、username、info、balance

```java
void testQueryWrapper(){
    QueryWrapper<User> wrapper = new QueryWrapper<User>()
            .select("id", "username", "phone", "balance")
            .like("username", "o")
            .ge("balance",1000);
    userMapper.selectList(wrapper).forEach(System.out::println);
}
```

输出结果：

```bash
19:57:07  INFO 24376 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
19:57:07  INFO 24376 --- [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
19:57:07 DEBUG 24376 --- [           main] c.i.mp.mapper.UserMapper.selectList      : ==>  Preparing: SELECT id,username,phone,balance FROM user WHERE (username LIKE ? AND balance >= ?)
19:57:07 DEBUG 24376 --- [           main] c.i.mp.mapper.UserMapper.selectList      : ==> Parameters: %o%(String), 1000(Integer)
19:57:07 DEBUG 24376 --- [           main] c.i.mp.mapper.UserMapper.selectList      : <==      Total: 1
User(id=3, username=Hope, password=null, phone=13900112222, info=null, status=null, balance=100000, createTime=null, updateTime=null)
```



#### 2. 更新用户名为jack的用户余额为2000

```java
@Test
void testUpdateWrapper(){
    //更新的数据
    var user = User.builder()
            .balance(2000)
            .build();
    //更新的条件
    userMapper.update(user, new QueryWrapper<User>()
            .eq("username", "jack")
            .eq("balance", 1000));

}
```

结果：

```bash
20:03:13 DEBUG 31240 --- [           main] com.itheima.mp.mapper.UserMapper.update  : ==>  Preparing: UPDATE user SET balance=? WHERE (username = ? AND balance = ?)
20:03:13 DEBUG 31240 --- [           main] com.itheima.mp.mapper.UserMapper.update  : ==> Parameters: 2000(Integer), jack(String), 1000(Integer)
20:03:13 DEBUG 31240 --- [           main] com.itheima.mp.mapper.UserMapper.update  : <==    Updates: 0
```



#### 3. 给id为1，2，4的用户存款扣200

```java
@Test
void testUpdateWrapper2(){
    List<Long> ids= List.of(1L, 2L,  4L);
    userMapper.update(null,new UpdateWrapper<User>()
            .setSql("balance = balance - 200")
            .in("id",ids)
    );

}
```

结果：

```bash
UPDATE user SET balance = balance - 200 WHERE (id IN (?,?,?))
 Parameters: 1(Long), 2(Long), 4(Long)
  Updates: 3
```

### Lambda

避免写死

```java
@Test
void testQueryWrapper(){
    LambdaQueryWrapper<User> wrapper = new LambdaQueryWrapper<User>()
            .select(User::getId, User::getUsername, User::getPhone, User::getBalance)
            .like( User::getUsername, "o")
            .ge(User::getBalance,1000);
    userMapper.selectList(wrapper).forEach(System.out::println);

}


@Test
void testUpdateWrapper(){
    //更新的数据
    var user = User.builder()
            .balance(2000)
            .build();
    //更新的条件
    userMapper.update(user, new LambdaQueryWrapper<User>()
            .eq(User::getUsername, "jack")
            .eq(User::getBalance, 1000));

}


@Test
void testUpdateWrapper2(){
    List<Long> ids= List.of(1L, 2L,  4L);
    userMapper.update(null,new LambdaUpdateWrapper<User>()
            .setSql("balance = balance - 200")
            .in(User::getId,ids)
    );

}
```



## 自定义sql

```java{5}
@Test
void testUpdateWrapper2(){
    List<Long> ids= List.of(1L, 2L,  4L);
    userMapper.update(null,new LambdaUpdateWrapper<User>()
            .setSql("balance = balance - 200")
            .in(User::getId,ids)
    );
```

第五行的自定义sql可以放在xml文件里书写

::: code-group

```java[Controller或Service]
@Test
void testUpdateWrapper3(){
    List<Long> ids= List.of(1L, 2L,  4L);
    int amount  = 200;
    LambdaUpdateWrapper<User> wrapper = new LambdaUpdateWrapper<User>()
            .in(User::getId,ids);
    userMapper.updateBalanceByIds(amount,wrapper);
}
```



```java[mapper.java]
void updateBalanceByIds(@Param("amount")int amount,@Param("ew") LambdaUpdateWrapper<User> wrapper);
//ew 有常量定义 Constants.WRAPPER
```



```xml[mapper.xml]{2-3}
<update id="updateBalanceByIds">
    UPDATE `user`
    SET `balance` = `balance` - #{amount}
    ${ew.customSqlSegment}
</update>
```



```xml[不使用mybatis-plus时]
<update id="updateBalanceByIds">
    UPDATE `user`
    SET `balance` = `balance` + #{amount}
    WHERE `id` IN
    <foreach collection="ids" open="(" close=")" item="id" separator=",">
        #{id}
    </foreach>
</update>
```



:::








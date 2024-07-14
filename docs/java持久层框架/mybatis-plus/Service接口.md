# Service接口

Mybatis-plus实现了一个Service接口，实现了大量的增删查改操作

![image-20240713204329795](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407132043016.webp)

实现流程：

::: code-group

```java[UserService]
public interface UserService extends IService<User> {
}
```



```java[UserServiceImpl]
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}
```



:::





## 简单sql的API

### 添加

```java
@Test
void updateBalanceByIds() {
    var user = User.builder()
            .username("xiaoli")
            .balance(2000)
            .phone("12345648910")
            .password("123456")
            .info("{\"name\":\"John\", \"age\":30}")
            .status(1)
            .build();
    userService.save(user);
}
```



### 查询

多组查询

```java
void testQuery(){
    userService.listByIds(List.of(1L,2L,3L)).forEach(System.out::println);
}
```

单个查询

```java
void testQuery2(){
    userService.getById(1L);
}
```

### 修改

```java
@Test
void testUpdate(){
    User user = User.builder()
            .id(1L)
            .username("xiaoli")
            .balance(2000)
            .phone("12345648910")
            .password("123456")
            .info("{\"name\":\"John\", \"age\":30}")
            .status(1)
            .build();
    userService.updateById(user);
}
```

### 删除

```java
void testDelete(){
    userService.removeById(10L);
}
```

## 复杂sql

可在service层中调用本身的mybatis-plus的service接口方法，并调用mapper进行xml或注解制作复杂sql语句查询



## Lad


# Service接口的Lambda

在service中的save方法或者getById方法只支持单个条件查询或通过对象创建的形式赋值

Mybatis-plus使用了Lambda的形式实现一些比较复杂的Sql语句

例如查询语句

```java
var one = userService.lambdaQuery()
        .eq(User::getId, 1L)
        .one();
```

其中`.one`的意思是返回一个用户，而**eq是条件查询，有三个可选参数(条件，字段，值)**，例如

```java{4}
Long id = 1L;
 //查询单个用户
var one = userService.lambdaQuery()
        .eq(id != null,User::getId, 1L)
        .one();
```

当id不为空这个条件为真的时候才把这个条件写入

测试：

::: code-group 

```java
Long id = 1L;
 //查询单个用户
var one = userService.lambdaQuery()
        .eq(id > 5L,User::getId, 1L)
        .list();
```

```bash[结果无id条件]
==>  Preparing: SELECT id,username,password,phone,info,status,balance,create_time,update_time FROM user
==>  Parameters: 
<==   Total: 9
```

:::

这样可以不用多使用if判断一个值是否为空

## 可选参数

| 方法名                                                       | 描述         | 示例代码                                                   |
| ------------------------------------------------------------ | ------------ | ---------------------------------------------------------- |
| `eq(SFunction<T, ?> column, Object val)`                     | 等于条件     | `queryWrapper.eq(User::getName, "John");`                  |
| `ne(SFunction<T, ?> column, Object val)`                     | 不等于条件   | `queryWrapper.ne(User::getName, "John");`                  |
| `gt(SFunction<T, ?> column, Object val)`                     | 大于条件     | `queryWrapper.gt(User::getAge, 18);`                       |
| `ge(SFunction<T, ?> column, Object val)`                     | 大于等于条件 | `queryWrapper.ge(User::getAge, 18);`                       |
| `lt(SFunction<T, ?> column, Object val)`                     | 小于条件     | `queryWrapper.lt(User::getAge, 30);`                       |
| `le(SFunction<T, ?> column, Object val)`                     | 小于等于条件 | `queryWrapper.le(User::getAge, 30);`                       |
| `between(SFunction<T, ?> column, Object val1, Object val2)`  | 介于条件     | `queryWrapper.between(User::getAge, 18, 30);`              |
| `notBetween(SFunction<T, ?> column, Object val1, Object val2)` | 不介于条件   | `queryWrapper.notBetween(User::getAge, 18, 30);`           |
| `like(SFunction<T, ?> column, Object val)`                   | 模糊匹配     | `queryWrapper.like(User::getEmail, "example.com");`        |
| `notLike(SFunction<T, ?> column, Object val)`                | 不模糊匹配   | `queryWrapper.notLike(User::getEmail, "example.com");`     |
| `likeLeft(SFunction<T, ?> column, Object val)`               | 左模糊匹配   | `queryWrapper.likeLeft(User::getEmail, "example.com");`    |
| `likeRight(SFunction<T, ?> column, Object val)`              | 右模糊匹配   | `queryWrapper.likeRight(User::getEmail, "example.com");`   |
| `isNull(SFunction<T, ?> column)`                             | 为空条件     | `queryWrapper.isNull(User::getEmail);`                     |
| `isNotNull(SFunction<T, ?> column)`                          | 不为空条件   | `queryWrapper.isNotNull(User::getEmail);`                  |
| `in(SFunction<T, ?> column, Collection<?> coll)`             | 在集合中     | `queryWrapper.in(User::getId, Arrays.asList(1, 2, 3));`    |
| `notIn(SFunction<T, ?> column, Collection<?> coll)`          | 不在集合中   | `queryWrapper.notIn(User::getId, Arrays.asList(1, 2, 3));` |
| `orderByAsc(SFunction<T, ?> column)`                         | 升序排序     | `queryWrapper.orderByAsc(User::getAge);`                   |
| `orderByDesc(SFunction<T, ?> column)`                        | 降序排序     | `queryWrapper.orderByDesc(User::getAge);`                  |

::: tip

大部分支持多一个参数为条件参数

:::



## 查询

:::code-group 

```java[列表查询示例]
   String  name = "o";
   Long minBalance = 1000L;
   Long maxBalance = 20000L;

userService.lambdaQuery()
       .like(name != null, User::getUsername, name)
       .ge(minBalance != null, User::getBalance, minBalance)
       .lt(maxBalance != null, User::getBalance, maxBalance)
       .list()
       .forEach(System.out::println);
```

```java[单个查询]
var one = userService.lambdaQuery()
        .eq(User::getId, 1L)
        .one();
```

```java[查询条数]
var string = userService.lambdaQuery()
        .ge(minBalance != null, User::getBalance, minBalance)
        .lt(maxBalance != null, User::getBalance, maxBalance)
        .count();

System.out.println(string);
```

:::



::: tip

 支持分页查询，在后面几章节会讲

:::



## 更新数据

通过`lambdaUpdate`进行更新数据

返回值为布尔值，true为超过修改

支持修改和删除



::: code-group 

```java[修改示例]
userService.lambdaUpdate()
        .eq(User::getId, 1L)
        .set(User::getUsername, "popopopo")
        .set(User::getBalance, 9999)
        .eq(User::getBalance, one.getBalance())//乐观锁
        .update();
```



```java[删除示例]
userService.lambdaUpdate()
        .eq(User::getUsername,"xiaoli")
        .remove();
```



:::



::: warning 提示

 添加数据使用`save`或`saveBatch`进行添加，无Lambda操作

:::






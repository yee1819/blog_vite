# 枚举转化器

配置枚举处理器

```YAML
mybatis-plus:
  configuration:
    default-enum-type-handler: com.baomidou.mybatisplus.core.handlers.MybatisEnumTypeHandler
```





实例

创建枚举类

```java{7}
@Getter
public enum UserStatus {
    NORMAL(1, "正常"),
    FREEZE(2, "冻结")
    ;
    
    @EnumValue // 枚举值
    private final int value;
    
    
    private final String desc;

    UserStatus(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }
}
```



修改实体类

::: code-group 

```java[修改前]{12}
public class User {

    /**
     * 用户id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
....
    /**
     * 使用状态（1正常 2冻结）
     */
    private UserStatus status;

....
}
```

```java[修改后]{12}
public class User {

    /**
     * 用户id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
    ....
    /**
     * 使用状态（1正常 2冻结）
     */
    private Integer status;

...
}
```

:::

查询的结果：

::: code-group

```json[修改前]
{
    "id": 2,
    "username": "Rose",
    "info": "{\"age\": 19, \"intro\": \"青涩少女\", \"gender\": \"female\"}",
    "status": 1,
    "balance": 0,
    "addressList": [....]
}
```



```json[修改后]{5}
{
    "id": 2,
    "username": "Rose",
    "info": "{\"age\": 19, \"intro\": \"青涩少女\", \"gender\": \"female\"}",
    "status": "NORMAL",
    "balance": 0,
    "addressList": [...]
}
                    
```

:::

在程序中也更好的提高了可阅读性

:::code-group

```java[修改前，不方便阅读]{2}
//是否为正常
if (user == null || user.getStatus()==2 ) {
    throw new RuntimeException("用户异常");
}
```



```java[修改后]{2}
//是否为正常
if (user == null || user.getStatus()== UserStatus.FREEZE ) {
    throw new RuntimeException("用户异常");
}
```

:::

显示枚举的描述而不是枚举名称

::: code-group

```java[枚举描述代码]
@Getter
public enum UserStatus {
    NORMAL(1, "正常"),
    FREEZE(2, "冻结")
    ;

    @EnumValue // 枚举值
    private final int value;

    private final String desc;

    UserStatus(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }
}
```

```json[枚举描述显示]{5}
{
    "id": 2,
    "username": "Rose",
    "info": "{\"age\": 19, \"intro\": \"青涩少女\", \"gender\": \"female\"}",
    "status": "NORMAL",
    "balance": 0,
    "addressList": [...]
}
```



```java[枚举名称]{10}
@Getter
public enum UserStatus {
    NORMAL(1, "正常"),
    FREEZE(2, "冻结")
    ;

    @EnumValue // 枚举值
    private final int value;

    @JsonValue
    private final String desc;

    UserStatus(int value, String desc) {
        this.value = value;
        this.desc = desc;
    }
}
```



```json[枚举名称显示结果]{5}
{
    "id": 2,
    "username": "Rose",
    "info": "{\"age\": 19, \"intro\": \"青涩少女\", \"gender\": \"female\"}",
    "status": "正常",
    "balance": 0,
    "addressList": [...]
}
```



:::

::: tip 

`@JsonValue`注解在谁的那里就显示哪一个值,默认为枚举描述，可省略

:::


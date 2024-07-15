# json转化器

给string型数据转化为Json，给复杂实体类嵌套实体类转化Json

实体类UserInfo

```java
@Data
@NoArgsConstructor
@AllArgsConstructor(staticName = "of")
public class userInfo {

    private Integer age;
    private String intro;
    private String gender;

}
```

在嵌套实体类中定义

```java{18,5}
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName(value = "user",autoResultMap = true) // 开启自动结果映射
public class User {

    /**
     * 用户id
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;
....

    /**
     * 详细信息
     */
    @TableField(typeHandler = com.baomidou.mybatisplus.extension.handlers.JacksonTypeHandler.class)  //设置json转化
    private userInfo info;
.....
}
```

::: code-group

```json[转化前]{4}
{
    "id": 2,
    "username": "Rose",
    "info": "{\"age\": 19, \"intro\": \"青涩少女\", \"gender\": \"female\"}",
    "status": "正常",
    "balance": 0,
    "addressList": [...]
}
```



```json[修改后]
{
    "id": 2,
    "username": "Rose",
    "info": {
        "age": 19,
        "intro": "青涩少女",
        "gender": "female"
    },
    "status": "正常",
    "balance": 0,
    "addressList": [...]
}
```



:::





可以看到info就转化为json格式了
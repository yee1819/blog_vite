# 分页查询

Mybatis-Plus提供分页插件，可以一键进行分页查询

首先需要配置Mybais-plus的配置类进行分页插件的配置

```java
@Configuration
public class MybatisConfig {
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        // 初始化核心插件
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        // 添加分页插件                        //设置数据库是MySql      //设置每页最大1000条
        var paginationInnerInterceptor = new PaginationInnerInterceptor(DbType.MYSQL);
        paginationInnerInterceptor.setMaxLimit(1000L);
        interceptor.addInnerInterceptor(paginationInnerInterceptor);
        
        return interceptor;
    }
}
```

查询操作：

```java
    void testQueryPage(){
        //设置分页参数
        int pageNo = 1 , pageSize = 10;
        Page<User> page = Page.of(pageNo, pageSize);
        //设置排序
        page.addOrder(new OrderItem("balance", false));
        //可按照顺序设置多个排序条件
        page.addOrder(new OrderItem("id", true));  //true为升序，false为降序
        //先按照工资再按照od排序

        //执行查询
        var p = userService.page(page); //p和page一样

        //打印分页信息
        log.info("总页数：{}", page.getPages());
        log.info("总记录数：{}", page.getTotal());
        log.info("当前页数据：{}", page.getRecords());
        List<User> userList = page.getRecords();

        userList.forEach(System.out::println);
        p.getRecords().forEach(System.out::println);
    }
```





## 实例

需要实现一个这样的api接口

| **参数** | **说明**                                                     |
| -------- | ------------------------------------------------------------ |
| 请求方式 | GET                                                          |
| 请求路径 | /users/page                                                  |
| 请求参数 | {  <br />  "pageNo": 1,  <br />  "pageSize": 5,    <br />"sortBy": "balance", <br />   "isAsc": false, <br />   "name": "o",  <br />  "status": 1<br /> } |
| 返回值   | {   <br />        "total": 100006,<br />        "pages": 50003, <br />   "list": [        <br />{      <br />      "id": 1685100878975279298,<br />            "username": "user_9****",      <br />      "info": {  <br />              "age": 24,   <br />             "intro": "英文老师",<br />                "gender": "female"   <br />         },    <br />        "status": "正常",   <br />         "balance": 2000     <br />   }  <br />  ] <br />} |
| 特殊说明 | 如果排序字段为空，默认按照更新时间排序排序字段不为空，则按照排序字段排序 |



::: code-group
```java[UserQuery]
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(description = "用户查询条件实体")
public class UserQuery extends PageQuery {
    @ApiModelProperty("用户名关键字")
    private String name;
    @ApiModelProperty("用户状态：1-正常，2-冻结")
    private Integer status;
    @ApiModelProperty("余额最小值")
    private Integer minBalance;
    @ApiModelProperty("余额最大值")
    private Integer maxBalance;
}
```
```Java[PageQuery]
@Data
@ApiModel(description = "分页查询实体")
public class PageQuery {
    @ApiModelProperty("页码")
    private Long pageNo;
    @ApiModelProperty("页码")
    private Long pageSize;
    @ApiModelProperty("排序字段")
    private String sortBy;
    @ApiModelProperty("是否升序")
    private Boolean isAsc;
}
```
```java[PageDTO]
@Data
@ApiModel(description = "分页结果")
public class PageDTO<T> {
    @ApiModelProperty("总条数")
    private Long total;
    @ApiModelProperty("总页数")
    private Long pages;
    @ApiModelProperty("集合")
    private List<T> list;
}
```

```Java[接口代码]
 public PageDTO<UserVO> pageList(UserQuery query) {
        // 1.构建条件
        // 1.1.分页条件
        Page<User> page = Page.of(query.getPageNo(), query.getPageSize());
        // 1.2.排序条件
        if (query.getSortBy() != null) {
            page.addOrder(new OrderItem(query.getSortBy(), query.getIsAsc()));
        }else{
            // 默认按照更新时间排序
            page.addOrder(new OrderItem("update_time", false));
        }
        // 2.查询
        // 查询条件
        String name = query.getName();
        Integer status = query.getStatus();

        //分页查询

        lambdaQuery()
                .like(name!=null,User::getUsername,name)
                .eq(status!=null,User::getStatus,status)
                .page(page);


		//封装数据
        PageDTO<UserVO> pageDTO = new PageDTO<>();

        pageDTO.setTotal(page.getTotal());
        pageDTO.setPages(page.getPages());
        
        
        // 3.数据非空校验
        List<User> records = page.getRecords();


        if (records == null || records.size() <= 0) {
            // 无数据，返回空结果
           pageDTO.setList(Collections.emptyList());
           return pageDTO;
       }
        // 4.有数据，转换
        List<UserVO> list = BeanUtil.copyToList(records, UserVO.class);
        // 5.封装返回
        pageDTO.setList(list);
        return pageDTO;

    }
```


```json[请求]
{
    "pageNo": 1,
    "pageSize": 5,
    "sortBy": "balance",
    "isAsc": false,
    "name": "o",
    "status": 1
}
```

```json[查询结果]
{
    "total": 5,
    "pages": 1,
    "list": [
        {
            "id": 3,
            "username": "Hope",
            "info": {
                "age": 25,
                "gender": "male",
                "intro": "上进青年"
            },
            "status": "正常",
            "balance": 100000,
            "addressList": null
        },
        {
            "id": 1,
            "username": "popopopo",
            "info": {
                "age": 20,
                "gender": "male",
                "intro": "佛系青年"
            },
            "status": "正常",
            "balance": 9999,
            "addressList": null
        },
        {
            "id": 4,
            "username": "Thomas",
            "info": {
                "age": 29,
                "gender": "male",
                "intro": "伏地魔"
            },
            "status": "正常",
            "balance": 200,
            "addressList": null
        },
        {
            "id": 6,
            "username": "port",
            "info": {
                "age": 24,
                "gender": "female",
                "intro": "英文老师"
            },
            "status": "正常",
            "balance": 200,
            "addressList": null
        },
        {
            "id": 2,
            "username": "Rose",
            "info": {
                "age": 19,
                "gender": "female",
                "intro": "青涩少女"
            },
            "status": "正常",
            "balance": 0,
            "addressList": null
        }
    ]
}
```
:::



## 封装分页

我们发现上面的代码逻辑有很大一部分都在进行转化数据实体，与业务无关

采取封装方法的方式实现工具类

::: code-group

```java[PageQuery]
@Data
public class PageQuery {
    private Integer pageNo;
    private Integer pageSize;
    private String sortBy;
    private Boolean isAsc;

    //                           如果有多个排序
    public <T>  Page<T> toMpPage(OrderItem ... orders){
        // 1.分页条件
        Page<T> p = Page.of(pageNo, pageSize);
        // 2.排序条件
        // 2.1.先看前端有没有传排序字段
        if (sortBy != null) {
            p.addOrder(new OrderItem(sortBy, isAsc));
            return p;
        }
        // 2.2.再看有没有手动指定排序字段
        if(orders != null){
            p.addOrder(orders);
        }
        return p;
    }
                                // 直接指定排序
    public <T> Page<T> toMpPage(String defaultSortBy, boolean isAsc){
        return this.toMpPage(new OrderItem(defaultSortBy, isAsc));
    }

    public <T> Page<T> toMpPageDefaultSortByCreateTimeDesc() {
        return toMpPage("create_time", false);
    }

    public <T> Page<T> toMpPageDefaultSortByUpdateTimeDesc() {
        return toMpPage("update_time", false);
    }
}

```

```java[PageDTO]
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageDTO<V> {
    private Long total;
    private Long pages;
    private List<V> list;

    /**
     * 返回空分页结果
     * @param p MybatisPlus的分页结果
     * @param <V> 目标VO类型
     * @param <P> 原始PO类型
     * @return VO的分页对象
     */
    public static <V, P> PageDTO<V> empty(Page<P> p){
        return new PageDTO<>(p.getTotal(), p.getPages(), Collections.emptyList());
    }

    /**
     * 将MybatisPlus分页结果转为 VO分页结果
     * @param p MybatisPlus的分页结果
     * @param voClass 目标VO类型的字节码
     * @param <V> 目标VO类型
     * @param <P> 原始PO类型
     * @return VO的分页对象
     */
    public static <V, P> PageDTO<V> of(Page<P> p, Class<V> voClass) {
        // 1.非空校验
        List<P> records = p.getRecords();
        if (records == null || records.size() <= 0) {
            // 无数据，返回空结果
            return empty(p);
        }
        // 2.数据转换
        List<V> vos = BeanUtil.copyToList(records, voClass);
        // 3.封装返回
        return new PageDTO<>(p.getTotal(), p.getPages(), vos);
    }

    /**
     * 将MybatisPlus分页结果转为 VO分页结果，允许用户自定义PO到VO的转换方式
     * @param p MybatisPlus的分页结果
     * @param convertor PO到VO的转换函数
     * @param <V> 目标VO类型
     * @param <P> 原始PO类型
     * @return VO的分页对象
     */
    public static <V, P> PageDTO<V> of(Page<P> p, Function<P, V> convertor) {
        // 1.非空校验
        List<P> records = p.getRecords();
        if (records == null || records.size() <= 0) {
            // 无数据，返回空结果
            return empty(p);
        }
        // 2.数据转换
        List<V> vos = records.stream().map(convertor).collect(Collectors.toList());
        // 3.封装返回
        return new PageDTO<>(p.getTotal(), p.getPages(), vos);
    }
}

```



:::





现在我们开发流程就渐变很多了

::: code-group

```java[简化后]
public PageDTO<UserVO> queryUserByPage(PageQuery query) {
    // 1.构建条件
    Page<User> page = query.toMpPageDefaultSortByCreateTimeDesc();
    // 2.查询
    lambdaQuery()
    .like(name!=null,User::getUsername,name)
    .eq(status!=null,User::getStatus,status)
    .page(page);
    // 3.封装返回
    return PageDTO.of(page, UserVO.class);
}
```



```java[自定义转化数据格式或信息]
public PageDTO<UserVO> queryUserByPage(PageQuery query) {
    // 1.构建条件
    Page<User> page = query.toMpPageDefaultSortByCreateTimeDesc();
    // 2.查询
    lambdaQuery()
    .like(name!=null,User::getUsername,name)
    .eq(status!=null,User::getStatus,status)
    .page(page);
    // 3.封装返回
    return PageDTO.of(page, user -> {
        // 拷贝属性到VO
        UserVO vo = BeanUtil.copyProperties(user, UserVO.class);
        // 用户名脱敏
        String username = vo.getUsername();
        vo.setUsername(username.substring(0, username.length() - 2) + "**");
        return vo;
    });
}
```



:::


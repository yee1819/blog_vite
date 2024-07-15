# 逻辑删除

有一些数据在用户的前端显示界面中点击了删除，数据从用户端显示消失

但是这些数据如果是一些特殊重要的数据，例如订单信息，需要保留留档

那么可以采用逻辑过期的 方式进行删除

逻辑过期指在用户端看起来消失了，但是并未在真正的数据库中消失

做法：添加一个字段，以布尔值 / 数字 1 或 0 /枚举 的方式进行判断是否过期 

在查询的时候添加判断逻辑过期

::: code-group

```sql[查询 未删除 ]
select * from user where  deleted = 0
```



```sql[逻辑 删除]
update user set deleted = 1 where id = 1 and deleted = 1
```

:::

这样就可以做到不删除数据并可以判断是否删除

但是每次都需要找这样做有些麻烦并且不方便阅读

## 在mybatis-plus中

mybatis-plus提供了逻辑删除的方式，使的我们需要删除数据或查询数据时只需要按照原来的方式进行操作即可

在底层Mybatis-Plus会帮我们把逻辑实现

需要做的是配置即可

在配置`application.yml`文件中

```yaml
mybatis-plus:
  global-config:
    db-config:
      logic-delete-field: deleted # 全局逻辑删除的实体字段名(since 3.3.0,配置后可以忽略不配置步骤2)​
      logic-delete-value: 1 # 逻辑已删除值(默认为 1)​
      logic-not-delete-value: 0 # 逻辑未删除值(默认为 0)
```



## 测试

先在数据库的表中添加上设置的字段,例如我设置了`deleted`

```sql
alter table address add deleted bit default b'0' null comment '逻辑删除';
```

在实体类中添加逻辑删除字段

```java
@ApiModelProperty(value = "逻辑删除")
private Boolean deleted;
```

此时进行删除和查询时

::: code-group

```java[删除代码]
addressService.removeById(2L);
log.info("{}",addressService.getById(2L));
```



```bash[删除底层]
==>  Preparing: UPDATE address SET deleted=1 WHERE id=? AND deleted=0
==> Parameters: 2(Long)
<==    Updates: 0
```



```java[查询代码]
log.info("{}",addressService.getById(2L));
```



```bash[查询底层]
==>  Preparing: SELECT id,user_id,province,city,town,mobile,street,contact,is_default,notes,deleted FROM address WHERE id=? AND deleted=0
==> Parameters: 2(Long)
<==      Total: 0
```



:::

可以看到我们的代码明明和以前一样，删除和查询的底层就带上了逻辑删除的键

::: tip 提示

逻辑删除表中数据不删长期以往会对数据查询性能造成影响

可采取把删除数据移动到另一张表的策略来实现删除效果

:::
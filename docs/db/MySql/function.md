### 存储函数

<font color=rgb(1)>存储过程与存储函数的区别：</font>

- 存储函数不能拥有输出参数，因为函数本身就是输出函数。
- 调用函数不需要使用call语句。
- 函数必须有return语句，而return不允许出现在存储过程。

创建存储 函数

```sql
create function func_name(参数名  参数type[,参数2  参数type...])
RETURNS type#返回类型
begin
select语句+流程控制
return value;
end;
```

调用直接使用

```sql
func_name([value1....[value2....]])
select func_name([value1....[value2....]])
#投影返回内容
```

显示存储函数

```sql
show create function cc_name;
```

显示存储函数状态

```sql
show function status like cc_name;
```

删除存储函数

```sql
DROP function  [if exists] cc_name;#if exists 防止删除不存在的存储过程出现错误
```

修改存储函数的特性

```sql
ALTER  function cc_name [characteristic...];
```
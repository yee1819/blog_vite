### 视图

创建一个视图类似c++的封装,隐藏底层表结构，简化数据访问操作，客户端不用了解底层表结构之间的关系。

提供一个访问数据的接口，用户不能改变底层表结构和数据，加强安全性，还可以选定用户可以看到的数据，让一些重要信息在表格里但是视图中没有一些重要隐私信息。

视图还可以被嵌套，一个视图中可以嵌套另一个视图。

```mysql
create [or replace]   [algorithm={UNDEFINED|MEGRE|TEMPTABLE]
view view_name 
as 
   select 语句(即select 字段1[,字段2....] from table1[,table2,.....] [where 条件1[and/or 条件2 [and/or 条件....]]] [group by 分组条件[having 筛选条件]] order by [desc/ASC] [LIMIT n,m])
   
[or replace]#表示视图若是存在 则替代，如果没有这段，视图存在则创建失败。   
[algorithm={UNDEFINED|MEGRE|TEMPTABLE]#表示试图选择的算法.1表示自动选择，2表示先将视图的select语句生成结果集，利用结果集创建查询，但要求与原表对应，不可使用min，max，sum等函数或distinct，group by，having，limit，union，子查询等不可使用2算法。3算法表示生成临时表，用临时表执行语句。   
   
#例如
CREATE view v_table12 
as  
    select *
    from kechen 

```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/视图.png)

```sql
#删除视图
DROP VIEW view_name；
#例如
drop view v_table;
```

更新视图

```mysql
alter view view_name
as 
	select语句;
#例如上面的那个视图中我不想看到编号
ALTER view v_table12 
as
    select k_name,k_score
    from kechen
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/视图2.png)

查看视图

```sql
select 字段1[,字段2...]
from view_name
[where...group by.having ..order by.....]
#例子
select *
 from v_table12;
 
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/查看视图.png)

```sql
 select k_name 名字, k_score 分数
  from v_table12
where k_score>60
limit 1,4
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/视图222.png)

通过视图对表的更新，视图是一个虚拟的表，通过表映射出来的。

::: tip  **视图可更新的基本要求**

- 视图必须是直接基于一个表的（单表视图）。
- 视图中不包含以下复杂操作：
  - 聚合函数（如 `SUM`、`AVG` 等）。
  - 分组（`GROUP BY`）。
  - 联合查询（`UNION`）。
  - DISTINCT。
  - 子查询。
  - 使用表达式或函数的列（如 `a + b` 或 `LEFT(name, 3)`）。
  - 常量列（如 `SELECT id, '固定值' AS name FROM users`）。
- 视图中的所有列必须可以唯一映射到底层表的列，不能是计算列或其他派生数据。

:::

视图修改表的内容是这样的

```sql
CREATE VIEW v_simple AS
SELECT id, name FROM users;

-- 通过视图修改底层表
UPDATE v_simple
SET name = 'Alice'
WHERE id = 1;

-- 例子：
UPDATE v_table12
set k_score=66
where k_name='英语'
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/更新表格视图.png)

```sql
create view vvv as select * from kechen

insert into vvv(k_id,k_name,k_score) values(10002,'数据库',99);
```
![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/视图更新2.png)

```sql
DELETE from vvv where k_id=10004
```
![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/视图更新3.png)

当出现以下情况的时候不能修改视图

> 某些视图是可更新的。也就是说，可以使用 UPDATE、DELETE 或 INSERT 等语句更新基本表的内容。对于可更新的视图，视图中的行和基本表的行之间必须具有一对一的关系。
>
> 还有一些特定的其他结构，这些结构会使得视图不可更新。更具体地讲，如果视图包含以下结构中的任何一种，它就是不可更新的：
>
> - 聚合函数 SUM()、MIN()、MAX()、COUNT() 等。
> - DISTINCT 关键字。
> - GROUP BY 子句。
> - HAVING 子句。
> - UNION 或 UNION ALL 运算符。
> - 位于选择列表中的子查询。
> - FROM 子句中的不可更新视图或包含多个表。
> - WHERE 子句中的子查询，引用 FROM 子句中的表。
> - ALGORITHM 选项为 TEMPTABLE（使用临时表总会使视图成为不可更新的）的时候。

不可修改的例子：

**复杂视图：不可更新**

```
sql复制代码CREATE VIEW v_complex AS
SELECT id, COUNT(*) AS user_count
FROM users
GROUP BY id;

-- 尝试更新视图
UPDATE v_complex
SET user_count = 10;
-- 会报错，因为此视图是基于聚合的，不支持更新。
```



:::  danger  强制修改视图**WITH CHECK OPTION** 

当视图定义中包含 `WITH CHECK OPTION` 时，可以限制通过视图进行的数据修改，使得任何插入或更新操作必须满足视图的定义条件。

```sql
CREATE VIEW admin_users AS
SELECT id, name, role FROM users WHERE role = 'admin'
WITH CHECK OPTION;

-- 插入符合视图条件的数据
INSERT INTO admin_users (id, name, role) VALUES (1, 'Alice', 'admin'); -- 成功

-- 插入不符合视图条件的数据
INSERT INTO admin_users (id, name, role) VALUES (2, 'Bob', 'user'); -- 失败
```



:::



<font size=6>视图计算</font>

```sql
create view s_view AS
select name,id,sex,year(NOW())-age 出生年份,age
from students;#加减乘除都可以
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/视图计算.png)

视图嵌套

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/视图嵌套视图建立视图.png)



<font size=6>with check option</font>

创建视图的时候把这段东西放在select语句的末尾

遵循where语句的，在进行插入删除或者修改的时候，如果产生了在视图看不见的操作，即where语句之外的操作，MySQL将拒接使用详细看[MySQL with check option确保视图一致性 - MySQL教程 (yiibai.com)](https://www.yiibai.com/mysql/view-with-check-option.html)



<font size=5>视图还有很多东西，有时间再去看了</font><font size=2>考试应该考不到这里:weary:</font>





--- 2022 年 6月
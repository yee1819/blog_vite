# 多表查询

### 连接

连接是指把两张表或者多张表连接在一起查询

一般连接的表里都会有相同的字段才能连接，不然就是笛卡尔积连接，即`交叉连接`

连接分为`条件连接`、`等值连接/内连接`，`自然连接`，`外连接`这几种。

<font size=6>如果在连接的时候遇到了同名列，则用table.name的方式去使用列名</font>

#### 笛卡尔积(交叉连接)

```sql
select *
from kechen,students

select *
from kechen INNER join students

select *
from kechen CROSS join students

select *
from kechen  join students
#以上四种方法皆可行
#笛卡尔积的意思是把每张表的每一行（元组）全部拼接起来成为一行新的元组。//在大多数实际生产中会产生大量无效数据，连接后的行数=连接前的每张表的行数相乘，比如三张表行数分别为：3，4，5，连接后的行数为3*4*5=60
```



![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/笛卡尔.png)

#### 外连接

##### 左外连接

```sql
示例
select *
from students 
LEFT JOIN  kechen on students.id=kechen.k_id ;
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/左外.png)

##### 右外连接

```sql
示例
select *
from  kechen
RIGHT JOIN  students on students.id=kechen.k_id ;
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/右外.png)

##### 全外连接

<font size=7>MySQL不支持完全外连接</font>

```sql
select kechen.*,students.*
from  students 
FULL JOIN   kechen on students.id=kechen.k_id ;
```

~~^你麻麻的我找了半天bug结果是因为你不支持^~~

```sql
#用其他办法去实现，union   合并
(select kechen.*,students.*
from  students 
left JOIN   kechen on students.id=kechen.k_id )
UNION(
select kechen.*,students.*
from  students 
left JOIN   kechen on students.id=kechen.k_id )
;
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/外圈.png)



#### 等值连接/内连接

语法

```sql
select *
from table_name1
INNER  JOIN table_name2 ON 条件
[INNER  JOIN table_name3 ON 条件....] 
[where.....order by....group  by...limit]
#例子
select *
from students 
INNER  JOIN  kechen  
ON kechen.k_id=students.id;
#上面的方法和这个是一样的结果
select *
from students ,kechen
where k_id=id
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/内查询.png)

#### 自然连接

```sql
select *
from students 
NATURAL JOIN  kechen  ;
```

找出相同的值去连接表，当我把kechen表里的k_id 改成了id的时候

连接效果如下![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/自然连接.png)

如果没有相同的值，那么自然连接就是笛卡尔积.
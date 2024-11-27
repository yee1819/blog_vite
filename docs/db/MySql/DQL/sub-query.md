#### 子查询

子查询查询语句嵌套另一个查询语句，一般用于自身查询，select中先计算子查询，子查询是外查询的条件

可嵌套select ，detele，update语句。可以多层嵌套

##### ANY，SOME关键字

表示any后的子查询与any前的值至少有一项匹配，返回true，否则为flase。

some和any的意思一样

```sql
select  *
from student
where score>  ANY(select score from student where class=2)

```



##### ALL关键字

与any对立，满足所有条件

```sql
#查询成绩最高的人且为2班
select  *
from student
where score>  all(select score from student where class=2)
```



##### EXISTS关键字

存在的意思,存在则true否则false  ，可以与not 使用 not exists

```sql
select *
from kechen
where k_id exists (select k_id from kechen where k_score=90);

```



##### IN关键字

意思也是存在，in返回一个列表存在则true否则false  ，可以与not 使用 not in;

```sql
select *
from kechen
where k_id in(select k_id from kechen where k_score>90);

-- 查询没有订单的用户
SELECT * FROM users
WHERE id NOT IN (SELECT user_id FROM orders);

```



##### 带比较符的子查询（>,>=,<,<=,<>,!=,=）

```sql
select *
from kechen
where k_score>(select avg(k_score) from kechen where k_score=90);#举的例子不太好，就差不多这个意思
```
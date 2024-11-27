# 函数

sql语句里面内置了许多函数，可以在查询或者写存储过程的时候使用

函数均可嵌套使用

| 函数  | 说明                                                 |
| ----- | ---------------------------------------------------- |
| AVG   | 求平均数                                             |
| SUM   | 求和                                                 |
| count | 计数                                                 |
| MAX   | 计算最大值                                           |
| MIN   | 计算最小值                                           |
| MOD   | 两个参数求a/b余数                                    |
| ROUND | 单个参数，四舍五入整数，两个参数，第二个参数保留位数 |
| SQRT  | 二次方根                                             |

类似的函数还有

> concat(str1,str2) 连接 拼接两个字符串
> 
> upper(str) 大写 字符串大写
> 
> lower(str) 小写 字符串小写
> 
> LENGTH(str) 长度 字符串长度
> 
> SUBSTRING(str,start,end) 截取 截取字符串,start开始,end结束。
> 
> LEFT(str,len) 截取 从左边开始截取字符串
> 
> RIGHT(str,len) 截取 从右边开始截取字符串

**函数使用例子**



```sql
select avg(age)
from students;
#输出
#avg(age)
#19.5000
select sum(k_score)
from kechen;
#sum(k_score)
#620
select students.name,sum(k_score)
from  kechen,students
where kechen.k_id=students.id
group BY k_id;
#计算每个人的总分
name  sun(k_score)
yxq	311
kkk	158
yee	61
小明	90
select students.name,kechen.k_score
from students,kechen
where  students.id=kechen.k_id and kechen.k_score=(
select max(kechen.k_score)
 from kechen );
 #求最大值的姓名和分数
 name   k_score
 kkk    99
```



#### 时间函数

| 时间函数   | 用法                                                         | 说明                         |
| ---------- | ------------------------------------------------------------ | ---------------------------- |
| NOW        | 无参数                                                       | 显示现在的时间，日期加时分秒 |
| CURDATE    | 无参数                                                       | 返回当前日期                 |
| ADDDATE    | 增加时间，两个参数，前是日期，后输入数字默认天数，可重载时，分，月 | 返回增加后的时间             |
| ADDTIME    | 添加到expr2 到 expr1 并返回结果。 expr1 是一个时间或日期时间表达式，expr2是一个时间表达式。 | 返回增加后的时间             |
| CURTIME    | 无参数                                                       | 返回时间，时分秒             |
| DATE       | 输入一个参数是日期和时分秒                                   | 提取日期                     |
| DATEDIFF   | 输入两个时间参数，有日期                                     | 返回两者的差值               |
| YESR       | 输入一个日期                                                 | 返回年份                     |
| YESRWEEK   | 输入一个日期                                                 | 返回年份加星期               |
| WEEK       | 输入日期                                                     | 返回星期数                   |
| WEEKDAY    | 输入日期                                                     | 返回星期几                   |
| WEEKOFYEAR | 输入日期                                                     | 返回第几周                   |
| TIME       | 输入时间                                                     | 返回时间部分                 |
| MONTH      | 输入时间                                                     | 返回月份                     |
| MONTHNAME  | 输入时间                                                     | 返回月份名                   |
| MINUTE     | 输入时间                                                     | 返回分钟数                   |
| HOUR       | 输入时间                                                     | 返回小时                     |

```sql
SELECT ADDDATE(NOW(),55);
>2022-08-10  20:52:28
```
##### GROUP_CONCAT()函数

当我们想分完组显示所有信息的时候，可以使用GROUP_CONCAT()函数将所有的信息拼接成一个字符串

```sql
select class_id,count(class_id),GROUP_CONCAT(name)
from students
group by class_id

```

![image-20241128035324424](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202411280353630.webp)


##### WITH ROLLUP函数

统计整和元素的最大值和最小值在新的元组显示

> 这个我不好说 ，我不太明白，详细的话可以去查查使用

```sql
select max(k_name),max(k_id),max(k_score),GROUP_CONCAT(k_id),min(k_score)
from kechen
group by k_name
with ROLLUP

```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/3.png)


##### WITH CUBE函数

CUBE生成的结果集显示了所选列中值的所有组合的聚合。
ROLLUP生成的结果集显示了所选列中值的某一层次结构的聚合。

>  详细：[(5条消息) 浅谈with cube与with rollup之区别_iteye_4537的博客-CSDN博客](https://blog.csdn.net/iteye_4537/article/details/82342135)
>  

## 更多

.....






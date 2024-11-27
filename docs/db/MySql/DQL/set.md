# 集合查询

#### 合并查询

mysql只支持**UNION**

```sql
#不保留重复元组
select lie_name1[,lie_name2..] from table1  [where....group by...order by....limit...h]
UNION     
select lie_name1[,lie_name2..] from table2 [where....group by...order by....limit...h]
#保留重复的元组
select lie_name1[,lie_name2..] from table1  [where....group by...order by....limit...h]
UNION     ALL 
select lie_name1[,lie_name2..] from table2 [where....group by...order by....limit...h]


#与之 union 相同的有，全外连接
#mysql不支持
select lie_name1[,lie_name2..] from table1 
full join table2 on
[where....group by...order by....limit...h]

```

**EXCEPT**形成差集

==mysql不支持==

```sql
select lie_name1[,lie_name2..] from table1  [where....group by...order by....limit...h]
EXCEPT 
select lie_name1[,lie_name2..] from table2 [where....group by...order by....limit...h]

#与之相同的有
select lie_name1[,lie_name2..] from table1  [where....group by...order by....limit...h]
NOT IN 
(
select lie_name1[,lie_name2..] from table2 [where....group by...order by....limit...h]
)
```

交集查询==INTERSECT==

**mysql不支持**

```sql
select lie_name1[,lie_name2..] from table1  [where....group by...order by....limit...h]
INTERSECT
select lie_name1[,lie_name2..] from table2 [where....group by...order by....limit...h]
#可以用内连接替代
select lieming from table1
join table2 on 连接条件 [where...order...group..limit..] 
#或
select lieming from table1
inner join table2 on 连接条件 [where...order...group..limit..] 
```

对称差(去掉交集的部分)

```sql
SELECT table1.* FROM table1 
LEFT JOIN table2
ON table1.model = table2.model
WHERE table2.model is NULL
UNION
SELECT table2.* FROM table1 
RIGHT JOIN table2
ON table1.model = table2.model
WHERE table1.model is NULL
```
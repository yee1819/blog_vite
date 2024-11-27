### 3.2 UPDATE

修改数据

```sql
UPDATE table_name SET lie_name1=值1,lie_name2=值2....where...(筛选语句)..;
#若无where条件则所有数据全变
UPDATE table_name SET lie_name1=值1,lie_name2=值2....[where 条件 ]  [order by  ][ limit n,m]
#修改学习成绩<60的成绩为60分
update students set score=60 where score<60;
#修改三个最接近60分的为60分(捞人)
update students set score=60
where score<60 
  order by score desc 
  limit 0,3
```
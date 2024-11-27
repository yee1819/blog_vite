### 3.3 DELETE

删除数据(元组)

```sql
DELETE FROM table_name where ....;
#无where则全部删除
delete from table_name [where 条件 ]  [order by  ][ limit n,m]
#比如我想删除学生成绩最差的三个人
delete from students order by score desc limit 0,3;
#删除成绩小于60分的
delete from students where score <60;
#删除小于60分的三个人
delete from students where score <60 order by score desc limit 0，3;

```
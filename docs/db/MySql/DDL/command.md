#### 2.3.7  指令

```sql
show databases;#所有数据库
show create database ku_name;#查看定义
select database();#查看当前使用的数据库

create database 数据库名;#创建库
use 库名;#转移使用库名
drop database 库名;#删库跑路，慎用

show tables;#查看所有表
#查看表相关信息
DESC table_name ;
DESCRIBE table_name ;
#查看建表sql语句
show create table table_name;
#修改表
#添加首列
alter table_name add column lie_name 类型 FIRST;
#添加在字段名1之后
alter table_name add column lie_name 类型 字段名1;
#删表
DROP table if exists table_name ;
TRUNCATE table if exists table_name ;
```
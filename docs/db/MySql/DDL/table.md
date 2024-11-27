### 2.2建表与删表

建表前先了解一下完整性约束

|      约束      | 说明                                       |
| :------------: | ------------------------------------------ |
|  PRIMARY  KEY  | 标识该属性为主键，唯一标识对应的元组       |
| POREIGN    KEY | 标识该属性为外键，是与之联系与其他的表主键 |
|    NOT NULL    | 标识属性不为空                             |
|     UNIQUE     | 标识属性唯一                               |
| AUTO_INCREMENT | 标识该属性的值自动增加，是mysql的特色      |
|    DEFAULT     | 设置属性默认值                             |



完整性约束对字段现在，要求用户对属性进行操作符合特定要求，不符合则不执行用户操作。保证数据库的数据完整性。

在命令行执行sql语句的时候先转到要使用的数据库

```sql
use database_name;
```

创建表

```sql

create table table_name (

		字段1 类型1 约束1.....,

		字段2  类型2  约束2......,

		..........		

);

create table table_name(
	字段名1  字段类型   not null ,
	字段名    字段类型    DEFAULT 值,
    字段名     字段类型      PRIMARY KEY，#主键
    字段名    字段类型    UNIQUE,#唯一
    CONSTRAINT 约束名  FOREIGN KEY(字段名) REFERENCES 主表(引用列名) 
);


create table [if not exists] table_name(……);
#例子
create table student(
         name   varchar(20)   NOT NULL   ,
         id     int(10)    NOT NULL  PRIMARY KEY,   
         age     INT(5)     NOT   NULL
)
#其中外键约束是这样的
ALTER TABLE student           #在表格student中修改
add constraint st_class_id		##添加一个字段
FOREIGN KEY (class_id)			#外键约束class_id
REFERENCES classes(id);			#关联到classes表格的id字段上
#删除外键
ALTER TABLE student
DROP FOREIGN KEY st_class_id;#(仅仅是删除外键约束并没有删除这个字段)

#主键约束  
PRIMARYKEY(id)#可以放到建表后边约束

```

复制的方式建表

```sql
#只复制结构以及约束不复制数据
CREATE TABLE  new_table   LIKE    old_table;
#只复制数据和结构不复制约束
CREATE TABLE    new_table    AS    SELECT   *    FROM    old_table;
#两个表结构一样
insert into new_table select * from old_table;
#结构不一样
insert into new_table(字段1，字段2……) select 字段1，字段2…… from old_table;

```

| name |  id   | sex  | age  | class_id |
| :--: | :---: | :--: | :--: | :------: |
| yxq  | 10001 |  男  |  19  |    16    |
| yee  | 10002 |  男  |  20  |    16    |
| kkk  | 10003 |  女  |  21  |    16    |
| 小明 | 10004 |  男  |  20  |    24    |
| 小红 | 10005 |  女  |  19  |    15    |

```sql
CREATE table new_stu like students;
insert into new_stu SELECT *  from students where class_id=16;
```

| name |  id   | sex  | age  | class_id |
| :--: | :---: | :--: | :--: | :------: |
| yxq  | 10001 |  男  |  19  |    16    |
| yee  | 10002 |  男  |  20  |    16    |
| kkk  | 10003 |  女  |  21  |    16    |

删除表

```sql
DROP TABLE [IF EXISTS] table_name;
```

修改表名

```sql 
RENAME TABLE old_name to new_name;
```
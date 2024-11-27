### 2.3 修改表的结构

#### 2.3.1 修改表名

```sql
ALTER　TABLE old_name RENAME [To] new_name;
#仅修改表名
#to为可选参数，不影响结果
```

#### 2.3.2 添加字段

```sql
ALTER TABLE table_name add 字段名   约束;
ALTER TABLE table_name add [column] 字段名   字段约束;
#例如
ALTER table student add sex  enum('男','女') not null;
ALTER table student add name   varchar(11) not null;
alter table student add brith  date not null;
#也可以添加多个字段
alter table table_name add(
    new_name varchar(10),
    new_id int(10) NOT　NULL
);   

```

#### 2.3.3修改字段


```sql
#修改字段名
												#设置新的字段约束#可以设置相同的约束不改变结构
ALTER TABLE table_name CHANGE [column] old_name new_name varchar(11) DEFAULT NULL;#(设置默认空值)
#更改数据类型
ALTER TABLE table_name ALTER COLUMN lie_name    int(10);#把lie_name 的类型改为int(10);

```

#### 2.3.4 删除字段

```sql
#删除列名的列
ALTER TABLE table_name DROP COLUMN lie_name;
ALTER TABLE table_name DROP lie_name;
```

#### 2.3.5 约束添加

约束分为俩种，一个是列级约束，在定义列的后面添加约束，支持:`非空、默认、主键、唯一`,不能起约束名，可追加多个空格隔开，无顺序要求。表级约束是在定义所有字段后，在末尾，括号钱定义的约束支持:`主键、唯一、外键`，可以去约束名，mysql对主键无效

```sql
#其中外键约束是这样的
ALTER TABLE student           #在表格student中修改
add [constraint st_class_id]	#外键名	
FOREIGN KEY (class_id)			#外键约束class_id
REFERENCES classes(id);			#关联到classes表格的id字段上
#删除外键
ALTER TABLE student
DROP FOREIGN KEY st_class_id;#(仅仅是删除外键约束并没有删除这个字段)

#主键约束  #表级
ALTER TABLE table_name add [constraint 约束名] PRIMARY KEY table_name(lie_name)
#列级
alter table table_name modify column 字段名 字段类型 PRIMARY KEY;
#删除主键  不是删除字段
alter table table_name drop PRIMARY KEY;

#修改列的类型或约束
alter table table_name modify [column] lie_name 新类型 [新约束] #不输入约束则无约束
#设置默认值
alter table table_name modify [column] lie_name int(10) default 1;
#alter table table_name modify [column] lie_name 数据类型 default 值;
```
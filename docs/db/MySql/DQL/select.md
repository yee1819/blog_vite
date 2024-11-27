### 基本查询

### <font color=red>SELECT语句顺序</font>

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/顺序.png)



```sql
SELECT 字段1,字段2....      #如果是全选则可以用  *  
FROM table_name[,table_name2]     #选择表
[where ...[or] [and][between]]
[group by ...]
[order by [ASC][DESC]]#ASC升#DESC降
[having ]
```

这里是一个学生数据表格

```sql
create table classes(
	id int(5) PRIMARY KEY  AUTO_INCREMENT,
	class_name varchar(20),
    kemu  enum('文科','理科','艺术','体育')
);


insert into classes (id,class_name,kemu)  values (16,'十六班','理科'),(15,'十五班 ','文科'),(24,'二十四班','艺术'),(8,'八班','体育');



create  table students(
	name varchar(20) not null,
    id int(10)  PRIMARY KEY  AUTO_INCREMENT,
	sex enum('男','女'),
    age  int(5),
    class_id int(5),
    FOREIGN KEY(class_id) REFERENCES classes(id)
);
#或用语句单独设置外键
#alter table students add FOREIGN KEY class_id   REFERENCES classes(id);

insert into students (name,id,sex,age,class_id) values('yxq',10001,'男',19,16),('yee',10002,'男',20,16),('kkk',10003,'女',21,16),('小明',10004,'男',20,24),('小红',10005,'女',19,15);


create table kechen(
	k_id int(10) not null,
    k_name varchar(20) not null,
    k_score int(5)
);

alter table kechen add foreign key(k_id) references students(id);

insert into kechen(k_id,k_name,k_score)values(10001,'C语言',97),(10001,'英语',54);
insert into kechen(k_id,k_name,k_score)values(10003,'英语',99),(10003,'高等数学',59),(10001,'Python',79),(10001,'数据结构',81),(10002,'体育',61),(10004,'美术','90');
```
班级表

|  id  | class_name | kemu |
| :--: | ---------- | ---- |
|  15  | 十五班     | 文科 |
|  16  | 十六班     | 理科 |
|  24  | 二十四班   | 艺术 |
|  8   | 八班       | 体育 |

学生信息表

| name |  id   | sex  | age  | class_id |
| :--: | :---: | :--: | :--: | :------: |
| yxq  | 10001 |  男  |  19  |    16    |
| yee  | 10002 |  男  |  20  |    16    |
| kkk  | 10003 |  女  |  21  |    16    |
| 小明 | 10004 |  男  |  20  |    24    |
| 小红 | 10005 |  女  |  19  |    15    |

分数表

| k_id  |  k_name  | k_score |
| :---: | :------: | :-----: |
| 10001 |  C语言   |   97    |
| 10001 |   英语   |   54    |
| 10003 |   英语   |   99    |
| 10003 | 高等数学 |   59    |
| 10001 |  Python  |   79    |
| 10001 | 数据结构 |   81    |
| 10002 |   体育   |   61    |
| 10004 |   美术   |   90    |

```sql
select DISTINCT *
from students,classes,kechen
WHERE students.class_id=classes.id AND kechen.k_id=students.id;#三张表连接查询
```

测试一下

| name | id    | sex  | age  | class_id | id   | class_name | kemu | k_id  | k_name   | k_score |
| ---- | ----- | ---- | ---- | -------- | ---- | ---------- | ---- | ----- | -------- | ------- |
| yxq  | 10001 | 男   | 19   | 16       | 16   | 十六班     | 理科 | 10001 | C语言    | 97      |
| yxq  | 10001 | 男   | 19   | 16       | 16   | 十六班     | 理科 | 10001 | 英语     | 54      |
| yxq  | 10001 | 男   | 19   | 16       | 16   | 十六班     | 理科 | 10001 | Python   | 79      |
| yxq  | 10001 | 男   | 19   | 16       | 16   | 十六班     | 理科 | 10001 | 数据结构 | 81      |
| yee  | 10002 | 男   | 20   | 16       | 16   | 十六班     | 理科 | 10002 | 体育     | 61      |
| kkk  | 10003 | 女   | 21   | 16       | 16   | 十六班     | 理科 | 10003 | 英语     | 99      |
| kkk  | 10003 | 女   | 21   | 16       | 16   | 十六班     | 理科 | 10003 | 高等数学 | 59      |
| 小明 | 10004 | 男   | 20   | 24       | 24   | 二十四班   | 艺术 | 10004 | 美术     | 90      |

#### **==seltct语句==**

```sql
stlect 字段1(列名1).....
form  table_name1[,table_name2,.....];
#例子
select *
from students;
```

| name |  id   | sex  | age  | class_id |
| :--: | :---: | :--: | :--: | :------: |
| yxq  | 10001 |  男  |  19  |    16    |
| yee  | 10002 |  男  |  20  |    16    |
| kkk  | 10003 |  女  |  21  |    16    |
| 小明 | 10004 |  男  |  20  |    24    |
| 小红 | 10005 |  女  |  19  |    15    |

```sql
#例子2
select name,sex,age
from students;
```

| name | sex  | age  |
| :--: | :--: | :--: |
| yxq  |  男  |  19  |
| yee  |  男  |  20  |
| kkk  |  女  |  21  |
| 小明 |  男  |  20  |
| 小红 |  女  |  19  |

#### CONCAT函数

```sql
将字段连在一起
SELECT class_name,CONCAT(id,class_name,kemu)
from classes

```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/concat.png)



#### 条件表达式 CASE

`CASE` 用于实现条件判断，类似于编程中的 `if-else`。

 示例

```sql
-- 根据年龄分类用户
SELECT name,
       CASE
           WHEN age < 18 THEN '未成年'
           WHEN age BETWEEN 18 AND 60 THEN '成年'
           ELSE '老年'
       END AS age_group
FROM users;
```

#### DISTINCT关键字

去掉重复的列

```sql
stlect DISTINCT *
from classes,students
where ....
#即有一些时候连接俩个表的时候，有一些列是一摸一样的，这个时候我们并不需要显示它，可以通过选择投影的方式去选择不需要的列，也可以在select后面加上distinct，去掉重复的列.
```



#### **==WHERE==**关键字

来点高级的，比如我想看到男生的信息

```sql
select *
from students
where sex='男';
```

| name |  id   | sex  | age  | class_id |
| :--: | :---: | :--: | :--: | :------: |
| yxq  | 10001 |  男  |  19  |    16    |
| yee  | 10002 |  男  |  20  |    16    |
| 小明 | 10004 |  男  |  20  |    24    |

==**逻辑运算**==

学过c\c++,java、python等等编程语言的都了解逻辑运算

| 关键字  | 含义                                                     |
| ------- | -------------------------------------------------------- |
| AND     | 表示且，同c的&&和python的and                             |
| OR      | 表示或,同c的\|\|和python的or      ///`and的优先级高于or` |
| IN      | 表示存在一个或一个数列里面，同python的in                 |
| NOT     | 表示非                                                   |
| ANY     | 表示任意一个                                             |
| ALL     | 表示所有                                                 |
| EXISTS  | 表示存在                                                 |
| BETWEEN | 表示一定范围内                                           |
| SOME    | 表示某些为真                                             |
| UNIQUE  | 搜索唯一性（无重复项目）                                 |

##### **==AND和OR和IN、NOT==**关键字

如果只想看到10002号到10004号的学生信息

```sql
select *
from students
where id<=10004 and id>=10002;

select *
from students
where  id=10002 or id=10003 or id=10004;

select * 
from students
where id IN (10002,10003,10004);

select * 
from students
where id NOT IN (10001,10005,10006);

select *
from students
where  id IN (
SELECT id
FROM students
WHERE id between 10002 and 10004
);

select *
from students
where  id<>10001 or id!=10005 or id<>10006;

```

| name |  id   | sex  | age  | class_id |
| :--: | :---: | :--: | :--: | :------: |
| yee  | 10002 |  男  |  20  |    16    |
| kkk  | 10003 |  女  |  21  |    16    |
| 小明 | 10004 |  男  |  20  |    24    |

```sql
-- 查询不是 'admin' 的用户
SELECT * FROM users
WHERE NOT role = 'admin';
```





##### **==BETWEEN   AND==**关键字

写两个小于大于号加一个and有点麻烦，有一种方式可以快速去区间值

```sql
select *
from students
where id between 10002 and 10004;#效果和上表一样，一般小的放在前面
```

如果想查询19岁到21岁的学生

```sql
insert into students(name,id,sex,age,class_id)values('xt',10006,'女',18,8);
select *
from students
where age BETWEEN 19 and 21;
```

| name |  id   | sex  | age  | class_id |
| :--: | :---: | :--: | :--: | :------: |
| yee  | 10002 |  男  |  20  |    16    |
| kkk  | 10003 |  女  |  21  |    16    |
| 小明 | 10004 |  男  |  20  |    24    |

新插入进来的数据没有显示，因为她 的年龄小于19岁

```sql
select *
from students
where age <=18;
```

| name |  id   | sex  | age  | class_id |
| :--: | :---: | :--: | :--: | :------: |
|  xt  | 10006 |  女  |  18  |    8     |

##### LIKE 关键字

```sql
#语法
[not]like 'str'[escape'换码字符']


```

%号匹配任意数目的字符

_号匹配一个字符

例如匹配一个姓张的同学名字，名字可能有俩个或者三个

`where like '张%'`或者`where like '张 _ _'`

查询一段话里面有我喜欢你

`where str like '%我喜欢你%'`

查询第二个字是`哈`

```where str like '_哈%'```

如果想匹配`_`和`%`的话，需要加上转义符`\`，比如`\_`或者`\%`。

指定一个转义字符可以使用==escape==

`where str like '我^_哈哈哈哈' escape'^'`匹配`我_哈哈哈哈`这一串字符。

##### EXISTS运算符

类似==IN==，测试子查询中有没有这个值

```sql
select *
from students
where   EXISTS (
SELECT id
FROM students
WHERE id between 10002 and 10004
);#若存在则输出，不存在则不输出
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/exists.png)

#### 空值

用来检查字段是否为 `NULL`。

```sql
sql复制代码-- 查询邮箱为空的用户
SELECT * FROM users
WHERE email IS NULL;

-- 查询邮箱不为空的用户
SELECT * FROM users
WHERE email IS NOT NULL;
```

#### 分组

> 在查询的时候，可能需要对数据进行分组显示，让数据直观显示，或者进行sum和count等等计算。

```sql
#例如我想查询各个班的人数
select class_id,count(class_id)
from students
group by class_id

```

![image-20241128034005175](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202411280340373.webp)

除了count外，max，min，avg,sum等函数都可以在分组中实现.

```sql
#对多个字段进行分组
select class_id,age,count(class_id)
from students
group by class_id,age

```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/11.png)

##### HAVING关键字

有时候我们分完组后，有一些数据不想要，我们可以使用having关键字实现筛选

```sql
#比如上面的分组中我不想看到20岁以下的人
select class_id,age,count(class_id)
from students
group by class_id,age
HAVING( not age<20)
#或者
select class_id,age,count(class_id)
from students
group by class_id,age
HAVING( age>=20)
#效果都是一样的
```

![image-20241128033916671](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202411280339891.webp)



#### 排序

排序基本语法是这样的

```sql
select *
from  table[,tbale2,...]
order by 条件[,条件2.....] [DESC/ASC]#前者降序，后者升序，后者可省略，默认后者
```

```sql
#比如查找课程分数，一条一条记录有些乱，想让不同的学生的分数在一起显示
select *
from kechen
order by k_id;
#效果一样
select *
from kechen
order by k_id asc;
```

![image-20241128034204160](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202411280342372.webp)

```sql
#如果我想反着顺序来看
select *
from kechen
order by k_id desc;
```

![image-20241128034214197](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202411280342403.webp)

```sql
#多个排序条件查询
select *
from kechen
order by k_id ,k_score DESC;#id正序，分数降序
```

![image-20241128034229596](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202411280342797.webp)

如果我想查看每个科目的最高分

```sql
select *
from kechen
group by k_name
order by k_score desc;
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/1.png)

==上面的是错误示例==^以示警戒，我决定不删除^

```sql
select max(k_score),max(k_id)
from kechen
group by k_name

```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/2.png)

#### AS关键字

AS关键字是更改名字的关键字

有时候查询用到了分组求平均值等等，会另外取一列查看，此时的列名是空白，这个时候就要修改列名

```sql
SELECT k_id,AVG(k_score)
from kechen
group by k_id;
```

![image-20241128034255091](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202411280342286.webp)

看列名有些不合适，使用as可以更改别名

```sql
SELECT k_id,AVG(k_score) as 平均值
from kechen
group by k_id;
#或者省略as
SELECT k_id,AVG(k_score)  平均值
from kechen
group by k_id;
#效果是一样的
```

![image-20241128034304955](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202411280343155.webp)

**也可以修改表名，在from语句后，一般用于子查询****

#### LIMIT关键字

limit关键字可以选择查询的第几条到第几条的数据，一般运用于数据量太大把他分开几页查询，例如有一个十万信息的数据库，我每次只显示10条，点下一页显示下一个十条

```sql
select * from table limit n,m;#查找n+1数据开始的m条数据如n=5,m=10，查询6~15
select * from table limit 22,-1;#此时查询从23 开始一直到结束23~last
#查询前n条数据
select * from table limit n;
select * from table limit 0 , n；


#以上 四条查询语句也可以变成下面的方式呈现
select * from table limit m offset n;
select * from table limit -1 offset 22;
select * from table limit n offset 0;
#仅仅是调换位置而已.
#这样就能实现比如看网络小说，章节动不动几千章，很难翻到，使用这条语句能把几千章的分为几十章节分页查询，方便得多
```

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/limit.png)
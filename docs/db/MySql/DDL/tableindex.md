

#### 2.3.6 索引

为了提高查找效率，可以设置索引

```sql
alter table table_name add index idx_name(lie_name);
alter table table_name add index idx_name(lie1_name,lie2_name);
#主键索引效率最高，主键唯一
#使用唯一做索引的效率和主键一样
#唯一索引
alter table table_name add unique uni_name(lie_name);
#创建唯一约束
alter table table_name add [constraint uni_name ] unique (lie_name);
#删除索引
drop index table_name.index_name;
#索引创建
create index index_name on table_name;
#单列索引
create index index_name on tabel_name (lie_name);
#唯一索引
create unique index index_anem on table_name (lie_name);
#聚簇索引####表中两个或者更多的列
create index index_naem on table_name(lie1,lie2...);

```

## 索引



索引是什么？











索引失效？





什么情况下适合索引？








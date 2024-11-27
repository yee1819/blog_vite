# 操作数据库

### 2.1创建库与删库

```sql
create database datebase_name;#创建一个数据库

create database database_name default charset utf8_general collate utf8_general_ci;#设置编码字符集
#删除数据库
DROP DATABASE database_name;
#修改字符集
alter database schooldb CHARSET utf8;
```
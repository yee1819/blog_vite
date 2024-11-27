### 事务

每次执行一个sql语句是一种隐式事务

而同时执行多个sql语句就是一种显式事务

在一个事务里的sql语句必须全部执行成功才能更改数据，否则与未执行一样不会对数据进行改变

查看/设置事务提交方式

```sql
select @@autocommit;#默认1，自动
set @@autocommit=0;#设置为0，手动
```



提交事务

```sql
begin;/START TRANSACTION;#开启事务
sql语句1
sql语句2.... 
commit;
```

回退事务

```sql
begin;/start TRANSACTION;
sql语句1
sql语句2....  -- 此时错误则回退
ROLLBACK;
```



> 数据库事务具有ACID这4个特性：
> - A：Atomic，原子性，将所有SQL作为原子工作单元执行，要么全部执行，要么全部不执行；
> - C：Consistent，一致性，事务完成后，所有数据的状态都是一致的，即A账户只要减去了100，B账户则必定加上了100；
> - I：Isolation，隔离性，如果有多个事务并发执行，每个事务作出的修改必须与其他事务隔离；
> - D：Duration，持久性，即事务完成后，对数据库数据的修改被持久化存储。

当有多个事务并发执行的时候，事务执行过程中会造成数据的修改不正确

脏读：当一个事务还未完成，另一个事务读取到了未完成的事务没有提交的数据

不可重复读：当一个事务需要重复读取同一个记录，却俩次读取的数据不一样，因为另一个事务提交了数据

幻读：查询数据时不存在，想插入数据时，另外一个事务已经插入了，导致插入失败，再次 查询还是查询不到

隔离级别

![](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com/markdown/隔离.png)

隔离级别与效率成反比

查看隔离级别

```sql
SELECT @@TRANSACTION_ISOLATION;
select @@tx_isolation;
show variables like '%tx_isolation%'
```

mysql默认第三个级别，只会发生幻读。

修改事务隔离级别

```sql
SET [SESSION | GLOBAL] TRANSACTION ISOLATION LEVEL {READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE}
```

[SESSION | GLOBAL]表示修改的隔离级别的范围，前者应用于当前窗口所有事务，后者是全局事务，省略的话，则应用于当前窗口未执行的事务
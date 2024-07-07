# 基于Lua的redis脚本

## Lua的redis脚本

基本语法

```lua
redis.call('命令','key','其他参数')
```

例如执行set

```lua
redis.call('set','name','jack')
-- set name jack
```

如果要取出name的属性

```lua
redis.call('set','name','jack')
-- set name jack
local name = redis.call('get','name')
-- get name
-- name = jack
return name
```

## redis中调用脚本

redis的`eval`命令 是执行各种各样的脚本命令

```shell
127.0.0.1:6379> help eval

  EVAL script numkeys key [key ...] arg [arg ...]
  summary: Execute a Lua script server side
  since: 2.6.0
  group: scripting
```

- script :

  指脚本

- numkeys

  有几个参数调用

- key、arg

  key和值

例如`set`命令,无参数

```shell
127.0.0.1:6379>  EVAL "return redis.call('set','plm','jack')" 0
OK
127.0.0.1:6379> get plm
"jack"
```

如果有参数

```shell
127.0.0.1:6379> eval "return redis.call('set',KEYS[1],ARGV[1])" 1 name rose
OK
127.0.0.1:6379> get name
"rose"
```

`KEYS`和`ARGV`必须大写




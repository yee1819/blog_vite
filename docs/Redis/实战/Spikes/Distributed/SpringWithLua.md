# Spring中使用Redis-lua脚本

SpringDataRedis的RedisTemplate中封装了脚本命令

```java{7,8}
public class DefaultScriptExecutor<K> implements ScriptExecutor<K> {
    private final RedisTemplate<K, ?> template;

    public DefaultScriptExecutor(RedisTemplate<K, ?> template) {
        this.template = template;
    }
// 传入参数与redis的eval指令类似，不需要指定number，根据list的数量
    public <T> T execute(RedisScript<T> script, List<K> keys, Object... args) {
        return this.execute(script, this.template.getValueSerializer(), this.template.getValueSerializer(), keys, args);
    }

    public <T> T execute(RedisScript<T> script, RedisSerializer<?> argsSerializer, RedisSerializer<T> resultSerializer, List<K> keys, Object... args) {
        return this.template.execute((connection) -> {
            ReturnType returnType = ReturnType.fromJavaType(script.getResultType());
            byte[][] keysAndArgs = this.keysAndArgs(argsSerializer, keys, args);
            int keySize = keys != null ? keys.size() : 0;
            if (!connection.isPipelined() && !connection.isQueueing()) {
                return this.eval(connection, script, returnType, keySize, keysAndArgs, resultSerializer);
            } else {
                connection.eval(this.scriptBytes(script), returnType, keySize, keysAndArgs);
                return null;
            }
        });
    }
.....
}
```

## 实现

在静态资源文件夹中放入lua脚本

![image-20240706213036565](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407062131860.webp)

设置脚本

```java
private static final DefaultRedisScript<Long> UNLOCK_SCRIPT ;

static {
    UNLOCK_SCRIPT = new DefaultRedisScript<>();
    //找到静态资源文件夹下的lua脚本
    UNLOCK_SCRIPT.setLocation(new ClassPathResource("unlock.lua"));
    //设置返回类型
    UNLOCK_SCRIPT.setResultType(Long.class);
}
```

重写unlock函数

```java
@Override
public void unlock() {
    stringRedisTemplate.execute(UNLOCK_SCRIPT,
            //转化单元素为集合
            //key
            Collections.singletonList(KEY_PREFIX+name),
            //id
            ID_PREFIX+Thread.currentThread().getId());

}
```



这样在java中只执行一句代码，保证了原子性










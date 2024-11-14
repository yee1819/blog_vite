````nginx
## 负载均衡

用户多的时候，执行业务处理中的服务器免不了高并发，如果只有一个服务器，那么可能导致响应速度慢业务堵塞服务器崩溃等等不好的后果。所以一般会由多个服务器进行业务处理，降低每个服务器的压力。

具体使用

```nginx
http {
    upstream backend {
        server backend1.example.com;
        server backend2.example.com;
        server 0.0.0.1;
        #....还可以再加
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
            #相当与 http://backend1.example.com
            #或者 http://backend2.example.com
            #或者 http://0.0.0.1
            # 复制粘贴upstream 的server
        }
    }
}
```

这样，服务器就有原本的一个服务器支撑业务就变为多个服务器一起进行

### **轮询 (Round Robin)**:

默认的算法：例如设置了三个服务器进行负载均衡，则按照顺序一个一个轮流分配请求到每个后端服务器。

例如a、b、c为三个服务器 的编号，现在有一连串的请求到Nginx，那么分配顺序就是：abc abc abc abc abc

### **权重 (Weight)**:

```nginx
upstream backend {
    server backend1.example.com weight=3;
    server backend2.example.com weight=2;
    server 0.0.0.1 weight=1;
}
```

设置方法就是在IP地址后面加上  weight= 权重值 ，不设置默认为1

如代码所示，a、b、c的权重为3、2、1那么一串请求进入的分配结果为：

aaabbc  aaabbc    aaabbc 

### **IP 哈希 (IP Hash)**:

根据客户端 IP 地址的哈希值来分配请求，这样来自同一个客户端的请求会始终被分配到同一个后端服务器。

```nginx
upstream backend {
    ip_hash;
    server backend1.example.com;
    server backend2.example.com;
    server 0.0.0.1 ;
}
```

请求的session就不怕被分配到其他的服务器了。



### **热备（backup）**

设置某个 服务器 做当作备用，当全部服务器都故障了，就使用这个备用服务器。

```nginx
upstream mysvr { 
    server backend2.example.com;
    server 0.0.0.1  backup;  #热备     
}
```

加入a、b是编号，b是热备，那么请求是这样的aaaaaaaaaa，a 故障了，bbbbbbbbb。

### **健康检查 (Health Check)**:

为了确保请求只被分配到正常运行的服务器，可以配置健康检查。

```nginx
    upstream backend {
        least_conn;
        server backend1.example.com weight=3;
        server backend2.example.com weight=2;
        server 0.0.0.1 weight=1;

        health_check interval=10s fails=3 passes=2;
    }
```

三个参数为：

- **interval=10s**:
表示健康检查的时间间隔，即每 10 秒对每个上游服务器进行一次健康检查。

- **fails=3**:
表示在标记服务器为不可用之前必须连续失败的健康检查次数。如果服务器连续 3 次健康检查失败，那么它将被认为是不可用的。

- **passes=2**:
表示在将服务器标记为可用之前必须连续成功的健康检查次数。如果服务器被标记为不可用，但之后连续 2 次健康检查成功，那么它将被重新标记为可用。



### **最少连接 (Least Connections)**:

 将请求分配给当前活动连接数最少的服务器，适用于请求处理时间较长的场景。

```nginx
upstream backend {
    least_conn;
    server backend1.example.com;
    server backend2.example.com;
    server 0.0.0.1;
}
```





### 其他配置

- down，表示当前的server暂时不参与负载均衡。
- backup，预留的备份机器。当其他所有的非backup机器出现故障或者忙的时候，才会请求backup机器，因此这台机器的压力最轻。
- max_fails，允许请求失败的次数，默认为1。当超过最大次数时，返回proxy_next_upstream 模块定义的错误。
- fail_timeout，在经历了max_fails次失败后，暂停服务的时间。max_fails可以和fail_timeout一起使用。

例如：

```nginx
upstream mysvr { 
    server 127.0.0.1:7878 weight=2 max_fails=2 fail_timeout=2;
    server 192.168.10.121:3333 weight=1 max_fails=2 fail_timeout=1;    
}
```xxxxxxxxxx4 1upstream mysvr { 2    server 127.0.0.1:7878 weight=2 max_fails=2 fail_timeout=2;3    server 192.168.10.121:3333 weight=1 max_fails=2 fail_timeout=1;    4}nginx
````
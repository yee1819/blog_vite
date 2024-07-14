# IDEA模拟分布式多系统

分布式系统一般需要多台主机执行同一项目以达到负载均衡的效果。

但是我手中没有那么多台主机，只能依靠不同的端口号模拟分布式系统的实现

## 创建运行新实例

方式有两种

1. 按下`ALT`+`8`进入service

   ![image-20240705165009397](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407051650776.webp)

   复制配置进入配置编辑界面

   ![image-20240705165056143](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407051650452.webp)

   配置好信息确定即可

   2. 启动时配置启动环境

      ![image-20240705170832868](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407051708189.webp)

      新建启动配置，因为是sptringboot程序，所以需要选择springboot

      ![image-20240705170855330](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407051708518.webp)

      ![image-20240705171020973](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407051710149.webp)







## 配置不同的端口

有不同的方式配置不同的端口

1. 默认使用配置文件配置端口

2. 虚拟机选项

   ![image-20240705191204246](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407051912478.webp)

4. 配置文件

   ![image-20240705191427132](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407051914307.webp)

3. 配置环境变量

   ![image-20240705191327377](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407051913517.webp)

---

## NGINX的负载均衡



最后配置Nginx

```nginx
    server {
        listen       8080;
        server_name  localhost;
        # 指定前端项目所在的位置
        location / {
            root   html/hmdp;
            index  index.html index.htm;
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }


        location /api {  
            default_type  application/json;
            #internal;  
            keepalive_timeout   30s;  
            keepalive_requests  1000;  
            #支持keep-alive  
            proxy_http_version 1.1;  
            rewrite /api(/.*) $1 break;  
            proxy_pass_request_headers on;
            #more_clear_input_headers Accept-Encoding;  
            proxy_next_upstream error timeout;  
            # proxy_pass http://127.0.0.1:8081;
            proxy_pass http://backend;
        }
    }

    upstream backend {
        server 127.0.0.1:8081 max_fails=5 fail_timeout=10s weight=1;
        server 127.0.0.1:8082 max_fails=5 fail_timeout=10s weight=1;
        server 127.0.0.1:8083 max_fails=5 fail_timeout=10s weight=1;
        server 127.0.0.1:8084 max_fails=5 fail_timeout=10s weight=1;
    }  
```

以轮询的方式进行负载均衡

重新加载Nginx配置`nginx.exe -s reload`

此时运行前端项目就会发现服务器正在以轮询的方式进行负载均衡
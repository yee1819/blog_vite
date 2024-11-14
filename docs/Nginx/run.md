## 下载以及初步运行

以Windows为例：

官网下载[nginx：下载](https://nginx.org/en/download.html)

因为Nginx初始端口为80，这是所有服务器默认的HTTP端口，在`Windows中`会被占用从而打不开，首先我们需要修改默认端口，解压Nginx文件夹后打开Nginx路径下的`\nginx-1.26.0\conf\nginx.conf`

映入眼帘的是如下配置（去除注释外）：

```nginx
#user  nobody;
worker_processes  1;

events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;
    server {
        listen       80;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
        }
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
}
    }
}
}
```

其他我们先不管，先把视线放在`http`->`server`之中，我们可以看到`listen`后面跟着80这个数字，listen就是我们想要找到的端口号设置，把这一段修改为任意一个没被占用的端口号即可，我这里修改为90

如下：

```nginx
 server {
        listen       90;
        server_name  localhost;
        location / {
            root   html;
            index  index.html index.htm;
        }
	    error_page   500 502 503 504  /50x.html;
    	location = /50x.html {
        	root   html;
        }
}
```

之后我们打开[127.0.0.1:90](http://127.0.0.1:90/)就能看见默认生成的Nginx页面

![默认Nginx](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240529201310112.webp)

我们注意到`server`之中还有好几个配置名字，这些都是什么意思呢？

首先看到`listen`下的`server_name`，这个起到设置域名或者IP地址的作用，众所周知localhost就是127.0.0.1,所以我们能在27.0.0.1:90访问到Nginx的初始界面。

`server_name`可以使用域名、IP、通配符、正则表达式、`default_server`进行匹配，定义服务器的地址，其中default_server修饰是搭配80 或者 443 标记用于指定默认的服务器块，当没有其他服务器块匹配请求的域名时，NGINX将使用这个默认的服务器块 （也可以设置你想展示的默认端口或IP地址 。

接下来就是

```nginx
location / {
            root   html;
            index  index.html index.htm;
        }
error_page   500 502 503 504  /50x.html;
location = /50x.html {
    root   html;
}
```

`location`后设置访问的是请求，可以使用正则表达式、通配符、地址、文件等等例如`/`就是请求网址根目录，`/50x.html`，就是请求`127.0.0.1:90/50x.html`，`{}`内的参数`root`为文件地址，可以是相对路径也可以是绝对地址，`index`是主页的搜索范围，例如上面的配置中就是在`/html/`找到`index.html`或者`index.htm`

> Nginx先判断的并不是请求而是路径，但是可以类似的通过`try_files $uri /test.html;`把路径变为请求，在下面有讲到...
>
> 如果省略后缀名也可以找出来结果

使用`=`号的时候，会精准匹配某个准确的字符串

我们观察到root 也就是路径写着是`html`，那么这个html在哪里呢？我们打开Nginx的文件夹中看看

![html路径](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240529203147654.webp)

![网址`/`或`/50x.html`](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240529203307267.webp)

除了这个以外，还有一行`error_page   500 502 503 504  /50x.html;`，意思是如果发生了 500、502、503、504状态码错误，就跳转到`/50x.html`界面，用来处理页面错误问题。



了解到这些以后我们来自定义一个配置试试看。

添加配置：

```nginx
        location /test {
            root html;
            # index test.html;
            try_files $uri /test.html;
        }
#此时/test可能会被解析为路径而不是请求，所以需要  try_files  
        location = /hello.html {
            root html;
        }
```

> 注意！修改配置后需要重启Nginx！！！
>
> `try_files 正则表达式或者文件名;` 加载查询到的第一个结果

结果如下：

![自定义新界面的结果](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240529211241824.webp)

![请求以及缺省后缀名](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240530003849843.webp)

编码问题不用在意啦...


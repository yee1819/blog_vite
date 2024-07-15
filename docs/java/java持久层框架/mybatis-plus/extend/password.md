# 配置加密

给你的配置信息加密（账号、密码等等）

以账号密码为例

先生成账号密码的密文

::: code-group

```Java[生成密文代码]
package com.itheima.mp;

import com.baomidou.mybatisplus.core.toolkit.AES;
import org.junit.jupiter.api.Test;

class MpDemoApplicationTests {
    @Test
    void contextLoads() {
        // 生成 16 位随机 AES 密钥
        String randomKey = AES.generateRandomKey();
        System.out.println("randomKey = " + randomKey);

        // 利用密钥对用户名加密
        String username = AES.encrypt("root", randomKey);
        System.out.println("username = " + username);

        // 利用密钥对用户名加密
        String password = AES.encrypt("201819", randomKey);
        System.out.println("password = " + password);

    }
}
```

```SQL[密文信息]
randomKey = 8930b163173240cb
username = IX9AH7q/j+xdgTunSzrhzg==
password = mUs0x0cIXwhx9lYudVvDfw== 
```

```YAML[配置类的信息]
spring:
  datasource:
    url: jdbc:mysql://127.0.0.1:3306/mp?useUnicode=true&characterEncoding=UTF-8&autoReconnect=true&serverTimezone=Asia/Shanghai&rewriteBatchedStatements=true
    driver-class-name: com.mysql.cj.jdbc.Driver
    username: mpw:IX9AH7q/j+xdgTunSzrhzg==    # 密文要以 mpw:开头
    password: mpw:mUs0x0cIXwhx9lYudVvDfw==  # 密文要以 mpw:开头
```

:::

在启动项目的时候，需要把刚才生成的秘钥添加到启动参数中，像这样：

`--mpw.key=8930b163173240cb`

![image-20240715205450138](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407152054832.webp)

参数结果正常：

![image-20240715205532448](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407152055589.webp)



::: tip 

在测试类中无法添加启动参数,需要加到测试类的注解上

![image-20240715205827929](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407152058139.webp)

:::
# 代码生成器

先前进行配置service接口的时候过于繁琐

Mybatis-plus提供了一个代码生成器，可以根据数据库表中字段自动生成`Controller`、`Service`、`Mapper`三个层的代码以及对应实体类的接口

[代码生成器 | MyBatis-Plus (baomidou.com)](https://baomidou.com/guides/new-code-generator/)

具体步骤

1. 引入依赖

   - 代码生成器依赖

   - 生成器的模板依赖

     默认为`VelocityTemplateEngine`

     如果引入的依赖不是`VelocityTemplateEngine`，则需要在设置模板

   ```xml
   <dependency>
       <groupId>com.baomidou</groupId>
       <artifactId>mybatis-plus-generator</artifactId>
       <version>3.5.3</version>
   </dependency>
   <dependency>
       <groupId>org.apache.velocity</groupId>
       <artifactId>velocity-engine-core</artifactId>
       <version>2.3</version>
   </dependency>
   ```

   

2. 配置生成器

   生成的`Controller`、`Service`、`Mapper`的路径等等

   ```java
   import com.baomidou.mybatisplus.generator.FastAutoGenerator;
   import com.baomidou.mybatisplus.generator.config.OutputFile;
   import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;
   
   import java.util.Collections;
   
   public class CodeGenerator {
       public static void main(String[] args) {
           FastAutoGenerator.create("jdbc:mysql://localhost:3306/your_database?useUnicode=true&useSSL=false&characterEncoding=utf8", "root", "password")
               .globalConfig(builder -> {
                   builder.author("your_name") // 设置作者
                       .enableSwagger() // 开启 swagger 模式
                       .fileOverride() // 覆盖已生成文件
                       .outputDir(System.getProperty("user.dir") + "/src/main/java"); // 指定输出目录
               })
               .packageConfig(builder -> {
                   builder.parent("com.example") // 设置父包名
                       .moduleName("module_name") // 设置父包模块名
                       .pathInfo(Collections.singletonMap(OutputFile.mapperXml, System.getProperty("user.dir") + "/src/main/resources/mapper")); // 设置mapperXml生成路径
               })
               .strategyConfig(builder -> {
                   builder.addInclude("your_table_name") // 设置需要生成的表名
                       .addTablePrefix("t_", "c_"); // 设置过滤表前缀
               })
               .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
               .execute();
       }
   }
   ```

> [Mybatis-plus最新代码生成器（3.5.1+）的使用_globalconfig是什么依赖的-CSDN博客](https://blog.csdn.net/qq_42682745/article/details/120626012)
>
> 这里有一篇教程，以防我忘记了

## 利用插件创建

::: tip  官方插件 

[Mybatis X 插件 | MyBatis-Plus (baomidou.com)](https://baomidou.com/guides/mybatis-x/)

Mybatis-Plus官方插件 

:::

本篇使用其他第三方插件`MybatisPlus`

![image-20240715095719697](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407150957950.webp)

安装好了以后，进行数据库的配置

![image-20240715100554227](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407151005569.webp)

配置好了以后选择第二栏

![image-20240715101727716](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407151017820.webp)



进入详细配置

![image-20240715101650247](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407151016454.webp)

- 关于表前缀，如果设置`tb_`,在数据库中设置为`tb_abc`的表生成后就会变成`abc`

做好配置后，按下`code generatro`即可实现代码的生成

mp-demo的配置

![image-20240715102451117](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407151024290.webp)

以下是效果：

![image-20240715102758093](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blog202407151027329.webp)
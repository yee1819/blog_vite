



## 前置知识





## Bean

IOC : 控制反转。对象的创建由程序交给外部容器

DI：依赖注入。容器为应用程序运行时，所依赖的资源为依赖注入

Bean对象：IOC容器中创建管理的对象为Bean

`@Component`：注解在类上，标志为Bean对象，使用IOC容器管理

`@Component`为通用注解

衍生注解，标注作用，不属于以下三种则使用`@Component`

- `@Repository`持久层

- `@Controller` 控制层
- `@Service`服务层

其中控制层`@RestController`=`@ResponseBody`+`@Controller`,使用`@RestController`就可以了

### Bean的名字：

默认类名首字母小写，如User的bean为user

设置`@Component("uuser")`、`@Component(value = "uuser")`

### Bean扫描

SpringBoot 默认扫描启动类当前包以及子包

如果想要扫描其他包则使用

单个包：`@ComponentScan("com.kirari.dashijian.dao")`

多个包：`@ComponentScan({"com.kirari.dashijian.dao","com.kirari.dashijian"})`



### 获取Bean

#### 自动配置的三种方法

> 想要自动配置，类上一定要有被String容器标记为Bean的`@Component`及其子注解或配置类`@Configuration`
>
> 例如：
>
> ```java
> public class LoginInterceptor implements HandlerInterceptor {
> 
> //    @Resource
>     StringRedisTemplate stringRedisTemplate;
> }
> ```
>
> 这个例子中`LoginInterceptor`没有`@Component`注解，不是Bean，不可以使用自动配置

##### `@AUtowired`

自动配置默认按照类型进行装配，默认的Bean的名字是Bean类名的首字母小写。

默认自动装配时，会按照与Bean名相同的变量名进行查找匹配

定义一个`Service`接口

```java
@Service
public interface Tttest {
    public String name();

}
```

实现俩个Bean的实现类

t1:

```java
@Component
public class t1 implements Tttest {
    @Override
    public String name() {
        return "t1";
    }
}
```

t2:

```java
@Component
public class t2 implements Tttest {
    @Override
    public String name() {
        return "t2";
    }
}
```

测试：

```java
@Autowired
UserService userService1;
@Autowired
Tttest t1;
@Autowired
Tttest t2;
@Test
public void getBean(){
    System.out.println(t1.name());
    System.out.println(t1);
    System.out.println(t2.name());
    System.out.println(t2);
    System.out.println("Service1");
    System.out.println(userService1);
}
```

输出：

```sh
t1
com.kirari.dashijian.service.impl.t1@531ed68e
t2
com.kirari.dashijian.service.impl.t2@551976c2
Service1
com.kirari.dashijian.service.UserService@72e5206

```

可以见到t1、t2虽然是同一个类型的Bean，因为变量名和Bean默认名称一样，所以能找到

---

如果在有同个类型的多个Bean的情况命名不是默认Bean名称的话出异常,例如

```java
@Autowired
Tttest tt;
```

显示无法自动装配。存在多个 'Tttest' 类型的 Bean。Beans: `t1   (t1.java)`、` t2   (t2.java) `、`tttest   (Tttest.java) `

通过`@Qualifier`指定name

在上面的代码测试类中加入这段

```java
@Autowired
@Qualifier("t1")
Tttest tt;

public void getBean(){
    System.out.println(t1.name());
    System.out.println(t1);
    System.out.println(t2.name());
    System.out.println(t2);
    System.out.println(tt.name());
    System.out.println(tt);
    System.out.println("Service1");
    System.out.println(userService1);
}
```

输出

```sh
t1
com.kirari.dashijian.service.impl.t1@30b0f674
t2
com.kirari.dashijian.service.impl.t2@62818ab0
t1
com.kirari.dashijian.service.impl.t1@30b0f674
Service1
com.kirari.dashijian.service.UserService@7fda84cf
```

---

#####  `@Inject`

与`Autowired`几乎一模一样，按照类型注入，以默认名称匹配，多个同类型Bean时

不同的是提供注解的依赖不同，提供名称的注解不同

引入依赖，但是我没引入也能运行，不知道是不是springboot自动引入了

```xml
<dependency>
    <groupId>javax.inject</groupId>
    <artifactId>javax.inject</artifactId>
    <version>1</version>
</dependency>
```

测试类中修改为Inject

```java
    @Inject
    Tttest t1;
    @Inject
    Tttest t2;
    @Inject
    @Named("t2")
	Tttest tt;
 	@Test
    public void getBean(){
        System.out.println(t1.name());
        System.out.println(t1);
        System.out.println(t2.name());
        System.out.println(t2);
        System.out.println(tt.name());
        System.out.println(tt);
    }
```

输出结果：

```shell
t1
com.kirari.dashijian.service.impl.t1@62818ab0
t2
com.kirari.dashijian.service.impl.t2@39f5eba4
t2
com.kirari.dashijian.service.impl.t2@39f5eba4
```

使用`Named("name")`进行指定bean

---

##### `@Resource`

与`Autowired`和`Inject`不同，`Resource`是根据名称装配bean



```java
@Resource
Tttest t1;
@Resource
Tttest t2;
@Resource(name = "t1")
Tttest tt;
@Test
public void getBean(){
    System.out.println(t1.name());
    System.out.println(t1);
    System.out.println(t2.name());
    System.out.println(t2);
    System.out.println(tt.name());
    System.out.println(tt);
}
```

 结果：

```java
t1
com.kirari.dashijian.service.impl.t1@3c070ade
t2
com.kirari.dashijian.service.impl.t2@bb3487c
t1
com.kirari.dashijian.service.impl.t1@3c070ade
```



---

#### 通过IOC容器对象获取Bean

```java
    @Autowired
    ApplicationContext context ;

    @Test
    public void getBean(){

        Tttest test1 = (Tttest) context.getBean("t1");//根据bean名
        Tttest test2 = context.getBean(Tttest.class);//根据类型
        Tttest test3 = context.getBean("t1",Tttest.class);//俩者一起使用

        System.out.println(test1);
        System.out.println(test2);
        System.out.println(test3);
     }
```

在多个同类型bean中，一三方法可以实现找到不同的bean

```java
Tttest test1 = (Tttest) context.getBean("t1");
Tttest test3 = context.getBean("t2",Tttest.class);   
System.out.println(test1);
System.out.println(test3);
```

输出

```bash
com.kirari.dashijian.service.impl.t1@56e9126f
com.kirari.dashijian.service.impl.t2@4e773b8a
```

在多个同类型Bean的时候使用二方法会报错，不知道使用哪个bean









### Bean重复

由于`@Autowired`是默认按照类型自动装配

如果同类型bean存在多个

- `@Primary`指定装配 的bean

  例如我有几个bean是同类型

  1. 

      ```java
      @Primary
      public class pppp implements UserMapper
      ```
      
  2.  
  
      ```java
      public class uuuu implements UserMapper 
      ```

​	此时使用`@Autowire`时,程序并不知道我使用哪个Bean，只要在需要使用的Bean上加上`@Primary`就会使用`@Primary`标记的Bean了

-  `@Qualifier`+`@Autowired`设置bean的名字

  ```java
  @Autowired
  @Qualifier("uuuu")
  private UserMapper userMapper;
  ```

-  使用`@Resource(name = "")`

  ```java
  @Resource(name = "uuuu")
  private UserMapper userMapper;
  ```

- 使用`@Inject`和`@Named("name")`

  ```java
  @Named("t1")
  @Inject
  Tttest tt;
  ```







#### `@Resource`和`@Autowired`、`@Inject`的区别

- 提供的依赖不同

- 自动获得的逻辑不同
- ....



### Bean的作用域范围

| 作用域      | 说明                                   |
| ----------- | -------------------------------------- |
| singleton   | （默认）容器内的同名称bean只有一个实例 |
| prototype   | 每次使用这个bean重新创建新的实例       |
| request     | 每个请求范围内创建新的实例             |
| session     | 每个会话范围创建新的实例               |
| application | 每个应用范围内会创建新的实例           |

#### `singleton`

使用默认的singleton,即不设置

```java
@Autowired
ApplicationContext context ;

@Test
public void getBean() {

    for (int i = 0; i < 10; i++) {

        Tttest test3 = context.getBean("t2", Tttest.class);

        System.out.println(i+""+test3);

    }
}
```

结果：

```sh
0com.kirari.dashijian.service.impl.t1@fdfd984
1com.kirari.dashijian.service.impl.t1@fdfd984
2com.kirari.dashijian.service.impl.t1@fdfd984
3com.kirari.dashijian.service.impl.t1@fdfd984
4com.kirari.dashijian.service.impl.t1@fdfd984
5com.kirari.dashijian.service.impl.t1@fdfd984
6com.kirari.dashijian.service.impl.t1@fdfd984
7com.kirari.dashijian.service.impl.t1@fdfd984
8com.kirari.dashijian.service.impl.t1@fdfd984
9com.kirari.dashijian.service.impl.t1@fdfd984
```

发现所有的bean实例都是同一个

#### `prototype`

设置每次使用创建新的实例

```java
@Component
@Scope("prototype")
//@Primary
public class t2 implements Tttest {
    @Override
    public String name() {
        return "t2";
    }
}
```

测试：

```java
    @Autowired
    ApplicationContext context ;

    @Test
    public void getBean() {

        for (int i = 0; i < 10; i++) {

            Tttest test3 = context.getBean("t2", Tttest.class);

            System.out.println(i+""+test3);

        }
    }
```

结果：

```sh
0com.kirari.dashijian.service.impl.t2@186149f9
1com.kirari.dashijian.service.impl.t2@5d4042fc
2com.kirari.dashijian.service.impl.t2@6b06da60
3com.kirari.dashijian.service.impl.t2@1be62793
4com.kirari.dashijian.service.impl.t2@9da8b97
5com.kirari.dashijian.service.impl.t2@56527ff2
6com.kirari.dashijian.service.impl.t2@b5a6a82
7com.kirari.dashijian.service.impl.t2@21aa0ec5
8com.kirari.dashijian.service.impl.t2@7cf1bf54
9com.kirari.dashijian.service.impl.t2@3919e2d7
```

每次都创建了新的实例

---

> bean的创建实例默认是在启动类运行之后就开始了，使用`@Lazy`注解在Bean类上，可以延迟实例化，不在启动类运行的 时候实例化。
>
> 而是在bean被使用时实例化

```java
@Component
@Scope("prototype")
//@Primary
@Lazy
public class t2 implements Tttest {
    @Override
    public String name() {
        return "t2";
    }
}
```

---

### Bean注册



#### @Bean

定义在方法上，标记未Bean交给Spring IOC 容器进行管理





#### @import

引入需要被项目使用的Bean类

和Scan类似



### 起步依赖

利用meavn的依赖传递实现

设置start包，导入了所需要的包...





### 自动装配

1. 类中设置`@Bean`为Bean
2. 通过`AutoConfiguration`设置自动配置类，`@import`导入类
3. 

![image-20240531172217518](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240531172217518.webp)

#### 自定义注解

TODO

- [ ] 待续...不过也不用续



#### 自动配置原理

- [ ] TODO待续



### 注册条件

`@Conditional`



| 注解                          | 条件                               |
| ----------------------------- | ---------------------------------- |
| `@ConditionalOnClass`         | 存在这个类才声明Bean               |
| ` @ConditionalOnMissingBean ` | 不存在这个类型的Bean声明这个Bean   |
| `@ConditionalOnProperty`      | 配置文件环境存在对应属性时声明Bean |
| ...                           | ...                                |

定义在类、方法上，根据条件决定是否注册bean 

指定类型使用`value`、指定名称使用`name`属性

### `@Component`

交给Ioc容器管理的对象

Spring 在扫描组件的时候会自动识别带有 `@Component` 及其派生注解的类，并将其实例化为 bean 并纳入 Spring 容器的管理。

常见的派生注解有 `@Controller`、`@Service`、`@Repository`，它们都是基于 `@Component` 的扩展。

 `@Controller`、`@Service`、`@Repository`标注该类是控制层、服务层、DAO层。



### Bean和Component的区别

1. `@Bean`

`@Bean` 注解用于方法级别，是在 `@Configuration` 注解的类中定义的。使用 `@Bean` 注解的方法将返回一个对象，该对象将被注册为 Spring 应用上下文中的 Bean。`@Bean` 注解通常用于配置和创建第三方库的 Bean 或者需要复杂初始化逻辑的 Bean。

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }

    @Bean
    public MyRepository myRepository() {
        return new MyRepositoryImpl();
    }
}
```



2. `@Component`

`@Component` 注解用于类级别，是 Spring 的通用组件扫描注解。`@Component` 注解的类将自动检测并注册为 Spring 应用上下文中的 Bean。`@Component` 注解通常用于开发人员自己编写的类（如服务、仓库、控制器等）

```java
import org.springframework.stereotype.Component;

@Component
public class MyServiceImpl implements MyService {
    // 实现服务逻辑
}
```







## 接收请求

### 简单请求

原始web接收请求

```java
@RequestMapping("httptest")
public String testhttp(HttpServletRequest request){
    String name = request.getParameter("name");
    String pas  = request.getParameter("password");
    return name+pas;
}
```

请求：`http://localhost:8080/httptest?name=小明&password=123456`

响应：小明123456

SpringBoot中：

```java
@RestController
@RequestMapping("/request")
public class UserController2 {
    @GetMapping("/spring")
    public user returnUser3( String name,String id) {
        return userService.findIdUser(name,id);
    }
}
```

请求：`http://localhost:8080/request/spring?name=小明&id=1`

返回：

```json
{
    "id": 1,
    "name": "小明",
    "pass": "123456"
}
```

只需要保证请求参数和接受参数一致就行了

如果不一致可以使用：`@RequestParam`来修正



```java
@RestController
@RequestMapping("/request")
public class UserController2 {
    @GetMapping("/show")
    public user returnUser2(@RequestParam(name = "Name" ,defaultValue = "小明") String name) {
        return userService.findUser(name);
    }
}
```

其中`defaultValue`指定默认值

请求：`http://localhost:8080/request/show?Name=小明` 

不指定值会使用默认值：`http://localhost:8080/request/show`等价于上面那句

返回：

```json
{
    "id": 1,
    "name": "小明",
    "pass": "123456"
}
```

> `@RequestParam`的`required`默认为true，代表必须传入该参数，否则报错，可改为**fasle**



---

多个参数可能传入一到俩个重载：`@RequestParam(required = false)`来判断是否有值

```java
@GetMapping("/user")
public List<user> findAll(@RequestParam(required = false) String name,@RequestParam(required = false) String id) {
    if (name != null&&id!=null) {
        user user = userService.findIdUser(name,id);
        return List.of(user);
    } else if(name != null){
        user user = userService.findUser(name);
        return List.of(user);
    } else if(id != null) {
        return userService.findID(id);
    }else {
        return userService.findAllUser();
            // 如果请求中有name参数，则返回特定用户
    }
}
```


* `http://localhost:8080/user`


* `http://localhost:8080/user?name=小明`
* `http://localhost:8080/user?id=1`
* `http://localhost:8080/user?id=1&name=小明`

### 参数设为实体类

实体类：

```java
@Data
@Entity
@TableName("user")
public class user {
    @Id
    int id;
    String name,pass;
}
```

Controller

```java
@GetMapping("/user")
public user returnUser4( user user) {
    return userService.findIdUser(user);
}
```

请求：`http://localhost:8080/user?name=小明&id=1`

返回：

```json
{
    "id": 1,
    "name": "小明",
    "pass": "123456"
}
```

Mapper的设置：

```java
@Select("SELECT * FROM user WHERE name = #{user.name} AND id = #{user.id} ")
user findIdUser2(@Param("user") user user);
```



#### 复杂实体类

第一个类

```java
@Data
public class user2 {
    int id;
    String name,pass;
    Info info;
}
```

嵌套类：

```java
@Data
public class Info {
    int age;
    String address;
}
```

实现：

```java
@GetMapping("/class")
public user2 getuser2(user2 user22){
    System.out.println(user22.toString());
    return user22;
}
```

请求：`http://localhost:8080/class?name=小明&id=1&info.address=上海&info.age=18`

返回：

```json
{
    "id": 1,
    "name": "小明",
    "info": {
        "age": 18,
        "address": "上海"
    }
}
```

### 数组参数

```java
@GetMapping("/array")
public String[] getArray(String[] Hobby){
    return Hobby;
}
```

请求：`http://localhost:8080/array?Hobby=跳舞&Hobby=唱歌&Hobby=跑步`

返回：

```java
[
    "跳舞",
    "唱歌",
    "跑步"
]
```

### 集合参数

需要用到`@RequestParam `绑定数据 ,不加注解回默认绑定数组，但此时没有数据，就会报错

```java
@GetMapping("/list")
public List<String> getList(@RequestParam List<String> Hobby){
    return Hobby;
}
```

请求：`http://localhost:8080/list?Hobby=跳舞&Hobby=唱歌&Hobby=跑步`

结果：

```json
[
    "跳舞",
    "唱歌",
    "跑步"
]
```

### 日期参数

```java
@GetMapping("date1")
public LocalDateTime getDate1(@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")LocalDateTime localDateTime){
    return localDateTime;
}
@GetMapping("date2")
public LocalDateTime getDate2(@DateTimeFormat(pattern = "yyyy.MM.dd HH.mm.ss")LocalDateTime localDateTime){
    return localDateTime;
}
@GetMapping("/date3")
public LocalDateTime getDate3(@RequestParam @DateTimeFormat(pattern = "yyyy/MM/dd") LocalDate localDate) {
    // 将 LocalDate 转换为 LocalDateTime，时间部分设为午夜
    //        return localDate.atTime(LocalTime.MIDNIGHT);
    return localDate.atStartOfDay();
}
```

- 请求：`http://localhost:8080/date1?localDateTime=2017-12-12 14:20:18`

返回："2017-12-12T14:20:18"

- 请求：`http://localhost:8080/date2?localDateTime=2017.12.12 14.20.18`

返回："2017-12-12T14:20:18"

- 请求：`http://localhost:8080/date3?localDate=2017/12/12`

返回：“2017-12-12T00:00:00"

### JSON数据

使用Post请求，放入请求体 

```java
@GetMapping("/show2")
public user returnUser3(@RequestBody user user) {
    return userService.findUser(user.getName());
}
```

json数据：

```json
{
    "name": "小明"
}
```

请求：`http://localhost:8080/request/show2`

返回数据：

```json
{
    "id": 1,
    "name": "小明",
    "pass": "123456"
}
```



### 路径参数

```java
@GetMapping("/{name}")
public user returnUser(@PathVariable String name) {
    return userService.findUser(name);
}
```

请求：`http://localhost:8080/request/小明`

返回：

```json
{
    "id": 1,
    "name": "小明",
    "pass": "123456"
}
```

#### 多个路径参数

```java
@GetMapping("/{name}/{id}")
public user returnUser2(@PathVariable String name,@PathVariable String id) {
    return userService.findIdUser(name,id);
}
```

请求：`http://localhost:8080/request/小明/1`

返回

```json
{
    "id": 1,
    "name": "小明",
    "pass": "123456"
}
```

### 请求头

```java
@GetMapping("/headers")
public List<user> getHeaders(@RequestHeader("id") String id) {
    System.out.println(userService.findID(id).toString());
    return userService.findID(id);
}
```

请求：`http://localhost:8080/headers`



请求头中：

```javascript
GET http://localhost:8080/headers
200
13 ms
Network
Request Headers
id: 1
Content-Type: application/json
User-Agent: PostmanRuntime/7.39.0
Accept: */*
Postman-Token: 1ad4d756-3577-4094-846a-caaed58ebc34
Host: localhost:8080
Accept-Encoding: gzip, deflate, br
Connection: keep-alive
Content-Length: 26
```

响应数据:

```json
[
    {
        "id": 1,
        "name": "小明",
        "pass": "123456"
    }
]
```



### 为传参进行正则验证

引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

参数前添加注解`@Pattern`,设置属性`regexp`进行正则表达式匹配

```java
@GetMapping("/re")
public user re(@Pattern(regexp = "^\\d{1,5}$") String id, String name){
    return userService.findIdUser(name, id);
}
```

当请求参数不匹配时会抛出异常

请求`http://127.0.0.1:8080/re?id=112321323&name=来了`，此时id长度大于五位数

报错类型是NoResourceFoundException.class

```java
{
    "timestamp": "2024-06-08T18:37:42.955+00:00",
    "status": 400,
    "error": "Bad Request",
    "path": "/re"
}
```



使用全局异常进行处理

```java
    @ExceptionHandler(NoResourceFoundException.class)//捕获异常
    public String ex1(Exception ex){
        ex.printStackTrace();

        log.info("异常！");
        log.info(ex.getMessage());
        log.info(ex.toString());
        log.info(String.valueOf(ex.getClass()));
        return StringUtils.hasLength(ex.getMessage())?ex.toString():"操作失败";

    }
```

得到的返回结果报错结果：

```json
org.springframework.web.servlet.resource.NoResourceFoundException: No static resource re.
```





---

## 安全



### 会话技术

#### Cookie

存储在客户端的一个小文件,由web服务器发送并存储，有大小限制4kb，Http协议自带

不能跨域使用，即不能在不同的域名ip、端口、协议使用。

现在有`HttpOnly`和`Secure`提高安全性，前置禁止JavaScript访问，后者仅通过Https协议传输



Spring中使用:

```java
    @GetMapping("/Cookie1")
    public void c2(HttpServletResponse response){
        response.addCookie(new Cookie("user","Kirari"));
    }

    @GetMapping("/Cookie2")
    public HashMap<String,Object> c2(HttpServletRequest request, HttpServletResponse response){
        HashMap<String,Object> map = new HashMap<>();
        jakarta.servlet.http.Cookie[] cookies = request.getCookies();
        for (Cookie cookie: cookies){
            map.put(cookie.getName(),cookie.getValue());
        }
        return map;
    }
```

依次访问以下请求后

`http://127.0.0.1:8080/Cookie1`

`http://127.0.0.1:8080/Cookie2`

输出

```json
{
    "JSESSIONID": "49749D53DEADB60241F6711DE9A044FC",
    "user": "Kirari"
}
```

> "JSESSIONID" 存在的原因是我先使用session，客户端把SessionID存储在了Cookie，所以会有一个"JSESSIONID"





#### Session

存储在服务器，一个Session有一个特定的SessionID，用于识别不同的用户，SessionID对应的Session保存他们的信息，存储大小限制由服务器决定。

因为是由服务器存储，所以一般不会被篡改。

可以跨域实现访问请求，但是仅限在一个服务器上使用，如果部署在多个服务器实现负载均衡连接到其他的服务器的话会失败。

SessionID由Cookie或者URL传递。

```java
@GetMapping("/Session1")
public String s1(HttpSession session){
    session.setAttribute("user","kirari");
    return  session.getId();
}

@GetMapping("/Session2")
public HashMap<String,String> s2(HttpSession session) {
    session.setAttribute("user", "kirari");

    HashMap<String,String> response = new HashMap<>();
    response.put("sessionId", session.getId());
    response.put("user", session.getAttribute("user").toString());

    return response;
}
```

分别请求

`http://127.0.0.1:8080/Session1`

`http://127.0.0.1:8080/Session2`

结果是：

`49749D53DEADB60241F6711DE9A044FC`

```json
{
    "sessionId": "49749D53DEADB60241F6711DE9A044FC",
    "user": "kirari"
}
```





#### Token

令牌，用于验证身份，保存在cookie或session中

认证（Authentication）和授权（Authorization）

服务器通过token验证用户身份，确定用户是本人登录

用户通过认证后，服务器给用户授权访问数据资源



##### JWT（Json Web Token)

Token的一种形式

由三部分组成的字符串：头部.有效载荷.签名| Header.Payload.Signature

- Header(头部)：记录令牌类型、签名算法
- Payload（有效载荷）：携带一些自定义信息，默认信息，例如用户信息等等。
- Signature（签名），防止Token被篡改、验证

如名字的Json所写，JWT的数据载体是Jsons数据

例如：

`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiS2lyYXJpIiwiaWF0Ijoia2lrbzI1NjgiLCJlbWlsIjoiMTI0NDExODQ0NUBxcS5jb20ifQ.1OUNtc4D_SKyDJp9NX2qpBNUPEvHsQT9PfY7C7cxmoc`

是一串JWT字符串，包含三部分这三部分的内容是

HEADER:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

PAYLOAD:

```json
{
  "name": "Kirari",
  "iat": 1683124800,
  "exp": 1714761600,
  "emil": "1244118445@qq.com"
}
```

Payload 用来存放实际需要传递的数据，JWT 规定的7个官方字段，供选用：

1. - iss (Issuer)：签发者
   - sub (Subject)：主题
   - aud (Audience)：接收者
   - exp (Expiration time)：过期时间  || 格式 为时间戳
   - nbf (Not Before)：生效时间
   - iat (Issued At)：签发时间
   - jti (JWT ID)：编号

SIGNATURE:

```json
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
	hihihi

)
```

其中JWT编码中的a.b.c：a,b仅仅是由 base64编码转化，并不具备加密性，可以被解析。c，也就是签名部分，由a+b的base64编码加上一个自己定义的字符串为签名并使用特定的编码格式加密。

> base64 是 `A~Z`、`a~z`、`0~9`、`+  /`诸如此类64个可打印字符

修改/删除/添加任何一个字符都会导致jwt编码验证失效，给定的签名不一致也会导致签名校验失败，并且jwt可以设置失效时间，一定程度上保障了安全性。

使用：

引入依赖

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.1</version>
</dependency>
```

特别的依赖： `NoClassDefFoundError: javax/xml/bind/DatatypeConverter` 错误

使用 JWT 库时，找不到 `javax.xml.bind.DatatypeConverter` 类引起的。这个类在 Java 9 及以后版本中已经被移除。

添加依赖解决

```xml

<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.3.1</version>
</dependency>
<dependency>
    <groupId>org.glassfish.jaxb</groupId>
    <artifactId>jaxb-runtime</artifactId>
    <version>2.3.1</version>
</dependency>
```

代码：

```java
    @GetMapping("/JWT")
    public String getJWT(){
        String jwt;
        HashMap<String,Object> data = new HashMap();
        data.put("user","Kirari");
        data.put("emil","1244118445@qq.com");

//      使用生成的HMAC-SHA
//        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
//
//        jwt= Jwts.builder()
//                .setClaims(data)//设置有效载荷
//                .signWith(SignatureAlgorithm.HS256,key)//签名算法
//                .setExpiration(new Date(System.currentTimeMillis()+24*60*60*7))//设置有效期
//                .compact();
/*
         使用key需要多添加的依赖
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>0.11.2</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>0.11.2</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>0.11.2</version>
            <scope>runtime</scope>
        </dependency>
 */

        jwt= Jwts.builder()
                .setSubject("主题")
                .setIssuer("发布者")
                .setIssuedAt(new Date())//发行时间
                .setClaims(data)//设置有效载荷
                .signWith(SignatureAlgorithm.HS256,"kiko2568")//签名算法
                .setExpiration(new Date(System.currentTimeMillis()+24*60*60*7*1000))//设置有效期 单位是毫秒
                .compact();
        return jwt;
    }

    @GetMapping("/parseJWT")
    public Claims parseJwt(String jwt){
        Claims claims = Jwts.parser()
                .setSigningKey("kiko2568")
                .parseClaimsJws(jwt)
                .getBody();
        return claims;
    }

//另一种解析方法

   private static final String SECRET_KEY = "kiko2568"; 

    public Claims parseToken(String jwt) {
        if (jwt == null || jwt.trim().isEmpty()) {
            throw new IllegalArgumentException("JWT String argument cannot be null or empty.");
        }

//转码
        byte[] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(SECRET_KEY);
        Key signingKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(jwt)
                .getBody();
        return claims;
    }


```

请求：

`http://127.0.0.1:8080/JWT`

返回：

`eyJhbGciOiJIUzI1NiJ9.eyJlbWlsIjoiMTI0NDExODQ0NUBxcS5jb20iLCJleHAiOjE3MTc2NjcwOTEsInVzZXIiOiJLaXJhcmkifQ.WysLyZkwdJdRlZafwTT61geaHbsqvpXY3240vYggBm4`

请求：

`http://127.0.0.1:8080/parseJWT?jwt=eyJhbGciOiJIUzI1NiJ9.eyJlbWlsIjoiMTI0NDExODQ0NUBxcS5jb20iLCJleHAiOjE3MTc2NjcwOTEsInVzZXIiOiJLaXJhcmkifQ.WysLyZkwdJdRlZafwTT61geaHbsqvpXY3240vYggBm4`

返回：

```json
{
    "emil": "1244118445@qq.com",
    "exp": 1717667091,
    "user": "Kirari"
}
```

当请求的jwt令牌不一样时，或者密钥签名不一样时，会造成500错误

> 推荐文章：
>
> [微服务下使用jjwt生成token签名signwith带来的问题_jwt signwith-CSDN博客](https://blog.csdn.net/weixin_40598838/article/details/108575508)

---

## 响应

`@ResponseBody`

- 方法注解、类注解
- 位置Controlller方法、类上
- 将返回值直接响应，如果是对象、集合，自动转化为json格式
- `@RestController`=`@ResponseBody`+`@Controller`

---



统一响应结果:返回给前端时给前端一个统一的格式

Result(code,message,data)	类

其中：code为状态码，200成功，404资源找不到之类

message，传递消息，传递成功失败这类

data，响应的数据





---

## 拦截器和过滤器




```mermaid
sequenceDiagram
    participant Client
    participant DispatcherServlet
    participant HandlerInterceptor
    participant Filter
    Client ->> DispatcherServlet: 发起HTTP请求
    DispatcherServlet ->> HandlerInterceptor: 执行拦截器预处理
    HandlerInterceptor ->> Filter: 执行过滤器链的第一个过滤器
    Filter ->> Filter: 执行过滤器链的其他过滤器
    Filter -->> HandlerInterceptor: 过滤器链结束，返回控制器处理
    HandlerInterceptor -->> DispatcherServlet: 拦截器预处理结束，继续处理请求
    DispatcherServlet ->> DispatcherServlet: 执行控制器处理
    DispatcherServlet -->> Filter: 返回控制器处理结果
    Filter -->> Client: 返回HTTP响应
    
```













### 过滤器

> 引入的接口是`import jakarta.servlet.*;`下的Filter

```java
//设置拦截的请求
@WebFilter(urlPatterns = "/*")

//引入的Filter是   import jakarta.servlet.*;
public class DemoFilter implements Filter {

    /**
     * 初始化
     * @param filterConfig
     * @throws ServletException
     */
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    /**
     * 拦截到请求就调用
     *
     * @param servletRequest
     * @param servletResponse
     * @param filterChain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
		
        //执行下面一句代码是放行操作，如果不执行就不会放行
        filterChain.doFilter(servletRequest,servletResponse);
    }

    /**
     *
     * 销毁
     *
     *
     * 和初始化一样只调用一次并且默认实现
     */
    @Override
    public void destroy() {
        Filter.super.destroy();
    }
}
```



启动类

```java
@SpringBootApplication
// ↓ 开启spring对javaweb servlet  过滤器的支持
@ServletComponentScan
public class DashijianApplication {
    public static void main(String[] args) {
        SpringApplication.run(DashijianApplication.class, args);
    }
}
```



拦截规则

`@WebFilter(urlPatterns = "/*")`

- /

  所有请求，同`/*`

- /main

  仅`"/main"`请求可以被拦截

- /main/

  只有`/main/`请求拦截

- /main/*

  /main、/main/、/main/ads、/main/asda/saddw/dasd，均能拦截





过滤器链顺序

多个过滤器连成过滤器链的时候，以栈的形式，按照字典序顺序先进后出

```mermaid
sequenceDiagram
    participant Client
    participant Afilter
    participant Bfilter
    participant 资源
    Client->>Afilter: 请求拦截
    Afilter->>Bfilter: A放行/请求被B拦截
    Bfilter->>资源: 放行
    资源->>Bfilter: 响应
    Bfilter->>Afilter: 响应
    Afilter->>Client: 响应
  
```

A拦截器：

```java
@Override
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    log.info("A拦截前");
    filterChain.doFilter(servletRequest,servletResponse);
    log.info("A拦截后");
}
```

B拦截器：

```java
public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
    log.info("B拦截前");
    filterChain.doFilter(servletRequest,servletResponse);
    log.info("B拦截后");
}
```

输出结果：

```sh
2024-06-06T22:03:44.124+08:00  INFO 31996 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.Filter.AFilter      : A拦截前
2024-06-06T22:03:44.124+08:00  INFO 31996 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.Filter.BFilter      : B拦截前
2024-06-06T22:03:44.145+08:00  INFO 31996 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.Filter.BFilter      : B拦截后
2024-06-06T22:03:44.146+08:00  INFO 31996 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.Filter.AFilter      : A拦截后
```





### 拦截器



```java
@Component
@Slf4j
public class DemoInterceptor implements HandlerInterceptor {
    /**
     * 资源方法前运行      return true 放行 false拦截
     * 如果被拦截器拦截，下面的其他俩个方法不会执行
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        return HandlerInterceptor.super.preHandle(request, response, handler);
       log.info("111111111");
        return true;
    }

    /**
     *
     * 资源方法运行后运行,没有资源返回不会执行
     * @param request
     * @param response
     * @param handler
     * @param modelAndView
     * @throws Exception
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
        log.info("2222222222");
    }

    /**
     * 视图渲染后运行，最后运行
     * @param request
     * @param response
     * @param handler
     * @param ex
     * @throws Exception
     */
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
//        HandlerInterceptor.super.afterCompletion(request, response, handler, ex);
        log.info("3333333333");
    }
}
```

WebConfig类

```java
@Configuration
public class WebConfig  implements WebMvcConfigurer {
    @Autowired
    DemoInterceptor demoInterceptor;
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(demoInterceptor)
            .addPathPatterns("/**ude**")//配置拦截路径
            .excludePathPatterns();//配置排除路径
    }
}
```



> preHandle：请求到达接口之前执行，afterCompletion：请求（接口）结束后执行

#### 拦截规则 

- `/`

  只拦截`localhost/`的请求

- `/*`

  拦截所有`localhost/dddd`请求，不包括`localhost/dddd/`

- `/**`

  所有请求

- `/admin/`

  只有`/admin/`

- `/admin/*`

  任意`/admin/xxx`

- `/admin/**`

  任意`/admin`开头的路径，包括`/admin`、`/admin/`

- `/admin**`

  任意`/admin`开头的路径，包括`/admin`，甚至是`/adminhello`,不包括`/admin/`等等，只是admin开头的当前路径

- `/admin*`

  同上

- `/**admin`、`/*admin`

  结尾是admin就被拦截

- `/*admin*`、`/**admin*`、`/*admin**`、`/**admin**`

  中间是admin被拦截

核心👆

----

衍变👇

- `/admin**/`

  只有`/adminxxxxx/`

- `/admin*/`

  同上

- `/admin*/*`

  只是`/adminxxxxxxx/xxxx`一级目录

- `/admin*/**`

  任意`/adminxxxxxxx/**`子目录

- `/admin**/*`

  同``/admin*/*``

- `/admin**/**`

  同``/admin**/**``

- `/*/admin`、`/**/admin`

  单级目录下的admin，任意一级目录下的admin
  
- `/**/admin/**`

  中间目录有admin就被拦截


---

## 异常处理

异常处理代码

```java
@RestControllerAdvice//
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)//捕获所有异常
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String ex(Exception ex){
        ex.printStackTrace();

        log.info("异常！");
        log.info(ex.getMessage());
        log.info(ex.toString());
        log.info(String.valueOf(ex.getClass()));
        return ex.getMessage();
    }
}
```



- `@RestControllerAdvice`=`@ResponseBody`+`@ControllerAdvice`

`@ResponseBody`是转化返回数据为String或Json数据

`@ControllerAdvice`标记这个类为全局异常处理类

- ` @ExceptionHandler()`甚至接收异常的数据
  - `Exception.class`表示全部异常都接收

- `@ResponseStatus()`服务器返回的状态码
  - `@ResponseStatus(HttpStatus.NOT_FOUND)`返回404
  - `@ResponseStatus(HttpStatus.BAD_REQUEST)`返回400
  - `@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)`返回内部服务器错误500

## 事务

在你想管理事务的方法、类、接口上加上`import org.springframework.transaction.annotation.Transactional;`的 `@Transactional`，SpringBoot就会自动帮你开启事务管理了

在方法上

```java
@Transactional
public int update(user user) {
    userMapper.update(user);
    int i = 1/0;
    userMapper.update(user);
    return userMapper.update(user);
}
```

访问该Sevice后

```sh
Creating a new SqlSession
Registering transaction synchronization for SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@3440b721]
JDBC Connection [HikariProxyConnection@1293827318 wrapping com.mysql.cj.jdbc.ConnectionImpl@32ab408e] will be managed by Spring
==>  Preparing: update user set name=?,pass=? where id= ?
==> Parameters: 来了(String), 123456(String), 7(Integer)
<==    Updates: 1
Releasing transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@3440b721]
Transaction synchronization deregistering SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@3440b721]
Transaction synchronization closing SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@3440b721]
java.lang.ArithmeticException: / by zero
	at com.kirari.dashijian.service.UserService.update(UserService.java:56)
	at java.base/jdk.internal.reflect.DirectMethodHandleAccessor.invoke(DirectMethodHandleAccessor.java:104)
	at java.base/java.lang.reflect.Method.invoke(Method.java:577)
```

查看数据库并没有实现数据更新



在类上

```java
@Transactional
@Service
public class StudentService {
```

类的所有方法都开启事务管理



#### 事务处理异常范围

事务异常默认只实现RuntimeException，当其他异常发生时，并不会回滚异常

通过设置rollbackFor属性设置处理的异常范围

如下是处理全部异常

```java
@Transactional(rollbackFor = Exception.class)
```



#### 嵌套事务-传播行为

指一个事务中的方法中包含另外一个有事务的方法，这个被包含的事务该如何执行

设置`propagation`的属性

```java
@Transactional()
public void A(){
    ...
    B();    
   	...
}

@Transactional(rollbackFor = Exception.class,propagation = Propagation.REQUIRED)
public void B(){}
```

 此时B的propagation属性值觉得了B在A中执行的事务管理级别

| 属性值        | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| REQUIRED      | （默认）A有事务就加入，没有事务就创建新事务                  |
| REQUIRES_NEW  | 无论A有没有事务都创建新事务                                  |
| SUPPORTS      | A有事务就加入，无事务就在无事务的情况下运行，不创建新事务    |
| NOT_SUPPORTED | 不支持事务，在无事务状态下运行，<br />如果A有事务，A的事务就暂停挂起，运行完B方法再进行A的方法执行以及事务管理 |
| MANDATORY     | A必须有 事务否则异常                                         |
| NEVER         | A必须无事务，否则异常                                        |
| ...           | ...                                                          |

- 属性为REQUIRED时，A或者B发生异常了，整体回滚，因为他们是一个事务
- 属性为REQUIRES_NEW时，A或B发生异常了，互不影响，只回滚发生异常的方法。



---

#### 查看事务日志

配置类

```yaml
logging:
  level:
    org.springframework.jdbc.support.JdbcTransactionManager: debug
```

一般的，日志会有几个级别的输出，默认info

- **TRACE**：

  最详细的日志级别。记录非常细粒度的信息，主要用于开发和调试阶段

  用于记录非常详细的系统信息。

  示例：记录每个方法的进入和退出，详细的变量状态等。

- **DEBUG**：

  用于调试信息。包含较详细的调试信息，便于开发人员了解应用的内部状态。

  用于调试信息，帮助开发人员追踪应用的执行过程。

  示例：记录SQL查询语句、请求和响应的详细信息等。

- **INFO**：

  用于信息性消息。一般用于记录应用的正常运行状态，重要的事件和信息。

  用于记录应用的主要事件和操作。

  示例：应用启动和关闭、重要配置的加载、重要任务的完成等。

- **WARN**：

  用于警告信息。表示潜在的问题，系统可以继续运行，但需要注意。

  用于记录潜在的问题。

  示例：配置项缺失但有默认值、不推荐的API使用等。

- **ERROR**：

  用于错误信息。表示发生了错误，可能导致某些功能不能正常工作。

  用于记录错误事件。

  示例：捕获的异常、数据库连接失败等。

- **FATAL**：

  表示非常严重的错误，可能导致应用程序终止。

  用于记录导致系统崩溃的严重错误。

  示例：应用程序无法启动、关键服务无法初始化等。

  

> 关于SpringBoot无需再设置`@EnableTransactionManagement `,
>
> [Spring Boot中不需要加 @EnableTransactionManagement 来开启事务_@enabletransactionmanagement(proxytargetclass = tr-CSDN博客](https://blog.csdn.net/qq_40794973/article/details/106597952)

自动配置类中的事务配置类`TransactionAutoConfiguration.java`中有这个一段代码

```java
@ConditionalOnBean({TransactionManager.class})
@ConditionalOnMissingBean({AbstractTransactionManagementConfiguration.class})
public static class EnableTransactionManagementConfiguration {
    public EnableTransactionManagementConfiguration() {
    }

    @Configuration(
        proxyBeanMethods = false
    )
    @EnableTransactionManagement(
        proxyTargetClass = true
    )
```

暂时看不懂，只明白大概是说存在这个类`TransactionManager.class`，且不存在`AbstractTransactionManagementConfiguration.class`这类，才会创建和加载这个配置类。

大概是存在`@Transaction`，且没有自定义`AbstractTransactionManagementConfiguration`继承这个抽象类的时候自动配置。



## AOC-面向切片编程

面向特定的方法进行编程，对特定的一个或多个原来方法的增强、修改等等

例子：

引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-aop</artifactId>
</dependency>
```

SpringBoot事务管理的原理

```java
@Component
//标记AOP
@Aspect
@Slf4j
public class demoAop {

//切入表达式
    //匹配的路径，代表哪个路径下的类方法执行被提取到这里来
    //代表下面的方法执行的时候会进行下面的操作
        @Around("execution(* com.kirari.dashijian.service.UserService.update())")
    public Object Transaction(ProceedingJoinPoint joinPoint){
      log.info("开启事务");
        Object result = null;
      try {
          //执行原来的方法
             result = joinPoint.proceed();
      }catch (Exception exception){
          log.info("出现错误,事务回滚");
      } catch (Throwable e) {
          throw new RuntimeException(e);
      }
      log.info("事务提交");
        return result;
      }
}
```

为所有方法添加一个 查看执行时间的功能

```java
@Component//给IOC容器管理
@Aspect//标记为AOP
public class TimeAop {

    @Around("execution(* com.kirari.dashijian.*.*(..))")//切入点表达式
    public Object time(ProceedingJoinPoint joinPoint) throws Throwable {
        long begin = System.currentTimeMillis();

        Object result = joinPoint.proceed();//原方法

        long end = System.currentTimeMillis();

        System.out.println("耗时"+(end-begin));

        return result;
    }
}
```

### AOC的核心概念

- 连接点：JoinPoint,被AOP控制的方法，即原方法
- 通知：Advice，可重复的逻辑，即AOP声明实现的 方法
- 切入点：PointCut，切面表达式匹配成功的方法
- 切面：Aspect，通知+切入点
- 目标对象：Target，原来方法所属的对象/类

![AOP类](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240607162510136.webp)

其中@Aspect标记为切面类

![原方法](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240607162711982.webp)

### AOP实现原理

通过动态代理技术，使用代理对象实现AOP操作

假如我们有一个AOP类：

```java
@Component
@Aspect
public class TimeAop {

    @Around("execution(* com.kirari.dashijian.service.UserService.update())")
    public Object time(ProceedingJoinPoint joinPoint) throws Throwable {
        long begin = System.currentTimeMillis();

        Object result = joinPoint.proceed();

        long end = System.currentTimeMillis();

        System.out.println("耗时"+(end-begin));

        return result;
    }
}
```

一个原方法类：

```java
@Service
public class UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    @Transactional(rollbackFor = Exception.class)
    public int update(user user) {
        
        return userMapper.update(user);
        
    }
}
```

在执行`UserService.updete(user)`方法的时候，底层生成一个代理对象，并且实现了原方法+AOP方法，即通知：

```java
@Service
public class UserServiceProxy {
    @Autowired
    private UserMapper userMapper;
    @Transactional(rollbackFor = Exception.class)
    public int update(user user) {
        
        long begin = System.currentTimeMillis();

        int line = userMapper.update(user);

        long end = System.currentTimeMillis();

        System.out.println("耗时"+(end-begin));

 	   return line;
    }
}
```

此时在调用这方法的控制层：

```java
@RestController
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping("/update")
    public int update( user user){
        return userService.update(user);
    }

}
```

通过` @Autowired`自动注入的UserService类就不是原来的目标对象了，而是代理对象UserServiceProxy，实现的方法此时就是修改后的方法。



### 通知





#### 通知(Advice)类型

- **前置通知（Before ）**：在目标方法执行之前运行。
- **后置通知（After ）**：在目标方法执行之后运行，无论方法是否成功执行。
- **返回通知（After Returning ）**：在目标方法成功执行并返回结果之后运行。
- **异常通知（After Throwing ）**：在目标方法抛出异常之后运行。
- **环绕通知（Around ）**：包围目标方法的执行，可以在方法执行前后自定义行为。

测试顺序:

```java
@Slf4j
@Component
@Aspect
public class OrderAop {

    @AfterReturning("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public void afterReturning(){
        log.info("afterReturning");
    }

    @AfterThrowing("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public void afterThrowing(){
        log.info("afterThrowing");
    }

    @After("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public void after(){
        log.info("after");
    }

    @Before("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public void before(){
        log.info("before");
    }

    @Around("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public Object Around(ProceedingJoinPoint joinPoint) throws Throwable {

        log.info("环绕前");

        Object object = joinPoint.proceed();

        log.info("环绕后");

        return object;
    }

}
```

正常执行时顺序：

```sh
2024-06-07T18:56:01.093+08:00  INFO 12312 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : 环绕前
2024-06-07T18:56:01.093+08:00  INFO 12312 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : before
Creating a new SqlSession
Registering transaction synchronization for SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@3e70fe17]
JDBC Connection [HikariProxyConnection@716877553 wrapping com.mysql.cj.jdbc.ConnectionImpl@7cfb8e98] will be managed by Spring
==>  Preparing: update user set name=?,pass=? where id= ?
==> Parameters: 啦啦(String), 123456(String), 7(Integer)
<==    Updates: 1
Releasing transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@3e70fe17]
2024-06-07T18:56:01.144+08:00  INFO 12312 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : afterReturning
2024-06-07T18:56:01.145+08:00  INFO 12312 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : after
2024-06-07T18:56:01.145+08:00  INFO 12312 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : 环绕后
```

出现异常时顺序：

```sh
2024-06-07T18:59:34.678+08:00  INFO 25016 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : 环绕前
2024-06-07T18:59:34.678+08:00  INFO 25016 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : before
Creating a new SqlSession
Registering transaction synchronization for SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@6f3b557e]
JDBC Connection [HikariProxyConnection@254878470 wrapping com.mysql.cj.jdbc.ConnectionImpl@3e6748ae] will be managed by Spring
==>  Preparing: update user set name=?,pass=? where id= ?
==> Parameters: 啦啦(String), 123456(String), 7(Integer)
<==    Updates: 1
Releasing transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@6f3b557e]
2024-06-07T18:59:34.710+08:00  INFO 25016 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : afterThrowing
2024-06-07T18:59:34.710+08:00  INFO 25016 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : after
```

其中：

返回通知在目标方法成功执行并返回结果之后运行，可以访问返回值：

```java
@Aspect
@Component
public class MyAfterReturningAspect {

    @AfterReturning(pointcut = "execution(* com.example.service.*.*(..))", returning = "result")
    public void afterReturningAdvice(Object result) {
        System.out.println("After returning advice executed, result: " + result);
    }
}
```

异常通知在目标方法抛出异常之后运行，可以处理异常：

```java
@Aspect
@Component
public class MyAfterThrowingAspect {

    @AfterThrowing(pointcut = "execution(* com.example.service.*.*(..))", throwing = "exception")
    public void afterThrowingAdvice(Exception exception) {
        System.out.println("After throwing advice executed, exception: " + exception.getMessage());
    }
}
```







---

#### 多个通知时执行顺序

##### 默认顺序

**默认按照字典序排序，按照栈的模式先进后出**

字典序前的先执行

---

测试：我定义了、`AAAop`、`Order`、`ZZzAop`三个实现了不同通知类型但是切入点都一样的方法

具体如下：

```java
@Slf4j
@Component
@Aspect
public class OrderAop {

    @AfterReturning("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public void afterReturning(){
        log.info("Order:afterReturning");
    }

    @AfterThrowing("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public void afterThrowing(){
        log.info("Order:afterThrowing");
    }

    @After("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public void after(){
        log.info("Order:after");
    }

    @Before("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public void before(){
        log.info("Order:before");
    }

    @Around("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public Object Around(ProceedingJoinPoint joinPoint) throws Throwable {

        log.info("Order:环绕前");

        Object object = joinPoint.proceed();

        log.info("Order:环绕后");

        return object;
    }

}
```

`AAA` 和`ZZZ`仅仅是修改参数，不贴代码出来了

这是结果:

正常运行时：

```sh
2024-06-07T19:11:55.840+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:环绕前
2024-06-07T19:11:55.840+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:before
2024-06-07T19:11:55.840+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:环绕前
2024-06-07T19:11:55.840+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:before
2024-06-07T19:11:55.840+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:环绕前
2024-06-07T19:11:55.840+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:before
Creating a new SqlSession
Registering transaction synchronization for SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@fb571f]
JDBC Connection [HikariProxyConnection@2005302264 wrapping com.mysql.cj.jdbc.ConnectionImpl@44fd7ba4] will be managed by Spring
==>  Preparing: update user set name=?,pass=? where id= ?
==> Parameters: 来了(String), 123456(String), 7(Integer)
<==    Updates: 1
Releasing transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@fb571f]
2024-06-07T19:11:55.877+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:afterReturning
2024-06-07T19:11:55.878+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:after
2024-06-07T19:11:55.878+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:环绕后
2024-06-07T19:11:55.878+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:afterReturning
2024-06-07T19:11:55.878+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:after
2024-06-07T19:11:55.878+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:环绕后
2024-06-07T19:11:55.878+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:afterReturning
2024-06-07T19:11:55.878+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:after
2024-06-07T19:11:55.878+08:00  INFO 25660 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:环绕后
```

异常时：

```sh
2024-06-07T19:10:21.132+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : Completed initialization in 1 ms
2024-06-07T19:10:21.180+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:环绕前
2024-06-07T19:10:21.181+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:before
2024-06-07T19:10:21.181+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:环绕前
2024-06-07T19:10:21.181+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:before
2024-06-07T19:10:21.181+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:环绕前
2024-06-07T19:10:21.181+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:before
Creating a new SqlSession
Registering transaction synchronization for SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@67fd0c2]
JDBC Connection [HikariProxyConnection@1085675753 wrapping com.mysql.cj.jdbc.ConnectionImpl@69d103f0] will be managed by Spring
==>  Preparing: update user set name=?,pass=? where id= ?
==> Parameters: 来了(String), 123456(String), 7(Integer)
<==    Updates: 1
Releasing transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@67fd0c2]
2024-06-07T19:10:21.221+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:afterThrowing
2024-06-07T19:10:21.221+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:after
2024-06-07T19:10:21.221+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:afterThrowing
2024-06-07T19:10:21.221+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:after
2024-06-07T19:10:21.221+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:afterThrowing
2024-06-07T19:10:21.221+08:00  INFO 18560 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:after
```

与理论一致

---

##### 自定义顺序

使用`@Order(数字)`进行自定义顺序

**数字越小优先级越高**

---

分别对三个类进行自定义排序

-  ```java
  @Order(1)
  public class OrderAop{}
  ```

- ```java
  @Order(2)
  public class ZZzAop{}
  ```

- ```java
  @Order(3)
  public class AAAop{}
  ```



测试：

正常运行：

```sh
2024-06-07T19:21:07.065+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.OrderAop        : Order:环绕前
2024-06-07T19:21:07.065+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.OrderAop        : Order:before
2024-06-07T19:21:07.065+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:环绕前
2024-06-07T19:21:07.065+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:before
2024-06-07T19:21:07.066+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.AAAop           : AAAop:环绕前
2024-06-07T19:21:07.066+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.AAAop           : AAAop:before
Creating a new SqlSession
Registering transaction synchronization for SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@78944385]
JDBC Connection [HikariProxyConnection@1924583771 wrapping com.mysql.cj.jdbc.ConnectionImpl@74fb5b59] will be managed by Spring
==>  Preparing: update user set name=?,pass=? where id= ?
==> Parameters: 来了(String), 123456(String), 7(Integer)
<==    Updates: 1
Releasing transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@78944385]
Transaction synchronization committing SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@78944385]
Transaction synchronization deregistering SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@78944385]
Transaction synchronization closing SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@78944385]
2024-06-07T19:21:07.110+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.AAAop           : AAAop:afterReturning
2024-06-07T19:21:07.110+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.AAAop           : AAAop:after
2024-06-07T19:21:07.110+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.AAAop           : AAAop:环绕后
2024-06-07T19:21:07.111+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:afterReturning
2024-06-07T19:21:07.111+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:after
2024-06-07T19:21:07.111+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:环绕后
2024-06-07T19:21:07.111+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.OrderAop        : Order:afterReturning
2024-06-07T19:21:07.111+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.OrderAop        : Order:after
2024-06-07T19:21:07.111+08:00  INFO 25560 --- [dashijian] [nio-8080-exec-2] com.kirari.dashijian.aop.OrderAop        : Order:环绕后
```

order是1所以最先运行

异常：

```sh
2024-06-07T19:22:43.442+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:环绕前
2024-06-07T19:22:43.442+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:before
2024-06-07T19:22:43.442+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:环绕前
2024-06-07T19:22:43.442+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:before
2024-06-07T19:22:43.442+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:环绕前
2024-06-07T19:22:43.442+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:before
Creating a new SqlSession
Registering transaction synchronization for SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@28dedd9a]
JDBC Connection [HikariProxyConnection@1834732310 wrapping com.mysql.cj.jdbc.ConnectionImpl@74fb5b59] will be managed by Spring
==>  Preparing: update user set name=?,pass=? where id= ?
==> Parameters: 来了(String), 123456(String), 7(Integer)
<==    Updates: 1
Releasing transactional SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@28dedd9a]
Transaction synchronization deregistering SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@28dedd9a]
Transaction synchronization closing SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@28dedd9a]
2024-06-07T19:22:43.482+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:afterThrowing
2024-06-07T19:22:43.482+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.AAAop           : AAAop:after
2024-06-07T19:22:43.482+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:afterThrowing
2024-06-07T19:22:43.482+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.ZZzAop          : ZZzAop:after
2024-06-07T19:22:43.482+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:afterThrowing
2024-06-07T19:22:43.482+08:00  INFO 24416 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:after
```

与理论一致

---

### 多个相同的切入点表达式抽取

`@PointCut`

通过`@PointCut`注解可以把相同的地址提取出来取个别名，每次打的切入点表达式的时候就不需要全打出来了

```java
 @Pointcut("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public void kkk(){};

 @Pointcut("execution(* com.kirari.dashijian.service.UserService.select(..))")
    private void lll(){};
```

类名的修饰符，`private`代表只能在这个类中使用，其他类要使用要把修饰符改为`public`

本体类中使用

```java
public class OrderAop {
    @AfterReturning("kkk()")
    public void afterReturning(){
        log.info("Order:afterReturning");
    }
}
```

其他类中使用：

```java
public class AAAop {
    @AfterReturning("com.kirari.dashijian.aop.OrderAop.kkk()")
    public void afterReturning(){
        log.info("AAAop:afterReturning");
    }
```

实例

```java
@Slf4j
@Component
@Aspect
@Order(1)
public class OrderAop {

    @Pointcut("execution(* com.kirari.dashijian.service.UserService.update(..))")
    public void kkk(){};

    @AfterReturning("kkk()")
    public void afterReturning(){
        log.info("Order:afterReturning");
    }

    @AfterThrowing("kkk()")
    public void afterThrowing(){
        log.info("Order:afterThrowing");
    }

    @After("kkk()")
    public void after(){
        log.info("Order:after");
    }

    @Before("kkk()")
    public void before(){
        log.info("Order:before");
    }

    @Around("kkk()")
    public Object Around(ProceedingJoinPoint joinPoint) throws Throwable {

        log.info("Order:环绕前");

        Object object = joinPoint.proceed();

        log.info("Order:环绕后");

        return object;
    }

}
```





### 切入点表达式

#### execution

`execution(访问修饰符号 返回值 包名.类名.方法名(方法参数) throw 异常)`

其中**访问修饰符**(public/private/protected)、**包名.类名**、**throw 异常**可以省略

完整版例子：`    @Pointcut("execution(public int com.kirari.dashijian.service.UserService.update(int) throws Exception)")`

> 包名.类名不建议省略，会出现匹配不同类与包下的方法，导致不能得到想要的结果

特殊符号/通配符：

- `*`

  表示单个独立的任意一个包名/类名/方法名/参数的任意**一个**参数，也可以匹配包、类、方法名的一部分，和上面的拦截器是一致的

- `..`

  任意数目层级的包，任意类型个数的参数

---

`"execution( * com..UserService.findAllUser(..))"`

com任意层级下UserService.findAllUser任意参数的方法

---

通配所有包名类名方法名任意参数

`execution(* *(..))`

---

> `@Pointcut("execution( * com.kirari.dashijian.service.UserService.update())")`参数里没有`..`或者`*`的话匹配的是无参数构造()
>
> 当参数里是`..`的话，无参构造也可以实现匹配，但是`*`必须匹配单个参数

关于匹配包名/类名/方法名的某一段

`"execution( * com.kirari.dashijian.service.UserS*.findAllUser(..))"`

我们看见原来的`UserService`变成了`UserS*`，实现了原本的`com.kirari.dashijian.service.UserService.findAllUser()`方法后，出现了通知信息，所以是像拦截器一样包括匹配一段包名/类名/方法名的

修改为`*erS*`时也能匹配到，可见一段字符xxxxx，当`*`在前面匹配xxx为后缀的包名/类名/方法名，`*`在前面匹配前缀为xxx的包名/类名/方法名，当两头出现`*`则是匹配中间为xxx的路径

---

##### 复杂判断

可以通过`||`、`&&`、`!`组合进行复杂判断

例如：

```java
@Pointcut("execution( * com..UserService.findAllUser(..) ) ||" +
        "execution(* com.kirari.dashijian.service.UserService.update(..))"
         )

@Pointcut("execution( * com..UserService.findAllUser(..) ) &&" +
          "execution(* *(..))"
         )

@Pointcut("execution(* *(..)) &&"+
          "!execution( * com..UserService.findAllUser(..) ) "
         )
```

---

#### @annotation()、@within()

- @annotation() 使用注解来定位匹配方法

- @within() 使用注解定位匹配接口、类

首先先定义一个自定义注解

```java
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE ,ElementType.METHOD})
public @interface AopTest {
}
```

- `ElementType.METHOD`注解可以应用于方法
- `ElementType.TYPE`注解可以应用于类、接口（包括注解类型）或枚举声明

Aop类

```java
@Pointcut("@within(AopTest)||" +
        "@annotation(AopTest)")
public void kkk(){};
```

在类上使用注解

```java
@AopTest
@Service
public class StudentService {
    @Autowired
    StudentMapper studentMapper;
        public List<Student> getStudent() {
        return studentMapper.selectStudent();
    }
}
```

在方法上使用注解

```java
@Service
public class UserService {
    @Autowired
    private UserMapper userMapper;
    @AopTest
    public List<user> findAllUser() {
        return userMapper.findAllUser();
    }
}

```

想在想使用的方法/类上进行切片，就是用注解就可以控制到了

---

### 在aop中获取连接点信息

around可以使用ProceedingJoinPoint类的方法而其他的四个通知类只有使用JoinPoint这个方法

JoinPoint是ProceedingJoinPoint的父类



核心方法

```java
String className = joinPoint.getTarget().getClass().getName(); //获取类名
Signature signature = joinPoint.getSignature();					//获取目标对象名字
String methodName = joinPoint.getSignature().getName();			//获取方法名
Object[] args = joinPoint.getArgs();						//获取参数

System.out.println("类名："+className);
System.out.println("方法名称: " + methodName);
System.out.println("目标对象: " + signature);
System.out.println("参数: ");
for (Object arg : args) {
    System.out.println(" - " + arg);
}
```

例子：

```java
@Slf4j
@Component
@Aspect
@Order(1)
public class OrderAop {

    @Pointcut("@within(AopTest)||" +
            "@annotation(AopTest)")
    public void kkk(){};

    @AfterReturning("kkk()")
    public void afterReturning(JoinPoint joinPoint){
        log.info("Order:afterReturning");
        printJoinPoint(joinPoint);
    }

    @AfterThrowing("kkk()")
    public void afterThrowing(JoinPoint joinPoint){
        log.info("Order:afterThrowing");
        printJoinPoint(joinPoint);
    }

    @After("kkk()")
    public void after(JoinPoint joinPoint){
        log.info("Order:after");
        printJoinPoint(joinPoint);
    }

    @Before("kkk()")
    public void before(JoinPoint joinPoint){
        log.info("Order:before");
        printJoinPoint(joinPoint);
    }

    @Around("kkk()")
    public Object Around(ProceedingJoinPoint joinPoint) throws Throwable {

        log.info("Order:环绕前");

        Object object = joinPoint.proceed();

        printJoinPoint(joinPoint);
        
        log.info("Order:环绕后");

        return object;
    }
    
    public void printJoinPoint(JoinPoint joinPoint){
        String className = joinPoint.getTarget().getClass().getName();
        Signature signature = joinPoint.getSignature();
        String methodName = joinPoint.getSignature().getName();
        Object[] args = joinPoint.getArgs();

        System.out.println("类名："+className);
        System.out.println("方法名称: " + methodName);
        System.out.println("目标对象: " + signature);
        System.out.println("参数: ");
        for (Object arg : args) {
            System.out.println(" - " + arg);
        }

    };

}
```

输出结果：

```shell
2024-06-08T02:39:28.477+08:00  INFO 28640 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:环绕前
2024-06-08T02:39:28.477+08:00  INFO 28640 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:before
类名：com.kirari.dashijian.service.StudentService
方法名称: findStudentIdName
目标对象: Student com.kirari.dashijian.service.StudentService.findStudentIdName(Integer,String)
参数: 
 - 1
 - 张三
2024-06-08T02:39:28.536+08:00  INFO 28640 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:afterReturning
类名：com.kirari.dashijian.service.StudentService
方法名称: findStudentIdName
目标对象: Student com.kirari.dashijian.service.StudentService.findStudentIdName(Integer,String)
参数: 
 - 1
 - 张三
2024-06-08T02:39:28.537+08:00  INFO 28640 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:after
类名：com.kirari.dashijian.service.StudentService
方法名称: findStudentIdName
目标对象: Student com.kirari.dashijian.service.StudentService.findStudentIdName(Integer,String)
参数: 
 - 1
 - 张三
 
类名：com.kirari.dashijian.service.StudentService
方法名称: findStudentIdName
目标对象: Student com.kirari.dashijian.service.StudentService.findStudentIdName(Integer,String)
参数: 
 - 1
 - 张三
2024-06-08T02:39:28.537+08:00  INFO 28640 --- [dashijian] [nio-8080-exec-1] com.kirari.dashijian.aop.OrderAop        : Order:环绕后

```

都可以查询到目标对象的 信息







---

## SpringDATA自动设置CRUD

JPA

依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

springboot貌似集成了

实体类

```java
@Data
@Entity    //设置实体类
@TableName("user")
public class user {
    @Id  //主键
    @Column(name = "id")//映射sql表列名
    int id;
    String name,pass;
}
```

持久层

```java
/**
*@Repository已经不是必须引入了
*/
public interface UserRepository extends JpaRepository<user, Long> {
}
//类似 mybatis-plus
```

使用

```java
@GetMapping("/select")
public List<user> returnUser() {
	return userRepository.findAll();
}
```

不在本包的时候,在启动类引入其他包 

```java
@EnableJpaRepositories(basePackages = "com.kirari.dashijian.dao")
```

## 其他

### 对于响应格式的统一

响应数据给前端，有时候是数组、字符串、int型数值，又或者是List型，混乱不堪的格式交杂，没有规范可言。

定义一种响应格式给前端，前端可以更好的接收数据

一个响应数据应该有响应码、响应信息和响应数据这三种

```java
public class Result{
    /**
    *	响应码
    */
    int code;
    //响应信息
    String message;
	//数据data
    Object data;
    
    
    public Result(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    
    public Result error(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
    
    public Result success(int code, String message, Object data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
} 
```











### 配置信息



#### 配置文件不同方式、配置文件顺序

优先级从低到高

- yaml
- yml
- properties

- java系统属性/环境变量
- 命令行参数

打包后可以在同目录下配置一个配置文件.yml进行配置信息，优先级大于jar源项目的.yml配置，小于环境变量和命令行参数

  

#### 多个环境部署

同一个项目运行、测试、生产、部署的环境不一样，例如数据库等等，难道要把项目重新生成一份写下不同的配置页面吗？

单个文件中可以在配置`---`分隔不同的配置



##### 单文件

`application.yml`

```yml
# 默认配置
server:
  port: 8080


# 配置环境所属
spring:
  profiles:
    active: dev



---
# 开发环境配置
spring:
  config:
    activate:
      on-profile: dev

server:
  port: 8081

---
# 测试环境配置
spring:
  config:
    activate:
      on-profile: test

server:
  port: 8082

---
# 生产环境配置
spring:
  config:
    activate:
      on-profile: prod

server:
  port: 8083
```

> 如果默认环境中已有配置，但是单独配置的配置会优先启用，覆盖掉默认配置，例如上面的 配置中默认配置了8080端口，但是优先启用了dev环境，访问8080的时候是无法获得界面，而访问8081才可以访问界面

使用`---`分隔不同环境配置。

由以下属性值取名称

```yml
spring:
  config:
    activate:
      on-profile: name
```

在默认环境中使用名称来设置当前环境值

```yaml
spring:
  profiles:
    active: dev
```

这是运行后的提示：

```shell
2024-06-10T15:13:16.224+08:00  INFO 5196 --- [dashijian] [           main] c.kirari.dashijian.DashijianApplication  : The following 1 profile is active: "dev"
2024-06-10T15:13:16.856+08:00  INFO 5196 --- [dashijian] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2024-06-10T15:13:16.888+08:00  INFO 5196 --- [dashijian] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 26 ms. Found 1 JPA repository interface.
2024-06-10T15:13:17.435+08:00  INFO 5196 --- [dashijian] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8081 (http)
```



默认环境中可以配置不同环境中共有的配置而不用单独每个都声明一遍,会在不同配置上生效



使用命令行指定激活的配置文件

```shell
# 使用开发环境配置
java -jar myapp.jar --spring.profiles.active=dev

# 使用测试环境配置
java -jar myapp.jar --spring.profiles.active=test

# 使用生产环境配置
java -jar myapp.jar --spring.profiles.active=prod
```



环境变量指定配置文件

```she
export SPRING_PROFILES_ACTIVE=dev
java -jar myapp.jar

export SPRING_PROFILES_ACTIVE=test
java -jar myapp.jar

export SPRING_PROFILES_ACTIVE=prod
java -jar myapp.jar
```





##### 多文件

如果把所有的文件配置都写到同一个 文件下很臃肿

文件目录如下

```ascii
src
├── main
│   ├── java
│   │   └── com
│   │       └── example
│   │           └── demo
│   │               ├── DemoApplication.java
│   └── resources
│       ├── application.yml
│       ├── application-dev.yml
│       ├── application-test.yml
│       └── application-prod.yml
```

 `application.yml`

```yml
# application.yml

server:
  port: 8080

# 指定配置文件
spring:
  profiles:
    active: dev
```

 `application-dev.yml`

```yml
# application-dev.yml

server:
  port: 8081
```

`application-test.yml`

```yml
# application-test.yml

server:
  port: 8082
  
  

```

  `application-prod.yml`

```yml
# application-prod.yml
server:
  port: 8083
```



通过这种方式可以配置你想使用的环境



##### 多文件且分组

虽然是多文件设置不同环境的配置显得不臃肿了，但是当个文件里写满了所有配置还是不容易查看

```ascii
src
├── main
│   ├── java
│   │   └── com
│   │       └── example
│   │           └── demo
│   │               ├── config
│   │               │   └── DataSourceConfig.java
│   │               ├── service
│   │               │   └── DataSourceService.java
│   │               ├── DemoApplication.java
│   └── resources
│       ├── application.yml
│       ├── application-devServer.yml
│       ├── application-devServer.yml
│       ├── application-devSelf.yml
│       ├── application-test.yml
│       └── application-prod.yml
```

此时的 `application-devServer.yml`、`application-devDB.yml`、`application-devSelf.yml`，配置着不同类型的配置

在` application.yml`中

```yaml
spring:
  profiles:
    active: dev
    group:
      "dev":
        - devServer
        - devDb
      por: pro,proDb
```

俩种方式都可以实现分组功能









### 自动实现Get、Set、ToString

1. `lombok`依赖

2. 使用注解@Data
3. 可选`@NoArgsConstructor`无参数构造方法、`@AllArgsConstructor`全参数构造方法

```java
@Data
public class Student {
    int id,age;
    String studentId,name,password,sex;
}
```

### 日志

`@Slf4j`

`lombok`依赖

[@Log (and friends) (projectlombok.org)](https://projectlombok.org/features/log)

有几种选择：

- `@CommonsLog`

  创建`private static final org.apache.commons.logging.Log log = org.apache.commons.logging.LogFactory.getLog(LogExample.class);`

- `@Flogger`

  创建`private static final com.google.common.flogger.FluentLogger log = com.google.common.flogger.FluentLogger.forEnclosingClass();`

- `@JBossLog`

  创建`private static final org.jboss.logging.Logger log = org.jboss.logging.Logger.getLogger(LogExample.class);`

- `@Log`

  创建`private static final java.util.logging.Logger log = java.util.logging.Logger.getLogger(LogExample.class.getName());`

- `@Log4j`

  创建`private static final org.apache.log4j.Logger log = org.apache.log4j.Logger.getLogger(LogExample.class);`

- `@Log4j2`

  创建`private static final org.apache.logging.log4j.Logger log = org.apache.logging.log4j.LogManager.getLogger(LogExample.class);`

- `@Slf4j`

  创建`private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(LogExample.class);`

- `@XSlf4j`

  创建`private static final org.slf4j.ext.XLogger log = org.slf4j.ext.XLoggerFactory.getXLogger(LogExample.class);`

- `@CustomLog`

  创建`private static final *com.foo.your.Logger* log = *com.foo.your.LoggerFactory.createYourLogger*(LogExample.class);`此选项*要求*您向 [`lombok.config`](https://projectlombok.org/features/configuration) 文件添加配置以指定应执行的操作。`@CustomLog`

使用：

```java
@Slf4j
@RestController
public class StudentController {

    @Autowired
    StudentService studentService;

    @GetMapping("/student")
    public List<Student> getStudent(){
        return  studentService.getStudent();
    }
    @GetMapping("student/{id}")
    public Student getStudentId(@PathVariable Integer id){
        log.info("这是查找学生"+id);
        return  studentService.findStudentId(id);
    }
}
```

### 本地存储

```java
    public void file(MultipartFile image){
//        取出文件名
        String fileName = image.getOriginalFilename();
//        存入位置
        image.transferTo(new  File("E:\\image\\"+fileName));
        
    }
```
避免文件名重复，按需使用UUID命名

常用方法：

```java
    void file (MultipartFile file) throws IOException {
        
        file.transferTo(new File("文件路径"));
        long size = file.getSize();//文件大小
        byte[] bytes  = file.getBytes(); //文件内容字节数组
        String filename = file.getOriginalFilename();//原始名
        String name = file.getName();//表单字段名
        InputStream inputStream = file.getInputStream();//文件内容输入流
    }

```





### 参数配置化

在类中使用的常量，或者多处使用但是值是一样的可以通过配置来统一管理

`application.yml`

```yaml
User:
  test:
    id: 2115080124
    name: kirari

```

User2类

```java
public class user2 {
    @Value("${User.test.id}")
    int id;
    @Value("${User.test.name}")
    String name;
    
    Info info;
}
```

测试：

```java
    @Test
    void contextLoads() {
        System.out.println(user2.toString());
    }
```

输出：

```sh
user2(id=2115080124, name=kirari, info=null)
```





----

简略写法/复杂类实现

user2类

```java
@Data
@ConfigurationProperties(prefix = "user.test")
public class user2 {
    int id;
    String name;
    Info info;
}

```

info 类

```java
@Data

public class Info {
    int age;
    String address;
}

```

配置

```yaml
User:
  test:
    id: 2115080124
    name: kirari
    info:
      age: 18
      address: gx
```

启动类需要配置

```java
@SpringBootApplication
@EnableConfigurationProperties(user2.class)
public class DashijianApplication {
    public static void main(String[] args) {
        SpringApplication.run(DashijianApplication.class, args);
    }
}
```

Test类

```java
@Autowired
user2 user2 ;
@Test
void contextLoads() {
    System.out.println(user2.toString());
}
```

输出：

```sh
user2(id=2115080124, name=kirari, info=Info(age=18, address=gx))
```

未匹配到的配置会显示0或者null

修改后的user2

```java
@Data
@ConfigurationProperties(prefix = "user.test")
public class user2 {
    int id;
    String name;
    Info info;
    int ss;
    String test;
}
```

结果：

```sh
user2(id=2115080124, name=kirari, info=Info(age=18, address=gx), ss=0, test=null)
```

---

数组赋值

配置文件

```xml
hobby: c++,java,python,php
```

测试类

```java
//    @Value("#{'${hobby}'}")
    @Value("${hobby}")
//    private String[] hobby;
//    private List<String> hobby;
    private Set<String>hobby;
    @Test
    void contextLoads() {
//        System.out.println(hobby.length);
//        System.out.println(Arrays.toString(hobby));
        System.out.println(hobby.toString());
        for (String h:hobby) {
            System.out.println(h);
        }
    }
```

以上均可实现

还有更多方法：[SpringBoot 中yml配置文件：定义list集合、数组及注意事项_springboot yml list-CSDN博客](https://blog.csdn.net/qq_44761854/article/details/136369598)

偷个懒，不尝试了

---

### JsonIgnore

```java
public class user {
    @Id
    int id;
    String name;
    @JsonIgnore
    String  pass;
}
```

往前端传递回数值使用SpringMVC转化json模式的时候，如果不想要某个值传递回去就使用`com.fasterxml.jackson.annotation.JsonIgnore;`下 的`@JsonIgnore`忽略它，不随着其他属性一起转化到前端

### 使用注解进行参数校验

实体类中声明对象时加入注解

```java
@Data
public class PUserPUserEntity {

    @NotNull
    private int id;

    @Pattern(regexp = "^\\S{2,4}$",message = "请正确输入格式")
    @NotNull
    private String pName;
    
    @NotEmpty
    private String pPass;
    
    @Email
    private String pEmil;
    
    @URL
    private String pUrl;

}
```

注解值分别为

| 注解     | 作用                 |
| -------- | -------------------- |
| NotNull  | 不能为null           |
| NotEmpty | 不能为null且置不为空 |
| Pattern  | 正则表达式           |
| Email    | 邮箱格式             |
| URL      | 网址格式             |
| ...      | ...                  |

> 其中message属性可以自定义报错信息

在接收参数时加入

`@Validated`

```java
@GetMapping("/allP")
public PUserPUserEntity getAllId(@Validated PUserPUserEntity pUserPUserEntity){
    return  pUserService.getall(pUserPUserEntity);
}
```

输入的值不符合参数的会报出错误返回异常

```bash
024-06-09T20:56:38.228+08:00  WARN 18192 --- [dashijian] [nio-8080-exec-1] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public com.kirari.dashijian.poyo.PUserPUserEntity com.kirari.dashijian.controller.PUserController.getAllId(com.kirari.dashijian.poyo.PUserPUserEntity): [Field error in object 'PUserPUserEntity' on field 'pEmil': rejected value [1244118445qq.com]; codes [Email.PUserPUserEntity.pEmil,Email.pEmil,Email.java.lang.String,Email]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [PUserPUserEntity.pEmil,pEmil]; arguments []; default message [pEmil],[Ljakarta.validation.constraints.Pattern$Flag;@668a56ea,.*]; default message [不是一个合法的电子邮件地址]] ]
2024-06-09T20:57:04.709+08:00  WARN 18192 --- [dashijian] [nio-8080-exec-4] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public com.kirari.dashijian.poyo.PUserPUserEntity com.kirari.dashijian.controller.PUserController.getAllId(com.kirari.dashijian.poyo.PUserPUserEntity): [Field error in object 'PUserPUserEntity' on field 'pUrl': rejected value [htt]; codes [URL.PUserPUserEntity.pUrl,URL.pUrl,URL.java.lang.String,URL]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [PUserPUserEntity.pUrl,pUrl]; arguments []; default message [pUrl],[Ljakarta.validation.constraints.Pattern$Flag;@1cbf9fc2,,-1,,.*]; default message [需要是一个合法的URL]] ]
2024-06-09T20:57:14.523+08:00  WARN 18192 --- [dashijian] [nio-8080-exec-2] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public com.kirari.dashijian.poyo.PUserPUserEntity com.kirari.dashijian.controller.PUserController.getAllId(com.kirari.dashijian.poyo.PUserPUserEntity): [Field error in object 'PUserPUserEntity' on field 'pName': rejected value [dadddd]; codes [Pattern.PUserPUserEntity.pName,Pattern.pName,Pattern.java.lang.String,Pattern]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [PUserPUserEntity.pName,pName]; arguments []; default message [pName],[Ljakarta.validation.constraints.Pattern$Flag;@36c19847,^\S{2,4}$]; default message [请正确输入格式]] ]
2024-06-09T21:11:09.888+08:00  WARN 18192 --- [dashijian] [nio-8080-exec-8] .w.s.m.s.DefaultHandlerExceptionResolver : Resolved [org.springframework.web.bind.MethodArgumentNotValidException: Validation failed for argument [0] in public com.kirari.dashijian.poyo.PUserPUserEntity com.kirari.dashijian.controller.PUserController.getAllId(com.kirari.dashijian.poyo.PUserPUserEntity): [Field error in object 'PUserPUserEntity' on field 'pPass': rejected value [null]; codes [NotEmpty.PUserPUserEntity.pPass,NotEmpty.pPass,NotEmpty.java.lang.String,NotEmpty]; arguments [org.springframework.context.support.DefaultMessageSourceResolvable: codes [PUserPUserEntity.pPass,pPass]; arguments []; default message [pPass]]; default message [不能为空]] ]

```

也可以在接收参数的时候使用注解

```java
    @GetMapping("/emil")
    public PUserPUserEntity getAllId(@Validated @Email String PEmil){
        return  pUserService.getEmil(PEmil);

    }
```

> 带不带@Validated 好像都行

此时输入的格式不是邮箱格式就会请求错误返回异常

```json
2024-06-09T21:26:33.150+08:00  INFO 31052 --- [dashijian] [nio-8080-exec-1] c.k.d.exception.GlobalExceptionHandler   : 异常！
2024-06-09T21:26:33.151+08:00  INFO 31052 --- [dashijian] [nio-8080-exec-1] c.k.d.exception.GlobalExceptionHandler   : 400 BAD_REQUEST "Validation failure"
2024-06-09T21:26:33.151+08:00  INFO 31052 --- [dashijian] [nio-8080-exec-1] c.k.d.exception.GlobalExceptionHandler   : org.springframework.web.method.annotation.HandlerMethodValidationException: 400 BAD_REQUEST "Validation failure"
2024-06-09T21:26:33.151+08:00  INFO 31052 --- [dashijian] [nio-8080-exec-1] c.k.d.exception.GlobalExceptionHandler   : class org.springframework.web.method.annotation.HandlerMethodValidationException
```

---

### 同一个实体类对多个请求的适应





#### DTO、VO、PO

| 类型 | 名称                                | 用途                                                         | 特点|
| ---- | ----------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| DTO  | Data Transfer Object (数据传输对象) | 用于在不同系统或不同层之间传输数据。                         | - 通常是简单的 Java 类（POJO），只包含属性和 getter/setter 方法。<br> - 没有业务逻辑，只是用于传输数据。<br> - 可以进行序列化，方便网络传输。 |
| VO   | Value Object (值对象)               | 用于表示业务模型中的值，通常用于表示不可变的业务对象。<br> 在视图层与服务层之间传递数据，常用于展示层。 | - 通常是不可变对象，一旦创建就不能修改其内部状态。<br> - 只包含数据，没有业务逻辑。 |
| PO   | Persistent Object (持久化对象)      | 对应数据库中的表，用于持久化数据。<br> 通常在数据访问层使用。 | - 通常是简单的 Java 类（POJO），每个属性对应数据库表的一列。<br> - 包含业务实体的状态，与数据库表结构紧密对应。<br> - 可能包含简单的业务逻辑，但主要用于数据持久化。 |

在请求时不同、响应数据、持久层数据库访问的时候，如果遇到与实体类poyo不一样的结构，可以定义这么一些dto、vo、po来扩充、缩小不同的需求类

例如user.java

```java
public class user{
    int id;
    int age;
    String name;
}
```

前端传输数据却包含一个Emil

这时候就可以设置一个类

userDto.java

```java
public class userDto{
    int id;
    int age;
    String name;
    String Emil;
}
```

如果数据库想要存入修改时间，设置userPo.java

```java
public class userPo{
    int id;
    int age;
    String name;
    String Date;
}
```

根据业务需求灵活定制，节约传输数据的流量，性能优化等等

> [Spring项目中，为什么要区分PO对象，VO对象，DTO对象？有什么作用？_vo撖寡情-CSDN博客](https://blog.csdn.net/ma726518972/article/details/118757478)

---

#### 分类

建立太多的类不方便管理，在一个类中利用Validated 的groups属性

```java
@Data
public class PUserPUserEntity {

    @NotNull(groups = {Dto.class,Po.class})
    private int id;

    @Pattern(regexp = "^\\S{2,4}$",message = "请正确输入格式",groups = {Dto.class,Po.class})
    @NotNull
    private String pName;

    @NotEmpty(groups = Dto.class)
    private String pPass;

    @Email(groups = Po.class)
    private String pEmil;

    @URL
    private String pUrl;
 
 //设置分组名
 	public interface Dto{};
    public interface Po{};

}
```

在使用PUserPUserEntity.java实体类的时候加上注解`@Validated(PUserPUserEntity.分组名.class)`，例如`@Validated(PUserPUserEntity.Dto.class)`

使用

```java
@GetMapping("/allP")
public PUserPUserEntity getAllId(@Validated(PUserPUserEntity.Dto.class) PUserPUserEntity pUserPUserEntity){
    return  pUserService.getall(pUserPUserEntity);
}
```

就置使用注解中包含Dto.class的属性了

实体类中所有字段默认是`Default`分组的，如果所有的分组中均有这个字段，可以省略设置，让分组继承Default这个分组，这个新的分组就拥有了默认的分组字段，不需要单独设置所有分组都有的字段了

例如

```java
@Data
public class PUserPUserEntity {

    @NotNull
    private int id;
    
    @Pattern(regexp = "^\\S{2,4}$",message = "请正确输入格式")
    @NotNull
    private String pName;
    
    @NotEmpty(groups = Dto.class)
    private String pPass;
    
    @Email(groups = Po.class)
    private String pEmil;
    
    @URL
    private String pUrl;

 //设置分组名
	public interface Dto extends Default {};
    public interface Po extends  Default{};

}
```

> 注意Default引入的包是`import jakarta.validation.groups.Default;`

没有设置分组的默认为Default分组，各个分组又继承了Default，所以各个分组拥有未设置分组的字段。

并且通过分组设置，让这个实体类实现不同层的数据流通




---

### 注解进行参数校验的原理以及自定义校验

我们点开Validated 包下的任意一个注解，例如`NotEmpty`，以下是他的源码

```java
@Documented//javadoc
@Constraint( //指定提供校验规则的类
    validatedBy = {}
)  
//注解生效的区域
//其中ElementType.FIELD是变量
@Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
//在运行是运行
@Retention(RetentionPolicy.RUNTIME)

@Repeatable(List.class)

public @interface NotEmpty {
    
    
    //提示信息
    String message() default "{jakarta.validation.constraints.NotEmpty.message}";
//分组
    Class<?>[] groups() default {};
//负载
    Class<? extends Payload>[] payload() default {};

    
    
    @Target({ElementType.METHOD, ElementType.FIELD, ElementType.ANNOTATION_TYPE, ElementType.CONSTRUCTOR, ElementType.PARAMETER, ElementType.TYPE_USE})
    @Retention(RetentionPolicy.RUNTIME)
    @Documented
    public @interface List {
        NotEmpty[] value();
    }
}
```

找了好久找到了判断逻辑的源码

```java

public class NotNullValidator implements ConstraintValidator<NotNull, Object> {
    public NotNullValidator() {
    }

    public boolean isValid(Object object, ConstraintValidatorContext constraintValidatorContext) {
        return object != null;
    }
}

```

看到引入了接口`ConstraintValidator`

```java
public interface ConstraintValidator<A extends Annotation, T> {
    default void initialize(A constraintAnnotation) {
    }

    boolean isValid(T var1, ConstraintValidatorContext var2);
}
```

其中

- `A extends Annotation`是指给哪个注解校验规则

- T，校验的数据类型

如果`isValid`函数返回true则校验通过，如果返回false则校验失败输出message。

这个就是注解去实现参数校验的原理

#### 自定义校验注解



自定义注解Phone

```java
@Target({ElementType.PARAMETER, ElementType.FIELD}) // 可以用于字段和方法参数
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Constraint(
        validatedBy = {PhoneValidation.class} ////指定提供校验规则的类
)
public @interface Phone {
    String message() default "{手机号码需要11位数字}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}

```

配置验证规则

```java
public class PhoneValidation implements ConstraintValidator<Phone,String> {

    @Override
    public void initialize(Phone constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {


        return s != null && s.matches( "^\\d{11}$");
    }
}
```



使用：

```java
@GetMapping("/phone")
public String phone(@Validated @Phone String p){
    return p;
}
```



请求：`http://127.0.0.1:8083/phone?p=1234567891`报错

请求：`http://127.0.0.1:8083/phone?p=12345678910`返回12345678910

报错的时候没有提示`"{手机号码需要11位数字}";`我指定的message，不明白怎么回事...



---

### ThreadLocal

在登陆了以后同一个用户占用同一个线程的情况下可以使用ThreadLocal来简化开发，不用每次都传递用户基本信息进来了

- ThreadLocal.set(T)

  存放信息

- ThreadLocal.get()

  取出信息

- ThreadLocal.remove()

  释放ThreadLoca

可以通过拦截器来实现设置存放信息、释放ThreadLocal

工具类声明静态变量

```java
package com.kirari.dashijian.utils;

public class ThreaddLocalUtil {
    public static final  ThreadLocal THREAD_LOCAL = new ThreadLocal();

    public static <T> T get(){
        return (T) THREAD_LOCAL.get();
    }

    public static void set(Object object){
        THREAD_LOCAL.set(object);
    }

    public static void remove(){
        THREAD_LOCAL.remove();
    }
}
```

拦截器中

```java
 public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        /*
     	登录判断逻辑
          */  
            
     	HashMap user = new HashMap<>();
        user.put("name","krari");
        user.put("age",18);
        THREAD_LOCAL.set(user);
        return true;
    }

    /**

     * 资源方法运行后运行,没有资源返回不会执行
     */
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
//        HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
        log.info("2222222222");
    }

    /**
     * 视图渲染后运行，最后运行
*/
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        THREAD_LOCAL.remove();
        log.info("3333333333");
    }
```

在程序中想使用用户信息的时候就可以使用ThreadLocal.get()就能获取到用户的信息了

```java
HashMap<String,Object> user = (HashMap<String, Object>) THREAD_LOCAL.get();
String name = (String) user.get("name");
```



### Json数据格式化与映射

使用Json转化数据格式为普通类的属性时需要数据转化或映射的时候的注解 

#### 格式化`@JsonFormat`

##### 格式化时间

```java
@Data
public class Event {
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Date eventDate;
}
```

转化格式

```java
public class Main {
    public static void main(String[] args) throws Exception {
        String json = "{\"eventDate\":\"2024/06/09 21:45:00\"}";

        ObjectMapper objectMapper = new ObjectMapper();
        Event event = objectMapper.readValue(json, Event.class);

        System.out.println(event.getEventDate()); // 输出 2024-06-09 21:45:00 对应的 Date 对象
    }
}
```

`JsonFormat`的其他属性：

- `shape`: 指定数据的形状，如 `JsonFormat.Shape.STRING` 表示将数据序列化为字符串。

- `pattern`: 定义日期时间的格式模式，如 `"yyyy-MM-dd HH:mm:ss"`。

- ` timezone`: 指定时区，如 `"GMT+8"` 或 `"UTC"`。

- `locale`: 指定语言环境，如 `"en_US"`。

除了常用的格式化时间以外，还有其他特殊的用法

##### 格式化数字

```java
public class Product {
    
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "###,###.##")
    private double price;
}
```

作用是格式为千分位分隔俩位小数的保留方式

```java
import com.fasterxml.jackson.databind.ObjectMapper;

public class Main {
    public static void main(String[] args) throws Exception {
        Product product = new Product(1234567.89);

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(product);

        System.out.println(json); // 输出 {"price":"1,234,567.89"}
    }
}

```

##### 格式化布尔值

```java
public class User {
    
    @JsonFormat(shape = JsonFormat.Shape.NUMBER)
    private boolean active;
    public User(boolean active) {
        this.active = active;
    }
}
```

使用

```java
public class Main {
    public static void main(String[] args) throws Exception {
        User user = new User(true); // 将 active 设置为 true

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(user);

        System.out.println(json); // 输出 {"active":1}
    }
}
```

反向序列化

```java
public class Main {
    public static void main(String[] args) throws Exception {
        String json = "{\"active\":1}";

        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.readValue(json, User.class);

        System.out.println(user.isActive()); // 输出 true
    }
}
```



#### Json与类属性的映射

`@JsonProperty` 是 Jackson 库中的一个注解，用于在序列化和反序列化 JSON 时为 Java 对象的属性指定映射的 JSON 字段名称。

用法

user.class

```java
@Data
public class User {

    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("user_age")
    private int userAge;
}
```

`userName` 属性会映射到 JSON 的 `user_name` 字段，而 `userAge` 属性会映射到 JSON 的 `user_age` 字段。

```java
public class Main {
    public static void main(String[] args) throws Exception {
        User user = new User();
        user.setUserName("John");
        user.setUserAge(30);

        ObjectMapper objectMapper = new ObjectMapper();
        String json = objectMapper.writeValueAsString(user);

        System.out.println(json); // 输出 {"user_name":"John","user_age":30}
    }
}
```



反序列化



```java
public class Main {
    public static void main(String[] args) throws Exception {
        String json = "{\"user_name\":\"John\",\"user_age\":30}";

        ObjectMapper objectMapper = new ObjectMapper();
        User user = objectMapper.readValue(json, User.class);

        System.out.println(user.getUserName()); // 输出 John
        System.out.println(user.getUserAge()); // 输出 30
    }
}
```

更多

**添加默认值**

```java
public class User {
    @JsonProperty(value = "user_name", defaultValue = "unknown")
    private String userName;

    @JsonProperty("user_age")
    private int userAge;

}
```

**忽略 JSON 中不存在的字段**

```java
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {
    @JsonProperty("user_name")
    private String userName;

    @JsonProperty("user_age")
    private int userAge;
	private String date;
    ....
        
}
```



### SpringDoc 生成API文档

pom.xml中引入依赖

```xml
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.0.4</version>
</dependency>
```



声明配置类

```java
@Configuration
public class SwaggerConig {

    @Bean
    public GroupedOpenApi publicApi() {
        return GroupedOpenApi.builder()
                .group("public")
                .pathsToMatch("/**")
                .build();
    }

    @Bean
    public Info apiInfo() {
        return new Info()
                .title("接口测试")
                .version("1.0")
                .description("这是测试一下啊")
                .license(new License().name("Apache 2.0").url("http://springdoc.org"));
    }
}
```

输入`localhost:端口号/swagger-ui/index.html`访问api文档

![SpringDoc的API](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240615142713906.webp)

### Swagger 生成API文档

Spring整合swagger

借用knife4j工具进行生成

meavn引入依赖

```xml
<dependency>
    <groupId>com.github.xiaoymin</groupId>
    <artifactId>knife4j-spring-boot-starter</artifactId>
    <version>3.0.2</version>
</dependency>
```

设置配置类

```java
@Configuration
@Slf4j
public class WebMvcConfiguration extends WebMvcConfigurationSupport {
    /**
     * 通过knife4j生成接口文档
     * @return
     */
    @Bean
    public Docket docket() {
        ApiInfo apiInfo = new ApiInfoBuilder()
                .title("苍穹外卖项目接口文档")
                .version("2.0")
                .description("苍穹外卖项目接口文档")
                .build();
        Docket docket = new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(apiInfo)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.sky.controller"))
                .paths(PathSelectors.any())
                .build();
        return docket;
    }

    /**
     * 设置静态资源映射
     * @param registry
     */
    protected void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/doc.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
```

用这个源码成功了，自己配置 的时候失败了....

#### 常用注解

| 注解              | 作用                                         |
| ----------------- | -------------------------------------------- |
| @Api              | 用在类上，例如Controller                     |
| @ApiOperation     | 用在方法上Controller的某个方法标注是什么方法 |
| @ApiModelProperty | 用在实体类的属性上                           |
| @ApiModel         | 用在实体类上                                 |

示例：

```java
@Api(tags = "员工管理")
@RestController
public class EmployeeController {

    @ApiOperation("这个是登录接口")
    @PostMapping("/login")
    public Result<EmployeeLoginVO> login(@RequestBody EmployeeLoginDTO employeeLoginDTO) 
```

![image-20240615154342042](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240615154342042.webp)

实体类上

```java
@ApiModel(description = "员工登录时传递的数据模型")
public class EmployeeLoginDTO implements Serializable {

    @ApiModelProperty("用户名")
    private String username;

    @ApiModelProperty("密码")
    private String password;

}
```

效果：

![image-20240615154442397](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240615154442397.webp)

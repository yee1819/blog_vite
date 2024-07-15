# db静态工具

静态工具提供的方法与service的接口方法几乎一样，因为是静态方法无法获知实体类信息，所以在使用方法时需要加上实体类参数

用与多表查询，以免service互相调用而导致的循环依赖

## 示例

使用方法示例：

查询某个用户的信息，并包括地址

```java{13}
public UserVO getUser(Long id) {

    //查询用户
    var user = getById(id);

    //是否为空
    if (user == null || user.getStatus()==2 ) {
        throw new RuntimeException("用户异常");
    }

    //查询地址
    //注意要mybatis的包
    var addressList = Db.lambdaQuery(Address.class).eq(Address::getUserId, id).list();

    //封装
    var userVO = BeanUtil.copyProperties(user, UserVO.class);

    if (addressList != null && addressList.size() > 0) {
        var addressVOS = BeanUtil.copyToList(addressList, AddressVO.class);
        //设置地址
        userVO.setAddressList(addressVOS);
    }

    return userVO;
}
```

可以发现使用Db可以查询到其他表的数据

---

示例二

请求一系列用户并返回他们的地址

```java
public List<UserVO> getUserList(List<Long> ids) {
    //获取用户信息
    var users = lambdaQuery()
            .in(User::getId, ids)
            .list();

    //判断错误
    if(CollUtil.isEmpty(users)){
        return  Collections.emptyList();
    }
    //查询地址
    var userIds = users.stream().map(User::getId).collect(Collectors.toList());

    
    var addressList = Db.lambdaQuery(Address.class)
            .in(Address::getUserId, userIds)
            .list();
    //封装
    var addressVOList = BeanUtil.copyToList(addressList, AddressVO.class);
    //地址分组
    Map<Long, List<AddressVO> > addressMap = new HashMap<>(0);
    
    if(CollUtil.isNotEmpty(addressList)){
        //地址分组
        addressMap = addressVOList.stream().collect(Collectors.groupingBy(AddressVO::getUserId));
    }
    //遍历
    List<UserVO> userVOList = new ArrayList<>(users.size());
    for (User user : users) {
        //封装
        var userVO = BeanUtil.copyProperties(user, UserVO.class);
        //地址
        userVO.setAddressList(addressMap.get(user.getId()));
        userVOList.add(userVO);
    }


    return userVOList;
}
```


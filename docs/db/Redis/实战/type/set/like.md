# 点赞与取消点赞

使用redis的集合set来完成

点赞：`sadd key value `

取消点赞:`srem key value`

点赞人数：`scard key`

点赞的人：` SMEMBERS key`

是否点过赞：`SISMEMBER key value`

## 代码实现

```java{20-27,36-51}
public Result queryHotBlog(Integer current) {
    // 根据用户查询
    Page<Blog> page = query()
            .orderByDesc("liked")
            .page(new Page<>(current, SystemConstants.MAX_PAGE_SIZE));
    // 获取当前页数据
    List<Blog> records = page.getRecords();
    records.forEach(blog ->{
        // 查询用户
        blog = getUser(blog);
        blog =  isBolgLike(blog);

    });
    //也能这样写
    //records.forEach(this::getUser);
    return Result.ok(records);
}

//  是否点赞
private Blog isBolgLike(Blog blog) {
    Long id = UserHolder.getUser().getId();
    String key = RedisConstants.BLOG_LIKED_KEY+blog.getId();
    Boolean sussess = stringRedisTemplate.opsForSet().isMember(key, id.toString());

    blog.setIsLike(BooleanUtil.isTrue(sussess));
    return blog;
}


@Override
public Result likeBlog(Long id) {
    //1. 获取用户
    Long userId = UserHolder.getUser().getId();
    String key = RedisConstants.BLOG_LIKED_KEY+id;
    //判断用户是否点赞
    Boolean islike = stringRedisTemplate.opsForSet().isMember(key, userId.toString());

    if (BooleanUtil.isFalse(islike)){
        //未点赞
        //数据库点赞+1
        boolean sussess = update().setSql("liked = liked + 1").eq("id", id).update();
        if (sussess) {
            stringRedisTemplate.opsForSet().add(key, String.valueOf(userId));
        }
    } else {
        //已点赞
        boolean sussess = update().setSql("liked = liked - 1").eq("id", id).update();
        if (sussess) {
            stringRedisTemplate.opsForSet().remove(key, String.valueOf(userId));
        }
    }

    return Result.ok();
}

@Override
public Result queryBlogByid(Long id) {

    Blog blog = getById(id);
    if (blog == null) {
        return  Result.fail("博客不存在");
    }
     blog = getUser(blog);
     blog = isBolgLike(blog);

    return Result.ok(blog);
}

private Blog getUser(Blog blog){
        Long userId = blog.getUserId();
        User user = userService.getById(userId);
        blog.setName(user.getNickName());
        blog.setIcon(user.getIcon());

    return blog;
}
```
# 排行榜的实现

使用Zset实现排行榜

如果是以示例的点赞先后顺序的排行榜，

以时间戳为score，时间早的时间戳小的在前面即可实现功能

- 查看前五名：`ZRANGE key 0 4`

- 点赞：`zadd  key 时间戳  member`
- 取消点赞：`zrem key  member`
- 查询是否点赞: `ZSCORE key number`存在返回score

## 代码实现

```java{46-70,74-92}

    @Resource
    private IUserService userService;

    @Resource
    private StringRedisTemplate stringRedisTemplate;

    @Override
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

    private Blog isBolgLike(Blog blog) {
        Long id = UserHolder.getUser().getId();
        if (id==null){
            return null;
        }
        String key = RedisConstants.BLOG_LIKED_KEY+blog.getId();
        Double score = stringRedisTemplate.opsForZSet().score(key, id.toString());


        if (score==null)
            blog.setIsLike(BooleanUtil.isTrue(false));
        else
            blog.setIsLike(BooleanUtil.isTrue(true));
        //blog.setIsLik(score!=null)
        return blog;
    }


    @Override
    public Result likeBlog(Long id) {
        //1. 获取用户
        Long userId = UserHolder.getUser().getId();
        String key = RedisConstants.BLOG_LIKED_KEY+id;
        //判断用户是否点赞
        Double score = stringRedisTemplate.opsForZSet().score(key, userId.toString());

        if (score==null){
            //未点赞
            //数据库点赞+1
            boolean sussess = update().setSql("liked = liked + 1").eq("id", id).update();
            if (sussess) {
                stringRedisTemplate.opsForZSet().add(key, String.valueOf(userId),System.currentTimeMillis());
            }

        } else {
            //已点赞
            boolean sussess = update().setSql("liked = liked - 1").eq("id", id).update();
            if (sussess) {
                stringRedisTemplate.opsForZSet().remove(key, String.valueOf(userId));
            }
        }

        return Result.ok();
    }


    @Override
    public Result queryBlogByLikes(Long id) {
        String key = RedisConstants.BLOG_LIKED_KEY+id;

        Set<String> top5 = stringRedisTemplate.opsForZSet().range(key,0,4);
        if (top5==null||top5.isEmpty()){
            return Result.ok(Collections.emptyList());
        }

        List<Long> ids = top5.stream().map(Long::valueOf).collect(Collectors.toList());
        String idStr = StrUtil.join(",",ids);
        
        Stream<UserDTO> userDTOStream = userService.query()
                .in("id",ids)
                .last("ORDER BY FIELD (id,"+idStr+")").list()
                .stream()
                .map(user -> BeanUtil.copyProperties(user, UserDTO.class));

        log.info("查询到的用户信息：{}",userDTOStream);
        return Result.ok(userDTOStream);
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


























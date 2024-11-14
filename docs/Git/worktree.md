### 25. flow 分支管理系统

一套详细的分支管理策略主要分为

1. **主分支（master）**：始终保持可发布状态，包含已经发布的版本。
2. **开发分支（develop）**：包含即将发布的功能，作为功能分支的集成分支。
3. **功能分支（feature）**：用于开发新功能，基于 `develop` 创建，完成后合并回 `develop`。
4. **发布分支（release）**：用于准备新版本的发布，基于 `develop` 创建，完成后合并回 `master` 和 `develop`。
5. **热修复分支（hotfix）**：用于修复紧急问题，基于 `master` 创建，完成后合并回 `master` 和 `develop`。

需要先置安装，有独特的一套指令，以及良好的结构化规范，不过多了解。

### 26. worktree 仓库

当工作中需要频繁切换分支的时候，可以创建一个新的工作目录，相当于复制一个仓库来方便切换

`git worktree add <path> [branch]` 

- `<path>`为路径

- `[branch]` 可选的分支名，如果不填写，则自动创建一个与路径目录名相同的分支。如果该分支已存在则切换到同名分支。

  如果没有这个分支则需要加一个`-b`

例子：

```bash

填写分支且不存在该分支
$ git worktree add ../my-feature-branch -b feature-branch
Preparing worktree (new branch 'feature-branch')
HEAD is now at 504f1d3 Revert "qevert "revert_test_2""


不填写分支且不存在该分支
$ git worktree add ../my-feature-branch2
Preparing worktree (new branch 'my-feature-branch2')
HEAD is now at 504f1d3 Revert "qevert "revert_test_2""


$ git branch
  ck_ts
* dev
  dev2
+ feature-branch
  hello
  hello2
  main
+ my-feature-branch2


$ git worktree list
C:/Users/Yee/Desktop/gitdome             504f1d3 [dev]
C:/Users/Yee/Desktop/my-feature-branch   504f1d3 [feature-branch]
C:/Users/Yee/Desktop/my-feature-branch2  504f1d3 [my-feature-branch2]


填写分支且存在该分支
$ git worktree add ../dev2
Preparing worktree (checking out 'dev2')
HEAD is now at 7ff7fe3 登录功能


Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git branch
  ck_ts
* dev
+ dev2
+ feature-branch
  hello
  hello2
  main
+ my-feature-branch2


```


![image-20240522201614876](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240522201614876.webp)


删除工作目录

`git worktree remove <path>`



例子：

```sh
$ git worktree remove ../my-feature-branch

Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git worktree remove ../dev2

Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git worktree list
C:/Users/Yee/Desktop/gitdome             504f1d3 [dev]
C:/Users/Yee/Desktop/my-feature-branch2  504f1d3 [my-feature-branch2]

Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git branch
  ck_ts
* dev
  dev2
  feature-branch
  hello
  hello2
  main
+ my-feature-branch2

```



可以发现，工作目录虽然删除了，但是分支依旧还在。

特点：

- **共享同一个 Git 仓库**：所有工作目录共享同一个 Git 仓库，因此对象存储和引用（如提交、分支、标签）是共享的。

- **独立的工作树和索引**：每个工作目录都有自己的工作树和索引，因此在一个工作目录中的未提交更改不会影响其他工作目录。

  类似贮藏和切换分支

- **适用于并行开发**：使用 `git worktree` 可以同时在多个分支上进行开发，而不需要频繁切换分支。
### 12. 远程仓库

#### 先要关联远程仓库

```bash
git remote add origin 远程仓库地址
```

- `origin`的作用是给远程仓库地址起一个别名为`origin`，这是一个默认名字,可以替换，相当于c语言的`typedef`以及`#define`,origin作为远程仓库的地址添加到本地仓库，在之后的拉取代码，推送代码的过程中就不需要每次都打一大串的远程仓库地址

#### 查看绑定的远程仓库地址

```bash
git remote -v
```



#### 有多少个远程仓库

> 建议使用上面的指令查看，包含关系关系如下图

![image-20240518203302693](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240518203302693.webp)

```bash
git remote 
```



#### 推送到远程仓库

最常用的指令

```bash
git push -u origin main
```

- 命令为推送文件夹的所有不被忽略的文件到origin所指的仓库地址的main分支上
- `-u`是`--set-upstream`的缩写

用于关联远程仓库与本地仓库的指定分支，关联后不需要指定分支名就可以使用`git push`以及`git pull`指令



查看本地分支以及远程仓库分支的跟踪状态

```bash
git branch -vv
```

![image-20240518204251921](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240518204251921.webp)

修改关联分支仓库

```bash
git branch -u origin/new-branch old-branch-name
```

完全指令

```bash
git push [-f] [--set-upstream][远端名称[本地分支名][:远端分支名]]
```

- `-f` ，即`--force`如果指令加入，则是不理会推送冲突（即他人的提交或者在远程仓库的修改），强制覆盖
- `--set-upstream`也就是`-u`上面有详细解释
- 远端名称，即远程仓库地址，可用别名替代，也就是默认设置的`origin`
- 如果远程仓库和本地仓库一致，则省略`[:远程分支]`
- 推送到不同的名称的的分支示例`git push -u origin main:yuan_branch` ，本地的main分支推送到了远程的yuan_branch分支

---

#### 克隆 远程仓库

> clone，和词意相当，也就是把远程仓库的全部文件下载到本地

```bash
git clone 远程仓库地址 [本地文件夹名称]
//例如
git clone https://github.com/用户名/仓库名.git  repo
```

- 本地文件夹名称可省略，会在当前自动创建一个远程仓库名的文件夹。并把所有的文件下载到这个文件夹里面

设置了文件夹名则是在目录下创建文件夹名的文件夹，并把所有的文件下载到这个文件夹里面。

---

#### 连接远程仓库

除了push时连接远程仓库外还可以通过以下方法

`git checkout --track origin/dev`

作用：

1. 创建一个名为 `dev` 的本地分支（假设远程分支是 `origin/dev`）。
2. 切换到这个新创建的本地分支。
3. 配置这个本地分支以跟踪远程分支 `origin/dev`

或

```sh
git checkout -b dev origin/dev  # 创建并切换到本地分支 dev，从 origin/dev 的当前提交开始
git branch --set-upstream-to=origin/dev  # 配置本地分支 dev 以跟踪 origin/dev
```

将这两个步骤合并为一步

```sh
git checkout -b dev --track origin/dev
```







---

### 13.抓取和拉取远程仓库

抓取：`fetch`,获取远程仓库的最新修改，创造一个origin/分支名的新分支，不会自动合并需要你手动合并

以下是使用方法：

- 获取所有分支

```sh
git fetch origin
```

- 获取远程仓库的某个分支

```sh
git fetch  origin main
```

 抓取最新变化以后，需要你手动去合并分支，更新你的本地仓库的代码

拉取：`full`，获取远程仓库的修改，并且合并这个修改的代码到你的本地仓库，此时可能产生冲突，这时候就需要手动解决冲突

也就是说，`full`其实是`fetch`+`merge`
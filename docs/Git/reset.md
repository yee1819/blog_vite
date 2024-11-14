### 6.版本回退

```bash
git reset  --hard commitID
```

`commitID` 通过  `git log` 查看

> `--soft` 、`--mixed`以及`--hard`是三个恢复等级。
>
> - 使用`--soft`就仅仅将头指针恢复，已经add的暂存区以及工作空间的所有东西都不变。
> - 如果使用`--mixed`，就将头恢复掉，已经add的暂存区也会丢失掉，工作空间的代码什么的是不变的。
> - 如果使用`--hard`，那么一切就全都恢复了，头变，aad的暂存区消失，代码什么的也恢复到以前状态。

注意！！！

>使用`git reset`只会把git已追踪的文件回退，不会把新建立的文件删除
>
>如果要清理新建立的文件有俩种方式
>
>1. `git add`加入追踪后回退
>2. `git clean`清理未追踪的文件

---

### 16. 工作区回退/暂存区回退  checkout / reset/restore



#### checkout

工作区的文件在修改后可以执行两种操作：

- `git add`

  确认工作无误后，把文件上传到暂存区，再commit一个新版本

- `git checkout -- 文件名`

  发现工作有错误，回退到修改之前

- `git restore`

  git 2.23 版本后出现的回退指令

首先，使用`git status`查看仓库状态，这是一个干净无修改的工作区

我们修改一个test.txt，添加一行字符串

```sh
$ git status
On branch main
nothing to commit, working tree clean

//添加一行字符串后
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   test.txt

no changes added to commit (use "git add" and/or "git commit -a")

```

> git restore是git 2.23出现的新指令，用于清晰语义，因为checkout是切换分支有歧义...

先使用`git checkout -- 文件名`测试

```sh
$ git checkout -- test.txt

Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git status
On branch main
nothing to commit, working tree clean

```

这样做就回退test.txt文件到了commit`-->HEAD`的状态

---



#### restore

现在使用`git restore`测试

```sh

Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git status
On branch main
nothing to commit, working tree clean

Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   test.txt

no changes added to commit (use "git add" and/or "git commit -a")

Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git restore test.txt

Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git status
On branch main
nothing to commit, working tree clean

```

一样可以完成结果，回复到暂存区的状态

如果想回退到`HEAD-->`，那么指令是`git restore --source=HEAD example.txt `



---

在查资料的时候看见`git restore --staged <file>`

这个是**清空暂存区中的文件**（仅从暂存区移除，不影响工作区）

```bash
Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   hello.txt
        modified:   test.txt

no changes added to commit (use "git add" and/or "git commit -a")

Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git add .

Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   hello.txt
        modified:   test.txt

//再修改工作区的test

Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   hello.txt
        modified:   test.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   test.txt



Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git restore --staged test.txt

Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   hello.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   test.txt
        
```

我们可以看到暂存区的文件被退回了，但是工作区已经修改的文件仍然还在

---

#### reset

如果是想仅仅是把暂存区的文件放回工作区可以使用：`git reset HEAD <file>`

```sh
Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   hello.txt

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   test.txt
        modified:   "\350\277\231\346\230\257hello2.txt"


Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git reset HEAD hello.txt
Unstaged changes after reset:
M       hello.txt
M       test.txt
M       这是hello2.txt

Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git status
On branch main
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   hello.txt
        modified:   test.txt
        modified:   "\350\277\231\346\230\257hello2.txt"

```

以下是gpt的介绍

`git reset` 是一个非常强大的 Git 命令，用于撤销更改和移动 HEAD 指针。它可以用于重置暂存区的文件、更改当前分支的提交历史，甚至更新工作目录。以下是详细的用法和示例：

基本用法：

```
sh
复制代码
git reset [<mode>] [<commit>]
```

模式：

1. **--soft**：仅移动 HEAD 指针，不改变暂存区和工作区的内容。
2. **--mixed**（默认模式）：移动 HEAD 指针，并重置暂存区为指定的 commit，但不改变工作区的内容。
3. **--hard**：移动 HEAD 指针，重置暂存区，并更新工作区，使其与指定的 commit 一致。

用法和示例：

1. `--soft` 模式

仅重置 HEAD 指针，不改变暂存区和工作区。这种模式适合想保留更改但移动提交历史的情况。

```
sh复制代码# 移动 HEAD 指针到指定的提交，但保留暂存区和工作区的更改
git reset --soft <commit>
```

示例：

```
sh
复制代码
git reset --soft HEAD~1
```

这个命令会把 HEAD 指针移到上一个提交，保留当前的所有更改为已暂存状态。

2. `--mixed` 模式（默认）

重置 HEAD 指针和暂存区，但保留工作区的更改。这是默认模式，适合想保留更改但从暂存区移除的情况。

```
sh复制代码# 移动 HEAD 指针到指定的提交，并重置暂存区，但保留工作区的更改
git reset --mixed <commit>
```

示例：

```
sh
复制代码
git reset --mixed HEAD~1
```

这个命令会把 HEAD 指针移到上一个提交，并将当前的更改从暂存区移除，但保留在工作区。

3. `--hard` 模式

重置 HEAD 指针、暂存区和工作区，使其全部与指定的 commit 一致。这会丢失所有未提交的更改。

```
sh复制代码# 移动 HEAD 指针到指定的提交，并重置暂存区和工作区，使它们与该提交一致
git reset --hard <commit>
```

示例：

```
sh
复制代码
git reset --hard HEAD~1
```

这个命令会把 HEAD 指针移到上一个提交，并丢弃所有未提交的更改。

---



其他示例

1.  重置单个文件

如果只想重置暂存区中的某个文件，可以使用：

```sh

复制代码
git reset <file>
```

这个命令会把指定文件从暂存区移除，但保留在工作区。

2. 移动到特定提交

```sh
sh
复制代码
git reset --hard <commit_hash>
```

这个命令会把 HEAD、暂存区和工作区都重置到指定的提交。

3. 撤销最近的提交但保留更改

```sh
sh
复制代码
git reset --soft HEAD~1
```

这个命令会撤销最近的提交，但保留所有更改为已暂存状态。



> `git reset` 是一个功能强大且多用途的命令，可以用来修改提交历史、重置暂存区和工作区。根据不同的模式，可以选择适合当前需求的操作方式：
> - **--soft** 保留所有更改，但移动 HEAD 指针。
> - **--mixed** 重置暂存区，但保留工作区更改。
> - **--hard** 丢弃所有未提交的更改，并重置到指定的提交。

ps.reset偷个懒用的gpt的介绍

#### 总结

回退分为三种

1. 回退工作区
- `git checkout <file>`
- `git restore <file>`

2. 文件从暂存区到工作区，不影响工作区
- `git reset HEAD <file>`
- `git restore --staged <file>`

3. commit、暂存区、工作区都变为commit一个版本
- ``git reset --hard commit_id`
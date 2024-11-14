### 15. 贮藏 stash

当我在一个分支中，已经完成了一部分的开发，但是还不能提交，这时候我需要切换到另一个分支（例如有紧急bug），这个时候切换分支未提交的文件就会一起带到另一个分支上，

这个时候我们就需要冷藏这个分支上未提交的工作区。

```sh
$ git status
On branch hello
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   "\345\210\206\346\224\257.txt"

no changes added to commit (use "git add" and/or "git commit -a")

Yee@Yee MINGW64 ~/Desktop/gitdome (hello)
$ git stash
Saved working directory and index state WIP on hello: 336d4e3 Merge branch 'dev2'

Yee@Yee MINGW64 ~/Desktop/gitdome (hello)
$ git status
On branch hello
nothing to commit, working tree clean

```

这个时候工作区就干净了，可以任意切换分支了

`git stash`贮藏

` git stash list`查看所有的贮藏

```bash
$ git stash list
stash@{0}: WIP on hello: 336d4e3 Merge branch 'dev2'

```

可以通过下述命令来标记此次储藏，以便后期查看

```bash
git stash save [stashMessage]
```



解封/恢复

```sh
Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git stash apply
On branch dev
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   "\346\226\260\345\273\272\347\224\250\346\210\267.txt"

no changes added to commit (use "git add" and/or "git commit -a")

Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git stash list
stash@{0}: WIP on dev: fc958c7 新建用户
stash@{1}: WIP on dev: fc958c7 新建用户
stash@{2}: WIP on hello: 336d4e3 Merge branch 'dev2'

```

通过`git stash apply`可以解封，但是还存在在stash list中，通过`git stash drop`删除，可以看出，stash是一个栈结构

```$ git stash drop
git stash drop
Dropped refs/stash@{0} (f4c2dafa4382f0d70657cf4c713bf39e336ef0e0)

Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git stash list
stash@{0}: WIP on dev: fc958c7 新建用户
stash@{1}: WIP on hello: 336d4e3 Merge branch 'dev2'
```



`git stash pop`通过这个可以一键删除并恢复

```sh
$ git stash
Saved working directory and index state WIP on dev: fc958c7 新建用户

Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git stash list
stash@{0}: WIP on dev: fc958c7 新建用户
stash@{1}: WIP on dev: fc958c7 新建用户
stash@{2}: WIP on hello: 336d4e3 Merge branch 'dev2'

Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git stash pop
On branch dev
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   "\346\226\260\345\273\272\347\224\250\346\210\267.txt"

no changes added to commit (use "git add" and/or "git commit -a")
Dropped refs/stash@{0} (72215c233f434ebd7e98eac7421ccf26d8b626b1)

Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git stash list
stash@{0}: WIP on dev: fc958c7 新建用户
stash@{1}: WIP on hello: 336d4e3 Merge branch 'dev2'

```





假如我有多个贮藏

```sh
 git stash list
stash@{0}: WIP on dev: fc958c7 新建用户
stash@{1}: WIP on hello: 336d4e3 Merge branch 'dev2'

```

我可以选择一个`git stash apply stash@{0}`指定的编号去恢复
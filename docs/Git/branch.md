### 7. 查看分支

```bash
git branch
```

---

### 8. 创建分支

```bash
git branch 分支名
```

---

### 9. 切换分支

```bash
 git checkout 分支名
 //or
 git switch 分支名
```

`HEAD`指向当前分支

切换到一个不存在的分支，即创建新分支并复制当前分支内容并切换

```bash
git checkout -b 分支名 
//or
git switch -c  分支名
```

---

### 10. 删除分支

```bash
git branch -d 分支名
//↑ 需要做各种检查

//不做检查强制删除
git branch -D 分支名
```

---

### 11.合并分支

首先使用`git switch`或者`git checkout`选择需要保留的分支上

```bash
git merge 分支名
```

合并后`esc`+`:`+`wq`退出合并文本编辑

#####  处理分支

当是使用`merge`合并分支的时候,如果有相同的文件修改了不一样的变动，即`冲突`,此时git会自动合并,git并不会处理冲突，只在命令行告诉你什么地方会有冲突:

![image-20240515085927238](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240515085927238.webp)



在test.txt 文件内是这样的

![image-20240515090143129](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240515090143129.webp)

其中``HEAD`到`=====`分割线是你所合并的主分支内容，等号分割线下到`hello`是被我合并的分支（hello 是我合并的分支名）

之后手动修改需要解决的冲突内容，可以选择都保留，也可以选择留下一部分，`git add`+`git commit`上传本地仓库，以下是项目流程结构图

![image-20240515094404470](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240515094404470.webp)

##### 禁用Fast forward

默认的快速合并的结果：

![image-20240522143722591](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240522143722591.webp)

其中新建用户是dev的commit ，快速合并中HEAD直接指向dev，导致dev的提交信息被遗失了

以下是 禁用快速合并的结果

![image-20240522144153222](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240522144153222.webp)

如图所示，合并后的commit信息还在

```sh
git merge --no-ff feature-branch
```

##### squash

如果分支commit太多太乱，可以使用

```sh
git merge --squash feature-branch

```

这项指令会让所有的提交合并为一个提交进行合并，并且不保留合并信息





---



### 变基

```bash
git rebase 
```

交换commit的顺序，重写commit的顺序，让提交历史更加简洁易懂

具体待续...
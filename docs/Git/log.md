## 5.查看提交日志(可查看提交人、分支、文件、时间)

```bash
git log
```

指令有其他参数`git log [option]`，其中option的值有

- 分支名,可单独查看分支的 修改

- `--all`

显示所有分支

- `--all d`

提交信息为一行

- `--abbrev-commit`

让输出的commitId简短

- `--graph`

以图片形式显示

```bash
git log --graph --all --pretty=oneline --abbrev-commit
```



其余更多请参考[git log命令参数详解 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/629756328)

---



**所有日志，包括回退的日志**

```bash
git reflog
```
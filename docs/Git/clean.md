### 21. 清理未追踪的文件

未追踪的文件指：

- 未通过add 添加到暂存区的文件
- .gitignore 文件写入的目录文件

通过`git clean`可以清除未追踪的文件

`git clean -n`显示哪些文件将被删除，并不是删除，而是删除前查看将删除的文件同`git clean --dry-run`

`git clean -f`强制删除。`git clean --force`

`git clean -f -d`删除未追踪的目录，`git clean `一般只删除文件，不删除目录，需要删除目录则使用这个

`git clean -f -X`仅删除忽略掉的文件。即`.gitignore`指定的文件

`git clean -f -x`删除所有未追踪的文件和忽略的文件。这个选项会删除所有未追踪的文件，包括那些在 `.gitignore` 文件中指定的文件。
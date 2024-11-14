### 20. 忽略文件

在git仓库根目录中，命名一个`.gitignore`

在这个目录中的目录或者文件名都不会出现在git的提交中，隐私信息或者配置信息就不会发出去

也就是说git不再追踪.gitignore写入的文件

如果你忽略了，但是你确实想提交`git add -f App.class`

如果你发现你的目录写错了，但是找不到问题，`git check-ignore -v App.class`会提醒你哪里出了问题

如果想添加不被排除的文件

例如

```bash
*.class
但是我想要文件 App.class
!App.class
```

就可以实现不排除App.class了
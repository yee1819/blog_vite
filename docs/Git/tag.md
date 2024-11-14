### 14. 标签 tag

标签是git版本自定义文本的功能，让人更好的区分不同版本，而不是一串无规律的数字字母编号

可以理解为 给不同的 commit版本 起别名，或是一个 死指针  固定的指向那个  commit

`git tag `查看所有标签

`git tag <tagname>`创建一个标签，默认以当前分支的最新commit为基本

`git tag <tagname> <commitID>`给指定commitId进行打标签

`git show <tagname> `展示标签详细信息

`git tag -a v0.1 -m "version 0.1 released" 1094adb`给标签设置详细信息

`git push origin <tagname>`上传标签到远程仓库

`git push origin master --tags`上传全部标签到远程仓库

`git tag -d <tagname>`删除标签

` git push origin --delete <tagname>`远程仓库的标签删除

`git push origin :refs/tags/<tagname>`同上

> [Git - 打标签 (git-scm.com)](https://git-scm.com/book/zh/v2/Git-基础-打标签)

---
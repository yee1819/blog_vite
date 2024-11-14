### 17. 删除文件

`git rm <file>`

暂存区和工作区都删除文件，只需要commit，相当于手动删除+git add

```sh

$ git rm hello.txt
rm 'hello.txt'

Yee@Yee MINGW64 ~/Desktop/gitdome (main)
$ git status
On branch main
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        deleted:    hello.txt
        
$ git commit -m "删除hello"
[main f979439] 删除hello
 1 file changed, 1 deletion(-)
 delete mode 100644 hello.txt


```
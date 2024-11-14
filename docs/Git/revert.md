### 22 .撤销提交的revert

相比reset的重置，把新的commit删除，revert会新建一个提交把旧的版本逆转，并保留原先的commit，保留提交历史的完整性

`git revert <commitid>`

![image-20240522192833426](https://yee-1312555989.cos.ap-guangzhou.myqcloud.com//blogimage-20240522192833426.webp)

```sh
* c778266 qevert "revert_test_2"
* b39474d revert_test_3
* 2ce70d9 revert_test_2
* d029a3d revert_test_1

```

会发现原来的commit依旧存在，并且还添加了一个commit，显示逆转到了revert

允许多个撤销`git revert  <commit>   <commit>   <commit>....`,会一个一个撤销/逆转

```sh
$ git revert  e90405d   4e41599 c778266
[dev 13b68aa] Revert "cs5"
 1 file changed, 1 deletion(-)
[dev f53dff4] Revert "revert_test_4"
 1 file changed, 0 insertions(+), 0 deletions(-)
 delete mode 100644 asa.txt
[dev 504f1d3] Revert "qevert "revert_test_2""
 1 file changed, 4 deletions(-)

Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git log --graph --all --pretty=oneline --abbrev-commit
* 504f1d3 (HEAD -> dev) Revert "qevert "revert_test_2""
* f53dff4 Revert "revert_test_4"
* 13b68aa Revert "cs5"
* ff40ccb cs6
* e90405d cs5
* 4e41599 revert_test_4

```





```sh
 git revert 2ce70d9
Auto-merging revert.txt
CONFLICT (content): Merge conflict in revert.txt
error: could not revert 2ce70d9... revert_test_2
hint: After resolving the conflicts, mark them with
hint: "git add/rm <pathspec>", then run
hint: "git revert --continue".
hint: You can instead skip this commit with "git revert --skip".
hint: To abort and get back to the state before "git revert",
hint: run "git revert --abort".

```

出现冲突时

在提示的文件中修改冲突后，可以选择`git add/rm <pathspec>`，添加到暂存区，再`git revert --continue`继续还原

当有多个逆转提交时可以使用`git revert --skip`跳过这个改变提交，而执行其他的逆转，比如`git revert A  B  C  D`，C出现了冲突，我选择`git revert --skip`,这个时候ABD仍然逆转，C的修改不变。

`git revert --abort`逆转过程中，有冲突的时候使用这个语句将中止当前所有逆转，并返回到`git revert`前
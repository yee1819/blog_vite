### 23. 检索

`git grep [options] pattern [-- [pathspec...]]`

- pattern 

  字符串或者正则表达式

- [不同的模式]

- pathspec

  搜索的文件或者目录


常用选项

- **`-i`**：忽略大小写。

  ```sh
  git grep -i "pattern"
  ```
  
- **`-n`**：显示匹配行的行号。

  ```sh
  git grep -n "pattern"
  ```
  
- **`-v`**：反向匹配，显示不包含匹配模式的行。

  ```sh
  git grep -v "pattern"
  ```
  
- **`-c`**：只显示匹配的行数。

  ```sh
  git grep -c "pattern"
  ```
  
- **`-l`**：只显示包含匹配模式的文件名。

  ```sh
  git grep -l "pattern"
  ```
  
- **`--cached`**：在索引（暂存区）中搜索。

  ```sh
  git grep --cached "pattern"
  ```
  
- **`<commit>`**：在指定提交中搜索。

  ```sh
  git grep "pattern" HEAD
  git grep "pattern" commit_hash
  ```

- **`<branch>`**：在指定分支中搜索。

  ```sh
  git grep "pattern" branch_name
  ```
  
- **`--`**：分隔符，用于区分路径和模式。

  ```sh
  git grep "pattern" -- path/to/file_or_directory
  ```



例子：

```sh
$ git grep 测试
revert.txt:测试1
revert.txt:测试2
revert.txt:测试3

Yee@Yee MINGW64 ~/Desktop/gitdome (dev)
$ git grep -n 测试
revert.txt:1:测试1
revert.txt:3:测试2
revert.txt:5:测试3

```
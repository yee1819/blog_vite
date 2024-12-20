### 18.版本差异

`git diff` 是一个用于显示未提交更改的 Git 命令。它可以显示工作区和暂存区之间的差异、暂存区和最近一次提交之间的差异，以及其他特定的比较。以下是 `git diff` 的详细用法和一些常见示例：

 基本用法

```sh
git diff
```
显示工作区中未暂存的更改。

 常见示例

1. 查看工作区和暂存区之间的差异

```sh
git diff
```
这个命令会显示工作区中未暂存的更改。

2. 查看暂存区和最近一次提交之间的差异

```sh
git diff --cached
```
这个命令（或者 `git diff --staged`）会显示已暂存但还未提交的更改。

3. 查看工作区和最近一次提交之间的差异

```sh
git diff HEAD
```
这个命令会显示工作区中所有未提交的更改，无论它们是否已经暂存。

4. 查看两个分支之间的差异

```sh
git diff branch1 branch2
```
这个命令会显示 `branch1` 和 `branch2` 之间的差异。

5. 查看两个提交之间的差异

```sh
git diff commit1 commit2
```
这个命令会显示 `commit1` 和 `commit2` 之间的差异。

6. 查看特定文件的差异

```sh
git diff HEAD <file>
```
这个命令会显示当前工作区中的特定文件和最近一次提交之间的差异。

7. 查看特定目录的差异

```sh
git diff HEAD <directory>/
```
这个命令会显示当前工作区中的特定目录和最近一次提交之间的差异。

其他有用的选项

- **显示简洁的差异**：

  ```sh
  git diff --stat
  ```
  这个命令会以简洁的统计方式显示更改。

- **忽略空白字符的差异**：

  ```sh
  git diff --ignore-all-space
  ```
  这个命令会忽略空白字符的更改。

- **显示统一格式的差异（默认格式）**：

  ```sh
  git diff --unified
  ```
  这个命令会以统一格式显示更改，默认情况下 `git diff` 就是使用这种格式。

- **仅显示名称的差异**：

  ```sh
  git diff --name-only
  ```
  这个命令会仅显示文件名称，而不显示具体的更改内容。

例子

假设你有一个项目目录，修改了 `file1.txt` 和 `file2.txt` 文件，现在想查看这些修改：

1. 查看未暂存的更改：

    ```sh
    git diff
    ```

2. 暂存更改：

    ```sh
    git add file1.txt
    ```

3. 查看已暂存的更改：

    ```sh
    git diff --cached
    ```

4. 提交更改：

    ```sh
    git commit -m "修改了 file1.txt 和 file2.txt"
    ```

 总结

`git diff` 是一个非常强大的工具，用于比较文件的不同版本。它可以帮助你在提交更改之前了解具体的修改内容，并且可以在多个不同的上下文中使用，从而提供灵活的比较方式。
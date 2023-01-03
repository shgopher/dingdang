# git 的基本操作
## 建立一个git仓库
### 将一个尚未配置git的本地目录转化为git仓库：
```bash
git init
```
这个时候，会建立一个.git 的目录，注意这个时候目录下的文件并没有被追踪，你需要完成，add commit 这两个命令之后才能跟踪文件：
```bash
git add *.go
git add LICENSE
git commit -m "feat(go): add all go files"
```
### 克隆现有的仓库
通常来说，你会使用 `git clone`命令来克隆远程的服务，git clone的时候，会将远程的全部数据下载过来放入本地的.git中，然后从中读取最新版，生成最新的文件等待后续的开发工作。

注意默认情况下是克隆所有版本的文件，如果你只想克隆某个版本的文件，可以设置克隆的层级以及克隆的分支。
```bash
git clone https://github.com/shgopher/dingdang

# 只克隆最新的代码
git clone --depth=1 https://github.com/shgopher/dingdang

# 只克隆某个分支的代码
git clone -b=main https://github.com/shgopher/dingdang

# 只克隆main分支的最新代码
git clone --depth=1 -b=main https://github.com/shgopher/dingdang

# 重命名路径名称 
git clone https://github.com/shgopher/dingdang dd 
```
更多用法可以使用 `git clone --help`去查看一下详解。

## 记录每次更新到仓库

git工作目录下的文件拥有两种状态，已跟踪和未跟踪，已跟踪意味着，git对它进行了跟踪记录，在上一次的快照中有它的记录，它本身的状态可能是未修改，已修改，或者已经放入暂存区域。未跟踪的文件，不存在于上次的快照记录中，也没有放入暂存区域，如果你是克隆的某个项目，那么路径下的所有文件都处于已跟踪的状态，它们处于的状态是未修改的状态，因为git刚刚才检测出它们。

下面有一张图：

![](https://git-scm.com/book/en/v2/images/lifecycle.png)

我们来解释一下：

最左边的 untracked 表示未被跟踪的，unmodified 表示没有修改的，modified 表示已经修改的，staged 表示放入暂存区域

- 我们将没有跟踪的文件，跟踪它，然后将它放入到了暂存区域，暂存区域就会在下次提交的时候提交它们，并将它们的状态改为未被修改的。
- 未被修改的文件，当我们编辑了它们以后，就会将状态改为已被修改的，然后已被修改的文件又会被放入到暂存区域改为状态是已经暂存的，然后提交以后，状态被修改为未被修改的
- 其中放入暂存区域，将状态修改为已经暂存的，命令是 `git add` ，将已经暂存的提交，状态改为未被修改的，这个命令是 `git commit` ，git会自动记录文件是否修改，也就是说从 unmodified 的编辑过程，状态改为modified这个过程，是git自动记录的。
- 将未被修改的文件 remove 删除的时候，就会将这个文件的状态从未被修改的变为未被追踪的，也就是说，这个文件在删除之后，git系统就不再跟踪这个文件了。


### 跟踪新的文件
使用 `git status` 去查看文件的状态。

显示是否含有未跟踪的文件，是否有出于暂存区域的文件,例如：
```bash
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
	modified:   go.mod
	modified:   go.sum
	modified:   internal/pkg/code/code.go
	modified:   internal/pkg/logger/sql.go
	modified:   pkg/shutdown/shutdown.go
	modified:   tools/codegen/codegen.go
```
- 第一行指出，这是一个master的分支
- 第二行显示 ，这个分支同远程服务器上对应的分支没有偏离
- 下面的内容表示，有修改的文件没有被放入暂存区域。需要使用 `git add` 命令

我们在项目中新建一个文件，`main.go` 由于之前并不存在这个文件，之前的快照里没有它，所以它的状态就是 untracked 
```bash
Untracked files:
  (use "git add <file>..." to include in what will be committed)

    test.md
```

说明 test.md 并没有被git跟踪，git并不会自动的去跟踪文件，需要手动的说明一下git才会跟踪这个文件，我们使用 `git add test.md` 这个命令就可以完成跟踪

```bash
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   test.md
```

我们可以看到，使用了 `git add` 之后，出现了 `new file` 的说明，我们看上面的图就知道，这个文件已经被放入了暂存区域了，我们只需要再 `git commit` 一下 就可以完成跟踪这个流程了。

通过这个演示我们发现，跟踪文件，和修改文件都需要放入暂存区域，而放入暂存区域的这个命令都是 `git add` 不管是跟踪未被暂存的文件还是要修改的文件都是 `git add` 这一个命令。而从暂存区域然后提交数据到git中命令就是 `git commit` 这一个命令的，`git commit` 的命令是一个含义，但是git add 这一个命令是干了两件事儿的，通过刚才的解释，以及上面的图就可以理解了。不仅如此 `git add` 还能在合并冲突的时候，在修改过的文件后使用，意思是冲突文件的状态改为已经解决冲突，并提交到暂存区域，所以总结一下，git add 的意思可以理解为，**将文件添加到暂存区域，也就是添加到下一次的提交中。** 

`git add` 后面跟文件或者是路径，如果是路径那么将递归的将路径下的所有文件递归的找到并且添加到暂存区域。
```bash
git add .
```
意思就是将这个路径下的，以及包含所有的子路径的所有文件，都添加到暂存区域。

文件是可以同时出现在 暂存区和已修改区域这两个状态中的，其实很好理解，比如一个文件，你add之后存在于暂存区域了，这个时候你又进行了一次修改，那么当你还没有add的时候，它就会同时出现在暂存区域和已修改中，这个时候是可以commit的，只不过commit的是第一次修改以后的数据，如果想把第二次的修改也commit，就需要再次add。

```bash
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file:   README
    modified:   CONTRIBUTING.md

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   CONTRIBUTING.md
```
我们两次add之后
```bash
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    new file:   README
    modified:   CONTRIBUTING.md
```

### 介绍 git status
git status 可以输出全部的提示内容，我们使用 `git status --short` 或者是 `git status -s` 就可以输出简单的提示内容：
```bash
M lib/git.rb
MM README.md
 M go.mod
 M go.sum
 M internal/pkg/code/code.go
 M internal/pkg/logger/sql.go
 M pkg/shutdown/shutdown.go
A  test.md
 M tools/codegen/codegen.go
?? LICENSE.txt
``` 
- ?? :表示未被跟踪的文件
- A : 表示从未被跟踪状态新添加到暂存区的文件
- 带有空格的M : 表示修改后的文件还没放入暂存区
- 顶头写的M: 表示已修改的文件并且放入了暂存区域
- 顶头写的MM:表示已修改的文件并且放入了暂存区域，但是又修改了还没有add 的时候的标记

### 介绍 .gitignore

### 查看已暂存和未暂存的修改

### 提交更新

### 跳过暂存区域直接提交

### 移除文件

### 移动文件

### 








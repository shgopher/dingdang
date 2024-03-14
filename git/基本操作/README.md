# git 的基本操作
## 建立一个 git 仓库
### 将一个尚未配置 git 的本地目录转化为 git 仓库：
```bash
git init
```
这个时候，会建立一个。git 的目录，注意这个时候目录下的文件并没有被追踪，你需要完成，add commit 这两个命令之后才能跟踪文件：
```bash
git add *.go
git add LICENSE
git commit -m "feat(go): add all go files"
```
### 克隆现有的仓库
通常来说，你会使用 `git clone` 命令来克隆远程的服务，git clone 的时候，会将远程的全部数据下载过来放入本地的。git 中，然后从中读取最新版，生成最新的文件等待后续的开发工作。

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
更多用法可以使用 `git clone --help` 去查看一下详解。

## 记录每次更新到仓库

git 工作目录下的文件拥有两种状态，已跟踪和未跟踪，已跟踪意味着，git 对它进行了跟踪记录，在上一次的快照中有它的记录，它本身的状态可能是未修改，已修改，或者已经放入暂存区域。未跟踪的文件，不存在于上次的快照记录中，也没有放入暂存区域，如果你是克隆的某个项目，那么路径下的所有文件都处于已跟踪的状态，它们处于的状态是未修改的状态，因为 git 刚刚才检测出它们。

下面有一张图：

![](https://git-scm.com/book/en/v2/images/lifecycle.png)

我们来解释一下：

最左边的 untracked 表示未被跟踪的，unmodified 表示没有修改的，modified 表示已经修改的，staged 表示放入暂存区域

- 我们将没有跟踪的文件，跟踪它，然后将它放入到了暂存区域，暂存区域就会在下次提交的时候提交它们，并将它们的状态改为未被修改的。
- 未被修改的文件，当我们编辑了它们以后，就会将状态改为已被修改的，然后已被修改的文件又会被放入到暂存区域改为状态是已经暂存的，然后提交以后，状态被修改为未被修改的
- 其中放入暂存区域，将状态修改为已经暂存的，命令是 `git add`，将已经暂存的提交，状态改为未被修改的，这个命令是 `git commit`，git 会自动记录文件是否修改，也就是说从 unmodified 的编辑过程，状态改为 modified 这个过程，是 git 自动记录的。
- 将未被修改的文件 remove 删除的时候，就会将这个文件的状态从未被修改的变为未被追踪的，也就是说，这个文件在删除之后，git 系统就不再跟踪这个文件了。


### 跟踪新的文件
使用 `git status` 去查看文件的状态。

显示是否含有未跟踪的文件，是否有出于暂存区域的文件，例如：
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
- 第一行指出，这是一个 master 的分支
- 第二行显示，这个分支同远程服务器上对应的分支没有偏离
- 下面的内容表示，有修改的文件没有被放入暂存区域。需要使用 `git add` 命令

我们在项目中新建一个文件，`main.go` 由于之前并不存在这个文件，之前的快照里没有它，所以它的状态就是 untracked
```bash
Untracked files:
  (use "git add <file>..." to include in what will be committed)

    test.md
```

说明 test.md 并没有被 git 跟踪，git 并不会自动的去跟踪文件，需要手动的说明一下 git 才会跟踪这个文件，我们使用 `git add test.md` 这个命令就可以完成跟踪

```bash
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
	new file:   test.md
```

我们可以看到，使用了 `git add` 之后，出现了 `new file` 的说明，我们看上面的图就知道，这个文件已经被放入了暂存区域了，我们只需要再 `git commit` 一下就可以完成跟踪这个流程了。

通过这个演示我们发现，跟踪文件，和修改文件都需要放入暂存区域，而放入暂存区域的这个命令都是 `git add` 不管是跟踪未被暂存的文件还是要修改的文件都是 `git add` 这一个命令。而从暂存区域然后提交数据到 git 中命令就是 `git commit` 这一个命令的，`git commit` 的命令是一个含义，但是 git add 这一个命令是干了两件事儿的，通过刚才的解释，以及上面的图就可以理解了。不仅如此 `git add` 还能在合并冲突的时候，在修改过的文件后使用，意思是冲突文件的状态改为已经解决冲突，并提交到暂存区域，所以总结一下，git add 的意思可以理解为，**将文件添加到暂存区域，也就是添加到下一次的提交中。** 

`git add` 后面跟文件或者是路径，如果是路径那么将递归的将路径下的所有文件递归的找到并且添加到暂存区域。
```bash
git add .
```
意思就是将这个路径下的，以及包含所有的子路径的所有文件，都添加到暂存区域。

文件是可以同时出现在暂存区和已修改区域这两个状态中的，其实很好理解，比如一个文件，你 add 之后存在于暂存区域了，这个时候你又进行了一次修改，那么当你还没有 add 的时候，它就会同时出现在暂存区域和已修改中，这个时候是可以 commit 的，只不过 commit 的是第一次修改以后的数据，如果想把第二次的修改也 commit，就需要再次 add。

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
我们两次 add 之后
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
- ?? ：表示未被跟踪的文件
- A：表示从未被跟踪状态新添加到暂存区的文件
- 带有空格的 M：表示修改后的文件还没放入暂存区
- 顶头写的 M：表示已修改的文件并且放入了暂存区域
- 顶头写的 MM：表示已修改的文件并且放入了暂存区域，但是又修改了还没有 add 的时候的标记

### 介绍。gitignore
当我们想某些文件不让 git 跟踪的时候，并且也不想让它们出现在未跟踪这个目录下，而且有的时候我们会使用 `git add .` 这种全局 add，所以使用。gitignore 这种可以忽略跟踪的命令就很有必要了。

在项目的根目录下新建一个。gitignore 文件，比如：
```bash
.idea
*.txt
node_modules/
```
以下是规则：
- 使用 `#` 作为 `.gitignore` 的注释
- 可以使用 glob 模式的正则表达式 (shell 使用的简化过的正则)
  - `*` 匹配 0 个或者多个任意的字符
  - `[abc]` 匹配任何**一个**列在括号里的字符
  - `?` 只匹配一个任意字符
  - `[0-9]` 方括号中的短线表示范围
  - `**` 两个星号表示匹配任意中间目录，`a/**/z` 匹配 `a/z` `a/n/d/z`
- 以 `/` 开头防止递归，比如 `/file` 表示只忽略当前目录下的 file 文件，而不会向下递归，忽略 `/a/file`
- 以 `/` 结尾，表示目录，而不是目录+文件
- `!` 表示取反，比如 `!name/` 表示除了 name 之外的目录都要忽略

下面给出一个具体的例子

```bash
# 表示忽略url除了目录之外的所有文件
url
!url/

# 忽略所有的 .a 文件
*.a

# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
/TODO

# 例如 abc.a u.c bdde.b
*.[abc]

# 忽略的是nodemodules以及下面的多级内容，简而言之，如果只是某个文件叫做nodemodules就不会忽略，必须满足nodemodules加上多级的子目录才会被匹配上
nodemodules/**

# 忽略 url1 所有
url1
# 仅仅忽略 url 文件
url1
!url1/
# 忽略 url1  这个目录（当然包含了这个目录的所有内容也被忽略了）
url1/


# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
doc/*.txt

# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
doc/**/*.pdf
```
GitHub 上有一个推荐使用的[。gitignore](https://github.com/github/gitignore) 可以看一下

比如 go 的：
```bash
# If you prefer the allow list template instead of the deny list, see community template:
# https://github.com/github/gitignore/blob/main/community/Golang/Go.AllowList.gitignore
#
# Binaries for programs and plugins
*.exe
*.exe~
*.dll
*.so
*.dylib

# Test binary, built with `go test -c`
*.test

# Output of the go coverage tool, specifically when used with LiteIDE
*.out

# Dependency directories (remove the comment below to include it)
# vendor/

# Go workspace file
go.work
```

。gitignore 在一个项目中也是可以有很多个的，根目录有一个，在各个子目录下也可以有，子目录下的优先级更高。

### 查看已暂存和未暂存的修改
我们使用 git status 可以查看目前的状态，但是内容过于简洁，比如只能看某个文件是什么状态，位于未追踪的状态，已经修改但是并未提交的暂存区的状态，将要提交的状态等，只能看到文件的状态，如果要看到更加详细的状态，我们可以使用 git diff

git diff 这个命令比较的是工作目录当前文件和暂存区域快照之间的差异，也就是说，修改了的和暂存区的差别，**从命令上来说就是 git add 之前和之后的差异。**

如果要看的差异是已暂存和已提交的差异，那么可以使用 `git diff --staged` 这个命令比较的就是 `git commit ` 前后的差异

这里推荐一些工作来查看 git diff，毕竟工具更加直观，比如使用 vs code 这个编辑器，就可以直接显示 git diff，非常的直观。

### 提交更新
将暂存区域的数据提交到。git 中，使用 `git commit`，如果使用 `git commit -m ""` 那么就会直接提交 `-m` 后面的内容到提交记录中，如果没有 `-m` 那么系统就会调用默认的编辑器来填写内容，我们可以使用 `git config --global core.editor` 来设置这个编辑器，通常默认的是 vim

一般的提交过程会在注释里写入最后一次的 git status
```bash
# Please enter the commit message for your changes. Lines starting
# with '#' will be ignored, and an empty message aborts the commit.
#
# On branch main
# Your branch is up to date with 'origin/main'.
#
# Changes to be committed:
#       modified:   README.md
#
# Changes not staged for commit:
#       modified:   ../../README.md
#       modified:   README.md
#       modified:   "../\345\237\272\346\234\254\346\246\202\345\277\265/README.md"
#       modified:   "../\345\237\272\346\234\254\351\205\215\347\275\256/README.md"
#       deleted:    "../\347\252\201\345\217\221\347\212\266\345\206\265\345\244\204\347\220\206/README.md"
#       deleted:    "../\351\224\231\350\257\257\345\244\204\347\220\206/README.md"
#
# Untracked files:
#       "../\345\256\236\351\231\205\345\272\224\347\224\250/"
#       "../\345\272\225\345\261\202\345\216\237\347\220\206/"

feat(git):add some messages
```
注释最好保留下来，最后输入信息即可

如果想保留的不是 git status 而是 git diff 可以这么做：`git commit -v`
```bash
+url
+!url/
+
+# 忽略所有的 .a 文件
+*.a
+
+# 只忽略当前目录下的 TODO 文件，而不忽略 subdir/TODO
+/TODO
+
+# 例如 abc.a u.c bdde.b
+*.[abc]
+
+# 忽略的是nodemodules以及下面的多级内容，简而言之，如果只是某个文件叫做nodemodules就不会忽略，必须满足nodemodules加上多级的子目录才会被匹配上
+nodemodules/**
+
+# 忽略 url1 所有
+url1
+# 仅仅忽略 url 文件
+url1
+!url1/
+# 忽略 url1  这个目录（当然包含了这个目录的所有内容也被忽略了）
+url1/
+
+
+# 忽略 doc/notes.txt，但不忽略 doc/server/arch.txt
+doc/*.txt
+
+# 忽略 doc/ 目录及其所有子目录下的 .pdf 文件
+doc/**/*.pdf
+```
+GitHub上有一个推荐使用的 [.gitignore](https://github.com/github/gitignore) 可以看一下
+
+比如go的：
+```bash
+# If you prefer the allow list template instead of the deny list, see community template:
+# https://github.com/github/gitignore/blob/main/community/Golang/Go.AllowList.gitignore
+#
+# Binaries for programs and plugins
+*.exe
+*.exe~
+*.dll
+*.so
+*.dylib
+
+# Test binary, built with `go test -c`
+*.test
+
+# Output of the go coverage tool, specifically when used with LiteIDE
+*.out
+
+# Dependency directories (remove the comment below to include it)
+# vendor/
+
+# Go workspace file
+go.work
+```
+
+.gitignore 在一个项目中也是可以有很多个的，根目录有一个，在各个子目录下也可以有，子目录下的优先级更高。

 ### 查看已暂存和未暂存的修改
+我们使用git status 可以查看目前的状态，但是内容过于简洁，比如只能看某个文件是什么状态，位于未追踪的状态，已经修改但是并未提交的暂存区的状态，将要提交的状态等，只能看到文件的状态，如果要看到更加详细的状态
，我们可以使用 git diff

+git diff 这个命令比较的是工作目录当前文件和暂存区域快照之间的差异，也就是说，修改了的和暂存区的差别，从命令上来说就是git add 之前和之后的差异。
 ### 提交更新

 ### 跳过暂存区域直接提交


```
可以看到非常的详细，当然日常的话使用 `git commit -m ""` 确实挺快的，如果你觉得麻烦的话，可以使用 git cz 它是一个给 git commit 提供的工具，它提供了一个模版，可以在命令行输入信息，按照它的提示就会输出类似 `feat(go): add a new features` 这种类型的 commit 内容，它不仅包括了 commit 头，还有 commit 内容和 commit 尾，所以这个工具是非常不错的。

当你提交以后会有这样的信息：

```bash
[release 463dc4f] Story 182: Fix(root): benchmarks for speed
 2 files changed, 2 insertions(+)
 create mode 100644 README
```
它提示了位于 release 分支，本次提交的完整 sha-1 校验和是 463dc4f，本次提交的时候，多少文件是修改过的，多少行添加，多少行是删改过的。

提交的记录有三个事项要说明一下：
- 提交的是放在暂存区域的快照，
- 没有暂存的保持已修改的状态，
- 处于未修改的文件，git 会直接指向之前的快照不会对他们进行新的快照。

没错提交都会对项目进行一次快照，以后可以回到这个状态。
### 跳过暂存区域直接提交
就是省略了 git add 过程，git 会自动的将所有跟踪的修改过的数据暂存并且提交。

```bash
git commit -a -m "add all new benchmarks"
```

### 移除文件
根据上面的那个图，我们得知，从 git 移除某个文件，就是从暂存区域移除，然后提交 commit，我们通过 git rm 完成这项工作，我们在工作目录中删除文件，这样这个文件就不会出现在未跟踪的清单中了。

如果只是手动的删除某个文件，git status 会显示 changes not staged for commit 意思就是你没有从暂存区域添加记录到 commit

```bash
git rm README.md 

rm README.md

git commit -m "deleted README.md"
```
当然也可以另外一种方法：
```bash
rm README.md
git add README.md
git commit -m "deleted README.md"
```

如果要删除位于暂存区的文件则需要加上 `-f` 选项。

如果只是想摆脱 git 的追踪，但是文件还是保留在磁盘中的时候，可以使用：
```bash
git rm --cached README.md
```
使用 blob 模式来删除大量文件：

```bash
git rm log/\*.log
```
这里有一个反斜杠，为了是不使用 shell 的匹配模式，直接使用 git 的匹配正则。

### 移动文件
git 不会显式的跟踪文件的移动操作，git 使用 git mv 命令来移动文件，但是它的实质是
```bash
mv README.md R.md
git rm README.md
git add R.md
```
的缩写

git status 在这两种方法的时候都会记录为 “rename”
```bash
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

    renamed:    README.md -> R.md
```
## 查看提交历史
提交了很多 commit 以后，回顾一下这个项目的提交历史，我们可以使用 git log。

```bash
git clone https://github.com/shgopher/dingdang

cd dingdang

git log

Author: sh <sh@gmail.com>
Date:   Wed Jan 4 01:52:41 2023 +0800

    feat(git):descrip the  basic operate of git

commit a8d8a2b399f041bda569f7f8ca22e2491dd324dc
Author: sh <sh@gmail.com>
Date:   Fri Dec 30 01:34:28 2022 +0800

    fix(.vuepress): fix a bug

commit b7a73eb8bd1cca31ef7225e6e4d2cbeb594b3710
```
git log 默认情况下，按照时间顺序列出所有的提交，最新的在最上面，里面的内容有用户，时间，校验和以及提交的说明信息。

使用 `git log -p -2` -p 会显示每次提交所引入的差异 (git diff)，-2 表示只显示两条信息。

使用 `git log --stat` 会显示每次提交的简略性的总结

```bash
commit a32a8f37b5823d8b2b399f28e1746f3a20c0e692 (HEAD -> main, origin/main, origin/HEAD)
Author: shgopher <shgopher@gmail.com>
Date:   Wed Jan 4 01:52:41 2023 +0800

    feat(git):descrip the  basic operate of git

 "git/\345\237\272\346\234\254\346\223\215\344\275\234/README.md" | 164 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-
 1 file changed, 163 insertions(+), 1 deletion(-)
```

`git log --pretty` 也是一个很有用的选项，它有很多的参数：
- oneline 一行输出
- short
- full
- fuller
- [format](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E6%9F%A5%E7%9C%8B%E6%8F%90%E4%BA%A4%E5%8E%86%E5%8F%B2#pretty_format) 定制输出格式：例如 `git log --pretty=format:"%h - %an, %ar : %s"`

这个命令的意思就是使用不同的格式输出 log，比如 oneline：

```bash
git log --pretty=oneline -1

 # 在终端上显示的其实就是一行
a32a8f37b5823d8b2b399f28e1746f3a20c0e692 (HEAD -> main, origin/main, origin/HEAD) feat(git):descrip the  basic operate of git

```

`git log --graph` 使用图表的方式显示 log：

```bash
$ git log --pretty=format:"%h %s" --graph
* 2d3acf9 ignore errors from SIGCHLD on trap
*  5e3ee11 Merge branch 'master' of git://github.com/dustin/grit
|\
| * 420eac9 Added a method for getting the current branch.
* | 30e367c timeout code and tests
* | 5a09431 add timeout protection to grit
* | e1193f8 support for heads with slashes in them
|/
* d6016bc require time for xmlschema
*  11d191e Merge branch 'defunkt' into local
```

git log 常用选项：

- -p 按补丁格式显示每个提交引入的差异。

- --stat 显示每次提交的文件修改统计信息。

- --shortstat 只显示 --stat 中最后的行数修改添加移除统计。

- --name-only 仅在提交信息后显示已修改的文件清单。

- --name-status 显示新增、修改、删除的文件清单。

- --abbrev-commit 仅显示 SHA-1 校验和所有 40 个字符中的前几个字符。

- --relative-date 使用较短的相对时间而不是完整格式显示日期 (比如 “2 weeks ago”)。

- --graph 在日志旁以 ASCII 图形显示分支与合并历史。

- --pretty 使用其他格式显示历史提交信息。可用的选项包括 oneline、short、full、fuller 和 format (用来定义自己的格式)。

- --oneline --pretty=oneline --abbrev-commit 合用的简写。

### 限制输出长度
上文我们已经看过了 `-2` 这种 `-n` 的限制次数的方式，接下来介绍几种常见的限制输出的方法

`--since` `--until` 其实就是限制的时间，比如：

```bash
git log --since=12.weeks
```
意思就是最近两周的提交，有关这两个命令更多的使用方法可以使用 man git-log 的方式查看

`git log --author` 可以限制某个作者的提交
```bash

git log --author=lei_lei

commit b5ff3cc5d80fad71b842edbce2c6670b1ff88111
Author: lei_lei <96427312+leilei3167@users.noreply.github.com>
Date:   Mon Oct 31 09:44:15 2022 +0800

    fix: fix spelling error (#58)
    
    Replace http methods with standard library constants
```

`git log -s ` 这是一个过滤器，接受一个字符串最为参数，只过滤含有这个字符串的内容

下面列出常见的限制选项：

- -<n> 仅显示最近的 n 条提交。

- --since， --after 仅显示指定时间之后的提交，如果后面接的是一个具体的时间段，比如 --since=12.weeks 那么意思就是 12 周之内的提交。

- --until， --before 仅显示指定时间之前的提交。

- --author 仅显示作者匹配指定字符串的提交。

- --committer 仅显示提交者匹配指定字符串的提交。

- --grep 仅显示提交说明中包含指定字符串的提交。

- -S 仅显示添加或删除内容匹配指定字符串的提交。

- --no-merges 表示不显示合并提交的历史记录

## 撤销操作
### 撤销操作
第一个场景是这样的，当你 add 以后，commit 了，但是发现少 add 了，如果少 add 了，或者是说 commit 写的内容不太满意，我们可以使用 `git commit --amend` 来追加提交，如果你并未修改内容那么修改的的只是提交的 commit 信息，这次提交的信息会覆盖上次的提交信息。

这个操作使用一个新的 commit 取代了老的 commit，目的是不用扰乱 commit 整个的提交历史。

```bash
git commit -m "add"
git add README.md
git commit --amend -m "feat(go):add all changes"
```
### 取消暂存的文件
我们使用 `git reset HEAD files` 来取消暂存：
```bash
git reset HEAD README.md
```
就会将位于暂存区的 README.md 文件取消掉

### 撤销对文件的修改
文件被修改了，当前的状态是已修改但是未放入暂存区域，如何还原成上次提交以后的样子，我们经常会看到这样的提示：
```bash
Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

    modified:   README.md
```
根据提示，我们要用的命令是：
```bash
git checkout -- README.md

```
然后我们发现修改已经撤销了，git 会用一个最近的提交去覆盖目前的修改。

小知识：git 中被提交的东西都是可以恢复的，但是没有提交的数据丢失以后就真的没有了。
## 远程仓库的使用
### 查看远程仓库的名称
```bash
# 我们克隆一下我们自己在GitHub上的远程服务器 
git clone https://github.com/shgopher/dingdang

Cloning into 'dingdang'...
remote: Reusing existing pack: 1857, done.
remote: Total 1857 (delta 0), reused 0 (delta 0)
Receiving objects: 100% (1857/1857), 374.35 KiB | 268.00 KiB/s, done.
Resolving deltas: 100% (772/772), done.
Checking connectivity... done.

# 在本地的这个项目的目录下就可以查看远程的服务器名称

cd dingdang

git remote

origin
```
我们发现远程服务器的名称叫做 “origin” 这个名称也是默认的远程服务器的名称

我们使用选项 `-v` 我们发现出现了下面的内容：
```bash
origin	https://github.com/shgopher/iam (fetch)
origin	https://github.com/shgopher/iam (push)
```
你会发现 origin 就只是一个别名而已，它代表了两个 URL，一个是拉取的 URL 一个是 push 的 URL，通常这俩 URL 是一致的，不过你也可以设置成不同的样子。

### 添加远程仓库
使用的是 `git remote add 简写 url` 这样的模式，比如说：
```bash
git remote add sh https://github.com/shgopher/iam

git remote -v

origin	https://github.com/shgopher/iam (fetch)
origin	https://github.com/shgopher/iam (push)

sh	https://github.com/shgopher/iam (fetch)
sh	https://github.com/shgopher/iam (push)
```

我们使用 `git fetch sh` 的方式就可以拉取数据：

```bash
# 前提是在这个路径下
git fetch sh

remote: Counting objects: 43, done.
remote: Compressing objects: 100% (36/36), done.
remote: Total 43 (delta 10), reused 31 (delta 5)
Unpacking objects: 100% (43/43), done.
From https://github.com/shgopher/iam
 * [new branch]      master     -> sh/master
 * [new branch]      dev        -> sh/dev
```
### 从远程服务器中抓取和拉取
- git fetch：从远程服务器抓取内容，但是不会自动合并。

- git pull：从远程服务器抓取内容，并且自动合并到本地

当我们克隆的时候，实际上 git 还做了这样一个工作：

```bash
git remote origin URL
```
系统会自动的添加远程仓库的标识，并且简写是 origin
### 推送到远程仓库
我们使用 `git push remote branch` 这样的命令去推送：
```bash
git push origin main
# 通常来说远程服务器origin可以自动省略，分支也是可以省略的
git push
```
### 查看远程仓库的详细信息
```bash
git remote show origin

git remote show sh

 remote sh
  Fetch URL: https://github.com/shgopher/iam
  Push  URL: https://github.com/shgopher/iam
  HEAD branch: master
  Remote branches:
    markdown-strip                   tracked
    book             new (next fetch will store in remotes/sh)
    feature/refactor new (next fetch will store in remotes/sh)
    master           new (next fetch will store in remotes/sh)
    refs/remotes/origin/issue-11     stale (use 'git remote prune' to remove)
   Local branches configured for 'git pull':
    master     merges with remote master
  Local ref configured for 'git push':
    master pushes to master (up to date)

```
这里面提示的信息有，
- 远程服务器的简写名称 sh
- fetch 和 push url
- HEAD 分支：master
- 远程分支
  - tracked 表示这个分支下载到本地被追踪中
  - stale 表示远程仓库这个分支已经弃用了。
- 下面还表示那个分支可以直接使用 git pull 可以自动合并这里是 master
- 以及表示自动 push 的这里也是 master

### 远程仓库的重命名和删除
使用 `git remote rename origin tt` 去修改远程仓库的简写 origin 为 tt

使用 `git remote remove tt` 去删除远程仓库的一个名字，比如本来有俩名称 tt 和 origin，当你删除 tt 的时候，就只剩下了 origin 了。
## 打标签
版本是一个很重要的标志，它代表了你的项目中的重要节点，形如：`v1.2.1`

使用 `git tag` 可以输出所有的版本：
```bash
git tag

v1.0.0
v1.0.1
v1.0.10
v1.0.2
v1.0.3

```
如果想按照特定的模式去查找标签，可以使用 `git tag -l "v1.0*"` 的方式去寻找
```bash
git tag -l "v1.0*"


v1.0.0
v1.0.1
v1.0.10
v1.0.2
v1.0.3
v1.0.4
v1.0.5
v1.0.6
v1.0.8
```
属于 v1.0 家族的所有版本都会出现

### 创建标签
有两种标签形式
- 轻量标签
- 附注标签

其中轻量标签是作为临时的标签来使用的，我们通常说的标签都是值得是附注标签

创建附注标签：
```bash
# 创建标签
git tag -a v1.4.0 -m "version 1.4.0"
# 显示标签
git tag

v1.4.0
# 显示标签详细内容
git show v1.4.0

tag v1.4.0
Tagger: shgopher <shgopher@ee.com>
Date:   Sat May 3 20:19:12 2014 -0700

version 1.4.0

commit ca82a6dff817ec66f44342007202690a93763949
Author: shgopher <sg@mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    changed the version number
```

输出了打标签的人，时间，附注的信息，提交的 commit 信息

创建临时的轻量标签：
```bash
git tag v1.4-lw

git tag 

v1.4
v1.4-lw

git show v1.4-lw

commit ca82a6dff817ec66f44342007202690a93763949
Author: shgpher <s@mail.com>
Date:   Mon Mar 17 21:52:11 2008 -0700

    changed the version number
```
临时标签不会显示标签信息，只有 commit 的信息

补打标签：

可以对过去的 commit 打标签：

```bash
# git tag -a v1.3.0 某次commit的校验和或者是部分校验和
git tag -a v1.3.0 9fc3df09
```
### 上传标签到远程仓库

```bash
# git push 远程服务器简写名称 tagname
git  push origin v1.5.0

# 推送多个tag，使用 git push 远程服务器简写名称 --tags

git push origin --tags
```
### 删除标签
删除本地的标签：
```bash
git tag -d v1.4-lw

```
从远程服务器删除标签
```bash
# git push 远程仓库名称 --delete 版本名称
git push origin --delete v1.4-lw
```

如果要修改旧版本中的某个错误，那么最好的方法是创建一个新的分支

```bash
# git checkout -b <new-branch> [<start-point>]
# 切换分支到 bugv2 ，起点是 v2.0.0
git checkout -b bugv2 v2.0.0
```
然后在这个分支提交新的版本即可，比如 v2.0.1 这个时候这个 tag 也不会跟例如 v2.1.0 这种之前的 tag 进行冲突。
## git 别名
我们要在 gitconfig 中设置 alias 选项，通过命令行是这么设置的
```bash
git config --global alias.a add
git config --global alias.p push
```
如果想让 git 执行外部的命令可以在外部命令前面加上 `!`
```bash
git config --global alias.gk '!gitk'
```
这里 gitk 就是一个外部的 git 协作工作，显然它属于外部命令，那么就需要加上一个 `!` 就可以了。

通常来说设置 git 的 config 的时候不要直接更改 git 的 gitconfig 源文件，使用命令行写入更为稳妥。









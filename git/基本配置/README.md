# git 使用前的基本配置
## 安装 git
对于 Linux 操作系统，一般都会内置 git，如果你想了解更多关于 Linux 系统下的安装内容，可以参考[这里](https://git-scm.com/download/linux)

对于 macOS，只需要安装 xcode command line tools 即可。可以在命令行中输入 `git --version` 系统会自动提示安装，或者去[这里](https://git-scm.com/download/mac)进行手动安装

对于 windows 操作系统，点击[这里](https://git-scm.com/download/win)即可安装 git for windows 项目，当然也可以选择安装 [GitHub desktop](https://desktop.github.com/) 项目
## 使用前的基本配置
git 的配置信息存储在三个位置，分别是
- /etc/gitconfig：系统级的配置文件，如果使用 git config --system 就会写入到这个目录下
- ～/.gitconfig：当前用户下的配置文件，git config --global 命令就会写入到这个目录下
- 当前 git 仓库中的。git/config：只针对于当前仓库有效，git config --local 这样即可。

每一个级别都会覆盖上一级别的配置，也就是说。git/config 的优先级最高。

可以使用 `git config --list --show-origin` 命令查看所有的配置文件，以及所在的目录。

配置目录形如：

```bash 
[user]
# Please adapt and uncomment the following lines:
	name = xx
	email = xx@gmail.com
[core]
  excludesfile = /Users/xxx/.gitignore_global
[url "ssh://git@github.com/"]
  insteadOf = https://github.com
```
### 设置用户信息
通常来说，设置用户信息都是放在 `～/.gitconfig` 这个目录下，所以我们使用的命令就是 `git config --global user.name jackie` `git config --global user.email jackie@example.com`，当然了，去直接更改 ~/.gitconfig 也可以。

如果每一个项目的用户和邮箱不同，那么需要去更改项目下的。git/config 目录，或者在该项目的路径下使用 `git config` 的时候不添加 `--global` 就可以了。

我们只要使用 git 就必须设置 user.name 和 user.email 否则 git 就无法运行。
### 检查配置信息
```bash
git config --list
```
如果看到重复的配置，那么 git 会采用最后一个数值。

## 获取 git 的帮助文件
获取详细的 git 帮助文件
```bash
git help 命令
git 命令 --help
man git-命令
```
让我们看一个实际的例子
```bash
git help add
git add --help
man git-add
```
获取更加简洁的帮助文件可以使用 `git 命令 -h` 这种形式去查找更加简单的命令。

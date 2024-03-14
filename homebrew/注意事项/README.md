<!--
 * @Author: shgopher shgopher@gmail.com
 * @Date: 2024-03-14 17:33:29
 * @LastEditors: shgopher shgopher@gmail.com
 * @LastEditTime: 2024-03-14 17:38:07
 * @FilePath: /dingdang/homebrew/注意事项/README.md
 * @Description: 
 * 
 * Copyright (c) 2024 by shgopher, All Rights Reserved. 
-->
# homebrew 注意事项

## 带有版本的包
homebrew 下载的包带有 version 和不带有 version 不是一个包，比如下载 nodejs：

```bash
brew install node@20

brew install node
```
上面这个命令只会下载 nodejs 20 版本中的包，brew upgrade 也是一样，不会超过 verison 20 这个大版本，每一个带有 version 的版本都是一个文件夹，内部还有各种的小版本，
```bash
- node/**
- node@20/**
```

如果是下面这个安装方法，就会安装最新的版本

如果使用下面这种方法自动将可执行文件 link 到执行路径，如果是带有版本，由于可以下载很多个版本，所以并不会自动的 link，需要自己手动 link

```bash
brew link --force node@20
```

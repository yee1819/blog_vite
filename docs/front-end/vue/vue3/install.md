





# 创建vue3

首先需要有node.js环境  才可以使用包管理工具  npm

[下载 | Node.js 中文网 (nodejs.cn)](https://nodejs.cn/download/)

或者

使用[nvm文档手册 - nvm是一个nodejs版本管理工具 - nvm中文网 (uihtm.com)](https://nvm.uihtm.com/)来安装 nodeJS

[GitHub - coreybutler/nvm-windows: A node.js version management utility for Windows. Ironically written in Go.](https://github.com/coreybutler/nvm-windows)

~~如果npm下载包缓慢记得换源or使用cnpm等等~~

打开命令行（cmd or bash 均可）



::: code-group

```sh[vite构建]{1,6,7,8}
>npm init vite@latest

> npx
> create-vite

√ Project name: ... vue011    --输入项目名
√ Select a framework: » Vue   --此时会出现多个选项，上下键选择或输出对应框架名称
√ Select a variant: » TypeScript	--选择支持的语言或框架

Scaffolding project in E:\Users\Yee\Desktop\vue\vue011...

Done. Now run:

  cd vue011
  npm install
  npm run dev
```




```sh[vue]{9-17,1}
E:\Users\Yee\Desktop\vue>npm init vue@latest

> npx
> create-vue


Vue.js - The Progressive JavaScript Framework

√ 请输入项目名称： ... vue002
√ 是否使用 TypeScript 语法？ ... 否 / 是
√ 是否启用 JSX 支持？ ... 否 / 是
√ 是否引入 Vue Router 进行单页面应用开发？ ... 否 / 是
√ 是否引入 Pinia 用于状态管理？ ... 否 / 是
√ 是否引入 Vitest 用于单元测试？ ... 否 / 是
√ 是否要引入一款端到端（End to End）测试工具？ » 不需要
√ 是否引入 ESLint 用于代码质量检测？ ... 否 / 是
√ 是否引入 Vue DevTools 7 扩展用于调试? (试验阶段) ... 否 / 是

正在初始化项目 E:\Users\Yee\Desktop\vue\vue002...

项目初始化完成，可执行以下命令：

  cd vue002
  npm install
  npm run dev
```

:::


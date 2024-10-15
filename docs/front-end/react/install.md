# 安装项目

- [x] 需要NodeJs环境

::: code-group

```bash[vite]{1,10-12}
E:\Users\Yee\Desktop\react\react-app-03>npm init vite@latest
Need to install the following packages:
create-vite@5.5.3
Ok to proceed? (y) y


> react-app-03@0.1.0 npx
> create-vite

√ Project name: ... react-demo-04          	//输入项目名
√ Select a framework: » React              //选择框架
√ Select a variant: » TypeScript		//构建方案，这里我选ts

Scaffolding project in E:\Users\Yee\Desktop\react\react-app-03\react-demo-04...

Done. Now run:

  cd react-demo-04
  npm install
  npm run dev

```



```bash[官方创建]{1}
E:\Users\Yee\Desktop\react>npx create-react-app react-app-02
//react-app-02 为项目名

Need to install the following packages:
create-react-app@5.0.1
Ok to proceed? (y) y

npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
npm warn deprecated rimraf@2.7.1: Rimraf versions prior to v4 are no longer supported
npm warn deprecated fstream-ignore@1.0.5: This package is no longer supported.
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated uid-number@0.0.6: This package is no longer supported.
npm warn deprecated fstream@1.0.12: This package is no longer supported.
npm warn deprecated tar@2.2.2: This version of tar is no longer supported, and will not receive security updates. Please upgrade asap.

Creating a new React app in E:\Users\Yee\Desktop\react\react-app-02.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template...


added 1480 packages in 1m

262 packages are looking for funding
  run `npm fund` for details

Initialized a git repository.

Installing template dependencies using npm...

added 63 packages, and changed 1 package in 11s

262 packages are looking for funding
  run `npm fund` for details
Removing template package using npm...


removed 1 package in 5s

262 packages are looking for funding
  run `npm fund` for details

Created git commit.

Success! Created react-app-02 at E:\Users\Yee\Desktop\react\react-app-02
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd react-app-02
  npm start

Happy hacking!
```

```bash[ts模板]{1}
E:\Users\Yee\Desktop\react>npx create-react-app react-app-03 --template typescript
//react-app-03 为项目名
Creating a new React app in E:\Users\Yee\Desktop\react\react-app-03.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template-typescript...


added 1480 packages in 30s

262 packages are looking for funding
  run `npm fund` for details

Initialized a git repository.

Installing template dependencies using npm...

added 41 packages, removed 1 package, and changed 2 packages in 5s

262 packages are looking for funding
  run `npm fund` for details

We detected TypeScript in your project (src\App.test.tsx) and created a tsconfig.json file for you.

Your tsconfig.json has been populated with default values.

Removing template package using npm...


removed 1 package in 3s

262 packages are looking for funding
  run `npm fund` for details

Created git commit.

Success! Created react-app-03 at E:\Users\Yee\Desktop\react\react-app-03
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd react-app-03
  npm start

Happy hacking!
```



:::

::: tip 关于官方创建react工程

[新手入门 | Create React App 中文网 (nodejs.cn)](https://cra.nodejs.cn/docs/getting-started/)

关于自定义模板：[自定义模板 | Create React App 中文网 (nodejs.cn)](https://cra.nodejs.cn/docs/custom-templates/)

:::

注意：vite创建的工程和官方的项目启动方式不同，见于项目中`package.json`的`scripts`

| 模块             | 启动命令      | 默认端口 |
| ---------------- | ------------- | -------- |
| vite             | `npm run dev` | `5173`   |
| 官方 (即webpack) | `npm start`   | 3000     |

> 推荐使用vite（就性能而言）


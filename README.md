#### 启动项目

```
npm install
npm start
```

#### 打包构建

```
npm run build
```

#### 工程目录

```
src/                # 源代码目录
  ├── assets/       # 静态资源文件夹
  ├── common/       # 全局管理
  ├── components/   # React 组件
  ├── hooks/        # 自定义 React hooks
  ├── pages/       
  │   └── AboutPage/ # 页面
  │       └── components/ # 页面的组件
  │       └── index.tsx   # 页面的入口
  ├── services/     # 服务层，用于封装 API 调用
  ├── types/        # TypeScript 类型定义
  ├── utils/        # 工具函数
  │   ├── index.tpl     # 模板文件
  │   ├── index.tsx     # 工具函数入口文件
  │   ├── lazy-pages.tsx # 懒加载页面组件
  │   ├── root.tsx      # 根组件
  │   └── router.tsx    # 路由配置
webpack/ 
  ├── config/       # Webpack 配置文件夹
  │   ├── webpack.base.config.js # Webpack 基础配置
  │   ├── webpack.dev.config.js  # Webpack 开发环境配置
  │   └── webpack.prod.config.js # Webpack 生产环境配置
  └── utils/
      └── rootPath.js # Webpack 根路径工具函数
.babelrc            # Babel 配置文件
.env                # 环境变量配置文件
.eslintrc.js        # ESLint 配置文件
.gitignore          # Git 忽略文件配置
package-lock.json   # npm 锁定依赖版本文件
package.json        # npm 项目配置文件
README.md           # 项目说明文件
tsconfig.json       # TypeScript 配置文件
```


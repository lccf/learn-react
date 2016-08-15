# filter
## 源码使用说明
进入到filter目录下：
- 执行npm install安装package依赖包
- 执行npm start运行项目
- 浏览器访问 [http://localhost:8080](http://localhost:8080)
- 执行npm run build可打包js文件

## 项目结构
```
- filter/
  - src/                  # 源码目录
    - declare/
      - index.d.ts        # 语法提示文件
    - filter/
      - components/
        - catePanel.tsx   # 分类面板
        - filterPanel.tsx # 筛选面板
        - filterView.tsx  # 筛选视图
        - main.tsx        # 主面板
      - actions.ts        # action集合
      - declare.d.ts      # 语法提示文件
      - index.ts          # 组件入口文件
      - model.ts          # 模型文件
      - reducer.ts        # 动作处理
      - util.ts           # 工具
    - app.tsx             # 主应用
    - index.jade          # 页面模板
    - index.ts            # 主入口
    - mockData.ts         # 测试数据
```

## 结构说明
语法提示：
- 组件下的文件，统一引用组件目录下的 declare.d.ts 文件
- declare.d.ts 中定义当前组件用到的type define，同时引用组件父目录下的declare目录下的index.d.ts
- declare/index.d.ts 中定义所有组件用到的type define，同时引用typings的index.d.ts

入口文件：
- 组件中所有内容统一使用index.ts导出

系统整合：
- js/page.js中存放挂载的命名空间，和外部扩展的接口等
- 将组件的class挂载到外部命名空间，由外部代码初例化，传入初始化数据，和回调接口
- 组件内的变化通过 dispatch 触发 redux-thunk 的回调，调用 extendApi 传参到外部接口，获取数据后dispatch传回
- 组件触发的数据更新，通过组件实例的update方法，调用store的dispatch将数据传入

系统打包

在产品模式下设置如下：
- 移除devtool
- 使用react-lite替换react和react-dom
- 启用uglifyjs压缩代码
- 将通用库合并到同一文件

在开发模式下设置如下：
- 移除react-lite映射
- 移除压缩
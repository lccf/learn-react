# multi
## 源码使用说明
multi
- 执行npm install安装package依赖包(注意bower和typings需安装完成)
- 执行npm start运行项目
- 浏览器访问 [http://localhost:8080](http://localhost:8080)

## 使用说明
页面上通过标签设置组件

```html
    <div data-component="componentName=Counter&dataLabel=counter[id]"></div>
```

- 通过data-component指定组件配置
- componentName 指定组件名
- dataLabel 指定在Redux中的数据标签
- dataLabel中的[id] 会被替换成随机值
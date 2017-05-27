# multi
## 源码使用说明
multi
- 执行npm install安装package依赖包(注意bower需安装完成)
- 执行npm start运行项目
- 浏览器访问 [http://localhost:8080](http://localhost:8080)

## 使用说明
页面上通过标签设置组件

### 静态组件

```html
<div class="staticComponent" data-nblock-id="block/staticComponentBlock">
    <div class="counterBox1" data-component="componentName=Counter&dataLabel=counter[id]">
    </div>
    <div class="counterBox2" data-component="componentName=Counter&dataLabel=counter[id]">
    </div>
</div>
```

- 通过block/staticComponentBlock指定组件域
- 通过data-component指定子组件
- componentName 指定组件名
- dataLabel 指定在Redux中的数据标签
- dataLabel中的[id] 会被替换成随机值
- 每个staticComponentBlock生成一个redux store

### 动态组件

```html
<div class="dynamicComponent">
    <div class="counterBox1" data-nblock-id="block/dynamicComponentBlock?componentName=Counter&amp;dataLabel=counter[id]">
    </div>
    <div class="counterBox2" data-nblock-id="block/dynamicComponentBlock?componentName=Counter&amp;dataLabel=counter[id]">
    </div>
</div>
```

- 通过block/dynamicComponentBlock指定组件配置
- componentName 指定组件名
- dataLabel 指定在Redux中的数据标签
- dataLabel中的[id] 会被替换成随机值
- 多个component会共用一个redux store
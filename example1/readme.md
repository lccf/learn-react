# react example1

## 创建项目及配置文件
```bash
echo '{}' package.json
# 安装react包
npm install react react-dom redux react-redux redux-actions redux-thunk --save
# 安装开发依赖包
npm install typescript webpack webpack-dev-server ts-loader source-map-loader --save-dev
# 安装语法提示
npm install typings -g
typings i -SG dt~react dt~react-dom dt~redux dt~react-redux dt~redux-actions dt~redux-thunk
```

tsconfig.json
```javascript
{
    "compilerOptions": {
        "sourceMap": true,
        "removeComments": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    }
}
```

webpack.config.js
```javascript
module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/bundle.js",
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],

        preLoaders: [
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};
```

package.json添加自定义命令
```javascript
  "scripts": {
    "start": "webpack-dev-server --inline --hot",
    "build": "webpack"
  },
```

index.ts
```typescript
import render from './hello';
const rootEl = document.getElementById('container');
render(rootEl);
```

src/hello/index.tsx
```typescript
/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';
import { render } from 'react-dom';
import Hello from './hello';

// const rootEl = document.getElementById('container');


export default function (rootEl: HTMLElement) {
    render(
        <Hello text="react app" />,
        rootEl
    )
}
```

src/hello/hello.tsx
```typescript
/// <reference path="../../typings/index.d.ts" />
import * as React from 'react';

interface HelloProps {
    text: string;
}

class Hello extends React.Component<HelloProps, any> {
    constructor(props: HelloProps) {
        super(props);
    }

    render() {
        const { text } = this.props;
        return (
            <div>
            <h1>Hello</h1>
            <h3>text: {text}</h3>
            </div>
        );
    }
}

export default Hello;
```

index.html
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Hello React!</title>
    </head>
    <body>
        <div id="container"></div>
        <!-- Dependencies -->
        <script src="./node_modules/react/dist/react.js"></script>
        <script src="./node_modules/react-dom/dist/react-dom.js"></script>
        <!-- Main -->
        <script src="./dist/bundle.js"></script>
    </body>
</html>
```

启动 npm start
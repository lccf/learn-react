let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",
    output: {
        filename: "./dist/bundle.js"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    module: {
        rules: [
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            { test: /\.pug?$/, loader: "pug-loader" },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.pug",
            inject: false
        })
    ],

    externals: {
        // "react": "React",
        // "react-dom": "ReactDOM"
        "ndoojs": "ndoo",
        "underscore": "_",
        "zepto": "Zepto"
    },

    devServer: {
        host: '0.0.0.0',
        contentBase: '.'
    }
};
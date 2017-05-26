const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let webpackConfig = {
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

const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV != 'production') {
    webpackConfig.plugins.push(new webpack.DefinePlugin({
        REDUX_DEBUG: true,
        REDUX_LOGGER: false
    }));
}

module.exports = webpackConfig;
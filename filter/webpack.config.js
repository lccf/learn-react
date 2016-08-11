var webpack = require("webpack");
var NODE_ENV = process.env.NODE_ENV;
var config = {
  // entry: ["./react/index.tsx",  "file?name=index.html!jade-html!./react/index.jade"],
  entry: {
    "filter": ["./src/index.ts", "file?name=index.html!jade-html!./src/index.jade"],
    "react-library": ['react', 'redux', 'react-redux', 'react-dom', 'redux-actions', 'redux-thunk'],
    // data: ['./react/MockData.ts'],
  },
  output: {
    filename: "./dist/[name].js",
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias: {
      'react': 'react-lite',
      'react-dom': 'react-lite'
    }
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

  plugins: [
    new webpack.optimize.CommonsChunkPlugin("react-library", "./dist/react-library.js"),
    // new webpack.optimize.CommonsChunkPlugin("data", "./react/dist/data.js"),
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: ["vendor", "data"],
    //     filename: './react/dist/vendor.js',
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    // "BGSite": "BGSite"
    // "react": "React",
    // "react-dom": "ReactDOM"
  },
};

if (NODE_ENV == 'production') {
  delete config.devtool;
  config.entry.filter.pop();
  //config.plugins = config.plugins.slice(0, 1);
}
else {
  delete config.resolve.alias;
  config.plugins = config.plugins.slice(0, 1);
}

module.exports = config;
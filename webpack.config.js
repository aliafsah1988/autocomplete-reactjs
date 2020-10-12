const path = require("path");
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src") + "/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    libraryTarget: "commonjs2"
  },
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js"]
  },
  target: "node",
  plugins: [
    new ExtractCssChunks({
      filename: "bundle.css",
      ignoreOrder: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'style-loader', 'css-loader'
        ],
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        include: [ path.resolve(__dirname, 'src/component'),
        path.resolve(__dirname, 'src/interfaces'),
        path.resolve(__dirname, 'src/classes') ],
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.styl$/,
        use: [
          {
            loader: ExtractCssChunks.loader
            // loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          "stylus-loader"
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      }
    ]
  }
};

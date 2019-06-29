const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "./client/index.tsx"),
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: [
          {
            loader: "ts-loader"
          }
        ]
      },
      {
        test: /\.(js)$/,
        use: [
          {
            loader: "source-map-loader",
            options: {
              enforce: "pre",
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve(__dirname, "client"), "node_modules"],
    extensions: [".js", ".jsx", ".ts", "tsx", ".json"]
  },
  output: {
    path: path.resolve("/www", "app", "lang", "words"),
    filename: "bundle.js"
  }
};

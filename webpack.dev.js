const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base.js");

module.exports = merge(base, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve("/www", "app", "lang", "words"),
    port: 8080,
    compress: true,
    inline: true,
    disableHostCheck: true,
    host: "0.0.0.0",
    https: {
      key: fs.readFileSync("/etc/ssl/certs/localhost-key.pem"),
      cert: fs.readFileSync("/etc/ssl/certs/localhost-crt.pem"),
      ca: fs.readFileSync("/etc/nginx/local_root_CA/rootCA.pem")
    }
  }
});

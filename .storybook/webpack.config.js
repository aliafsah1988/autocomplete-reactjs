module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("ts-loader")
      }
    ]
  });
  config.module.rules.push({
    test: /\.styl$/,
    use: ["style-loader", "css-loader", "stylus-loader"]
  });
  config.resolve.extensions.push(".ts", ".tsx");
  return config;
};

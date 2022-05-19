module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-env'],
      plugins: ['transform-dynamic-import']
    }
  }
};

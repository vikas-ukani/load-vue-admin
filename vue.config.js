module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '',
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/load-admin/'
  //   : '/',
  devServer: {
    proxy: 'http://178.128.56.249/load',
    // proxy: 'http://192.168.0.133:1001/',
  }
}
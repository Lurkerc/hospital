// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8085,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/': {
        // target: 'http://192.168.1.165:9000', // 8081 API目标服务器地址 /api/* ---> http://192.168.1.116:3000/api/*
        // target: 'http://192.168.1.68:9000', // 王静 8082 | 8088
        // target: 'http://192.168.1.150:9000', // 关燊 8083
        // target: 'http://192.168.1.116:9090', // 测试服 8084
        target: 'http://192.168.1.209:9000', // 刘彤彤 8085
        // target: 'http://192.168.1.103:9000', // 杨春阳 8086|8090
        // target: 'http://192.168.1.147:9000', // 刘宏强 8087
        // target: 'http://192.168.1.148:8000', // 雷朋 8089
        // target: 'http://192.168.1.190:9000', // 张旭磊 8090
        changeOrigin: true
      },
      // '/hls/': {
      //   target: 'http://192.168.1.116:8999',
      //   changeOrigin: true
      // },
      // '~ .*\.action$':{
      //   target: 'http://192.168.1.115',
      //   changeOrigin: true
      // },
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

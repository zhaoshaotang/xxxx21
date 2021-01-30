module.exports = {
    lintOnSave: false,
    devServer: {
          open: true, //是否自动弹出浏览器页面
          host: "0.0.0.0", 
          port: '8081',
          https: false,
          hotOnly: false, 
          proxy: {
              '/prod-api': {
                  target: 'http://192.168.1.143:8080', //API服务器的地址
                  changeOrigin: true, // 虚拟的站点需要更管origin
                  pathRewrite: {   //重写路径 比如'/api/aaa/ccc'重写为'/aaa/ccc'
                      '^/prod-api': ''
                  }
              }
          },
      }
  }


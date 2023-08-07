const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    open:true,
    proxy:{
      // 设置代理
      "api":{
        target:"http://sph-h5-api.atguigu.cn",
        changeOrigin: true
      }
    }
  },
  // 设置入口文件
  pages:{
    index:{
      // main.js改成index.js入口文件
      entry:"src/index.js",
      // 设置网站标题
      title:"尚品汇"
    }
  }
})

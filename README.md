VUE+ element UI + admin中后台管理系统搭建

## vueAdmin-template

###### 主要技术栈

+ vue-cli webpack

+ element-ui vue2.0 pc UI框架
+ axios
+ js-cookie  轻量的JavaScript库来处理cookie

[官方文档](https://panjiachen.github.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD)

## 配置侧边栏和路由的对应关系

###### 嵌套路由

## 编写后端接口 

###### 1.axios发送请求数据

通过easy mock编辑的模拟数据

###### 2.商品的编辑和删除按钮

+ 在商品列表中提供编辑按钮组件
+ 创建一个商品编辑页(editproduct.vue) 用的form/index.vue组件模板

+ 在路由表中注册商品编辑页
+ 编辑按钮点击跳转路由到edictproducty页
  1. 注意需要携带参数跳转 通过params方式

```javascript
@click="edictProductClick(scope.row.id)"
editProductClick(pid) {
      this.$router.push('/form/editproduct/' + pid)  // 传参
    }   
// 路由表
path: '/form/editproduct/:pid'
// edict页
this.$route.params.pid // 通过params取参
```

​	2.  通过id向后台发送请求，让后台 提供该id的商品数据

## 真实接口

http://39.98.123.211:8170/swagger-ui.html

http://39.98.123.211:8216/swagger-ui.html

## 登陆业务

###### 1. 将原模板模拟API换成真实接口

###### 2. 解决代理跨域问题

```
// vue.config.js
proxy: {
      '/dev-api': {
        target: "http://39.98.123.211",
        pathRewrite: { '^/dev-api': ''},
      },
    }
```




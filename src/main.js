import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import axios from 'axios'
import VueAxios from 'vue-axios'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(VueAxios, axios)

Vue.config.productionTip = false


// 引入相关API请求接口
// 写在原型上，这样任何组件都可以使用api相关的接口
import API from '@/api'
Vue.prototype.$API = API

// 引入全局组件
import CategorySelect from '@/components/CategorySelect'
import Footer from '@/components/Footer'
// 注册全局组件
Vue.component( CategorySelect.name, CategorySelect)
Vue.component(Footer.name, Footer)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

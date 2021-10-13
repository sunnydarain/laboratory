import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import DataV from '@jiaminghi/data-view'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from './router'
import './assets/common/common.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Antd)
Vue.use(DataV)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

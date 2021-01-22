import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import './js/flexible'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

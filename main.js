// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {
  $http
} from "@escook/request-miniprogram"

uni.$http = $http

$http.baseUrl = 'https://www.uinav.com'

$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '玩儿命加载中!'
  })
}
$http.beforeRequest = function(options) {
  uni.hideLoading()
}

uni.msg = function(title = '服务器忙坏啦', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif

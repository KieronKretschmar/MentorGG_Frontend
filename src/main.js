import Vue from 'vue'
import App from './App.vue'
import router from './router'
import authManager from './authmanager'

Vue.config.productionTip = false;

Vue.prototype.$authManager = authManager;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

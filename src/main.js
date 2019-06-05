import Vue from 'vue'
import App from './App.vue'
import router from './router'
import authManager from './authmanager'
import mentorGGAPI from './mentorggapi';

Vue.config.productionTip = false;

Vue.prototype.$authManager = authManager;
Vue.prototype.$api = mentorGGAPI;

Vue.filter('formatDate', function(val) {
  if ( val ) {
    let date = new Date(val);
    return date.toLocaleString();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue';
import App from './App.vue';
import router from './router';
import authManager from './authmanager';
import mentorGGAPI from './mentorggapi';
import helpers from './helpers';
import performanceColors from './performancecolors';
import AjaxLoader from './components/AjaxLoader.vue';
import DemoDataLoadRequest from './components/DemoDataLoadRequest.vue';
import NoDataAvailableDisplay from './components/NoDataAvailableDisplay.vue';
import {VueMasonryPlugin} from 'vue-masonry';
import VueLazyLoad from 'vue-lazyload';
import VueAnalytics from 'vue-analytics'

import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
 
Vue.config.productionTip = false;
Vue.use(VueMasonryPlugin);
Vue.use(VueLazyLoad);

Vue.prototype.$authManager = authManager;
Vue.prototype.$api = mentorGGAPI;
Vue.prototype.$helpers = helpers;
Vue.prototype.$performanceColors = performanceColors;

Vue.component('AjaxLoader', AjaxLoader);
Vue.component('DemoDataLoadRequest', DemoDataLoadRequest);
Vue.component('NoDataAvailableDisplay', NoDataAvailableDisplay);

Vue.filter('formatDate', function (val) {
  if (val) {
    let date = new Date(val);
    return date.toLocaleString([], { timeStyle: 'short', dateStyle: 'short' });
  }
});

Vue.use(VueAnalytics, {
  id: 'UA-121787145-1', 
  router,
  beforeFirstHit () {
    Vue.$ga.set('anonymizeIp', true);
  }
})


let vapp = new Vue({
  router,
  render: h => h(App)  
}).$mount('#app');

Vue.prototype.$vapp = vapp;



// If demoviewer is open and the user navigates back/to another site, 
// demoviewer is closed instead. This needs to be replaced as soon as  
// we enable other navigations out of the demoviewer instead of just 
// using the "back" function of the browser
router.beforeEach(demoViewerCloseGuard);
function demoViewerCloseGuard(to, from, next) {
  let demoviewer = vapp.$root.$children[0].$refs.demoviewer;
  if(demoviewer && demoviewer.isVisible){
    demoviewer.Hide();
    next(false);
  }
  else{
    next(true)
  }
}

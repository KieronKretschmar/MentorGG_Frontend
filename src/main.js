import Vue from 'vue';
import App from './App.vue';
import router from './router';
import mentorGGAPI from './mentorggapi';
import helpers from './helpers';
import coordinateConverter from './coordinateconverter';
import performanceColors from './performancecolors';
import AjaxLoader from './components/AjaxLoader.vue';
import DemoDataLoadRequest from './components/DemoDataLoadRequest.vue';
import NoDataAvailableDisplay from './components/NoDataAvailableDisplay.vue';
import { VueMasonryPlugin } from 'vue-masonry';
import VueLazyLoad from 'vue-lazyload';
import VueAnalytics from 'vue-analytics'


import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

const isProd = process.env.NODE_ENV === 'production';

Vue.config.productionTip = false;
Vue.config.performance = true;
Vue.use(VueMasonryPlugin);
Vue.use(VueLazyLoad);

Vue.prototype.$api = Vue.observable(mentorGGAPI);
Vue.prototype.$helpers = helpers;
Vue.prototype.$coordinateConverter = coordinateConverter;
Vue.prototype.$performanceColors = performanceColors;
Vue.prototype.$inputBlock = {visible: true};

Vue.component('AjaxLoader', AjaxLoader);
Vue.component('DemoDataLoadRequest', DemoDataLoadRequest);
Vue.component('NoDataAvailableDisplay', NoDataAvailableDisplay);

Vue.filter('formatDate', function (val) {
  if (val) {
    let date = new Date(val);
    return date.toLocaleString([], { dateStyle: 'short' });
  }
});
Vue.filter('formatDateAndTime', function (val) {
  if (val) {
    let date = new Date(val);
    return date.toLocaleString([], { timeStyle: 'short', dateStyle: 'short' });
  }
});

Vue.use(VueAnalytics, {
  id: 'UA-121787145-1',
  router,
  debug: {
    enabled: false, // !isProd,
    sendHitTask: isProd // only send data to google in production
  },
  beforeFirstHit() {
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
  if (globalThis.DemoViewer && globalThis.DemoViewer.isVisible) {
    globalThis.DemoViewer.ToggleVisibility(false);
    next(false);
  }
  else {
    next(true)
  }
}

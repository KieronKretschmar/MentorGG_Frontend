import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import axios from 'axios';

Vue.use(Router);

// Called before every route that has this assigned in beforeEnter
// Will redirect to login if the user is currently not logged in
// eslint-disable-next-line
function authenticationGuard(to, from, next) {

  // OUTCOMMENT CODE BELOW IF YOU DO NOT WANT TO APPEAR LOGGED IN
  if(process.env.NODE_ENV == 'development' || process.env.VUE_APP_NOAUTH){
    next();
    return;
  }

  Vue.prototype.$api.getLoginStatus().then(response => {
    if(response.data.IsLoggedIn == true){
      next();
    }
    else{
      if (from.name == "login") {
        Vue.prototype.$vapp.$emit('shakeLogin');
      } else {
        next('/login');
      }
    }
  }).catch(error => {
      next('/login');
  });
}


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: authenticationGuard
    },
    {
      path: '/hes',
      name: 'hes',
      component: () => import(/* webpackChunkName: "hes" */'./views/RadarImageFeatures/HEs.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/flashes',
      name: 'flashes',
      component: () => import(/* webpackChunkName: "flashes" */'./views/RadarImageFeatures/Flashes.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/kills',
      name: 'kills',
      component: () => import(/* webpackChunkName: "kills" */'./views/RadarImageFeatures/Kills.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/molotovs',
      name: 'molotovs',
      component: () => import(/* webpackChunkName: "molotovs" */'./views/RadarImageFeatures/Molotovs.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/smokes',
      name: 'smokes',
      component: () => import(/* webpackChunkName: "smokes" */'./views/RadarImageFeatures/Smokes.vue'),
      beforeEnter: authenticationGuard
    },
    // {
    //   path: '/bombs',
    //   name: 'bombs',
    //   component: () => import(/* webpackChunkName: "bombs" */'./views/Bombs.vue'),
    //   beforeEnter: authenticationGuard
    // },
    {
      path: '/event/hes',
      name: 'eventhes',
      component: () => import(/* webpackChunkName: "eventhes" */'./views/Event/EventHEs.vue')
    },
    {
      path: '/event/flashes',
      name: 'eventflashes',
      component: () => import(/* webpackChunkName: "eventflashes" */'./views/Event/EventFlashes.vue')
    },
    {
      path: '/event/kills',
      name: 'eventkills',
      component: () => import(/* webpackChunkName: "eventkills" */'./views/Event/EventKills.vue')
    },
    {
      path: '/event/matchhistory',
      name: 'eventmatchhistory',
      component: () => import(/* webpackChunkName: "eventmatchhistory" */'./views/Event/EventMatchHistory.vue')
    },
    {
      path: '/event/molotovs',
      name: 'eventmolotovs',
      component: () => import(/* webpackChunkName: "eventmolotovs" */'./views/Event/EventMolotovs.vue')
    },
    {
      path: '/event/smokes',
      name: 'eventsmokes',
      component: () => import(/* webpackChunkName: "eventsmokes" */'./views/Event/EventSmokes.vue')
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import(/* webpackChunkName: "statistics" */'./views/Statistics.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import(/* webpackChunkName: "privacypolicy" */'./views/PrivacyPolicy.vue')
    },
    {
      path: '/terms-of-service',
      name: 'terms-of-service',
      component: () => import(/* webpackChunkName: "termsofservice" */'./views/TermsOfService.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import(/* webpackChunkName: "contact" */'./views/Contact.vue')
    },
    {
      path: '/automatic-upload',
      name: 'automatic-upload',
      component: () => import(/* webpackChunkName: "automaticupload" */'./views/AutomaticUpload.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */'./views/Login.vue')
    },
    {
      path: '/match/watch/:matchId',
      name: 'dvtrigger',
      component: () => import(/* webpackChunkName: "dvtrigger" */'./views/DemoViewerTrigger.vue')
    }
  ]
});
import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import axios from 'axios';

Vue.use(Router);

// Called before every route that has this assigned in beforeEnter
// Will redirect to login if the user is currently not logged in
// eslint-disable-next-line
function authenticationGuard(to, from, next) {
  // at this point, the user tries to open a non-whitelisted view

  // if the api is ready (user is logged in and matchselection has loaded) just let him pass
  if(Vue.prototype.$api.ready){
    Vue.prototype.$inputBlock = Vue.observable(false); 
    next();
    return;
  }

  // if not, show inputblock and validate login
  Vue.prototype.$inputBlock = Vue.observable(true);

  Vue.prototype.$api.ensureLogin()
  .then(response => {
    // if the user is logged in, attempt to init MatchSelector
    Vue.prototype.$api.initMatchSelector()
    .then(r => {
      // MatchSelector is ready so stop showing inputBlock and let the user pass 
      Vue.prototype.$inputBlock = Vue.observable(false);
      next();
      return;
    })
    .catch(r => {
      // User logged in but MatchSelector failed. This should not happen.
      Vue.prototype.$inputBlock = Vue.observable(false);
      next('/landingpage');
      return;
    });
  })
  .catch(error => {
    // at this point the user is not logged in

    Vue.prototype.$inputBlock = Vue.observable(false);

    // If the user just wanted to see mentor.gg, show him the landingpage
    if(from.name == null){
      next('/landingpage');
      return;
    }

    // if the user is already on /login, do shake animation
    if (from.name == "login") {
      Vue.prototype.$vapp.$emit('shakeLogin');
    } 
    // otherwise send him to login gate
    else {
      next('/login');
      return;
    }
  })
  
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
    },
    {
      path: '/landingpage',
      name: 'landingpage',
      component: () => import(/* webpackChunkName: "landingpage" */'./views/Landingpage.vue')
    },
    {
      path: '/filters/matches',
      name: 'individual-match-filters',
      component: () => import(/* webpackChunkName: "individualmatchfilters" */'./views/IndividualMatchFilters.vue')
    },
    {
      path: '/subscription',
      name: 'subscription',
      component: () => import(/* webpackChunkName: "subscription" */'./views/Subscription.vue')
    }
  ]
});
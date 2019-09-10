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
  if(process.env.NODE_ENV == 'development'){
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
      component: () => import(/* webpackChunkName: "hes" */'./views/HEs.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/flashes',
      name: 'flashes',
      component: () => import(/* webpackChunkName: "flashes" */'./views/Flashes.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/kills',
      name: 'kills',
      component: () => import(/* webpackChunkName: "kills" */'./views/Kills.vue'),
      beforeEnter: authenticationGuard

    },
    {
      path: '/molotovs',
      name: 'molotovs',
      component: () => import(/* webpackChunkName: "molotovs" */'./views/Molotovs.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/smokes',
      name: 'smokes',
      component: () => import(/* webpackChunkName: "smokes" */'./views/Smokes.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/eventhes',
      name: 'eventhes',
      component: () => import(/* webpackChunkName: "eventhes" */'./views/Event/EventHEs.vue')
    },
    {
      path: '/eventflashes',
      name: 'eventflashes',
      component: () => import(/* webpackChunkName: "eventflashes" */'./views/Event/EventFlashes.vue')
    },
    {
      path: '/eventkills',
      name: 'eventkills',
      component: () => import(/* webpackChunkName: "eventkills" */'./views/Event/EventKills.vue')
    },
    {
      path: '/eventmatchhistory',
      name: 'eventmatchhistory',
      component: () => import(/* webpackChunkName: "eventmatchhistory" */'./views/Event/EventMatchHistory.vue')
    },
    {
      path: '/eventmolotovs',
      name: 'eventmolotovs',
      component: () => import(/* webpackChunkName: "eventmolotovs" */'./views/Event/EventMolotovs.vue')
    },
    {
      path: '/eventsmokes',
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
      path: '/upload',
      name: 'upload',
      component: () => import(/* webpackChunkName: "upload" */'./views/Upload.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */'./views/Login.vue')
    }
  ]
});
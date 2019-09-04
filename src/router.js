import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router);

// Called before every route that has this assigned in beforeEnter
// Will redirect to login if the user is currently not logged in
// eslint-disable-next-line
function authenticationGuard(to, from, next) {
  //TODO: get proper login state here
  let loggedIn = false;

  if (loggedIn) {
    next();
  } else {
    next('/');
  }
}


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/hes',
      name: 'hes',
      component: () => import(/* webpackChunkName: "hes" */'./views/HEs.vue')
    },
    {
      path: '/flashes',
      name: 'flashes',
      component: () => import(/* webpackChunkName: "flashes" */'./views/Flashes.vue')
    },
    {
      path: '/kills',
      name: 'kills',
      component: () => import(/* webpackChunkName: "kills" */'./views/Kills.vue')
    },
    {
      path: '/molotovs',
      name: 'molotovs',
      component: () => import(/* webpackChunkName: "molotovs" */'./views/Molotovs.vue')
    },
    {
      path: '/smokes',
      name: 'smokes',
      component: () => import(/* webpackChunkName: "smokes" */'./views/Smokes.vue')
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
      component: () => import(/* webpackChunkName: "statistics" */'./views/Statistics.vue')
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
      component: () => import(/* webpackChunkName: "upload" */'./views/Upload.vue')
    },
  ]
});
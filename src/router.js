import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from './views/Dashboard.vue'
import axios from 'axios';

Vue.use(Router);

// Called before every route that has this assigned in beforeEnter
// Will redirect to login if the user is currently not logged in
// eslint-disable-next-line
function authenticationGuard(to, from, next) {
  let $api = Vue.prototype.$api;
  let $inputBlock = Vue.prototype.$inputBlock;
  // at this point, the user tries to open a non-whitelisted view

  // if the api is ready (user is logged in and matchselection has loaded) just let him pass
  if($api.ready){
    $inputBlock = Vue.observable(false); 
    next();
    return;
  }

  // if not, show inputblock and validate login
  $inputBlock = Vue.observable(true);

  $api.ensureLogin()
  .then(response => {
    // if the user is logged in, attempt to init MatchSelector
    $api.initMatchSelector($api.User.GetSteamId(false))
    .then(r => {

      //modify target to correctly display own steamid
      if (to.name == 'dashboard' && to.params.steamId == 'own') {
        to.params.steamId = $api.User.GetSteamId();
        return next(to);
      }

      // MatchSelector is ready so stop showing inputBlock and let the user pass 
      $inputBlock = Vue.observable(false);
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
      redirect: '/profile/own'
    },
    {
      path: '/profile/:steamId',
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
      path: '/statistics',
      name: 'statistics',
      component: () => import(/* webpackChunkName: "statistics" */'./views/Statistics.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import(/* webpackChunkName: "faq" */'./views/FAQ.vue')
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: () => import(/* webpackChunkName: "privacypolicy" */'./views/PrivacyPolicy.vue')
    },
    {
      path: '/terms-and-conditions',
      name: 'terms-and-conditions',
      component: () => import(/* webpackChunkName: "termsandconditions" */'./views/TermsAndConditions.vue')
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
      path: '/browser-extension',
      name: 'browser-extension',
      component: () => import(/* webpackChunkName: "browserextension" */'./views/BrowserExtension.vue'),
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
      path: '/situation/:type',
      name: 'situation-detail',
      component: () => import(/* webpackChunkName: "dvtrigger" */'./views/SituationDetail.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/situations/',
      name: 'situations',
      component: () => import(/* webpackChunkname: "situations" */'./views/SituationDetailOverview.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '/landingpage',
      name: 'landingpage',
      component: () => import(/* webpackChunkName: "landingpage" */'./views/Landingpage.vue')
    },
    {
      path: '/membership',
      name: 'membership',
      component: () => import(/* webpackChunkName: "membership" */'./views/Membership.vue'),
      beforeEnter: authenticationGuard
    },
    {
      path: '*',
      name: 'page-not-found',
      component: () => import(/* webpackChunkName: "pagenotfound" */'./views/PageNotFound.vue')
    }
  ]
});
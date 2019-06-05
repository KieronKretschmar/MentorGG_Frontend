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
      path: '/smokes',
      name: 'smokes',
      component: () => import(/* webpackChunkName: "smokes" */ './views/Smokes.vue')
    },
    {
      path: '/flashes',
      name: 'flashes',
      component: () => import(/* webpackChunkName: "flashes" */ './views/Flashes.vue')
    },
    {
      path: '/kills',
      name: 'kills',
      component: () => import(/* webpackChunkName: "kills" */ './views/Kills.vue')
    },
    {
      path: '/matches',
      name: 'matches',
      component: () => import(/* webpackChunkName: "matches" */ './views/Matches.vue')
    }
  ]
});
import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  Router
} from 'vue-router'

import {useAuthStore} from "@/stores/AuthStore";
import {routes} from "@/router/routes";

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {

  const AuthStore = useAuthStore()

  /* routes with query params not available except Catalog, if route has query params - redirect to this route without params */
  if (to.name !== 'Catalog' && Object.keys(to.query).length > 0) {
    const { name, params, hash } = to;

    if (typeof name === 'string') {
      next({
        name,
        params,
        hash,
        replace: true
      })
      return
    }
    /* all routes on Auth Layout redirect to Home page, if user already authorized */
  }else if(AuthStore.isAuthentificated && (to.name === 'Signin' || to.name === 'Signup' || to.name === 'Forgot Password')){
    next('/')
    return
  }

  next()
})


export default router

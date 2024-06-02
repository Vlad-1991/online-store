import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw
} from 'vue-router'
import MainLayout from "@/layout/MainLayout.vue";
import Home from '@/views/Home.vue'
import Catalog from "@/views/Catalog.vue";
import Help from "@/views/Help.vue";
import About from "@/views/About.vue";
import Cart from "@/views/Cart.vue";
import Product from "@/views/Product.vue";
import Checkout from "@/views/Checkout.vue";
import AuthLayout from "@/layout/AuthLayout.vue";
import Signin from "@/views/Signin.vue";
import Signup from "@/views/Signup.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import PageNotFound from "@/views/PageNotFound.vue";
import {useAuthStore} from "@/stores/AuthStore";



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      layout: MainLayout,
      auth: false
    }
  },
  {
    path: '/catalog',
    name: 'Catalog',
    component: Catalog,
    meta: {
      layout: MainLayout,
      auth: false
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: Help,
    meta: {
      layout: MainLayout,
      auth: false
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      layout: MainLayout,
      auth: false
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      layout: MainLayout,
      auth: false
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product,
    meta: {
      layout: MainLayout,
      auth: false
    }
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
    meta: {
      layout: MainLayout,
      auth: false
    }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin,
    meta: {
      layout: AuthLayout,
      auth: false
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      layout: AuthLayout,
      auth: false
    }
  },
  {
    path: '/forgot',
    name: 'Forgot Password',
    component: ForgotPassword,
    meta: {
      layout: AuthLayout,
      auth: false
    }
  },
  {
    path: '/:any(.*)',
    name: 'PageNotFound',
    component: PageNotFound,
    meta: {
      layout: MainLayout,
      auth: false
    }
  }

]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})



router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void => {

  const AuthStore = useAuthStore()
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
  }else if(AuthStore.isAuthentificated && (to.name === 'Signin' || to.name === 'Signup' || to.name === 'Forgot Password')){
    next('/')
    return
  }

  next()
})


export default router

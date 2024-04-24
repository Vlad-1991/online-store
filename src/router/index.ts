import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import MainLayout from "@/layout/MainLayout.vue";
import Home from '@/views/Home.vue'
import Catalog from "@/views/Catalog.vue";
import Help from "@/views/Help.vue";
import About from "@/views/About.vue";
import Cart from "@/views/Cart.vue";
import Product from "@/views/Product.vue";


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
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})

export default router

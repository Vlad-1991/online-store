import {RouteRecordRaw} from "vue-router";
import Home from "@/views/Home.vue";
import MainLayout from "@/layout/MainLayout.vue";
import Catalog from "@/views/Catalog.vue";
import Help from "@/views/Help.vue";
import About from "@/views/About.vue";
import Cart from "@/views/Cart.vue";
import Product from "@/views/Product.vue";
import Checkout from "@/views/Checkout.vue";
import Signin from "@/views/Signin.vue";
import AuthLayout from "@/layout/AuthLayout.vue";
import Signup from "@/views/Signup.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import PageNotFound from "@/views/PageNotFound.vue";

export const routes: Array<RouteRecordRaw> = [
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
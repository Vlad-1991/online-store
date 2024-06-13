<template lang="pug">
  nav.navbar
    div(class="logo")
      router-link(to="/")
        img(src="@/assets/lamotte.png" alt="Online Store" width="140px" height="54px")
      h3(class="inline") Online Store
    div.navbar-menu
      ul.navbar-menu
        li
          router-link(:to="{name: 'Home'}") Home
        li
          router-link(:to="{name: 'Catalog'}") Catalog
        li
          router-link(:to="{name: 'Help'}") Help
        li
          router-link(:to="{name: 'About'}") About Us
      div(v-if="!AuthStore.isAuthentificated")
        router-link(:to="{name: 'Signin'}")
          button.btn.main.mr20(type="button") Sign In
        router-link(:to="{name: 'Signup'}")
          button.btn.white.mr20(type="button") Sign Up
      div(v-else)
        router-link(:to="{name: 'Home'}" @click="AuthStore.logout")
          button.btn.white.mr20(type="button") Logout
      router-link(:to="{name: 'Cart'}" class="main")
        fa(icon="shopping-cart" size="lg")
        span(class="cart-count") {{CartStore.getCartCount}}
</template>

<!-- this is navbar - rendered once on main layout to navigate to all routes, except checkout and specific category query
 have also log in, sign in, log out buttons -->
<script setup lang="ts">
import {useCartStore} from "@/stores/CartStore";
import {useAuthStore} from "@/stores/AuthStore";
const AuthStore = useAuthStore()
const CartStore = useCartStore()
</script>
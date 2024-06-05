<template lang="pug">
  nav.navbar
    div(class="logo")
      router-link(to="/")
        img(src="@/assets/lamotte.png" alt="Online Store")
      h3(class="inline") Online Store
    div.navbar-menu
      ul.navbar-menu
        li
          router-link(to="/") Home
        li
          router-link(to="/catalog") Catalog
        li
          router-link(to="/help") Help
        li
          router-link(to="/about") About Us
      div(v-if="!AuthStore.isAuthentificated")
        router-link(to="/signin")
          button.btn.main.mr20 Sign In
        router-link(to="/signup")
          button.btn.white.mr20 Sign Up
      div(v-else)
        router-link(to="/" @click="AuthStore.logout")
          button.btn.white.mr20 Logout
      router-link(to="/cart" class="main")
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
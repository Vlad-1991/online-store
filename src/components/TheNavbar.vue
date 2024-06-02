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
        //router-link(to="/cart")
        fa(icon="shopping-cart" size="lg")
        span(class="cart-count") {{CartStore.getCartCount}}

        //a(href="#" @click.prevent="logout") Выход
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {useCartStore} from "@/stores/CartStore";
import {useUiStore} from "@/stores/UiStore";
import {useAuthStore} from "@/stores/AuthStore";
const UiStore = useUiStore()
const AuthStore = useAuthStore()
const CartStore = useCartStore()
const router = useRouter()



</script>
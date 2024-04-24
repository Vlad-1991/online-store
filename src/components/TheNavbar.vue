<template lang="pug">
  nav.navbar
    //div
    //  span
    //    a(href="#")
    //    img(src="@/assets/logo.jpg" width="100px" height="100px" alt="Online Store")
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
      router-link(to="/cart" class="main")
        //router-link(to="/cart")
        fa(icon="shopping-cart" size="lg" class="text-gray-700")
        span(class="cart-count") 0

        //a(href="#" @click.prevent="logout") Выход
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";


const router = useRouter()


</script>
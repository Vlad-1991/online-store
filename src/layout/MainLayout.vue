<template lang="pug">
  div.wrapper
    the-navbar
    div.container.with-nav.mb50
      TheBreadCrumbs.breadcrumbs.mt20
      error-message.mt20(v-if="UiStore.getErrorMessage")
      router-view
    the-footer
</template>

<!-- main layout contains navbar, wrapper of: breadcrumbs, error message (if exists)
 and component according to selected route (Catalog, Home, About Us, etc.) -->
<script setup lang="ts">
import {useCartStore} from "@/stores/CartStore";
import TheNavbar from "@/components/TheNavbar.vue";
import {useRoute} from "vue-router";
import {useUiStore} from "@/stores/UiStore";
import TheBreadCrumbs from "@/components/ui/TheBreadCrumbs.vue";
import {load} from "@/services/api/requests";
import {categoriesType} from "@/utils/types/requestTypes";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import TheFooter from "@/components/ui/TheFooter.vue";

const route = useRoute()
const UiStore = useUiStore()
const CartStore = useCartStore()

await cartInit()
let response

/* loading categories from server and store them to UiStore to reuse in other child component with Left Sidebar */
try {
  response = await load('/categories.json')
  response.sort((a: categoriesType, b: categoriesType) => Object.keys(a)[0] > Object.keys(b)[0] ? 1 : -1)
  UiStore.pushCategories(response)
}catch (e: string | unknown){
    UiStore.setErrorMessage(e.message)
}

 let categories = UiStore.getAllCategories

/* to get all products, putted by user to cart earlier, from local storage to Cart store */
async function cartInit(): Promise<void> {
  CartStore.getCart()
}

</script>
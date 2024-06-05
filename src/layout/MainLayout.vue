<template lang="pug">
  div.wrapper
    the-navbar
    div.container.with-nav
      TheBreadCrumbs.breadcrumbs.mt20(v-if="breadcrumbs" :breadcrumbsVal="breadcrumbs")
      error-message.mt20(v-if="UiStore.getErrorMessage")
      router-view
    div(class="footer") Footer
</template>

<!-- main layout contains navbar, wrapper of: breadcrumbs, error message (if exists)
 and component according to selected route (Catalog, Home, About Us, etc.) -->
<script setup lang="ts">
import {useCartStore} from "@/stores/CartStore";
import TheNavbar from "@/components/TheNavbar.vue";
import {useRoute} from "vue-router";
import {computed, ref, watch} from "vue";
import {useUiStore} from "@/stores/UiStore";
import TheBreadCrumbs from "@/components/ui/TheBreadCrumbs.vue";
import {load} from "@/services/api/requests";
import {categoriesType, productWithId} from "@/utils/requestTypes";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";
import {generateBreadcrumbs, getCategoryAndSubcategory} from "@/utils/breadcrumbs";

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

const cur_prod = ref({
  name: '',
  caturl: '',
  subcaturl: ''
})

/* it route selected by http query has params, information about this product store in variables to be shown in breadcrumbs  */
if (route.params.id) {
  await getProductDetails(route.params.id)
}

/* if go to product details must be gathered for breadcrumbs */
watch(route, async (): Promise<void> => {
  if (route.params.id) {
    await getProductDetails(route.params.id)
  }
})

/* to get all products, putted by user to cart earlier, from local storage to Cart store */
async function cartInit(): Promise<void> {
  CartStore.getCart()
}

getCategoryAndSubcategory(categories, route)

let breadcrumbs = computed((): string | undefined => generateBreadcrumbs(route, cur_prod, categories))

/* gather info about current product from server side to use in breadcrumbs */
async function getProductDetails(id: string | string[]): Promise<void> {
  try {
    const response = await load('/catalog.json')
    const data = response.filter((val: productWithId) => Object.keys(val)[0] === id)
    let product = data[0]
    if (product) {
      cur_prod.value.name = product[Object.keys(product)].name
      cur_prod.value.caturl = product[Object.keys(product)].category
      cur_prod.value.subcaturl = product[Object.keys(product)].subcategory
    }
  }catch (e: string | unknown){
    UiStore.setErrorMessage(e.message)
  }
}
</script>
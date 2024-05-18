<template lang="pug">
  h1 Catalog
  product-list(:products="products")
</template>

<script setup lang="ts">
import ProductList from "@/components/ProductList.vue";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import {reactive, ref, watch} from "vue";
import {useUiStore} from "@/stores/UiStore";
import {BESTSELLER_COUNT} from "@/main";
const UiStore = useUiStore()

let route = useRoute()
let router = useRouter()

const products = ref()
let all_products = ref([])

all_products.value = await fetch('/catalog.json')
    .then(response => response.json())


  if(route.query.subcategory){
    let category_products = all_products.value.filter(val => val[Object.keys(val)[0]].category === route.query.category)
    let subcategory_products = category_products.filter(val => val[Object.keys(val)[0]].subcategory === route.query.subcategory)

    products.value = subcategory_products
  } else if(route.query.category){

   let category_products = all_products.value.filter(val => val[Object.keys(val)[0]].category === route.query.category)
   products.value = category_products
   //router.push({path: "/catalog", query: {category: route.query.category}})

 }else {
   products.value = all_products.value
  }

watch(route, () => {
if(!route.query.category){
    products.value = all_products.value
  }
})


watch(UiStore, async () => {

        let category_products = all_products.value.filter(val => val[Object.keys(val)[0]].category === route.query.category)
      // .then(data => all_products = data.filter(val => val[Object.keys(val)[0]].category === route.query.category))

  if (UiStore.getShowBestsellers && route.query.subcategory) {

    let temp_products = category_products.filter(val => val[Object.keys(val)[0]].subcategory === route.query.subcategory)
    products.value = temp_products.filter(val => val[Object.keys(val)[0]].saled >= BESTSELLER_COUNT)

  }else if (UiStore.getShowBestsellers) {
    products.value = category_products.filter(val => val[Object.keys(val)[0]].saled >= BESTSELLER_COUNT)
  }else if(route.query.subcategory){
    let temp_products = category_products.filter(val => val[Object.keys(val)[0]].subcategory === route.query.subcategory)
    products.value = temp_products
  }else if(route.query.category){
    products.value = category_products
  }

})




</script>
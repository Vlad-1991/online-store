<template lang="pug">
  h1 Catalog
  product-list(:products="products")
</template>

<script setup lang="ts">
import ProductList from "@/components/ProductList.vue";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import {reactive, ref, watch} from "vue";

let route = useRoute()
let router = useRouter()

let products = reactive({})

 if(route.query.category){
   products = await fetch('/catalog.json')
       .then(response => response.json())
       .then(data => data.filter(val => val[Object.keys(val)[0]].category === route.query.category))

   router.push({path: "/catalog", query: {category: route.query.category}})

 }else {
    products = await fetch('/catalog.json')
       .then(response => response.json())

    router.push({path: "/catalog"})
  }

</script>
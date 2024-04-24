<template lang="pug">
  h1 Our Bestsellers
  product-list(:products="products")
</template>

<script setup lang="ts">
const BESTSELLER_COUNT = 10 // minimum number of bestseller sales
import ProductList from "@/components/ProductList.vue";

import {reactive} from "vue";
let products = reactive({})

products = await fetch('/catalog.json')
    .then(response => response.json())
    .then(data => data.filter(val => val[Object.keys(val)[0]].saled >= BESTSELLER_COUNT))


</script>
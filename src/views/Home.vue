<template lang="pug">
    CategorySide.category-side(:categories="UiStore.getAllCategories" :checkboxBestSeller="UiStore.getCheckboxBestSeller").mt20
    div.main-side
      h1 Our Bestsellers
      SearchProducts(@changedSearch="filterSearchedProducts")
      SortingSelector(@sorting="loadProductsHome")
      div(v-if="loading").loader
      product-list(v-else :products="searchQueryProducts")
</template>

<script setup lang="ts">
import CategorySide from "@/components/ui/CategorySide.vue";

import ProductList from "@/components/ProductList.vue";


import {computed, onMounted, ref} from "vue";
import {useUiStore} from "@/stores/UiStore";
const UiStore = useUiStore()
import {BESTSELLER_COUNT} from "@/main";
import SortingSelector from "@/components/ui/SortingSelector.vue";
import SearchProducts from "@/components/ui/SearchProducts.vue";

const products = ref()

const loading = ref(false)

const searchQuery = ref()

const searchQueryProducts = ref()

const loadProductsHome = async (sorting?: string) => {

  loading.value = true

  products.value = await fetch('/catalog.json')
      .then(response => response.json()).then(data => data.filter(val => val[Object.keys(val)[0]].saled >= BESTSELLER_COUNT))


  if (sorting) {
    switch (sorting) {

      case 'sortAZ':
        products.value.sort((a, b) => a[Object.keys(a)[0]].name.localeCompare(b[Object.keys(b)[0]].name));
        loading.value = false
        searchQueryProducts.value = products.value
        filterSearchedProducts(searchQuery.value)
        break

      case 'sortBestsellers':
        products.value.sort((a, b) => b[Object.keys(b)[0]].saled - a[Object.keys(a)[0]].saled);
        loading.value = false
        searchQueryProducts.value = products.value
        filterSearchedProducts(searchQuery.value)
        break

      case 'sortPriceLowToHigh':
        products.value.sort((a, b) => a[Object.keys(a)[0]].price - b[Object.keys(b)[0]].price);
        loading.value = false
        searchQueryProducts.value = products.value
        filterSearchedProducts(searchQuery.value)
        break

      case 'sortPriceHighToLow':
        products.value.sort((a, b) => b[Object.keys(b)[0]].price - a[Object.keys(a)[0]].price);
        loading.value = false
        searchQueryProducts.value = products.value
        filterSearchedProducts(searchQuery.value)
        break

    }
  }else{
    loading.value = false
    searchQueryProducts.value = products.value
    filterSearchedProducts(searchQuery.value)
  }

}

const filterSearchedProducts = (query: string) => {

  searchQuery.value = query

  const filteredByName = ref()
  const filteredByDescription = ref()

  filteredByName.value = products.value.filter((product) => {
    if(searchQuery.value){
      return ((product[Object.keys(product)].name.toLowerCase()).includes(searchQuery.value.toLowerCase()))
    }
    return product
  })

  filteredByDescription.value = products.value.filter((product) => {
    if(searchQuery.value){
      return ((product[Object.keys(product)].description.toLowerCase()).includes(searchQuery.value.toLowerCase()))
    }
    return product
  })

  searchQueryProducts.value = Array.from(new Set(filteredByName.value.concat(filteredByDescription.value)))
}

onMounted(async (): Promise<void> => {
  loading.value = true

 await loadProductsHome()

  loading.value = false
})


</script>
<template lang="pug">
  div
    ToggleSidebar(@toggleSideBar="UiStore.toggleSidebar()")
    CategorySide.category-side(:categories="UiStore.getAllCategories" :checkboxBestSeller="UiStore.getCheckboxBestSeller"
      :style="{left: UiStore.sidebar}").mt20
    div.main-side
      h1.ml20 Our Bestsellers
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
import ToggleSidebar from "@/components/ui/ToggleSidebar.vue";
import {load} from "@/services/api/requests";
import {productWithId} from "@/utils/requestTypes";

const products = ref()

const loading = ref(false)

const searchQuery = ref()

const searchQueryProducts = ref()

// console.log(searchQueryProducts)

const loadProductsHome = async (sorting?: string): Promise<void> => {

  loading.value = true

  // products.value = await fetch('/catalog.json')
  //     .then(response => response.json()).then(data => data.filter(val => val[Object.keys(val)[0]].saled >= BESTSELLER_COUNT))

  try {
    products.value = await load('/catalog.json')
    products.value = products.value.filter(val => val[Object.keys(val)[0]].saled >= BESTSELLER_COUNT)

    if (sorting) {
      switch (sorting) {

        case 'sortAZ':
          products.value.sort((a: productWithId, b: productWithId) => a[Object.keys(a)[0]].name.localeCompare(b[Object.keys(b)[0]].name));
          loading.value = false
          searchQueryProducts.value = products.value
          filterSearchedProducts(searchQuery.value)
          break

        case 'sortBestsellers':
          products.value.sort((a: productWithId, b: productWithId) => b[Object.keys(b)[0]].saled - a[Object.keys(a)[0]].saled);
          loading.value = false
          searchQueryProducts.value = products.value
          filterSearchedProducts(searchQuery.value)
          break

        case 'sortPriceLowToHigh':
          products.value.sort((a: productWithId, b: productWithId) => parseFloat(a[Object.keys(a)[0]].price) - parseFloat(b[Object.keys(b)[0]].price));
          loading.value = false
          searchQueryProducts.value = products.value
          filterSearchedProducts(searchQuery.value)
          break

        case 'sortPriceHighToLow':
          products.value.sort((a: productWithId, b: productWithId) => parseFloat(b[Object.keys(b)[0]].price) - parseFloat(a[Object.keys(a)[0]].price));
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
  }catch (e: string | unknown) {
    UiStore.setErrorMessage(e.message)
  }


}

const filterSearchedProducts = (query: string): void => {

  searchQuery.value = query

  const filteredByName = ref()
  const filteredByDescription = ref()

  filteredByName.value = products.value.filter((product: productWithId): productWithId => {
    if(searchQuery.value){
      return ((product[Object.keys(product)].name.toLowerCase()).includes(searchQuery.value.toLowerCase()))
    }
    return product
  })

  filteredByDescription.value = products.value.filter((product: productWithId): productWithId => {
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
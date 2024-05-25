<template lang="pug">
  CategorySide.category-side(:categories="categories" :checkboxBestSeller="checkboxBestSeller"
    @showBestSellers="changeShowBestsellers" @showCategory="showProductsInCategory" @showSubCategory="showProductsInSubCategory").mt20
  div.main-side
    h1 Catalog
    SearchProducts(@changedSearch="filterSearchedProducts")
    SortingSelector(@sorting="loadProductsCatalog")
    div(v-if="loading").loader
    product-list(v-else :products="searchQueryProducts")
</template>

<script setup lang="ts">
import ProductList from "@/components/ProductList.vue";
import {useRoute} from "vue-router";
import {useRouter} from "vue-router";
import {onMounted, reactive, ref, watch} from "vue";
import {useUiStore} from "@/stores/UiStore";
import {BESTSELLER_COUNT} from "@/main";
import CategorySide from "@/components/ui/CategorySide.vue";
import SortingSelector from "@/components/ui/SortingSelector.vue";
import SearchProducts from "@/components/ui/SearchProducts.vue";
const UiStore = useUiStore()

let route = useRoute()
let router = useRouter()

const products = ref()
const all_products = ref([])

const showBestseller = ref<boolean>(false) // value of checkbox bestseller
const checkboxBestSeller = ref<boolean>(false) // show checkbox on left sidebar

const loading = ref(false)

const searchQuery = ref()
const searchQueryProducts = ref()

  const loadProductsCatalog = async (sorting?: string) => {

    loading.value = true

    all_products.value = await fetch('/catalog.json')
        .then(response => response.json())

    if(route.query.subcategory){
      checkboxBestSeller.value = true
      let category_products = all_products.value.filter(val => val[Object.keys(val)[0]].category === route.query.category)
      let subcategory_products = category_products.filter(val => val[Object.keys(val)[0]].subcategory === route.query.subcategory)

      products.value = subcategory_products
      if (UiStore.getShowBestsellers) {
        checkboxBestSeller.value = true
        products.value = products.value.filter(val => val[Object.keys(val)[0]].saled >= BESTSELLER_COUNT)
      }

      } else if(route.query.category){
      checkboxBestSeller.value = true
      let category_products = all_products.value.filter(val => val[Object.keys(val)[0]].category === route.query.category)
      products.value = category_products

      if (UiStore.getShowBestsellers) {
        checkboxBestSeller.value = true
        products.value = category_products.filter(val => val[Object.keys(val)[0]].saled >= BESTSELLER_COUNT)
      }

    }else {
      checkboxBestSeller.value = false
      products.value = all_products.value
    }

    if (sorting) {
      switch (sorting) {

        case 'sortAZ':
          products.value.sort((a, b) => a[Object.keys(a)[0]].name.localeCompare(b[Object.keys(b)[0]].name))
          loading.value = false
          searchQueryProducts.value = products.value
          filterSearchedProducts(searchQuery.value)
          break

        case 'sortBestsellers':
          products.value.sort((a, b) => b[Object.keys(b)[0]].saled - a[Object.keys(a)[0]].saled)
          loading.value = false
          searchQueryProducts.value = products.value
          filterSearchedProducts(searchQuery.value)
          break

        case 'sortPriceLowToHigh':
          products.value.sort((a, b) => a[Object.keys(a)[0]].price - b[Object.keys(b)[0]].price)
          loading.value = false
          searchQueryProducts.value = products.value
          filterSearchedProducts(searchQuery.value)
          break

        case 'sortPriceHighToLow':
          products.value.sort((a, b) => b[Object.keys(b)[0]].price - a[Object.keys(a)[0]].price)
          loading.value = false
          searchQueryProducts.value = products.value
          filterSearchedProducts(searchQuery.value)
          break

      }
    }else {
      loading.value = false
      searchQueryProducts.value = products.value
      filterSearchedProducts(searchQuery.value)
    }

  }

onMounted(async (): Promise<void> => {
  loading.value = true

  await loadProductsCatalog()

  loading.value = false
})



watch(route, () => {
if(!route.query.category){
  checkboxBestSeller.value = false
    products.value = all_products.value
  }
})

let categories = [Object]
categories = await fetch('/categories.json')
    .then(response => response.json())


categories.sort((a, b) => Object.keys(a)[0] > Object.keys(b)[0] ? 1 : -1)
// categories.sort((a, b) => a.category > b.category ? 1 : -1)



const changeShowBestsellers = () => {
  UiStore.changeShowBestsellers()
}

const showProductsInCategory = (payload) => {

  let category_products = all_products.value.filter(val => val[Object.keys(val)[0]].category === payload.cat)
  // .then(data => all_products = data.filter(val => val[Object.keys(val)[0]].category === route.query.category))

  if (UiStore.getShowBestsellers) {
    checkboxBestSeller.value = true
    products.value = category_products.filter(val => val[Object.keys(val)[0]].saled >= BESTSELLER_COUNT)
  } else {
    checkboxBestSeller.value = true
    products.value = category_products
  }

  searchQueryProducts.value = products.value
  filterSearchedProducts(searchQuery.value)

}

const showProductsInSubCategory = (payload) => {

  let category_products = all_products.value.filter(val => val[Object.keys(val)[0]].category === payload.cat)
  // .then(data => all_products = data.filter(val => val[Object.keys(val)[0]].category === route.query.category))
  let temp_products = category_products.filter(val => val[Object.keys(val)[0]].subcategory === payload.subcat)

  if (UiStore.getShowBestsellers) {
    checkboxBestSeller.value = true
    products.value = temp_products.filter(val => val[Object.keys(val)[0]].saled >= BESTSELLER_COUNT)

  }else{
    checkboxBestSeller.value = true
    products.value = temp_products

  }

  searchQueryProducts.value = products.value
  filterSearchedProducts(searchQuery.value)

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


</script>
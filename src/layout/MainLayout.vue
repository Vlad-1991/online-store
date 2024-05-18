<template lang="pug">
  div.wrapper
    the-navbar
    div.container.with-nav
      div(class="category-side")
        h1 Categories
        ul(class="list list-default")
          li(v-for="category in categories" :key="Object.keys(category)[0]" class="li-border")
            router-link.category(:to="`/catalog?category=${Object.keys(category)[0]}`"
              :class="$route.query.category === Object.keys(category)[0] ? 'active_category' : ''") {{category[Object.keys(category)[0]].text}}

            li.subcat(v-for="subcat in category[Object.keys(category)[0]].subcategory" :key="subcat.url")
              router-link.category(:to="`/catalog?category=${Object.keys(category)[0]}&subcategory=${subcat.url}`"
                :class="$route.query.subcategory === subcat.url ? 'active_category' : ''") {{subcat.text}}

          li.show-bestseller(v-if="checkboxBestSeller")
            input(type="checkbox" id="bestseller" v-model="showBestseller" @click="changeShowBestsellers()")
            label(for="bestseller") Bestseller
      div(class="main-side")
        TheBreadCrumbs(:breadcrumbsVal="breadcrumbs")
        router-view
    div(class="footer") Footer
</template>

<script setup lang="ts">
import {useCartStore} from "@/stores/CartStore";
import TheNavbar from "@/components/TheNavbar.vue";
import {useRoute} from "vue-router";
import {computed, ref, watch} from "vue";
import {useUiStore} from "@/stores/UiStore";
import TheBreadCrumbs from "@/components/ui/TheBreadCrumbs.vue";
const route = useRoute()

const UiStore = useUiStore()

const CartStore = useCartStore()

await cartInit()

const showBestseller = ref<boolean>(false) // value of checkbox bestseller
const checkboxBestSeller = ref<boolean>(false) // show checkbox on left sidebar

let categories = [Object]
categories = await fetch('/categories.json')
    .then(response => response.json())

categories.sort((a, b) => a.category > b.category ? 1 : -1);

const changeShowBestsellers = () => {
  UiStore.changeShowBestsellers()
}

let cur_prod_name = ref()

if(route.params.id){
  await getProductName(route.params.id)
}

watch(route, async () => {

  if(route.params.id){
    await getProductName(route.params.id)
  }
})

async function cartInit(){
  CartStore.getCart()
}

const getCategoryAndSubcategory = () => {
  let current_category = ''
  let current_subcategory = ''
  let subcategories_array = [{}]
  categories.forEach(cat => {
    if (Object.keys(cat)[0] === route.query.category) {
      current_category = cat[Object.keys(cat)[0]].text
      subcategories_array = cat[Object.keys(cat)[0]].subcategory
    }
  })

  subcategories_array.forEach(subcat => {
    if (subcat.url === route.query.subcategory) {
      current_subcategory = subcat.text
    }
  })

  UiStore.writeCategoryInfo({cat: current_category, subcat: current_subcategory})
}

getCategoryAndSubcategory()
const categoriesInfo = ref({cat: '', subcat: ''})



let breadcrumbs = computed(() => {
      if (route.name !== 'Home' && !route.query.category && route.name !== 'Product') {
        checkboxBestSeller.value = false
        return "Home > " + route.name
      }else if (route.name === 'Catalog' && route.query.subcategory) {

        checkboxBestSeller.value = true
        getCategoryAndSubcategory()
        categoriesInfo.value.cat = UiStore.getCategory
        categoriesInfo.value.subcat = UiStore.getSubcategory
       // categoriesInfo.value = getCategoryAndSubcategory()


        return "Home > " + route.name + " > " + categoriesInfo.value.cat + " > " + categoriesInfo.value.subcat
      } else if (route.name === 'Catalog' && route.query.category) {

        checkboxBestSeller.value = true
        getCategoryAndSubcategory()
        categoriesInfo.value.cat = UiStore.getCategory
        categoriesInfo.value.subcat = UiStore.getSubcategory

        return "Home > " + route.name + " > " + categoriesInfo.value.cat
      } else if (route.name === 'Product' && route.params.id) {
        checkboxBestSeller.value = false
        console.log(categories)
        return "Home > " + route.name + " > " + UiStore.getCategory + " > " + UiStore.getSubcategory + " > " + cur_prod_name.value
      }
    }
)

async function getProductName(id: string){
      await fetch('/catalog.json')
      .then(response => response.json())
      .then(data => data.filter(val => Object.keys(val)[0] === route.params.id)).then(products => {
        let product = products[0]
        cur_prod_name.value = product[Object.keys(product)].name
      })}

const loadBestsellersInCategory = () => {

}


</script>
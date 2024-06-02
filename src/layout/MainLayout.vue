<template lang="pug">
  div.wrapper
    the-navbar
    div.container.with-nav
      TheBreadCrumbs.breadcrumbs.mt20(v-if="breadcrumbs" :breadcrumbsVal="breadcrumbs")
      error-message.mt20(v-if="UiStore.getErrorMessage")
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
import {load} from "@/services/api/requests";
import {categoriesType, catType, productWithId, subcategoryType} from "@/utils/requestTypes";
import ErrorMessage from "@/components/ui/ErrorMessage.vue";

const route = useRoute()

const UiStore = useUiStore()

const CartStore = useCartStore()

await cartInit()
let response



// let response = await fetch('/categories.json')
//      .then(response => response.json())
try {
  response = await load('/categories.json')
  response.sort((a: categoriesType, b: categoriesType) => Object.keys(a)[0] > Object.keys(b)[0] ? 1 : -1)
  UiStore.pushCategories(response)
}catch (e: string | unknown){
    UiStore.setErrorMessage(e.message)
}


// // console.log(response)
// if(response){
//
// }


let categories = UiStore.getAllCategories

let cur_prod = ref({
  name: '',
  caturl: '',
  subcaturl: ''
})

if (route.params.id) {
  await getProductDetails(route.params.id)
}

watch(route, async (): Promise<void> => {

  if (route.params.id) {
    await getProductDetails(route.params.id)
  }
})

async function cartInit(): Promise<void> {
  CartStore.getCart()
}

const getCategoryAndSubcategory = (): void => {
  let current_category = ''
  let current_subcategory = ''
  let subcategories_array = [{}]
  categories.forEach((cat: catType): void => {
    if (Object.keys(cat)[0] === route.query.category) {
      current_category = cat[Object.keys(cat)[0]].text
      subcategories_array = cat[Object.keys(cat)[0]].subcategory
    }
  })

  subcategories_array.forEach((subcat: subcategoryType): void => {
    if (subcat.url === route.query.subcategory) {
      current_subcategory = subcat.text
    }
  })

  UiStore.writeCategoryInfo({cat: current_category, subcat: current_subcategory})
}

getCategoryAndSubcategory()
const categoriesInfo = ref({cat: '', subcat: ''})


let breadcrumbs = computed((): string | undefined => {
      if (route.name !== 'Home' && !route.query.category && route.name !== 'Product') {

        return `<a href=\"/\" class=\"link\">Home</a><span> > </span><a href=\"${route.path}\" class="link active_category">${route.name}</a>`
      } else if (route.name === 'Catalog' && route.query.subcategory) {
        getCategoryAndSubcategory()
        categoriesInfo.value.cat = UiStore.getCategory
        categoriesInfo.value.subcat = UiStore.getSubcategory


        return `<a href="/" class="link">Home</a><span> > </span><a href="${route.path}" class="link">${route.name}</a>
        <span> > </span><a href="/catalog?category=${route.query.category}" class="link">${categoriesInfo.value.cat}</a>
        <span> > </span><a href="/catalog?category=${route.query.category}&subcategory=${route.query.subcategory}" class="link active_category">
        ${categoriesInfo.value.subcat}</a>`
      } else if (route.name === 'Catalog' && route.query.category) {

        getCategoryAndSubcategory()
        categoriesInfo.value.cat = UiStore.getCategory
        categoriesInfo.value.subcat = UiStore.getSubcategory
        return `<a href="/" class="link">Home</a><span> > </span><a href="${route.path}" class="link">${route.name}</a>
        <span> > </span><a href="/catalog?category=${route.query.category}" class="link active_category">${categoriesInfo.value.cat}</a>`

      } else if (route.name === 'Product' && route.params.id) {
        categoriesInfo.value.cat = UiStore.getCategory
        categoriesInfo.value.subcat = UiStore.getSubcategory


        if (categoriesInfo.value.cat && categoriesInfo.value.subcat) {
          return `<a href="/" class="link">Home</a><span> > </span><a href="/catalog" class="link">Catalog</a>
        <span> > </span><a href="/catalog?category=${cur_prod.value.caturl}" class="link">${categoriesInfo.value.cat}</a>
        <span> > </span><a href="/catalog?category=${cur_prod.value.caturl}&subcategory=${cur_prod.value.subcaturl}" class="link">
        ${categoriesInfo.value.subcat}</a><span> > </span><a href="/product/${route.params.id}" class="link active_category">
        ${cur_prod.value.name}</a>`
        } else {
          return `<a href="/" class="link">Home</a><span> > </span><a href="/catalog" class="link">Catalog</a>`
        }

      }
    }
)

async function getProductDetails(id: string | string[]): Promise<void> {
  try {
    const response = await load('/catalog.json')
    const data = response.filter((val: productWithId) => Object.keys(val)[0] === route.params.id)
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
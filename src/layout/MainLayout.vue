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
      div(class="main-side")
        div.breadcrumbs {{breadcrumbs}}
        router-view
    div(class="footer") Footer
</template>

<script setup lang="ts">
import TheNavbar from "@/components/TheNavbar.vue";
import {RouteParamValue, useRoute} from "vue-router";
import {computed, reactive, ref, watch} from "vue";
const route = useRoute()

let categories = [Object]
categories = await fetch('/categories.json')
    .then(response => response.json())

categories.sort((a, b) => a.category > b.category ? 1 : -1);



 let cur_id = ref<any>()
 cur_id.value = route.params.id

let product_name
//
 if(cur_id.value){
   await getProductName(cur_id.value)

 }



// let products = await getAllProducts()

console.log(product_name)

// let breadcrumbs_product = computed(() => {
//   if(route.name === 'Product' && route.params.id){
//     products = products.filter(val => Object.keys(val)[0] === route.params.id)
//     let product = products[0]
//
//     return product[Object.keys(product)].name
//   }
// })


//watch (() => route.params.id, console.log('yes'))

let breadcrumbs = computed(() => {
  if (route.name !== 'Home' && !route.query.category && route.name !== 'Product') {
    return "Home > " + route.name
  } else if (route.name === 'Catalog' && route.query.category) {

    let current_category
    categories.forEach(cat => {
      if (Object.keys(cat)[0] === route.query.category) {
        current_category = cat[Object.keys(cat)[0]].text
      }
    })
    return "Home > " + route.name + " > " + current_category
  } else if (route.name === 'Product' && route.params.id) {
     return "Home > " + route.name + " > " + product_name
  }
})


//
// async function getAllProducts(){
//   let products = await fetch('/catalog.json')
//       .then(response => response.json())
//   return products
// }

async function getProductName(id: string){
      await fetch('/catalog.json')
      .then(response => response.json())
      .then(data => data.filter(val => Object.keys(val)[0] === route.params.id)).then(products => {
        let product = products[0]
        // console.log(product[Object.keys(product)].name)
        product_name = product[Object.keys(product)].name

      })
  //
  // if(products){
  //   let product = products[0]
  //  // console.log(product[Object.keys(product)].name)
  //   cur_prod_name = product[Object.keys(product)].name
  //   console.log(cur_prod_name)
  //  // return product[Object.keys(product)].name
  // }else{
  //   return false
  // }


}


// console.log(route.name)
// console.log(route.params.id)


</script>
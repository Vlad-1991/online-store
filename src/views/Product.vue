<template lang="pug">
  div.product(v-if="product")
    h1 {{ product[Object.keys(product)].name }}
    div.image_card
      div
        img(:src="product[Object.keys(product)].image" class="card-image")
      div
        h1.price ${{product[Object.keys(product)].price}}
        button.btn.danger.add_to_cart Add to Cart
    div.description(v-html="product[Object.keys(product)].description")
  div(v-else)
    h1 There are no this product
    router-link(to="/catalog") Back to Catalog


</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
let route = useRoute()

let product = ref()
let errorMessage: string


  let products = await fetch('/catalog.json')
      .then(response => response.json())
      .then(data => data.filter(val => Object.keys(val)[0] === route.params.id))

product = products[0]

//console.log(product)

</script>

<template lang="pug">
  div.flex-row
    div(class="flex-col" v-for="product in products" :key="Object.keys(product)[0]")
      div.card-flex
        div.card-body-my
          router-link(:to="`/product/${product[Object.keys(product)[0]].id}`")
            h4 {{product[Object.keys(product)[0]].name}}
          div
            img(:src="product[Object.keys(product)[0]].image[0].thumbnailURL" class="card-image")
          h3 ${{product[Object.keys(product)[0]].price}}
          router-link(:to="`/product/${product[Object.keys(product)[0]].id}`")
            button.btn.danger Read more
</template>

<!-- this component renders all products, selected in upper component (Catalog, Home), can be sorted and filtered in upper component
 products have a visual box with name of product, main thumb image, price and button to "read more" -->
<script setup lang="ts">
import {productType} from "@/utils/requestTypes";
const props = defineProps<{products?: productType}>()
</script>

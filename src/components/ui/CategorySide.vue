<template lang="pug">
  div
    h1 Categories
    ul(class="list list-default")
      li(v-for="category in categories" :key="Object.keys(category)[0]" class="li-border")
        router-link.category(:to="`/catalog?category=${Object.keys(category)[0]}`"
          :class="$route.query.category === Object.keys(category)[0] ? 'active_category' : ''"
          @click="$emit('showCategory', {cat: Object.keys(category)[0]})") {{category[Object.keys(category)[0]].text}}

        li.subcat(v-for="subcat in category[Object.keys(category)[0]].subcategory" :key="subcat.url")
          router-link.category(:to="`/catalog?category=${Object.keys(category)[0]}&subcategory=${subcat.url}`"
            :class="$route.query.subcategory === subcat.url ? 'active_category' : ''"
            @click="$emit('showSubCategory', {cat: Object.keys(category)[0], subcat: subcat.url})") {{subcat.text}}

      li.show-bestseller(v-if="checkboxBestSeller")
        input(type="checkbox" id="bestseller" @click="toShowBestSellers")
        label(for="bestseller") Bestseller
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useRoute} from "vue-router";
let route = useRoute()

const props = defineProps<{
  categories: [],
  checkboxBestSeller: boolean
}>()

const emit = defineEmits(['showBestSellers', 'showCategory', 'showSubCategory'])

const toShowBestSellers = () => {
  emit('showBestSellers')
  if(route.query.subcategory){
    emit('showSubCategory', {cat: route.query.category, subcat: route.query.subcategory})
  }else{
    emit('showCategory', {cat: route.query.category})
  }
}

//const showBestseller = ref<boolean>(false) // value of checkbox bestseller
</script>
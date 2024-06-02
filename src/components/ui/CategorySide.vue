<template lang="pug">
  div
    h1.mt50 Categories
    ul(class="list list-default")
      li(v-for="(category, index) in categories" :key="Object.keys(category)[0]" class="li-border")
        div.categories-flex
          router-link.category.inline-block.w100.li-highlight(:to="`/catalog?category=${Object.keys(category)[0]}`"
            :class="$route.query.category === Object.keys(category)[0] ? 'active_category' : ''"
            @click="$emit('showCategory', {cat: Object.keys(category)[0]})") {{category[Object.keys(category)[0]].text}}
          //div.button-container
          //  button.cat-button(:class="switched ? 'opened' : 'closed'" @click="switchCatButton")
          //    span.arrow &#9660;
          span.button-cat(:class="switched[index] ? 'opened' : 'closed'" @click="switchCatButton(index)") ^

        li.subcat.li-highlight(v-if="switched[index]" v-for="subcat in category[Object.keys(category)[0]].subcategory" :key="subcat.url")
          router-link.category.block.w100.li-highlight(:to="`/catalog?category=${Object.keys(category)[0]}&subcategory=${subcat.url}`"
            :class="$route.query.subcategory === subcat.url ? 'active_category' : ''"
            @click="$emit('showSubCategory', {cat: Object.keys(category)[0], subcat: subcat.url})") {{subcat.text}}

      li.show-bestseller(v-if="checkboxBestSeller")
        input(type="checkbox" id="bestseller" @click="toShowBestSellers")
        label(for="bestseller") Bestseller
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {useRoute} from "vue-router";
import {categoriesType} from "@/utils/requestTypes";
let route = useRoute()

const props = defineProps<{
  categories: [categoriesType],
  checkboxBestSeller: boolean
}>()

// console.log(props.categories)

const emit = defineEmits(['showBestSellers', 'showCategory', 'showSubCategory'])

const toShowBestSellers = (): void => {
  emit('showBestSellers')
  if(route.query.subcategory){
    emit('showSubCategory', {cat: route.query.category, subcat: route.query.subcategory})
  }else{
    emit('showCategory', {cat: route.query.category})
  }
}
const switched: Ref<boolean[]> = ref([])
for(let i = 0; i < props.categories.length; i++){
  switched.value[i] = false
}

// console.log(switched.value)

const switchCatButton = (index: number): void => {
  switched.value[index] = !switched.value[index]
  // switched.value = !switched.value
}



//const showBestseller = ref<boolean>(false) // value of checkbox bestseller
</script>
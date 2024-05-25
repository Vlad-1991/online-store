<template lang="pug">
  CategorySide.category-side(:categories="UiStore.getAllCategories" :checkboxBestSeller="UiStore.getCheckboxBestSeller").mt20
  div.main-side
    h1 About Us
</template>

<script setup>
import {useUiStore} from "@/stores/UiStore";
import CategorySide from "@/components/ui/CategorySide.vue";
const UiStore = useUiStore()
</script>
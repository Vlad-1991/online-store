<template lang="pug">
  CategorySide.category-side(:categories="UiStore.getAllCategories" :checkboxBestSeller="UiStore.getCheckboxBestSeller").mt20
  div.main-side
    div
    h1 Help
</template>

<script setup lang="ts">
import {useUiStore} from "@/stores/UiStore";
const UiStore = useUiStore()

import CategorySide from "@/components/ui/CategorySide.vue";
</script>
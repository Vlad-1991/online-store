<template lang="pug">
  ToggleSidebar(@toggleSideBar="UiStore.toggleSidebar()")
  CategorySide.category-side(:categories="UiStore.getAllCategories" :checkboxBestSeller="UiStore.getCheckboxBestSeller"
    :style="{left: UiStore.sidebar}").mt20
  div.main-side
    h1.ml20 Help
</template>

<script setup lang="ts">
import {useUiStore} from "@/stores/UiStore";
const UiStore = useUiStore()

import CategorySide from "@/components/ui/CategorySide.vue";
import ToggleSidebar from "@/components/ui/ToggleSidebar.vue";
</script>
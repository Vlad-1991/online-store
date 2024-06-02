<template lang="pug">
  ToggleSidebar(@toggleSideBar="UiStore.toggleSidebar()")
  CategorySide.category-side(:categories="UiStore.getAllCategories" :checkboxBestSeller="UiStore.getCheckboxBestSeller"
    :style="{left: UiStore.sidebar}").mt20
  div.main-side
    h1.ml20 About Us
</template>

<script setup>
import {useUiStore} from "@/stores/UiStore";
import CategorySide from "@/components/ui/CategorySide.vue";
import ToggleSidebar from "@/components/ui/ToggleSidebar.vue";
const UiStore = useUiStore()
</script>
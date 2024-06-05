<template lang="pug">
  div.breadcrumbs(v-html="breadcrumbsVal")
</template>

<!-- simple component to render row of breadcrumbs from current route
 breadcrumbs in string format, but converted to html code by directive v-html, which contains links to all levels of route -->
<script setup lang="ts">
const props = defineProps<{breadcrumbsVal: string}>()
</script>
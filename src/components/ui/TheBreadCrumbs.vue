<template lang="pug">
  div.breadcrumbs(v-html="breadcrumbsVal")
</template>

<script setup lang="ts">
const props = defineProps<{breadcrumbsVal: string}>()
</script>
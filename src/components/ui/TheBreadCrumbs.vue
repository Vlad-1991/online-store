<template lang="pug">
  div.breadcrumbs {{breadcrumbsVal}}
</template>

<script setup lang="ts">
const props = defineProps<{breadcrumbsVal: string}>()
</script>
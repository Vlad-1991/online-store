<template lang="pug">
  div.mb20.form-control.searchquery
    label(for="search") Search products:
    input(type="text" id="search" v-model="searchQuery" @input="emit('changedSearch', searchQuery)")
</template>

<script setup lang="ts">
import {ref} from "vue";
const searchQuery = ref()
const emit = defineEmits(['changedSearch'])
</script>
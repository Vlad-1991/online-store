<template lang="pug">
  Suspense
    component(:is="layout" v-if="layout")
</template>

<script setup lang="ts">

import {RouteMeta, useRoute} from "vue-router";
import {computed} from "vue";
const route = useRoute()

let layout = computed((): (RouteMeta | unknown) => route.meta.layout)
</script>
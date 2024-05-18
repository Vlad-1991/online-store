<template lang="pug">
  Suspense
    component(:is="layout" v-if="layout")
</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {useUiStore} from "@/stores/UiStore";
import {computed, ref} from "vue";

const route = useRoute()

let layout = computed(() => route.meta.layout)



</script>
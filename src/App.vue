<template lang="pug">
  Suspense
    component(:is="layout" v-if="layout")
</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import AuthLayout from "@/layout/AuthLayout.vue";
import MainLayout from "@/layout/MainLayout.vue";

const route = useRoute()

let layout = MainLayout


</script>
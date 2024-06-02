<template lang="pug">
  div.card.alert.danger
    h3.center.red {{UiStore.getErrorMessage}}
</template>

<script setup lang="ts">
import {useUiStore} from "@/stores/UiStore";
const UiStore = useUiStore()

</script>
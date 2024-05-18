<template lang="pug">
  div(class="modal-backdrop")
  div.modal
    h3.center(v-if="title") {{ title }}
    div.center.mb50
      slot
    div.center.mt10
      button.primary.btn(@click="returnToCatalog()") Ok
</template>

<script setup lang="ts">
import router from "@/router";

const emit = defineEmits(['close'])
const props = defineProps<{title: string}>()

let returnToCatalog = () => {
  emit('close')
  router.push('/catalog')
}
</script>
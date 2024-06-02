<template lang="pug">
  div.toggle-button(@click="emit('toggleSideBar')")
    div.bar
    div.bar
    div.bar
</template>

<script setup lang="ts">
const emit = defineEmits(['toggleSideBar'])
</script>
<template lang="pug">
  div(:id="galleryID" )
    a(
        v-for="(image, key) in imagesData"
        :key="key"
        :href="image.largeURL"
        :data-pswp-width="image.width"
        :data-pswp-height="image.height"
        target="_blank"
        rel="noreferrer")
      img(:src="imagesData[0].largeURL" alt="" v-if="key === 0" @load="$emit('imgLoaded')")
</template>

<script setup lang="ts">
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import {onMounted, onUnmounted} from "vue";

const props = defineProps<{
  galleryID: string,
  images: []
}>()

const emit = defineEmits(['imgLoaded'])

let lightbox

const imagesData = props.images

onMounted(() => {
  if (!lightbox) {
    lightbox = new PhotoSwipeLightbox({
      gallery: '#' + props.galleryID,
      children: 'a',
      pswpModule: () => import('photoswipe'),
    });
    lightbox.init();
  }
})

onUnmounted(() => {
    if (lightbox) {
      lightbox.destroy();
      lightbox = null;
    }
  })
</script>
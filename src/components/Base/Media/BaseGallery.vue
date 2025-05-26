<template>
  <FsLightbox
    :toggler="isOpen"
    :sources="images"
    type="image"
    :slide="activeIdx"
  />
</template>

<script lang="ts" setup>
import FsLightbox from "fslightbox-vue/v3";
import {onMounted, watch} from "vue";

type Props = {
  images: {
    name: string;
    type: "image" | "video";
    link: string;
  }[];
  activeIdx?: number;
};

defineProps<Props>();

const isOpen = defineModel<boolean>({
  required: true,
});



</script>

<style>
.fslightbox-absoluted img{
  min-height: 100vh !important;
  min-width: 100vw !important;
}
</style>

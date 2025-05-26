<template>
  <FsLightbox
    :toggler="isOpen"
    :sources="images"
    type="image"
    :types="images.map((m) => m.type)"
  />
</template>

<script lang="ts" setup>
import FsLightbox from "fslightbox-vue/v3";

type Props = {
  images: {
    name: string;
    type: "image" | "video";
    link: string;
  }[];
};

defineProps<Props>();

const isOpen = defineModel<boolean>({
  required: true,
});
</script>

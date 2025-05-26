<template>
  <div
      :class="[sizeClasses, avatarClass]"
      class="rounded-full shrink-0 m-r-8 flex-center"
  >
    <BaseAvatar :image="images?.[0]"/>
    <div
        v-if="moreCount"
        :class="sizeClasses"
        class="shadow-and-border flex items-center justify-center font-bold text-md rounded-md top-0 bottom-0 w-full h-full bg-blue text-white shrink-0 -ml-3"
    >
      +{{ moreCount }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

import type {TClassName} from "@/types/common";
import {BaseAvatar} from "@/components/Base";

interface Props {
  images: string[];
  size?: "xs" | "sm" | "md" | "lg";
  avatarClass?: TClassName;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "sm",
  avatarClass: undefined,
});

const moreCount = computed(() => props.images.length - 1);

const sizeClasses = computed(() => {
  const size = props.size;
  return {
    "size-8": size === "sm",
    "size-9": size === "md",
    "size-24": size === "lg",
  };
});
</script>

<style>
.shadow-and-border {
  box-shadow: -4px 0px 24px 0px rgba(39, 194, 143, 0.24);
  border: 1px solid rgba(255, 255, 255, 0.24);
}
</style>

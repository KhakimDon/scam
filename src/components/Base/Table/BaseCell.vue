<template>
  <div class="flex-y-center gap-3">
    <slot name="image">
      <BaseAvatar
          v-if="image"
          :avatar-class="`rounded-${
          rounded !== 'default' ? 'full' : 'lg'
        } ${imageClass}`"
          :image
          :size="imageSize"
          class="after:hidden border border-gray-1/20"
      />
    </slot>

    <div :class="[wrpClass]" class="grid">
      <slot name="title">
        <span
            :class="[titleClass]"
            class="text-sm text-black"
            v-html="highlightedTitle"
        />
      </slot>
      <span v-if="Boolean(info)" :class="infoClass" class="text-xs text-gray-1">
        {{ info }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed} from "vue";

import {BaseAvatar} from "@/components/Base";
import type {CellProps} from "@/types/components";

const props = withDefaults(defineProps<CellProps>(), {
  wrpClass: "",
  infoClass: "",
  titleClass: "",
  info: "",
  image: "",
  query: "",
  rounded: "default",
  imageClass: "",
});

const highlightedTitle = computed(() => {
  if (!props.query || !props.title) return props.title;

  const regex = new RegExp(`(${props.query})`, "gi");
  return props.title.replace(regex, '<span class="highlight">$1</span>');
});
</script>

<style>
.highlight {
  @apply bg-orange text-white rounded px-px;
}
</style>

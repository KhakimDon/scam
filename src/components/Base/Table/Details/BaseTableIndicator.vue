<script lang="ts" setup>
import type {TableStatusIndicator} from "@/types/components";

interface Props {
  colors: TableStatusIndicator["colors"];
}

defineProps<Props>();
</script>

<template>
  <div class="flex gap-4 w-full">
    <div
        v-for="(item, index) in colors"
        :key="index"
        class="flex items-center gap-2"
    >
      <div
          :class="item.color"
          class="h-4 w-4 border-[3px] rounded-full indicator"
      />
      <span class="text-xs font-medium">
        {{ item.label }}
      </span>
    </div>
  </div>
</template>

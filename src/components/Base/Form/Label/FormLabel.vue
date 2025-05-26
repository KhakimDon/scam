<template>
  <label
      :class="labelClass"
      :for="forText"
      class="text-sm leading-normal text-gray-1"
  >
    {{ label }} <span v-if="required">*</span>
  </label>
</template>
<script lang="ts" setup>
import type {TClassName} from "@/types/common";

interface Props {
  label?: string;
  labelClass?: TClassName;
  forText?: string;
  required?: boolean;
}

defineProps<Props>();
</script>

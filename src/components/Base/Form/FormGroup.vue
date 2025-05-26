<template>
  <div class="flex flex-col gap-2 w-full">
    <div :class="labelWrapperClass" class="flex-center-between w-full">
      <FormLabel
          :label="$t(label)"
          :label-class="labelClass"
          v-bind="{ forText, required }"
      />
      <slot name="labelOpposite"/>
    </div>
    <slot/>
  </div>
</template>

<script lang="ts" setup>
import {defineComponent} from "vue";

import FormLabel from "@/components/Base/Form/Label/FormLabel.vue";
import type {TClassName} from "@/types/common";

defineComponent({
  name: "FormGroup",
});

interface Props {
  label?: string;
  required?: boolean;
  forText?: string;
  labelClass?: TClassName;
  labelWrapperClass?: TClassName;
}

withDefaults(defineProps<Props>(), {
  label: "",
});
</script>

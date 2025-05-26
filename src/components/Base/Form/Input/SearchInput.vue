<template>
  <FormInput
      v-model="value"
      v-bind="{ ...$props, placeholder: $t('form.search') }"
  >
    <template #prefix>
      <i class="icon-search text-xl leading-5 text-gray-1"/>
    </template>
    <template #suffix>
      <button
          :class="{ 'rotate-180 scale-75 opacity-0': !value }"
          class="icon-x-mark text-xl leading-5 text-gray-1 transition-200 hover:text-red"
          @click="value = ''"
      ></button>
    </template>
  </FormInput>
</template>

<script lang="ts" setup>
import FormInput from "@/components/Base/Form/Input/FormInput.vue";
import type {InputProps} from "@/types/components";

defineProps<InputProps>();
const value = defineModel<string>({
  required: true,
});
</script>

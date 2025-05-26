<template>
  <div v-if="items?.length">
    <template v-for="(item, index) in items" :key="index">
      <Radio
        v-bind="{ disabled, labelStyles, activeClass }"
        v-model="activeRadio"
        :label="item[labelKey]"
        :value="item[valueKey]"
        :name="radioName"
        :class="[itemClass, { 'pointer-events-none': item?.disabled }]"
        :disabled="item?.disabled"
        @click="activeRadio = !disabled ? item[valueKey] : modelValue"
      >
        <template #label>
          <slot name="label" :item="item" />
        </template>
      </Radio>
      <hr
        v-if="index !== items.length - 1"
        class="border-none h-px bg-[#F2F2F2] my-2"
        :class="hrClass"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import Radio from "@/components/Base/Form/Radio/FormRadio.vue";

interface Props {
  modelValue: string | number | object;
  items: Array<object>;
  labelKey?: string;
  valueKey?: string;
  disabled?: boolean;
  itemClass?: string;
  labelStyles?: string;
  activeClass?: string;
  hrClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: "name",
  valueKey: "id",
  disabled: false,
  labelStyles: "",
  itemClass: "",
  activeClass: "",
  hrClass: "",
});

const activeRadio = ref(props.modelValue);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | object): void;
}>();

const radioName = `k-radio-${Math.floor(Math.random() * 1000)}`;

const value = ref<string | number | object>([]);

watch(
  () => activeRadio.value,
  (newValue) => {
    if (newValue !== value.value) {
      value.value = newValue;
    }
    if (!props.disabled) {
      emit("update:modelValue", value.value);
    }
  }
);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue !== value.value) {
      value.value = newValue;
    }
    activeRadio.value = newValue;
  }
);
</script>

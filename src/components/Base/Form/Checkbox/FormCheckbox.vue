<template>
  <label
      :class="disabled ? 'cursor-not-allowed' : 'cursor-pointer'"
      :for="id"
      class="group inline-flex items-center relative select-none"
  >
    <input
        :key="checked"
        class="absolute opacity-0 invisible h-0 w-0 peer"
        type="checkbox"
        v-bind="{ disabled, checked, value, name, id }"
        @change="handleChange"
    />
    <span
        :class="[
        {
          'peer-checked:-rotate-90 peer-checked:after:opacity-100 peer-checked:after:rotate-[138deg] after:transition-all after:duration-200 after:absolute after:left-1.5 after:top-0.5 after:w-1.5 after:h-3 after:border-r-[2.2px] after:border-b-[2.2px] after:rotate-[0deg] after:opacity-0':
            !partial,
        },
        {
          '-rotate-90 after:transition-all after:duration-200 after:absolute after:left-[9px] after:top-1 after:w-2 after:h-3 after:border-l-[2.2px] after:opacity-0 !border-blue !bg-blue':
            partial,
        },
        {
          'border-red': error,
          'group-hover:border-blue': !disabled,
        },
        checkboxStyles,
      ]"
        class="shrink-0 duration-200 ease-in-out inline-block size-5 rounded bg-transparent border-2 border-gray-4 peer-checked:!border-white/[16%] after:border-white peer-checked:bg-blue peer-disabled:border-gray-1 peer-disabled:after:border-gray-1"
    />
    <span class="flex-y-center gap-1">
      <slot name="label">
        <span
            :class="[labelStyles]"
            class="letter-3 leading-130 text-dark text-xs"
        >
          {{ label }}
        </span>
      </slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import type {TClassName} from "@/types/common";

interface Props {
  label?: string;
  id?: string;
  name?: string;
  value?: string | number | boolean;
  disabled?: boolean;
  error?: boolean;
  labelStyles?: TClassName;
  checked?: boolean;
  partial?: boolean;
  checkboxStyles?: TClassName;
  infoIcon?: boolean;
  infoText?: string;
}

const props = withDefaults(defineProps<Props>(), {});
const modelValue = defineModel<string | number | boolean | (number | string)[]>(
    {
      required: true,
    }
);

const handleChange = () => {
  if (typeof modelValue.value === "boolean") {
    modelValue.value = !modelValue.value;
  } else if (Array.isArray(modelValue.value)) {
    const index = (modelValue.value as Array<string>).indexOf(
        props.value as unknown as string
    );
    if (index === -1) {
      (modelValue.value as Array<string | number | boolean>).push(
          props.value as unknown as string
      );
    } else {
      (modelValue.value as Array<string>).splice(index, 1); // Remove if already in array
    }
  }
};
</script>

<template>
  <div
      :class="[tabVariants[variant]?.wrapperClass, $attrs.class, wrapperClass]"
      class="relative w-max flex transition-200"
  >
    <div
        :class="[tabVariants[variant]?.activeClass, customActiveClasses]"
        :style="{ width: active?.width, left: active?.left }"
        class="absolute -t-[3px] bg-blue-primary transition-200"
    />
    <button
        v-for="(tab, idx) in list"
        :id="`item-${variant}-${tab.value}`"
        :key="`item-${variant}-${tab.value}-${idx}`"
        :class="[
        itemClass,
        tabVariants[variant]?.itemClass,
        modelValue == tab.value
          ? `${tabVariants[variant]?.itemActiveClass} ${itemActiveClass} opacity-100`
          : '',
      ]"
        class="transition-200 w-full text-base text-black/70 flex-center font-medium tabs whitespace-nowrap gap-1 relative z-1 cursor-pointer opacity-90 hover:opacity-100"
        @click="(e) => pick(tab.value, { target: e.target })"
    >

      <img v-if="tab.img" :alt="tab.label" :src="tab?.img" class="size-5"/>

      {{ tab.label }}
      <Transition mode="out-in" name="slide-right">
        <slot name="suffix">
          <span
              v-if="tab.suffixText"
              :class="[tabVariants[variant]?.suffixClass, suffixClass]"
              class="px-1 py-px -md text-xs pointer-events-none"
          >
            {{ tab.suffixText }}
          </span>
        </slot>
      </Transition>
    </button>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";

import type {TabProps} from "@/types/components";
import {tabVariants} from "@/data/variants";
import {debounce} from "@/utils/time";

const modelValue = defineModel<string | number>("modelValue", {
  required: true,
});

const props = withDefaults(
    defineProps<TabProps & { customActiveClasses?: string }>(),
    {
      variant: "default",
      customActiveClasses: "",
    }
);

const active = ref({
  left: "0px",
  width: "0px",
});

const pick = (tab: string | number, e?: { target: EventTarget | null }) => {
  const target = e?.target instanceof HTMLButtonElement ? e.target : null;

  if (target) {
    active.value = {
      left: target.offsetLeft + "px",
      width: `${target.offsetWidth}px`,
    };
  }
  modelValue.value = tab;
};

function checkValue() {
  const item = document.getElementById(
      `item-${props.variant}-${modelValue.value}`
  ) as HTMLButtonElement;

  pick(modelValue.value, {target: item});
}

watch(
    modelValue,
    () => debounce(`item-select-${props.variant}-${Date.now()}`, checkValue, 100),
    {
      immediate: true,
    }
);

onMounted(() => {
  setTimeout(() => {
    checkValue();
  }, 200);
});
</script>

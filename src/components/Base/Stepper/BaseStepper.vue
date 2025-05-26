<template>
  <div
    class="relative w-full bg-white rounded-xl p-6 gap-2 flex flex-col items-start"
  >
    <template v-for="(item, index) in steps" :key="index">
      <div
        :class="checkStatus(index + 1)"
        class="flex-shrink-0 rounded-xl select-none transition-300 cursor-pointer w-full group"
      >
        <div class="flex items-center gap-x-3">
          <div
            class="flex-center flex-shrink-0 w-10 h-10 flex-center transition-300 bg-gray-3 rounded-lg text-base font-semibold leading-5 text-dark group-[.active]:bg-yellow group-[.active]:bg-primary group-[.done]:text-yellow-dark group-[.done]:bg-yellow-dark/10"
          >
            {{ index + 1 }}
          </div>
          <div class="flex flex-col gap-0.5">
            <p
              class="text-base text-dark font-semibold leading-5 transition-300"
            >
              {{ $t(item?.title) }}
            </p>
            <p
              class="text-xs text-gray-1 font-normal leading-130 transition-300"
            >
              {{ $t(item?.subtitle) }}
            </p>
          </div>
        </div>
      </div>
      <hr
        class="h-5 w-px bg-gray-3 ml-5 last-of-type:hidden"
        :class="{ '!bg-yellow/20': checkStatus(index + 1) === 'done' }"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentStep: number;
  steps: {
    title: string;
    subtitle: string;
  }[];
}
const props = defineProps<Props>();

function checkStatus(target: number) {
  if (target === props.currentStep) {
    return "active";
  } else if (props.currentStep > target) {
    return "done";
  } else {
    return "";
  }
}
</script>

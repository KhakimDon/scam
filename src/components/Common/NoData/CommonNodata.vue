<template>
  <div class="flex-center flex-col py-12">
    <img :src="image" alt="no-data-image" class="mx-auto min-h-[125px]" />
    <p
      v-if="title"
      :class="titleClass"
      class="text-xl leading-130 font-medium text-dark-800 text-center mx-auto mt-5"
    >
      {{ title }}
    </p>
    <p
      v-if="subtitle"
      :class="subtitleClass"
      class="text-base leading-130 font-normal text-gray-700 text-center mx-auto mt-2"
    >
      {{ subtitle }}
    </p>
    <div class="mt-5">
      <slot name="actions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  image: string;
  subtitle?: string;
  subtitleClass?: string;
  title: string;
  titleClass?: string;
}

withDefaults(defineProps<Props>(), {
  image: "/images/no-data.svg",
  title: "",
});
</script>

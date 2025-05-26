<template>
  <LDefault>
    <div
        class="w-full grid place-items-center h-[calc(100svh-120px)] bg-white rounded-xl"
    >
      <div class="flex flex-col gap-8 items-center">
        <img
            :src="`/images/${status}.avif`"
            alt="404"
            class="max-w-xl h-72 mx-auto"
        />

        <div class="!leading-normal">
          <h1 class="text-center font-bold text-xl text-dark">
            {{ $t(`error.${status}.title`) }}
          </h1>
          <p
              class="leading-snug text-gray-1 w-full max-w-sm mx-auto text-center"
          >
            {{ $t(`error.${status}.info`) }}
          </p>
        </div>

        <RouterLink :to="{ name: 'Dashboard' }">
          <BaseButton
              icon="icon-home text-xl"
              icon-position="left"
              text="button.back_to_main"
          />
        </RouterLink>
      </div>
    </div>
  </LDefault>
</template>

<script lang="ts" setup>
import {computed} from "vue";

import {BaseButton} from "@/components/Base";
import LDefault from "@/layout/LDefault.vue";

const status = computed(() => sessionStorage.getItem("error-status") || 404);
</script>

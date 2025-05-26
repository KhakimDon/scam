<template>
  <div class="grid grid-cols-10">
    <div
        class="relative flex-center-between col-span-6 flex-col py-12 overflow-y-scroll max-h-screen bg-white gap-4"
    >
      <div class="h-[calc(100%-100px)] flex-center w-full max-w-sm shrink-0">
        <slot/>
      </div>

      <div class="text-center flex flex-col gap-3">
        <RouterLink
            class="text-xs font-normal underline text-gray-1 leading-normal"
            target="_blank"
            to="/privacy-policy"
        >
          {{ $t("privacy_policy") }}
        </RouterLink>

        <p class="text-xs leading-normal text-gray-1">
          {{ $t("version", {version: CONFIG.APP_VERSION}) }}
        </p>
      </div>
    </div>

    <div class="col-span-4 h-svh bg-primary bg-image relative flex-center">
      <!--      <img alt="auto24 logo svg" src="/images/auth/logo.svg" />-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import {CONFIG} from "@/config";
</script>

<style scoped>
.bg-image {
  /* background-image: url("/images/auth/banner.avif"); */
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
</style>

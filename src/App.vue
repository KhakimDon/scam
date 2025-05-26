<template>
  <RouterView v-slot="{ Component }">
    <component :is="detectLayout">
      <Component :is="Component"/>
    </component>
  </RouterView>
  <Toaster v-bind="TOAST_CONFIG"/>
</template>

<script lang="ts" setup>
import {computed} from "vue";
import {useRoute} from "vue-router";

import LAuth from "@/layout/LAuth.vue";
import LDefault from "@/layout/LDefault.vue";
import LEmpty from "@/layout/LEmpty.vue";
import {Toaster} from "vue-sonner";
import {TOAST_CONFIG} from "@/config";

const LError = () => import("@/layout/LError.vue");
const LMobile = () => import("@/layout/LMobile.vue");


const route = useRoute();

const layouts: Record<string, unknown> = {
  default: LDefault,
  error: LError,
  mobile: LMobile,
  empty: LEmpty,
  auth: LAuth,
};
const detectLayout = computed(() => {
  return layouts[route.meta.layout as string];
});
</script>

<style>
.loading-indicator {
  animation: indicator 1s ease-in-out;
}

@keyframes indicator {
  0% {
    width: 0;
  }
  50% {
    width: 85vw;
  }
  100% {
    width: 100vw;
  }
}
</style>

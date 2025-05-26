<script setup lang="ts">
import { useRoute } from "vue-router";

import type { ISubMenu } from "@/config/MainMenuConfig";

interface Props {
  subItem: ISubMenu;
  active: boolean;
  count?: number;
}
defineProps<Props>();

const route = useRoute();
</script>

<template>
  <RouterLink
    :to="subItem.route"
    :class="{ 'pointer-events-none': subItem?.route.name === route.name }"
    class="p-2 pl-9 transition-300 flex-center-between group w-[264px]"
  >
    <div class="flex-y-center gap-2">
      <span
        :class="{
          '!bg-white': active,
        }"
        class="h-0.5 w-3 bg-gray group-hover:bg-white transition-300"
      />
      <p
        :class="{
          '!text-white !font-semibold': active,
        }"
        class="text-sm text-gray group-hover:text-white transition-300"
      >
        {{ $t(subItem?.heading) }}
      </p>
    </div>
  </RouterLink>
</template>

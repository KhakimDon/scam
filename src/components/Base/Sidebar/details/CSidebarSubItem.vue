<script setup lang="ts">
import { useRoute } from "vue-router";

import { ISubMenu } from "@/config/MainMenuConfig";
import { formatMoneyDecimal } from "@/utils";

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
        class="h-0.5 w-3 bg-gray-1 group-hover:bg-white transition-300"
      />
      <p
        :class="{
          '!text-white !font-semibold': active,
        }"
        class="text-sm text-gray-1 group-hover:text-white transition-300"
      >
        {{ $t(subItem?.heading) }}
      </p>
    </div>
    <p
      v-if="count"
      class="rounded bg-white/10 text-exs text-white py-[3px] px-1"
    >
      {{ formatMoneyDecimal(count) }}
    </p>
  </RouterLink>
</template>

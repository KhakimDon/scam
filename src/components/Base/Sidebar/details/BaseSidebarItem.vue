<template>
  <div :class="{ 'bg-blue-500/8': active }">
    <div class="py-3 px-5 flex hover:bg-white/8 justify-between transition-300 items-center gap-3 cursor-pointer">
      <slot>
        <div class="flex items-center gap-2.5">
          <div v-if="item.svgIconTag" class="icon-svg" :class="{ active: active || isActive }" v-html="item.svgIconTag" />
          <i v-else :class="[item.svgIcon, { '!text-white': active || isActive }]" class="text-2xl leading-6 transition-300 delay-300 text-[#737F94]"  />
            <p v-if="!miniMenu" class="whitespace-nowrap text-sm text-white transition-300">{{ $t(item.heading) }}</p>
        </div>
      </slot>
      <i v-if="item.sub?.length && !miniMenu" :class="{ '!-rotate-180 !text-blue': active || isActive }" class="icon-arrow-md text-xl leading-5 transition-300 text-gray-700" />
    </div>

    <CollapseTransition v-if="item.sub?.length">
      <div v-if="active" class="flex flex-col gap-2 pb-3">
        <BaseSidebarSubItem
          v-for="(subItem, subIndex) in item.sub"
          v-bind="{ subItem, miniMenu, active: route.name?.toString().startsWith(subItem.route.name?.toString() ?? '') }"
          :key="subIndex"
          @click="$emit('click-to-child')"
        />
      </div>
    </CollapseTransition>
  </div>
</template>

<script setup lang="ts">
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { useRoute } from "vue-router";

import type { IMenu } from "@/config/MainMenuConfig";
import BaseSidebarSubItem from "@/components/Base/Sidebar/details/BaseSidebarSubItem.vue";

interface Props {
  item: IMenu;
  active?: boolean;
  isActive?: boolean;
  miniMenu?: boolean;
}
defineProps<Props>();

defineEmits<{
  (e: "click-to-child"): void;
}>();

const route = useRoute();
</script>

<style>
.icon-svg {
  width: 24px;
  height: 24px;
}
.icon-svg.active svg path,
.icon-svg.active svg circle {
  stroke: white;
}
</style>

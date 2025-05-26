<template>
  <div :class="{ '!bg-gray-0': active }">
    <div
      class="py-3 px-5 flex hover:bg-gray-0 justify-between transition-300 items-center gap-3 cursor-pointer"
    >
      <slot>
        <div class="flex items-center gap-2">
          <div
            v-if="item.svgIconTag"
            :class="{ active: active || isActive }"
            class="icon-svg"
            v-html="item.svgIconTag"
          />
          <i
            v-else
            :class="[item.svgIcon, { '!text-blue': active || isActive }]"
            class="text-xl leading-5 transition-300 delay-300 text-gray-1"
          />
          <p
            v-if="!miniMenu"
            class="whitespace-nowrap text-sm text-white transition-300"
          >
            {{ $t(item.heading) }}
          </p>
        </div>
      </slot>

      <i
        v-if="item.sub?.length && !miniMenu"
        :class="{ '!-rotate-90 !text-blue': active || isActive }"
        class="icon-chevron rotate-90 text-xl leading-5 transition-300 text-gray-1"
      />
    </div>

    <CollapseTransition v-if="item.sub?.length">
      <div v-if="active" class="flex flex-col gap-2 pb-3">
        <CSidebarSubItem
          v-for="(subItem, subIndex) in item.sub"
          :key="subIndex"
          v-bind="{
            subItem,
            miniMenu,
            active: route.name?.toString().startsWith(subItem.route.name),
          }"
          @click="$emit('click-to-child')"
        />
      </div>
    </CollapseTransition>
  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { useRoute } from "vue-router";

import CSidebarSubItem from "@/components/Base/Sidebar/details/CSidebarSubItem.vue";
import { IMenu } from "@/config/MainMenuConfig";

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

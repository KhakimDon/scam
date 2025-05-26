<template>
  <div
    class="border py-2 px-3 rounded-md border-dashed border-gray-4 group flex-y-center gap-2.5 min-h-14"
  >
    <i v-if="iconClass" :class="iconClass" />
    <div class="flex-between flex-col gap-1">
      <slot>
        <div class="flex-y-center h-[18px]">
          <slot name="prefix" />
          <a
            :class="[activeClass, titleClass]"
            :href="actionValue"
            class="text-sm font-bold text-black leading-130 transition-300 block"
          >
            {{ title }}
          </a>
          <slot name="suffix" />
        </div>
      </slot>

      <p
        :class="descriptionClass"
        class="text-gray-1 text-xs leading-130 font-medium"
      >
        {{ noTranslation ? description : t(description) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

interface Props {
  title?: string;
  description: string;
  descriptionClass?: string;
  loading?: boolean;
  iconClass?: string;
  actionValue?: string;
  titleClass?: string;
  noTranslation?: boolean;
}

const { t } = useI18n();

const props = withDefaults(defineProps<Props>(), {
  title: "-",
  description: "-",
});

const activeClass = computed(() => {
  return props.actionValue ? "hover:text-blue" : "pointer-events-none";
});
</script>

<template>
  <div :class="[wrpClass]" class="flex-y-center gap-2">
    <div
      v-for="(item, key) in displayList"
      :key="key"
      :class="[itemClass]"
      class="py-0.5 text-xs font-medium px-1 rounded border border-gray-4"
    >
      {{ item }}
    </div>

    <div
      v-if="!!remainingCount"
      :class="[countClass]"
      class="py-0.5 text-xs font-medium px-1 rounded border border-gray-4 bg-gray-4"
    >
      +{{ remainingCount }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

type Props = {
  wrpClass?: string;
  list: (number | string | object)[];
  itemClass?: string;
  showCount?: number | string;
  countClass?: string;
  labelKey?: string;
};

const props = withDefaults(defineProps<Props>(), {
  showCount: 3,
  wrpClass: "",
  itemClass: "",
  countClass: "",
  labelKey: "name",
});

const remainingCount = computed(() => {
  if (
    !Number.isNaN(props.showCount) &&
    props.list?.length &&
    props.showCount > 0
  ) {
    const result = props.list.length - Number(props.showCount);
    return result > 0 ? result : 0;
  }
  return 0;
});

const transformedList = computed(() =>
  props.list.map((item) =>
    typeof item === "object" && item !== null
      ? (item as Record<string, object>)[props.labelKey] ?? ""
      : item
  )
);

const displayList = computed(() =>
  transformedList.value.slice(0, Number(props.showCount))
);
</script>

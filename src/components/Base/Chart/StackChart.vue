<template>
  <div class="flex-shrink-0 h-auto bg-white rounded-xl p-6 grid gap-3">
    <TableHeader v-bind="{ title }"/>
    <div v-if="total">
      <div class="flex w-full">
        <div
            v-for="(item, index) in data"
            :key="index"
            :class="{ 'mr-[3px]': item?.amount && index !== data.length - 1 }"
            :style="{
            backgroundColor: item?.color,
            width: getPercent(Number(item?.amount)) + '%',
          }"
            class="h-10 rounded-sm mb-4"
        ></div>
      </div>
      <div
          v-for="(item, index) in data"
          :key="index"
          :class="{ 'border-b border-b-gray': index !== data.length - 1 }"
          class="grid items-center relative py-3"
      >
        <div class="grid grid-cols-[1fr_40px_1fr] items-center">
          <div class="flex items-center gap-2">
            <div
                :style="{
                backgroundColor: item?.color,
              }"
                class="w-3 h-3 rounded-[3px]"
            />

            <p class="text-[#94A8AA] text-xs !leading-normal font-medium">
              {{ $t(item?.label) }}
            </p>
          </div>

          <div class="text-center">
            <span
                class="text-center text-dark text-sm font-medium leading-130 px-3 border-x border-x-white-1"
            >
              {{ !total ? 0 : getPercent(item?.amount) }}%
            </span>
          </div>

          <div class="text-right">
            <h5
                class="mb-1 text-sm !leading-normal text-dark-100 font-semibold truncate"
            >
              {{ item.amount }}
            </h5>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center h-min">
      <CommonNoData
          :title="$t('there_is_no_responses_for_your_request')"
          class="mt-8"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed} from "vue";

import TableHeader from "@/components/Base/Table/Details/TableHeader.vue";
import CommonNoData from "@/components/Common/NoData/CommonNoData.vue";

interface Props {
  data: {
    label?: string;
    color?: string;
    amount: number;
  }[];
  disabled?: boolean;
  check?: boolean;
  title: string;
}

const props = defineProps<Props>();

const total = computed(() => {
  return props.data.reduce((acc, item) => acc + item.amount, 0);
});

function getPercent(amount: number) {
  return ((amount / total?.value) * 100).toFixed(2);
}
</script>
<style>
.grid-cols-1-max-1 {
  grid-template-columns: 1fr max-content 1fr;
}
</style>

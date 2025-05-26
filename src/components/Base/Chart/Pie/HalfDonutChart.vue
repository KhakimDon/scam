<template>
  <ApexCharts
    type="donut"
    v-bind="{ series, options, height }"
    :height="250"
    width="100%"
  />
</template>

<script lang="ts" setup>
import { ApexOptions } from "apexcharts";
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import ApexCharts from "vue3-apexcharts";

import { formatMoneyDecimal } from "@/utils";

interface Props {
  disabled?: boolean;
  data: {
    count: number;
    percentage: number;
  }[];
  height?: number;
  colors?: string[];
  trackBg?: string;
  title: string;
  labelFormatter?: (value: string) => string;
}

const props = withDefaults(defineProps<Props>(), {
  height: 300,
  trackBg: "#49B97D",
  colors: () => ["#FF493D", "#FF49da"],
});

const { t } = useI18n();

const options = reactive<ApexOptions>({
  chart: {
    type: "donut",
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      donut: {
        labels: {
          name: {
            // TODO got any better solutions? do it right now, im in such a hurry
            formatter: props.labelFormatter,
          },
          show: true,
          value: {
            fontSize: "14px",
            fontWeight: 600,
            offsetY: -5,
          },
          total: {
            show: true,
            label: props.title,
            fontSize: "12px",
            color: "#9096A7",
            formatter: function (w) {
              const value = w.globals.seriesTotals.reduce(
                (a: number, b: number) => a + b,
                0
              );
              return formatMoneyDecimal(value);
            },
          },
        },
      },
    },
  },
  grid: {
    padding: {
      bottom: -100,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: props.colors,
  legend: {
    show: false,
  },
  tooltip: {
    enabled: false,
  },
});

const series = computed(() => props.data || [30, 23, 123]);
</script>
<style>
.custom-border:not(:last-child) {
  border-bottom: 1px solid #f3f0fe;
}
</style>

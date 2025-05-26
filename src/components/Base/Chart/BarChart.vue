<template>
  <VueApexCharts
      :height="500"
      :options="chartOptions"
      :series="data"
      type="bar"
      width="100%"
  />
</template>

<script lang="ts" setup>
import type {ApexOptions} from "apexcharts";
import {computed} from "vue";
import {useI18n} from "vue-i18n";
import VueApexCharts from "vue3-apexcharts";

import {formatMoneyDecimal} from "@/utils";

type Props = {
  colors?: string[];
  xLabels?: (string | number | object | unknown)[];
  legends?: string[];
  data: unknown;
};

const props = withDefaults(defineProps<Props>(), {
  colors: () => ["#2684FC", "#D0413A"],
  xLabels: () => ['label 1', 'label 2'],
  legends: () => ["Option 1", "Option 2"],
});

const {t} = useI18n();

const chartOptions = computed(
    (): ApexOptions => ({
      chart: {
        type: "bar",
        height: 440,
        stacked: true,
      },
      colors: props.colors,
      plotOptions: {
        bar: {
          borderRadius: 2,
          borderRadiusWhenStacked: "all",
          horizontal: true,
          barHeight: "95%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },

      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        stepSize: 1,
      },
      tooltip: {
        shared: false,
        custom: function ({series, seriesIndex, dataPointIndex}) {
          return `<div class="border border-white-1 rounded-lg bg-white">
                <div class="border-b border-white-1 py-2.5 px-3">
                    ${series[seriesIndex][dataPointIndex]}
                </div>

                <ul class="p-3 [&_li_span]:font-medium [&_li]:text-gray-1 [&_li_span]:text-dark">
                    <li>
                        ${t("chart.sum")}:
                        <span class="font-medium">
                            ${formatMoneyDecimal(23e5)} UZS
                        </span>
                    </li>
                    <li>
                        ${t("chart.sum")}:
                        <span class="font-medium">
                            ${formatMoneyDecimal(23e5)} UZS
                        </span>
                    </li>
                </ul>
        </div>`;
        },
      },
      xaxis: {
        categories: props.xLabels,
        labels: {
          formatter: () => formatMoneyDecimal(Math.floor(Math.random() * 1e5)),
          style: {
            fontWeight: 500,
            colors: "#818B88",
          },
        },
      },
      legend: {
        position: "top",
        customLegendItems: props.legends,
        markers: {
          customHTML: () => ``,
        },
        formatter(legendName: string): string {
          return `<span class="font-medium text-sm w-full">${legendName}</span>`;
        },
        inverseOrder: true,
      },
    })
);
</script>

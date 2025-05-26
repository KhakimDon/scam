<template>
  <ApexChart :series="seriesAll" v-bind="{ options, height }" />
</template>

<script lang="ts" setup>
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn.js";

import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { computed, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import ApexChart from "vue3-apexcharts";

import { monthNames } from "@/data";
import { formatMoneyDecimal } from "@/utils";

const appUsageStatistics = {
  yearly_statistics: [
    {
      month: 2,
      count: 15,
    },
    {
      month: 4,
      count: 5,
    },
    {
      month: 6,
      count: 25,
    },
    {
      month: 10,
      count: 12,
    },

    {
      month: 11,
      count: 3,
    },
    {
      month: 12,
      count: 15,
    },
    {
      month: 5,
      count: 15,
    },
  ],
};

interface Props {
  disabled?: boolean;
  data: (string | object | number | unknown)[];
  strokeColors?: string[];
  height?: number;
  legends: string[];
}

const props = withDefaults(defineProps<Props>(), {
  height: 180,
  legends: () => ["line 1", "line 2", "line 3"],
  strokeColors: () => ["#DFBD40", "#49B97D", "#198AFC"],
});

const { locale } = useI18n();
dayjs.locale(locale.value === "uz" ? "uz-latn" : locale.value);
const loading = ref(true);

const options = reactive<ApexOptions>({
  chart: {
    id: "realtime",
    height: 350,
    type: "line",
    animations: {
      enabled: true,
      dynamicAnimation: {
        speed: 1000,
      },
    },
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  grid: {
    borderColor: "#ECF3FA",
    strokeDashArray: 5,
  },
  markers: {
    hover: {
      size: 0,
      sizeOffset: 6,
    },
  },
  stroke: {
    width: 3.5,
    colors: props.strokeColors,
  },
  xaxis: {
    offsetY: -3,
    offsetX: 8,
    tooltip: {
      enabled: false,
    },

    labels: {
      show: true,
      rotateAlways: false,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
      minHeight: undefined,
      maxHeight: 120,
      style: {
        colors: ["#121C25"],
        fontSize: "12px",
        fontFamily: "Roboto, sans-serif",
        fontWeight: 400,
        cssClass: "apexcharts-xaxis-label",
      },
      offsetX: 0,
      offsetY: 0,
      format: undefined,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    tickAmount: 5,
    title: {
      text: "",
      style: {
        fontWeight: 700,
      },
    },
    labels: {
      formatter(val: number): string | string[] {
        return formatMoneyDecimal(Number(val).toFixed(2));
      },
    },
  },
  tooltip: {
    style: {
      fontSize: "12px",
      fontFamily: "Roboto, sans-serif",
    },
    marker: {
      show: false,
    },
    custom: ({ dataPointIndex, seriesIndex, series }) => {
      return `
      <div class="px-2 py-1 bg-white">${Number(
        series[seriesIndex][dataPointIndex]
      ).toFixed(2)}</div>
    `;
    },
  },
  legend: {
    show: Boolean(props.legends.length),
    customLegendItems: props.legends,
    position: "bottom",
    markers: {
      shape: "square",
    },
  },
});

function changeKeysInArray(arr: object[], keyMap: object) {
  return arr?.map((obj) => {
    const newObj = {};
    for (const oldKey in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (keyMap?.hasOwnProperty(oldKey)) {
        newObj[keyMap[oldKey]] = obj[oldKey] ? obj[oldKey] : 0;
      } else {
        newObj[oldKey] = obj[oldKey] ? obj[oldKey] : 0;
      }
    }
    return newObj;
  });
}

const monthKeyMapHour = {
  month: "x",
  count: "y",
};

const seriesAll = computed(() => {
  const data = props.data;

  return data.map((el, idx) => ({
    name: "month",
    data: changeKeysInArray(
      appUsageStatistics.yearly_statistics,
      monthKeyMapHour
    )?.map((item) => ({
      x: monthNames[item?.x - 1],
      y: idx + 130 * (Math.random() * 10),
    })),
  }));
});

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 100);
});
</script>

<style>
.apexcharts-canvas {
  width: 100% !important;
  height: 100% !important;
}

.apexcharts-legend-series {
  display: flex !important;
  align-items: center !important;
}

.apexcharts-legend-marker {
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 14px !important;
  margin-right: 6px !important;
}

.apexcharts-legend-text {
  font-family: Roboto, sans-serif !important;
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 14px !important;
  color: #8e9ba8 !important;
}

.apexcharts-legend-series:nth-child(1) ~ .apexcharts-legend-marker {
  background: red !important;
}

.apexcharts-xaxis-label {
  width: 100% !important;
}

.apexcharts-legend.apexcharts-align-center.apx-legend-position-bottom {
  @apply !w-full !justify-start;
}
</style>

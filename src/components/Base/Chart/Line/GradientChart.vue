<template>
  <ApexChart :options="options" :series="seriesAll" height="280px" />
</template>

<script lang="ts" setup>
import "dayjs/locale/ru";
import "dayjs/locale/uz-latn.js";

import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";
import ApexChart from "vue3-apexcharts";

import { monthNames } from "@/data";

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
  data?: object;
  loading?: boolean;
}

defineProps<Props>();

const { locale } = useI18n();
dayjs.locale(locale.value === "uz" ? "uz-latn" : locale.value);

const options = reactive<ApexOptions>({
  chart: {
    zoom: {
      enabled: false,
    },
    type: "area",
    animations: {
      enabled: true,
      speed: 800,
    },
    stacked: true,
    foreColor: "#090E14",
    toolbar: {
      show: false,
      tools: {
        selection: true,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false,
      },
    },
    width: 591,
  },
  dataLabels: {
    enabled: false,
    style: {
      fontWeight: 700,
    },
  },
  fill: {
    type: "gradient",
    colors: ["#2684FC"],
    gradient: {
      opacityFrom: 0.8,
      opacityTo: 0.2,
    },
  },
  grid: {
    borderColor: "#ECF3FA",
    strokeDashArray: 5,
    padding: {
      top: -10,
      right: 20,
      left: 15,
    },
  },
  legend: {
    show: false,
  },
  markers: {
    hover: {
      size: 0,
      sizeOffset: 6,
    },
  },
  stroke: {
    curve: "smooth",
    colors: ["#2684FC", "#2684FC"],
  },
  xaxis: {
    offsetY: -3,
    offsetX: 8,
    tooltip: {
      enabled: false,
    },
    labels: {
      show: true,
      hideOverlappingLabels: true,
      showDuplicates: false,
      trim: false,
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
        fontWeight: 500,
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
      <div class="px-2 py-1 bg-white">${series[seriesIndex][dataPointIndex]}</div>
    `;
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
  return [
    {
      name: "month",
      data: changeKeysInArray(
        appUsageStatistics.yearly_statistics,
        monthKeyMapHour
      )?.map((item) => ({
        x: monthNames[item?.x - 1], // Subtract 1 to match the array index
        y: item?.y,
      })),
    },
  ];
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
</style>

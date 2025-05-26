<template>
  <div class="bg-white rounded-xl">
    <slot name="header">
      <header
          v-if="!noHeader"
          :class="headerClass"
          class="flex justify-between pt-6 gap-3"
      >
        <div>
          <h2
              :class="titleClass"
              class="whitespace-nowrap text-xl leading-[23px] font-bold text-dark"
          >
            {{ title }}
          </h2>
          <p
              :class="subtitleClass"
              class="text-xs font-normal text-gray-neutral mt-1.5 whitespace-nowrap"
          >
            {{ subtitle }}
          </p>
        </div>

        <div
            :class="actionsClass"
            class="flex gap-5 2xl:gap-5 flex-wrap w-full justify-end"
        >
          <slot v-if="!noFilter" name="beforeSearch">
            <div class="shrink-0">
              <BaseTableCollapseFilter
                  v-if="hasFilter"
                  v-model="showFilter"
                  :active-count="activeCount"
              />
            </div>
          </slot>

          <form autocomplete="off" class="flex gap-2 justify-end 2xl:gap-5">
            <slot name="search">
              <FormSearchInput
                  v-if="!noSearch"
                  :class="searchInputClass"
                  :model-value="search"
                  @update:model-value="onSearch"
              />
            </slot>

            <slot name="afterSearch">
              <BaseButton
                  v-if="hasAddButton"
                  class="!py-2 !px-6"
                  text=""
                  @click="
                  hasAddButton.link
                    ? router.push(hasAddButton?.link)
                    : $emit('add')
                "
              >
                <div class="flex items-center gap-1">
                  <span class="text-xs text-dark-black leading-5 font-medium">
                    {{ hasAddButton.title }}
                  </span>
                  <i class="icon-plus text-lg"></i>
                </div>
              </BaseButton>
            </slot>
          </form>
        </div>
      </header>
    </slot>
    <slot name="afterHeader"/>
    <CollapseTransition>
      <div v-if="showFilter" class="w-full pt-6">
        <div
            class="flex relative rounded-lg bg-white-1 p-4 flex-row flex-wrap items-center gap-4"
        >
          <span :style="svgPosition" class="absolute -top-[14px] z-10">
            <svg
                fill="none"
                height="17"
                viewBox="0 0 26 17"
                width="26"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 0L25.9904 16.5H0.00961876L13 0Z" fill="#F3F5F4"/>
            </svg>
          </span>

          <slot name="filter"></slot>
        </div>
      </div>
    </CollapseTransition>

    <slot name="users">
      <div :class="wrapperClass" class="w-full max-w-full pt-6">
        <table class="w-full c-table overflow-x-auto">
          <thead>
          <Transition mode="out-in" name="fade">
            <tr v-if="!loading && data?.length">
              <th
                  v-for="(h, index) in head"
                  :key="index"
                  :class="[{ 'w-[5%]': h.key === '_index' }, thClass]"
                  class="p-1 py-3 bg-gray-4 first:rounded-l-md last:rounded-r-md !rounded-b-[0px] text-xs text-left last:text-right first:pl-4 last:pr-2 text-dark font-semibold"
              >
                <div
                    :class="[
                      thClass,
                      {
                        'last:justify-end': index === head.length - 1,
                        'last:!justify-start': thClass === 'last:!text-left',
                      },
                    ]"
                    class="flex-y-center g-0.5"
                >
                  <div
                      v-if="h.hasSort"
                      class="size-4 mr-0.5 flex-center flex-col"
                  >
                    <button
                        :class="{
                          '!text-blue': ordering === h.key,
                        }"
                        class="icon-sort-up text-lg text-gray-1 transition-300 -mb-2"
                        @click="sortByTop(h)"
                    />
                    <button
                        :class="{
                          '!text-blue': ordering === `-${h.key}`,
                        }"
                        class="icon-sort-up rotate-180 text-lg text-gray-1 transition-300"
                        @click="sortByBottom(h)"
                    />
                  </div>
                  <span
                      :class="{ 'cursor-pointer': h.hasSort }"
                      class="font-medium font-roboto text-xs text-dark"
                      @click="sortByToggle(h)"
                  >
                      {{ h.title }}
                    </span>
                </div>
              </th>
            </tr>
          </Transition>
          </thead>

          <Transition mode="out-in" name="fade">
            <tbody v-if="!loading" class="[&_tr:nth-child(2n)]:bg-white-1">
            <template v-if="data?.length">
              <tr
                  v-for="(d, index) in data"
                  :key="index"
                  :class="[bodyTrClass]"
                  class="relative cursor-pointer hover:!bg-gray-7 duration-100"
                  @click.stop="$emit('clickToRow', d)"
              >
                <td
                    v-for="(h, idx) in head"
                    :key="idx"
                    :class="[tdClass]"
                    class="py-3 px-2 first:!pl-5 text-sm"
                >
                  <div
                      v-if="idx === 0"
                      :class="itemStatus(d)"
                      class="rounded-r-lg w-1 h-8 absolute left-0 top-1/2 -translate-y-1/2"
                  />

                  <slot
                      :data="{ ...d, _index: getIndex(index) }"
                      :name="h.key"
                  >
                    {{
                      h.key === "_index" && !hasCheckbox
                          ? getIndex(index) + "."
                          : d[h.key]
                    }}
                  </slot>
                </td>
              </tr>
            </template>
            </tbody>
          </Transition>
        </table>

        <Transition mode="out-in" name="fade">
          <div v-if="loading">
            <div
                v-for="i in pagination?.limit || 10"
                :key="i"
                class="flex items-center py-6"
            >
              <div class="w-1 h-8 shimmer rounded"></div>
              <div class="w-4 h-4 shimmer rounded ml-2"></div>
              <div class="w-10 h-10 shimmer rounded-full ml-8 2xl:ml-16"></div>
              <div class="ml-1 space-y-1 flex flex-col">
                <div class="h-5 w-[131px] rounded shimmer"></div>
                <div class="h-4 w-[104px] rounded shimmer"></div>
              </div>
              <div class="mx-auto 2xl:ml-[240px] space-y-1 flex flex-col">
                <div class="h-5 w-[131px] rounded shimmer"></div>
                <div class="h-4 w-[104px] rounded shimmer"></div>
              </div>
              <div class="ml-auto 2xl:ml-[260px] space-y-1 flex flex-col">
                <div class="h-5 w-[141px] rounded shimmer"></div>
                <div class="h-4 w-[94px] rounded shimmer ml-auto"></div>
              </div>
            </div>
          </div>
          <div
              v-else-if="!data?.length"
              :class="{ 'py-5': data?.length }"
              class="w-full flex-center"
          >
            <slot name="empty">
              <CommonNoData
                  class="w-full my-5"
                  v-bind="{
                  title: $t('no_data.title'),
                  subtitle: $t('no_data.subtitle'),
                  image: '/images/no-data.svg',
                }"
              />
            </slot>
          </div>
        </Transition>
      </div>
    </slot>

    <Transition mode="out-in" name="dropdown">
      <div v-if="!noFooter && data?.length" class="flex-center-between py-6">
        <slot name="footer">
          <BaseTableIndicator
              v-if="indicator?.show"
              :colors="indicator?.colors"
          />
        </slot>

        <div class="flex-center-between w-full !justify-end">
          <BasePagination
              v-if="!noPagination"
              ref="pagination"
              :class="{ 'w-max': indicator?.show }"
              :total
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script generic="T = Record<string, string | number | unknown>" lang="ts" setup>
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import {useRouteQuery} from "@vueuse/router";
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";

import {
  BaseButton,
  BasePagination,
  BaseTableCollapseFilter,
  BaseTableIndicator,
  FormSearchInput
} from "@/components/Base";

import {CommonNoData} from "@/components/Common";
import type {TableHead, TableProps} from "@/types/components";
import {useEventListener} from "@vueuse/core";

const props = withDefaults(defineProps<TableProps<T>>(), {
  total: 0,
  hasFilter: true,
  activeCount: 0,
});

const emit = defineEmits(["clickToRow", "checked", "sort", "add"]);
const showFilter = defineModel<boolean>("showFilter");

const router = useRouter();
const search = useRouteQuery<string>("search", "");

const pagination = ref();

function getIndex(index: number) {
  return (pagination.value?.page - 1) * pagination.value?.limit + index + 1;
}

const itemStatus = (row: T) => {
  if (!props.indicator?.key || !props.indicator?.show) return "";
  const nestedKeys = props.indicator?.key?.split(".");
  const lastKey = nestedKeys?.pop();
  const nestedObj = nestedKeys?.reduce((a, prop) => a[prop], row);

  return props.indicator.colors.find(
      (item) => item.value === nestedObj[lastKey as keyof typeof nestedObj]
  )?.color;
};
const svgPosition = reactive({left: "0px", right: "auto"});

const recalculateSvgPosition = () => {
  const filterButton = document.getElementById("filterButton");
  if (filterButton) {
    const buttonRect = filterButton.getBoundingClientRect();
    const parentRect = document.body?.getBoundingClientRect() || {
      left: 0,
    };
    const svgWidth = 26;

    const buttonCenter =
        buttonRect.left - (parentRect.left + 315 || 0) + buttonRect.width / 2;
    svgPosition.left = `${buttonCenter - svgWidth / 2}px`;
  }
};

useEventListener('resize', recalculateSvgPosition);

// Filter header sort
const ordering = useRouteQuery<undefined | string>("ordering", undefined);

function onSearch(value: string) {
  search.value = value;
}

async function sortByTop(row: TableHead) {
  if (ordering.value === row.key) {
    ordering.value = undefined;
  } else {
    ordering.value = row.key;
  }
  emit("sort");
}

async function sortByBottom(row: TableHead) {
  if (ordering.value === `-${row.key}`) {
    ordering.value = undefined;
  } else {
    ordering.value = `-${row.key}`;
  }
  emit("sort");
}

async function sortByToggle(row: TableHead) {
  if (!row.hasSort) return;
  if (ordering.value === row.key) {
    ordering.value = `-${row.key}`;
  } else if (ordering.value === `-${row.key}`) {
    ordering.value = undefined;
  } else {
    ordering.value = row.key;
  }
  emit("sort");
}
</script>

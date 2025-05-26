import { reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";

import { useApi } from "@/composables/useApi";
import { IDefaultResponse } from "@/types/common";

export const useListFetcher = <T>(
  url: string,
  paginationLimit?: number,
  customParams?: Record<string, string | number | any>
) => {
  const route = useRoute();

  const list = ref<T[]>([]);
  const listTrigger = ref(true);

  const pending = reactive({
    list: true,
    button: false,
  });

  const currentPage = ref(Number(route?.query?.page ?? 1));

  const params = reactive({
    limit: paginationLimit ?? 9,
    offset: (currentPage.value - 1) * (paginationLimit ?? 9),
    search: route?.query.search ?? undefined,
    ...customParams,
  });

  const paginationData = reactive({
    count: 0,
    next: "",
  });

  const fetchApplications = async (
    customParams?: Record<string, string | number>
  ) => {
    const data = await useApi()
      .$get<IDefaultResponse<T>>(url, {
        params,
        ...customParams,
      })
      .finally(() => {
        setTimeout(() => {
          listTrigger.value = false;
        }, 300);
      });

    if (params.offset > 0) {
      list.value = [...(list.value ?? []), ...data.results];
    } else {
      list.value = data.results;
    }

    paginationData.count = data.count;
    paginationData.next = data.next;

    pending.list = false;
    pending.button = false;
  };

  const loadMore = () => {
    pending.button = true;
    params.offset += params.limit;
  };

  const resetList = () => {
    params.offset = 0;
    fetchApplications();
  };

  watch(
    () => params,
    () => {
      // pending.list = true
      fetchApplications();
    },
    { deep: true, immediate: true }
  );

  watch(
    () => params.search,
    () => {
      params.offset = 0;
      currentPage.value = 1;
      pending.list = true;
      // useUpdateQuery('search', params.search)
    }
  );

  return {
    list,
    pending,
    paginationData,
    params,
    currentPage,
    listTrigger,
    loadMore,
    resetList,
    fetchApplications,
  };
};

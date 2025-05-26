import { onBeforeMount, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";

import { useApi } from "@/composables/useApi";
import { useCustomToast } from "@/composables/useCustomToast";
import { usePagination } from "@/composables/usePagination";
import { IDefaultResponse, Pagination } from "@/types/common";
import { updateQueryParams } from "@/utils";
import { debounce } from "@/utils/functions/common";

export function useTableFetch<TD = unknown>(
  url: string,
  params: Pagination = { page: 1, limit: 10 },
  itself?: boolean
) {
  const { showToast } = useCustomToast();
  const { t: $t } = useI18n();
  const route = useRoute();

  const defaultParams = {
    page: route.query.page ? +route.query.page : 1,
    limit: route.query.limit ? +route.query.limit : 10,
    search: route.query.search,
  };

  const paginationData = reactive({
    total: 0,
    defaultLimit: params?.limit || defaultParams.limit,
    currentPage: defaultParams.page,
  });

  const { offset, changePage } = usePagination(
    ref(paginationData.defaultLimit),
    ref(paginationData.currentPage)
  );

  const loading = ref(false);
  const searchText = ref(route.query.search);
  const tableData = ref<IDefaultResponse<TD> | TD[]>([]);

  const fetchTableData = () => {
    loading.value = true;
    useApi()
      .$get<IDefaultResponse<TD>>(url, {
        params: {
          ...route.query,
          ...params,
          page: undefined,
          search: searchText.value,
          limit: paginationData.defaultLimit,
          offset:
            (paginationData.currentPage - 1) * paginationData.defaultLimit,
        },
      })
      .then((res) => {
        paginationData.total = res?.count;
        tableData.value = itself ? res : res?.results;
      })
      .catch((err) => {
        if (err?.response?.status === 500) {
          showToast($t("server_error"), "error");
        }
        // handleError(err?.response?.data);
      })
      .finally(() => (loading.value = false));
  };

  onBeforeMount(() => {
    const currentPage = Number(route.query.page);
    if (currentPage && +currentPage !== paginationData.currentPage) {
      onPageChange(+currentPage);
    } else {
      fetchTableData();
    }
  });

  async function onSearch(text: string) {
    offset.value = 0;
    await onPageChange(1);
    searchText.value = text;
    await updateQueryParams("search", text);
    debounce("search-merchant-search", () => fetchTableData(), 500);
  }

  const onPageChange = async (page: number) => {
    if (page && page !== paginationData.currentPage) {
      await updateQueryParams("page", String(page));
      paginationData.currentPage = page;
      changePage(page);
      fetchTableData();
    }
  };

  const scrollToTop = () => {
    const tableEl = document.querySelector(".i-table");
    if (tableEl) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onChangeLimit = async (newLimit: number) => {
    paginationData.defaultLimit = newLimit;
    paginationData.currentPage = 1;
    await onSearch(String(route.query.search || ""));
    scrollToTop();
    await updateQueryParams("limit", String(newLimit));
  };

  return {
    offset,
    loading,
    tableData,
    defaultParams,
    paginationData,
    onSearch,
    onPageChange,
    onChangeLimit,
    fetchTableData,
  };
}

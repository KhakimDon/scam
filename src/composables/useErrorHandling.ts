import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import { useCustomToast } from "@/composables/useCustomToast";

export function useErrorHandling() {
  const { showToast } = useCustomToast();
  const { t } = useI18n();

  function handleError(res: any) {
    if (res?.status === 404) {
      showToast(res?.data?.detail, "error");
      return;
    }
    if (res?.status === 403) {
      showToast(res?.data?.detail, "error");
      return;
    }
    if (res?.status === 500) {
      sessionStorage.setItem("error-status", "500");
      useRouter().push("/something-must-have-been-gone-wrong");
      showToast(t("error.500.title"), "error");
    }

    showToast(
      res?.data?.errors?.[0]?.error || t("error.something_wrong"),
      "error"
    );

    return { error: res?.data?.errors?.[0]?.error };
  }

  return { handleError };
}

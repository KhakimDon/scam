import { useRouter } from "vue-router";

export function useRouteQuery() {
  const router = useRouter();

  async function updateQuery(key: string, value?: string | number) {
    await router.replace({ query: { [key]: String(value) } });
  }

  return { updateQuery };
}

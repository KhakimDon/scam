<template>
  <div>
    <BaseDropdown
      ref="profileDropdown"
      :show="show"
      body-class="overflow-visible !border-[#E5EAEE]"
      head-class="cursor-pointer"
      @toggle="handleToggle"
    >
      <template #head>
        <div class="flex items-center gap-3">
          <div v-if="isAuth" class="flex items-center gap-3">
            <div class="h-max flex flex-col justify-center">
              <span
                class="text-sm font-medium text-dark text-right leading-20 !break-all max-w-[400px] line-clamp-1"
                >{{ user?.full_name }}</span
              >
              <span class="text-sm text-gray text-right">
                {{ $t("user") }}
              </span>
            </div>
            <router-link to="/profile">
              <BaseAvatar
                avatar-class="w-9 h-9 rounded-md object-cover"
                :image="user?.avatar_url || '/images/default-avatar.png'"
              />
            </router-link>
          </div>
          <span
            :class="{ 'rotate-180': show }"
            class="icon-arrow-md text-2xl text-gray transition-300"
          />
        </div>
      </template>
      <template #body>
        <div class="bg-white rounded-md profile-dropdown">
          <div class="flex items-center gap-3 p-5 pt-6">
            <router-link class="flex items-center gap-3 group" to="/profile">
              <BaseAvatar
                avatar-class="!w-[50px] !h-[50px] object-cover"
                :image="user?.avatar_url || '/images/default-avatar.png'"
              />
              <div class="h-max flex flex-col justify-center">
                <span
                  class="text-sm font-medium text-dark text-right leading-20 !break-all max-w-[400px] line-clamp-1 group-hover:underline duration-300"
                  >{{ user?.full_name }}</span
                >
                <span class="text-sm text-gray text-right">
                  {{ $t("user") }}
                </span>
              </div>
            </router-link>
          </div>
          <router-link
            :to="{ name: 'Dashboard' }"
            class="flex flex-col gap-1 border-t border-[#E5EAEE]"
            @click="reloadPage"
          >
            <div
              class="text-sm !px-4 py-2 w-full transition-all duration-300 cursor-pointer text-gray-700 hover:bg-red-50 hover:text-red-500"
              @click="$emit('logout')"
            >
              <span class="mx-4">{{ $t("logout") }}</span>
            </div>
          </router-link>
        </div>
      </template>
    </BaseDropdown>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import { defineComponent, ref } from "vue";

import BaseAvatar from "@/components/Base/Avatar/BaseAvatar.vue";
import BaseDropdown from "@/components/Base/Dropdown/BaseDropdown.vue";
import type { IAuthUser } from "@/types/auth";

defineComponent({
  name: "HeaderProfile",
});

interface Props {
  user?: IAuthUser;
  isAuth?: boolean;
  profileItems?: {
    title: string;
    class?: string;
    icon?: string;
    event?: string;
  }[];
}

defineProps<Props>();
const show = ref(false);

function handleToggle(val: boolean, e: Event) {
  if (e?.relatedTarget?.id === "lang-switcher") {
    return;
  }
  show.value = val;
}

const profileDropdown = ref<HTMLElement | null>(null);
onClickOutside(profileDropdown, () => {
  show.value = false;
});

const reloadPage = () => {
  window.location.reload();
};
</script>

<style scoped>
.profile-dropdown {
  box-shadow: 0 0 50px rgba(82, 63, 105, 0.15);
}
</style>

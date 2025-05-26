<script lang="ts" setup>
import {cn} from '@/lib/utils'
import type {RouteLocationRaw} from "vue-router";

type Props = {
  to: RouteLocationRaw
}
defineProps<Props>();
</script>

<template>
  <RouterLink
      :class="cn('transition-200 hover:opacity-70 cursor-pointer', $attrs.class ? $attrs.class : '')"
      :to
  >
    <slot/>
  </RouterLink>
</template>

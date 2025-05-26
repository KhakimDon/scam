<template>
  <nav :class="$attrs.class" aria-label="breadcrumb">
    <BreadcrumbList>
      <BreadcrumbItem class="text-dark font-medium">
        <BreadcrumbLink :to="{ name: 'Dashboard' }">
          {{ $t('breadcrumb.home') }}
        </BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbSeparator/>

      <BreadcrumbItem v-if="routes.length - 1 > 2">
        <DropdownMenu>
          <DropdownMenuTrigger class="flex-y-center gap-1">
            <i class="icon-dots text-lg text-gray-1"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem v-for="(item, key) in routes.slice(0, routes.length - 1)" :key class="cursor-pointer">
              <BreadcrumbLink :to="item.route">
                {{ item.name }}
              </BreadcrumbLink>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <BreadcrumbSeparator/>
      </BreadcrumbItem>

      <template v-else>
        <BreadcrumbItem v-for="(item, key) in routes" :key>
          <BreadcrumbLink :to="item.route">
            {{ item.name }}
          </BreadcrumbLink>
          <BreadcrumbSeparator/>
        </BreadcrumbItem>
      </template>

      <BreadcrumbItem class="text-gray-1">
        {{ lastRoute.name }}
      </BreadcrumbItem>
    </BreadcrumbList>
  </nav>
</template>

<script lang="ts" setup>
import {BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator,} from '@/components/ui/breadcrumb'
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from '@/components/ui/dropdown-menu'
import type {BreadcrumbProps} from "@/types/components";
import {computed} from "vue";

const props = defineProps<BreadcrumbProps>()

const lastRoute = computed(() => props.routes[props.routes.length - 1])
</script>

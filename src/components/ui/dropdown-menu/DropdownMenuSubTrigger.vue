<script lang="ts" setup>
import {cn} from '@/lib/utils'
import {DropdownMenuSubTrigger, type DropdownMenuSubTriggerProps, useForwardProps,} from 'radix-vue'
import {computed, type HTMLAttributes} from 'vue'

const props = defineProps<DropdownMenuSubTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const {class: _, ...delegated} = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuSubTrigger
      :class="cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-slate-100 data-[state=open]:bg-primary dark:focus:bg-primary/50 dark:data-[state=open]:bg-primary',
      props.class,
    )"
      v-bind="forwardedProps"
  >
    <slot/>
    <i class="ml-auto text-lg icon-chevron"/>
  </DropdownMenuSubTrigger>
</template>

<script lang="ts" setup>
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip'

defineProps<{ text: string }>()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <button type="button">
          <slot/>
        </button>
      </TooltipTrigger>

      <TooltipContent side="bottom">
        <p>{{ text }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
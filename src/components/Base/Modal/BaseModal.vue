<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <slot name="trigger"/>
    </DialogTrigger>

    <DialogContent :class="wrpClass" class="sm:max-w-[425px]">
      <DialogHeader>
        <slot name="header">
          <DialogTitle>{{ title }}</DialogTitle>
          <DialogDescription>
            {{ description }}
          </DialogDescription>
        </slot>
      </DialogHeader>

      <slot/>

      <DialogFooter>
        <slot name="footer">
          <BaseButton text="button.cancel" variant="neutral" @click="isOpen = false"/>

          <BaseButton text="button.continue" @click="emit('submit')"/>
        </slot>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type {ModalProps} from "@/types/components";
import {BaseButton} from "@/components/Base";

type Emits = {
  (e: 'submit'): void;
}

defineProps<ModalProps>()
const emit = defineEmits<Emits>()
const isOpen = defineModel<boolean>({required: true})
</script>

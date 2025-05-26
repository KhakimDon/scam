<template>
  <BaseModal v-model="isOpen" description="this is just a example of how to use modal" title="hello guys"
             @submit="toggle">
    <template #trigger>
      <BaseButton text="button.open"/>
    </template>

    <div class="grid gap-4 py-4 font-medium">
      The body of the modal
    </div>
  </BaseModal>

</template>

<script lang="ts" setup>
import {BaseButton, BaseModal} from "@/components/Base";
import useToggle from "@/composables/useToggle";

const {isOpen, toggle} = useToggle()
</script>
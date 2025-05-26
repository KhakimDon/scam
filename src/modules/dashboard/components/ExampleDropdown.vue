<template>
  <!--THIS IS JUST A EXAMPLE OF HOW TO USE IT. YOU HAVE TO MAKE YOUR OWN COMPONENT FROM THIS STRUCTURE AS HOW YOU WANT IT -->
  <BaseDropdown>
    <template #trigger>
      <BaseButton text="Dropdown Button"/>
    </template>

    <div>
      <DropdownMenuItem>
        is it me?
      </DropdownMenuItem>
      <DropdownMenuItem>
        or me?
      </DropdownMenuItem>
      <DropdownMenuItem @click="showAlert">
        only one chance to choose
      </DropdownMenuItem>
    </div>
  </BaseDropdown>

</template>

<script lang="ts" setup>

import {BaseButton, BaseDropdown} from "@/components/Base";
import {DropdownMenuItem} from "@/components/ui/dropdown-menu";

function showAlert() {
  alert('today is your lucky day')
}
</script>
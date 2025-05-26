<template>
  <div class="bg-white p-6 rounded-xl relative overflow-hidden flex gap-5">
    <div
      class="relative rounded-lg border-2 border-white-100 shrink-0 overflow-hidden shimmer w-[140px] h-[135px]"
    ></div>

    <div class="h-auto flex flex-col justify-between w-full">
      <div class="h-9 w-[250px] shimmer rounded-md"></div>
      <div class="flex gap-4">
        <div
          v-for="i in 4"
          :key="i"
          class="rounded-md border border-dashed border-gray-2 py-2 px-3 flex flex-col gap-0.5"
        >
          <div class="w-[120px] h-5 rounded shimmer"></div>
          <div class="w-20 h-4 rounded shimmer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

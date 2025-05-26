<template>
  <div class="h-60 w-full">
    <div :key="modelValue" class="w-full h-full bg-white rounded-xl">
      <!-- Image Preview -->
      <div
        v-if="imageUrl"
        class="relative rounded-lg h-full w-full"
        draggable="true"
        @dragstart="handleDragStart"
        @dragover.prevent="handleDragOver"
        @drop.prevent="onDrop"
      >
        <div class="rounded-lg h-full w-full group">
          <div
            class="cursor-pointer absolute z-10 top-3 right-3 size-10 rounded-md bg-dark/40 backdrop-blur border border-white/30 flex-center"
            @click="removeImage"
          >
            <span class="icon-trash text-white text-xl" />
          </div>
          <img
            :src="imageUrl"
            alt="image"
            class="rounded-lg h-full w-full relative z-[1] object-center object-cover aspect-square"
          />
        </div>
      </div>

      <!-- Drag and Drop Area -->
      <label
        v-else
        :class="{ 'border-blue': isDragging, '!border-red': error }"
        :for="id || 'image-uploader-input'"
        class="h-full w-full text-center bg-stone-1 rounded-lg p-6 max-sm:p-1 border-grey-2 border flex justify-center items-center flex-col cursor-pointer transition-300 hover:border-dashed hover:border-blue hover:bg-[#2088FF14] group"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
      >
        <span
          class="font-medium mt-5 mb-2 text-dark group-hover:text-blue transition-300"
        >
          <i
            class="icon-photo-plus group-hover:text-blue text-xl align-middle text-gray-1"
          />
          {{ $t("form.upload.add_photo") }}
        </span>
        <p class="text-xs leading-4 text-gray-1 font-medium">
          {{ $t("form.upload.max_size_photo") }}
        </p>
      </label>
      <input
        :id="id || 'image-uploader-input'"
        ref="input"
        accept="image/*"
        class="file hidden"
        type="file"
        @change="onFileSelect"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";

import { useCustomToast } from "@/composables/useCustomToast";
import useToggle from "@/composables/useToggle";

const { showToast } = useCustomToast();
const { t } = useI18n();
const { isOpen: isDragging, toggle: toggleDragging } = useToggle();

defineProps<{ id: string; error?: boolean }>();
const modelValue = defineModel<string | File | null>({
  required: true,
});

const imageUrl = ref("");

function onFileSelect(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (files && files[0]) {
    validateAndSetImage(files[0]);
  }
}

function validateAndSetImage(file: File) {
  const MAX_FILE_SIZE = 30 * 1024 * 1024;

  if (!file.type.startsWith("image/")) {
    showToast(t("toast.invalid_file_type"), "error");
    return;
  }

  if (file.size > MAX_FILE_SIZE) {
    showToast(t("toast.max_size_error"), "error");
    return;
  }

  imageUrl.value = URL.createObjectURL(file);
  modelValue.value = file;
}

function removeImage() {
  modelValue.value = null;
  imageUrl.value = "";
}

function handleDragStart() {
  toggleDragging();
}

function handleDragOver(event: DragEvent) {
  event.preventDefault();
}

function onDrop(event: DragEvent) {
  event.preventDefault();
  const files = event.dataTransfer?.files;
  if (files && files[0]) {
    validateAndSetImage(files[0]);
  }
}
</script>

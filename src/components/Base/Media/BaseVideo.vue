<template>
  <div class="relative" :class="$attrs.class">
    <button
      v-if="!isVideoPlayed && !isBrokenVideo"
      class="icon-play absolute-center flex-center transition-300 max-h-48 z-10 size-10 rounded-full bg-white/10 text-3.5xl text-white backdrop-blur-lg hover:bg-white/10"
      @click="handlePlayVideo"
    ></button>

    <video
      v-if="!isBrokenVideo"
      ref="videoRef"
      :src="src"
      class="rounded-xl brightness-75 h-60 w-full object-cover"
      :controls="isVideoPlayed"
      @ended="isVideoPlayed = false"
      @error="handleError"
    ></video>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// Props
defineProps<{ src: string }>();

// Refs and reactive states
const videoRef = ref(null);
const isVideoPlayed = ref(false);
const isBrokenVideo = ref(false);
// const isLoading = ref(true);

// Play video handler
const handlePlayVideo = () => {
  if (videoRef.value) {
    isVideoPlayed.value = true;
    videoRef.value.play();
  }
};

// Error handler
const handleError = (event) => {
  isBrokenVideo.value = true;
  event.target.onerror = null;
};

// // Video event handlers
// const handleLoadedMetadata = () => {
//   isLoading.value = false;
// };
//
// const handleWaiting = () => {
//   isLoading.value = true;
// };
//
// const handlePlaying = () => {
//   isLoading.value = false;
// };

// // Lifecycle hooks to manage event listeners
// onMounted(() => {
//   const currentVideo = videoRef.value;
//   if (currentVideo) {
//     currentVideo.addEventListener("loadedmetadata", handleLoadedMetadata);
//     currentVideo.addEventListener("waiting", handleWaiting);
//     currentVideo.addEventListener("playing", handlePlaying);
//   }
// });
//
// onUnmounted(() => {
//   const currentVideo = videoRef.value;
//   if (currentVideo) {
//     currentVideo.removeEventListener("loadedmetadata", handleLoadedMetadata);
//     currentVideo.removeEventListener("waiting", handleWaiting);
//     currentVideo.removeEventListener("playing", handlePlaying);
//   }
// });
</script>

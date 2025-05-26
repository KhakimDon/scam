<template>
  <div
    class="flex-center rounded-xl absolute bg-white/20 backdrop-blur-lg size-full z-20"
  >
    <div class="loader" />
  </div>
</template>

<style scoped>
.loader {
  width: 50px;
  aspect-ratio: 1;
  display: grid;
  border: 4px solid #0000;
  border-radius: 50%;
  animation: l15 1s infinite linear;
  @apply border-r-primary;
}

.loader::before,
.loader::after {
  content: "";
  grid-area: 1/1;
  margin: 2px;
  border: inherit;
  border-radius: 50%;
  animation: l15 2s infinite;
}

.loader::after {
  margin: 8px;
  animation-duration: 3s;
}

@keyframes l15 {
  100% {
    transform: rotate(1turn);
  }
}
</style>

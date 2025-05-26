import { ref } from "vue";

const useToggle = (defaultValue?: boolean) => {
  const isOpen = ref(defaultValue ?? false);

  function open() {
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function toggle() {
    isOpen.value = !isOpen.value;
  }

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};

export default useToggle;

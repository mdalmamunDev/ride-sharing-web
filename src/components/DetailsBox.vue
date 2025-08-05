<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-overlay overflow-auto">
    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>

    <!-- Modal Container -->
    <div class="relative z-50 w-full max-h-[100vh] overflow-y-auto mx-4" :class="`max-w-${maxW}`">
      <div class="bg-white rounded-2xl p-8 shadow-2xl text-center transform transition-all duration-300 scale-100">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "AlertBox",
  props: {
    isOpen: {
      type: Boolean,
      default: true,
    },
    maxW: {
      type: String,
      default: "md",
    },
  },
};
</script>
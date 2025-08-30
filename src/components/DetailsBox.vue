<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-overlay">
    <div class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" @click="closeOut"></div>

    <!-- Modal Container -->
    <div class="relative z-50 w-full max-h-[100vh] sm:max-h-[90vh] overflow-y-auto scrollbar-hide sm:mx-4 bg-white rounded-3xl " :class="`max-w-${maxW}`">
      <div
        class="p-4 sm:p-8 shadow-2xl text-center transform transition-all duration-300 scale-100"
        :class="containerClass">
        <button v-if="showCloseBtn" @click="$emit('close')" class="absolute right-3 top-2 text-2xl">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <h2 v-if="title" class="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{{ title }}</h2>
        <p v-if="message" class="text-[#858585] mb-6 text-center">{{ message }}</p>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "DetailsBox",
  props: {
    title: String,
    message: String,
    isOpen: {
      type: Boolean,
      default: false,
    },
    closeOutside: {
      type: Boolean,
      default: false,
    },
    maxW: {
      type: String,
      default: "md",
    },
    containerClass: {
      type: String,
      default: "",
    },
    showCloseBtn: {
      type: Boolean,
      default: true,
    }
  },
  mounted() {
    // Fake push to history, so that back button triggers popstate
    history.pushState(null, null, location.href);
    window.addEventListener("popstate", this.handleBackPress);
  },
  beforeUnmount() {
    window.removeEventListener("popstate", this.handleBackPress);
  },
  methods: {
    handleBackPress() {
      history.pushState(null, null, location.href);
      this.$emit("close");
      
    },

    closeOut() {
      if(this.closeOutside) this.$emit('close');
    }
  }
};
</script>
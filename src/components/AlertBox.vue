<template>
  <div v-if="isAlert" class="fixed inset-0 z-50 flex items-center justify-center bg-overlay overflow-auto">
    <div @click="closeAlert" class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"></div>

    <!-- Modal Container -->
    <div class="relative z-50 w-full max-w-sm mx-4">
      <div class="bg-white rounded-2xl p-8 shadow-2xl text-center transform transition-all duration-300 scale-100">
        <!-- Success Icon -->
        <div v-if="showIcon" class="w-16 h-16 bg-g rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-check text-white text-2xl"></i>
        </div>

        <h3 v-if="title" class="text-xl font-bold mb-1">{{ title }}</h3>
        <p class="text-xs text-gray-500 mb-5">{{ message }}</p>
        <slot></slot>

        <!-- Action Button -->
        <button @click="closeAlert(); $emit('ok')" class="w-full py-3 btn-g">{{ okBtnText }}</button>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "AlertBox",
  props: {
    title: String,
    message: String,
    showIcon: {
      type: Boolean,
      default: true,
    },
    showCancelBtn: {
      type: Boolean,
      default: true,
    },
    okBtnText: {
      type: String,
      default: "Ok",
    },
    flag: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      //
    };
  },
  methods: {
    //
  },
};
</script>

<style scoped>
/* You can add more styles here if needed */
</style>
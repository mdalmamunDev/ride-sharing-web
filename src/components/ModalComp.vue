<template>
  <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-xl p-1 sm:p-6 relative">
      <div v-if="showHeader" class="flex items-center justify-between mb-4">
          <span class="font-semibold text-lg">{{ title }}</span>
          <button class="text-2xl text-gray-500 hover:text-black" @click="closeModal()">
            &times;
          </button>
      </div>
      <form @submit.prevent="closeModal(); $emit('submit')" class="p-3 border-2 rounded overflow-y-auto max-h-[80vh]">
        <slot>
          <!-- Default slot content goes here -->
        </slot>
        <div class="flex justify-end mt-4">
          <button v-if="showCancelBtn" type="button" class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2" @click="closeModal()">Cancel</button>
          <button type="submit" class="bg-g text-white px-4 py-2 rounded">{{ submitBtnText }}</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  name: "ModalComp",
  props: {
    title: String,
    showHeader: {
      type: Boolean,
      default: true,
    },
    showCancelBtn: {
      type: Boolean,
      default: true,
    },
    submitBtnText: {
      type: String,
      default: "Submit",
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

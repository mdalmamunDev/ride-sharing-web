<template>
  <div class="flex flex-col">
    <label class="text-sm font-medium text-gray-600 mb-1">{{ label }}</label>
    <input
      type="text"
      :placeholder="label"
      class="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
      v-model="inputValue"
    />
  </div>
</template>

<script>
export default {
  name: 'InputField',
  props: ['label', 'modelValue'],
  emits: ['update:modelValue'],
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },
  },
};
</script>

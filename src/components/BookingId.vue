<template>
  <span class="font-bold cursor-copy" @click="copyToClipboard(value)">
    {{ bid }}
  </span>
</template>

<script>


export default {
  name: "BookingId",
  props: {
    value: String,
  },

  computed: {
    bid() {
      if (!this.value) return this.value;
      return this.value.slice(0, 4) + "..." + this.value.slice(-4)
    }
  }
};
</script>
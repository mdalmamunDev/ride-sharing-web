<template>
  <div class="max-w-xl mx-auto">
    <h1 class="text-2xl mb-6 font-bold text-center">{{ $route.meta.title }}</h1>
    <div v-html="terms"></div>
  </div>
</template>

<script>

export default {
  name: "PrivacyPolicyPage",
  data: () => {
    return {
      terms: "",
    }
  },
  mounted() {
    this.httpReq({
      method: 'get',
      callback: (setting) => this.terms = setting?.value,
    });
  },
};
</script>

<template>
  <div>
    <h1 class="text-4xl font-bold mb-2">Forgot Password</h1>
    <p class="text-sm text-gray-600 mb-8">
      Please enter your Email to reset your password.
    </p>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <div
          class="flex items-center border border-[#4EB5FF] rounded-md px-4 py-3"
        >
          <i class="fa-regular fa-envelope"></i>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            v-model="formData.email"
            class="w-full text-sm outline-none ms-3"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        class="w-full bg-[#5680C0] text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition"
        :disabled="loading"
      >
        <span v-if="loading">
          <i class="fa fa-spinner fa-spin mr-2"></i> Sending...
        </span>
        <span v-else>
          Get OTP
        </span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ForgotPasswordPage",
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    handleSubmit() {
      this.loading = true;
      this.httpReq({
        callback: () => {
          this.loading = false;
          this.$router.push({ path: '/auth/verify-email', query: { email: this.formData.email } });
        },
        errorCallback: () => {
          this.loading = false;
        }
      });
    },
  },
};
</script>

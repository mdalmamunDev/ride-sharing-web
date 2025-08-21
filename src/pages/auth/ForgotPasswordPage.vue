<template>
  <div class="flex flex-col items-center w-full pt-8">
    <!-- Heading -->
    <h2 class="text-2xl font-bold mb-2 text-center">Forgot Your Password?</h2>
    <p class="text-sm text-gray-500 mb-6 text-center">Please enter your email and we will send you a code to reset your password.</p>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-5">
      <div>
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <i class="fas fa-envelope"></i>
          </span>
          <input type="email" id="email" placeholder="Enter your email" v-model="formData.email" class="pl-12 pr-4 py-3 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
        </div>
      </div>
      <action-button extra-class="w-full py-3">Continue</action-button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ForgotPasswordPage",
  data() {
    return {
      //
    };
  },
  methods: {
    handleSubmit() {
      this.httpReq({
        callback: ({resetPasswordToken}) => {
          
          localStorage.setItem('resetPasswordToken', resetPasswordToken);
          this.$router.push({ path: '/auth/verify-email' });
        },
        errorCallback: () => {
        }
      });
    },
  },
};
</script>

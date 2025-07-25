<template>
  <div>
    <h1 class="text-4xl font-bold mb-2">Reset Password</h1>
    <p class="text-sm text-gray-600 mb-8">Your password must be 8-10 characters long.</p>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="password" class="block text-sm font-medium mb-1">New Password</label>
        <div class="flex items-center border border-[#4EB5FF] rounded-md px-4 py-3">
          <i class="fa fa-lock"></i>
          <input min="8" type="password" id="password" placeholder="Enter password" v-model="password" class="w-full text-sm outline-none ms-3" required />
        </div>
      </div>
      <div>
        <label for="confirmPassword" class="block text-sm font-medium mb-1">Confirm Password</label>
        <div class="flex items-center border border-[#4EB5FF] rounded-md px-4 py-3">
          <i class="fa fa-lock"></i>
          <input min="8" type="password" id="confirmPassword" placeholder="Confirm new password" v-model="confirmPassword" class="w-full text-sm outline-none ms-3" required />
        </div>
      </div>
      <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
      <button type="submit" class="w-full bg-[#5680C0] text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition" :disabled="loading">
        <span v-if="loading"><i class="fa fa-spinner fa-spin mr-2"></i> Resetting...</span>
        <span v-else>Reset Password</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ResetPasswordPage",
  data() {
    return {
      password: "",
      confirmPassword: "",
      loading: false,
      error: "",
    };
  },
  methods: {
    handleSubmit() {
      this.error = "";
      if (!this.password || !this.confirmPassword) {
        this.error = "Please fill in both password fields.";
        return;
      }
      if (this.password !== this.confirmPassword) {
        this.error = "Passwords do not match.";
        return;
      }
      if (this.password.length < 8) {
        this.error = "Password must be at least 8 characters long.";
        return;
      }
      this.loading = true;
      this.httpReq({
        data: {
          password: this.password,
          confirmPassword: this.confirmPassword,
        },
        token: localStorage.getItem('resetToken'),
        callback: () => {
          this.loading = false;
          localStorage.removeItem('resetToken');
          this.$router.push('/auth/login');
        },
        errorCallback: ({message}) => {
          this.loading = false;
          this.error = message || "An error occurred.";
        }
      });
    },
  },
};
</script>

<style>
</style>

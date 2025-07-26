<template>
  <div class="flex flex-col items-center w-full pt-8">
    <h1 class="text-4xl font-bold mb-2">Reset Password</h1>
    <p class="text-sm text-gray-600 mb-8">Your password must be 8-10 characters long.</p>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label for="password" class="block text-sm font-medium mb-1">New Password</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <i class="fa-solid fa-lock"></i>
          </span>
          <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="New password" v-model="formData.password" class="pl-12 pr-10 py-3 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
          <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-1 cursor-pointer" @click="showPassword = !showPassword">
            <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </span>
        </div>
      </div>
      <div>
        <label for="password" class="block text-sm font-medium mb-1">Confirm Password</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <i class="fa-solid fa-lock"></i>
          </span>
          <input :type="showPassword2 ? 'text' : 'password'" id="password" placeholder="New password" v-model="formData.confirmPassword" class="pl-12 pr-10 py-3 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
          <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-1 cursor-pointer" @click="showPassword2 = !showPassword2">
            <i :class="showPassword2 ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </span>
        </div>
      </div>
      <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
      <button type="submit" class="w-full py-3 rounded-full bg-g text-white text-base font-bold shadow" :disabled="loading">
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
      showPassword: false,
      showPassword2: false,
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

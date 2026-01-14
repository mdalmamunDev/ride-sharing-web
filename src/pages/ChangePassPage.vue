<template>
  <div class="max-w-xl mx-auto">
    <h3 class="hidden sm:block text-2xl font-semibold text-center">Reset Password</h3>

    <form class="space-y-6 mt-12" @submit.prevent="httpReq">

      <!-- Current Password -->
      <div class="w-full">
        <label class="text-sm font-semibold">Enter old password</label>
        <div class="relative w-full mt-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
            <img src="/icons/lock.svg" alt="lock">
          </div>

          <input :type="showCurrentPassword ? 'text' : 'password'" v-model="formData.currentPassword" minlength="8"
            placeholder="Enter old password" class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-10 focus:outline-none" />

          <span @click="showCurrentPassword = !showCurrentPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700">
            <i :class="showCurrentPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </span>
        </div>
      </div>

      <!-- New Password -->
      <div class="w-full">
        <label class="text-sm font-semibold">New password</label>
        <div class="relative w-full mt-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
            <img src="/icons/lock.svg" alt="lock">
          </div>

          <input :type="showNewPassword ? 'text' : 'password'" v-model="formData.password" minlength="8"
            placeholder="Enter new password" class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-10 focus:outline-none" />

          <span @click="showNewPassword = !showNewPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700">
            <i :class="showNewPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </span>
        </div>
      </div>

      <!-- Confirm Password -->
      <div class="w-full">
        <label class="text-sm font-semibold">Confirm password</label>
        <div class="relative w-full mt-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
            <img src="/icons/lock.svg" alt="lock">
          </div>

          <input :type="showConfirmPassword ? 'text' : 'password'" v-model="formData.confirmPassword" minlength="8"
            placeholder="Confirm new password"
            class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-10 focus:outline-none" />

          <span @click="showConfirmPassword = !showConfirmPassword"
            class="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-gray-700">
            <i :class="showConfirmPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </span>
        </div>
      </div>

      <button type="submit" class="w-full btn-g py-4">
        Update Password
      </button>
    </form>
  </div>
</template>


<script>
export default {
  name: "ChangePassPage",
  data() {
    return {
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false
    };
  },
  mounted() {
    this.$store.commit('setFormData', {});
  },
};
</script>
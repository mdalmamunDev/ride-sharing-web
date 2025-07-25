<template>
  <div class="max-w-xl mx-auto">
    <h3 class="text-2xl font-semibold text-center">Reset Password</h3>
    <form class="space-y-6 mt-12" @submit.prevent="resetPass">
      <div>
        <label class="block text-sm font-semibold mb-1">Enter old password</label>
        <a-input-password v-model:value="formData.password" minlength="8" :type="showPassword ? 'text' : 'password'" placeholder="Enter old password" class=" py-2 border rounded" >
          <!-- Left icon -->
          <template #prefix>
            <i class="fa fa-lock me-3"></i>
          </template>

          <!-- Right toggle icon -->
          <template #suffix>
            <span @click="togglePasswordVisibility" class="cursor-pointer text-gray-500">
              <component :is="showPassword ? EyeInvisibleOutlined : EyeOutlined" />
            </span>
          </template>
        </a-input-password>
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">New password</label>
        <a-input-password v-model:value="formData.newPassword" minlength="8" :type="showPassword ? 'text' : 'password'" placeholder="Enter new password" class=" py-2 border rounded" >
          <!-- Left icon -->
          <template #prefix>
            <i class="fa fa-lock me-3"></i>
          </template>

          <!-- Right toggle icon -->
          <template #suffix>
            <span @click="togglePasswordVisibility" class="cursor-pointer text-gray-500">
              <component :is="showPassword ? EyeInvisibleOutlined : EyeOutlined" />
            </span>
          </template>
        </a-input-password>
      </div>

      
      <div>
        <label class="block text-sm font-semibold mb-1">Confirm password</label>
        <a-input-password v-model:value="formData.confirmNewPassword" minlength="8" :type="showPassword ? 'text' : 'password'" placeholder="Confirm new password" class=" py-2 border rounded" >
          <!-- Left icon -->
          <template #prefix>
            <i class="fa fa-lock me-3"></i>
          </template>

          <!-- Right toggle icon -->
          <template #suffix>
            <span @click="togglePasswordVisibility" class="cursor-pointer text-gray-500">
              <component :is="showPassword ? EyeInvisibleOutlined : EyeOutlined" />
            </span>
          </template>
        </a-input-password>
      </div>

      <div>
        <!-- <span class="text-red-500 cursor-pointer">Forgot password?</span> --> <!-- TODO -->
      </div>
      <button type="submit" class="w-full bg-[#5B84D7] text-white py-3 rounded text-lg font-medium hover:bg-blue-700" >
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
    showPassword: false
  };
},
  mounted() {
    this.$store.commit('setFormData', {});
  },
  methods: {
    resetPass(){
      this.httpReq({})
    }
  }
};
</script>

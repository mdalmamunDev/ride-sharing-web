<template>
  <div>
    <h1 class="text-4xl font-bold mb-2">Sign In Here</h1>
        <p class="text-sm text-gray-600 mb-8">Securely Login to your M-rent Account</p>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium mb-1">Email</label>
            <div class="flex items-center border border-[#4EB5FF] rounded-md px-4 py-3">
              <i class="fa-regular fa-envelope"></i>
              <input type="email" id="email" placeholder="Enter Email" v-model="formData.email" class="w-full text-sm outline-none ms-3" required />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium mb-1">Password</label>
            <div class="flex items-center border border-[#4EB5FF] rounded-md px-4 py-3">
              <i class="fa fa-lock"></i>
              <input type="password" id="password" placeholder="Enter password" v-model="formData.password" class="w-full text-sm outline-none ms-3" required />
            </div>
          </div>

          <div class="flex justify-between items-center text-sm">
            <label class="flex items-center gap-2">
              <input type="checkbox" v-model="rememberMe" class="accent-blue-600" />
              Remember me
            </label>
            <router-link to="/auth/forgot-password" class="text-red-500">Forgot password?</router-link>
          </div>

          <button type="submit" class="w-full bg-[#5680C0] text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition">
            Login
          </button>
        </form>

        <!-- <p class="text-sm mt-6">
          Already have an account?
          <a href="#" class="font-semibold">Sign up</a>
        </p> -->
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      rememberMe: false,
    };
  },
  methods: {
    handleSubmit() {      
      this.httpReq({
        // data: {
        //   email: this.email,
        //   password: this.password,
        // },
        callback: ({token}) => {
          if(!token) return;
          localStorage.setItem('token', token);
          this.$router.replace('/clients');
        }
      });
    },
  },
};
</script>

<style>
</style>

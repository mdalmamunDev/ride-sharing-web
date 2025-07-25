<template>
  <div class="flex flex-col items-center w-full pt-8">
    <!-- Logo -->
    <img src="/logo.svg" alt="Split Ride Logo" class="h-18 mb-14" />

    <!-- Heading -->
    <h2 class="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
    <p class="text-sm text-gray-500 mb-6 text-center">Enter your email &amp; password to login.</p>

    <!-- Toggle -->
    <div class="flex w-full max-w-md mb-6 gap-4 justify-center">
      <button :class="['flex-1 py-2 rounded-full font-semibold shadow', userType === 'Passenger' ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-white' : 'bg-[#F3F3F3] text-gray-600']" @click="userType = 'Passenger'">Passenger</button>
      <button :class="['flex-1 py-2 rounded-full font-semibold shadow', userType === 'Driver' ? 'bg-gradient-to-r from-cyan-400 to-purple-400 text-white' : 'bg-[#F3F3F3] text-gray-600']" @click="userType = 'Driver'">Driver</button>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-5">
      <div>
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12l-4-4-4 4m0 0v6m8-6v6" /></svg>
          </span>
          <input type="email" id="email" placeholder="Enter your email" v-model="formData.email" class="pl-12 pr-4 py-3 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
        </div>
      </div>
      <div>
        <label for="password" class="block text-sm font-medium mb-1">Password</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0-1.104.896-2 2-2s2 .896 2 2v2c0 1.104-.896 2-2 2s-2-.896-2-2v-2z" /></svg>
          </span>
          <input type="password" id="password" placeholder="Enter your password" v-model="formData.password" class="pl-12 pr-10 py-3 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
          <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          </span>
        </div>
      </div>
      <div class="flex justify-end items-center text-sm mb-2">
        <router-link to="/auth/forgot-password" class="text-[#A259FF] hover:underline">Forgot password?</router-link>
      </div>
      <button type="submit" class="w-full py-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 text-white text-base font-bold shadow">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      userType: 'Passenger',
      formData: {
        email: '',
        password: '',
      },
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

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(90deg, #43e9fe 0%, #a259ff 100%);
}
.shadow {
  box-shadow: 0 4px 16px rgba(162,89,255,0.08);
}
</style>

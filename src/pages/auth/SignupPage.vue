<template>
  <div class="flex flex-col items-center w-full pt-8">
    <!-- Heading -->
    <h2 class="text-2xl font-bold mb-2 text-center">Create an account</h2>
    <p class="text-sm text-gray-500 mb-6 text-center">Enter your information and create an account.</p>

       <!-- Toggle -->
    <div class="flex w-full max-w-md mb-6 gap-4 justify-center">
      <button :class="['flex-1 py-2 rounded-full font-semibold shadow', userType === 'user' ? 'bg-g text-white' : 'bg-[#F3F3F3] text-gray-600']" @click="userType = 'user'">Passenger</button>
      <button :class="['flex-1 py-2 rounded-full font-semibold shadow', userType === 'provider' ? 'bg-g text-white' : 'bg-[#F3F3F3] text-gray-600']" @click="userType = 'provider'">Driver</button>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-5">
      <div>
        <label for="name" class="block text-sm font-medium mb-1">Name</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <i class="fas fa-user"></i>
          </span>
          <input type="text" id="name" placeholder="Enter your name" v-model="formData.name" class="pl-12 pr-4 py-3 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <i class="fas fa-envelope"></i>
          </span>
          <input type="email" id="email" placeholder="Enter your email" v-model="formData.email" class="pl-12 pr-4 py-3 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
        </div>
      </div>
      <div>
        <label for="phone" class="block text-sm font-medium mb-1">Phone</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <i class="fas fa-phone"></i>
          </span>
          <input type="phone" id="phone" placeholder="Enter your phone" v-model="formData.phone" class="pl-12 pr-4 py-3 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
        </div>
      </div>
      <div>
        <label for="password" class="block text-sm font-medium mb-1">Password</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <i class="fa-solid fa-lock"></i>
          </span>
          <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Enter your password" v-model="formData.password" class="pl-12 pr-10 py-3 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
          <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-1 cursor-pointer" @click="showPassword = !showPassword">
            <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </span>
        </div>
      </div>
      <div class="flex justify-end items-center text-sm mb-2">
        <router-link to="/auth/forgot-password" class="text-g hover:underline">Forgot password?</router-link>
      </div>
      <button type="submit" class="w-full py-3 rounded-full bg-g text-white text-base font-bold shadow">Signup</button>
    </form>

    <div class="flex justify-end items-center text-sm mt-10 mb-2">
      Already have account? <router-link to="/auth/login" class="text-g hover:underline ms-1">Login now</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignupPage",
  data() {
    return {
      userType: 'user',
      showPassword: false,
      formData: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    handleSubmit() {      
    //   this.httpReq({
        // data: {
        //   email: this.email,
        //   password: this.password,
        // },
        // callback: ({token}) => {
        //   if(!token) return;
        //   localStorage.setItem('token', token);
          this.$router.replace(this.userType === 'user' ? '/' : 'complete');
      //   }
      // });
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

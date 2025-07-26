<template>
  <div class="min-h-screen flex items-center justify-center bg-white w-full h-screen">
    <div class="flex h-screen justify-between w-full overflow-auto">
      <!-- Left side -->
       <!-- mobile -->
      <div class="sm:hidden flex flex-col justify-end mx-auto w-full bg-g">
        <!-- Logo -->
        <img src="/logo-white.svg" alt="Split Ride Logo" class="w-48 mx-auto mb-8" />
        <div class="bg-white p-4 rounded-t-[40px] min-h-[75vh]">
          <router-view />
        </div>
      </div>
      <!-- desktop -->
      <div class="hidden sm:flex flex-col justify-center mx-auto w-[400px]">
        <div class="mb-8 bg-white p-2 rounded-t-[40px]">
          <router-view />
        </div>
      </div>

      <!-- Right side -->
      <div class="hidden md:flex relative items-center justify-center overflow-hidden">
      <div class="relative z-10 w-full h-full bg-g rounded-l-[85px] flex items-center justify-center">
        <img src="/images/auth-bg.png" alt="Design Image" class="h-full w-full object-cover" />
      </div>
      <!-- <div class="absolute h-full w-1/2 right-0 bg-[#94B3E2]"></div>
      <div class="absolute bottom-0 right-0 w-[25%] h-[25%] bg-[#ACB690] rounded-full translate-x-1/2 translate-y-1/2"></div>
      <div class="absolute bottom-[6%] right-[6%] w-[7%] h-[7%] bg-white rounded-full"></div> -->
      </div>
    </div>
    <button v-if="!isLoginPage" @click="$router.back()" class="sm:hidden w-10 h-10 fixed top-10 left-3 bg-white/20 backdrop-blur-md text-white rounded-full shadow-lg hover:bg-white/30 transition">
      <i class="fas fa-arrow-left"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
    };
  },
  computed: {
    isLoginPage() {
      return this.$route.path.includes('/auth/login');
    }
  },
  methods: {
    handleSubmit() {
      console.log("Email:", this.email);
      console.log("Password:", this.password);
      console.log("Remember Me:", this.rememberMe);
      alert(
        `Logging in with\nEmail: ${this.email}\nPassword: ${"*".repeat(
          this.password.length
        )}`
      );
    },
  },
};
</script>

<style>
body {
  font-family: "Outfit", sans-serif;
}
</style>

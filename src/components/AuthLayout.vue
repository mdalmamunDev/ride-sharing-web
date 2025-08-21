<template>
  <div class="min-h-screen flex items-center justify-center bg-white w-full h-screen">
    <div class="flex h-screen justify-between w-full overflow-auto">
      <!-- Left side -->
      <!-- mobile -->
      <div class="sm:hidden flex flex-col justify-end mx-auto w-full bg-g">
        <!-- Logo -->
        <img src="/logo-white.svg" alt="Split Ride Logo" class="w-48 pt-8 mx-auto mb-8" />
        <div class="bg-white p-4 rounded-t-[40px] min-h-[75vh]">
          <router-view />
        </div>
      </div>

      <!-- desktop -->
      <div class="hidden sm:flex w-1/3 flex-col justify-center mx-auto min-w-[500px]">
        <div class="bg-white p-10 rounded-t-[40px] overflow-y-auto">
          <img src="/logo.svg" alt="Split Ride Logo" class="w-48 pt-8 mx-auto" />
          <router-view />
        </div>
      </div>
      <div class="hidden md:flex w-2/3 relative items-center justify-center overflow-hidden bg-g rounded-l-[25px] lg:rounded-l-[40px]">
        <div class="auth-bg">
          <img src="/images/auth-bg.svg" alt="Design Image" class="h-full w-4/5 xl:w-2/3" />
        </div>
        <!-- <div class="absolute h-full w-1/2 right-0 bg-[#94B3E2]"></div>
      <div class="absolute bottom-0 right-0 w-[25%] h-[25%] bg-[#ACB690] rounded-full translate-x-1/2 translate-y-1/2"></div>
      <div class="absolute bottom-[6%] right-[6%] w-[7%] h-[7%] bg-white rounded-full"></div> -->
      </div>
    </div>
    <button v-if="!isLoginPage" @click="$router.back()"
      class="sm:hidden w-10 h-10 fixed top-10 left-3 bg-white/20 backdrop-blur-md text-white rounded-full shadow-lg hover:bg-white/30 transition">
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
};
</script>

<style>
body {
  font-family: "Outfit", sans-serif;
}
</style>

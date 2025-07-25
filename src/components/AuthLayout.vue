<template>
  <div class="min-h-screen flex items-center justify-center bg-white w-full h-screen">
    <div class="flex h-screen justify-between w-full overflow-auto">
      <!-- Left side -->
      <div class="flex flex-col justify-center p-2 mx-auto w-[400px]">
      <router-view />
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

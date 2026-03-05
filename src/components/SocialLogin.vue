<template>
  <div class="w-full grid grid-cols-2 gap-4">
    <button type="button"
      class="col-span-1 flex items-center justify-center bg-gray-100 py-4 rounded-full duration-300 transform hover:bg-gray-200">
      <img src="/icons/fb.svg" alt="">
    </button>
    <button type="button" @click="loginWithGoogle"
      class="col-span-1 flex items-center justify-center bg-gray-100 py-4 rounded-full duration-300 transform hover:bg-gray-200">
      <img src="/icons/google.svg" alt="">
    </button>
  </div>
</template>

<script>
export default {
  name: "SocialLogin",
  methods: {
    loginWithGoogle() {
      const googleAuthUrl = this.urlGenerate('auth/google');
      window.location.href = googleAuthUrl;
    },
  }
}
</script>
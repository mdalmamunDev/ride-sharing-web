<template>
  <div class="w-full h-full flex flex-col items-center justify-center gap-8 bg-stone-50">
    <p class="text-xl font-medium tracking-widest uppercase">Select your role to continue</p>

    <div class="flex gap-4">
      <button @click="updateMyRole('provider')"
        class="group relative flex flex-col items-start gap-1 p-6 w-48 bg-white border border-stone-200 rounded-2xl shadow-sm hover:border-stone-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
        <img class="w-full" src="/images/role/provider.gif" alt="">
        <span class="text-base font-semibold text-stone-800">Driver</span>
        <span class="text-xs text-stone-400 leading-snug">Offer services & manage clients</span>
        <span
          class="absolute bottom-5 right-5 text-stone-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">→</span>
      </button>

      <button @click="updateMyRole('user')"
        class="group relative flex flex-col items-start gap-1 p-6 w-48 bg-white border border-stone-200 rounded-2xl shadow-sm hover:border-stone-400 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 text-left">
        <img class="w-full" src="/images/role/user.gif" alt="">
        <span class="text-base font-semibold text-stone-800">Passenger</span>
        <span class="text-xs text-stone-400 leading-snug">Browse & book services</span>
        <span
          class="absolute bottom-5 right-5 text-stone-300 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">→</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChooseRole",
  methods: {
    updateMyRole(newRole) {
      this.httpReq({
        customUrl: '/auth/update-role',
        data: { newRole },
        callback: (data) => {
          this.$store.commit('setAuth', data);
          if (data?.role === 'provider') this.$router.push('/auth/complete');
          else location.reload();

        }
      });
    }
  }
};
</script>
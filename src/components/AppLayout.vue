<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="bg-3 text-white flex items-center justify-between px-6 py-3 mb-6 shadow">
      <router-link to="/">
        <img :src="asset(Config?.appLogo || 'def/app-logo.svg')" class="max-w-48 max-h-16" alt="Logo">
      </router-link>
      <div class="flex items-center space-x-6">
        <router-link to="/" class="text-sm">Accounts</router-link>
        <router-link v-if="isEquipmentsRoute" to="/equipments" class="text-sm">Equipments</router-link>
        <router-link v-if="isEquipmentsRoute && filters?.clientId" :to="`/report?cid=${filters.clientId}`" class="text-sm">Reports</router-link>
        <div class="flex items-center space-x-2">
          <span class="font-medium">{{ auth?.name || 'Error! please reload :(' }}</span>
          <router-link to="/profile" class="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white">
            <img :src="asset(auth?.profileImage)" @error="onImageError" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
          </router-link>
        </div>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "AppLayout",
  data() {
    return {
     //
    };
  },
  methods: {
    //
  },
  computed: {
    isEquipmentsRoute() {
      return this.$route && this.$route.fullPath && this.$route.fullPath.includes('equipments');
    }
  }
};
</script>

<style>
body {
  font-family: "Outfit", sans-serif;
}
</style>

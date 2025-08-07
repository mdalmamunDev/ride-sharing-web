<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header
      class="hidden sm:block z-20 absolute w-full top-0 bg-white border-b shadow-lg border-gray-200 px-6 h-20 overflow-hidden">
      <div class="flex items-center justify-between h-full">

        <!-- Logo -->
        <router-link to="/">
          <img src="/logo.svg" class="w-40" alt="Logo" />
        </router-link>

        <!-- Navigation -->
        <nav class="flex space-x-8 items-center h-full relative font-bold">
          <router-link to="/d-home" class="relative h-full flex items-center"
            :class="{ 'text-g': ['/d-home'].includes($route.path) }">
            Home
            <div v-if="['/d-home'].includes($route.path)"
              class="absolute -bottom-[7px] left-0 right-0 h-[14px] bg-g rounded-full"></div>
          </router-link>

          <router-link to="/" class="relative h-full flex items-center"
            :class="{ 'text-g': ['/', '/navigate', '/show-more'].includes($route.path) }">
            Book Your Ride
            <div v-if="['/', '/navigate', '/show-more'].includes($route.path)"
              class="absolute -bottom-[7px] left-0 right-0 h-[14px] bg-g rounded-full"></div>
          </router-link>

          <router-link to="/my-rides" class="relative h-full flex items-center"
            :class="{ 'text-g': $route.path === '/my-rides' }">
            My Rides
            <div v-if="$route.path === '/my-rides'"
              class="absolute -bottom-[7px] left-0 right-0 h-[14px] bg-g rounded-full"></div>
          </router-link>

          <router-link to="/support" class="relative h-full flex items-center"
            :class="{ 'text-g': $route.path === '/support' }">
            Help & Support
            <div v-if="$route.path === '/support'"
              class="absolute -bottom-[7px] left-0 right-0 h-[14px] bg-g rounded-full"></div>
          </router-link>
        </nav>

        <!-- User Profile -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full overflow-hidden">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnFf6DXcgRxe71BOQm1orHpnKjJloo9c2jg&s"
              alt="Kimmy Natasa" class="w-full h-full object-cover" />
          </div>
          <div>
            <span class="text-gray-800 font-medium">Kimmy Natasa</span>
            <p class="text-sm text-blue-400 -mt-1">Verified</p>
          </div>
        </div>

      </div>
    </header>

    <!-- mobile nav -->
    <div v-if="!['/messages'].includes($route.path)"
      class="sm:hidden flex justify-between p-5 w-full absolute top-0 left-0 z-50">
      <div class="flex items-center">
        <button @click="toggleSideNav"
          class="bg-g w-10 h-10 rounded-full flex items-center justify-center text-white me-4">
          <i class="fa-solid fa-bars"></i>
        </button>
        <span class="font-bold text-xl">{{ $route.meta.title }}</span>
      </div>

      <div class="bg-white w-10 h-10 rounded-full flex items-center justify-center text-xl text-1">
        <i class="fa-solid fa-bell"></i>
      </div>
    </div>

    <!-- Side Navigation Overlay -->
    <div v-if="isSideNavOpen" @click="closeSideNav" class="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
      <!-- Side Navigation Panel -->
      <div @click.stop :class="[
        'fixed left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out',
        isSideNavOpen ? 'translate-x-0' : '-translate-x-full'
      ]">
        <!-- Side Nav Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <img src="/logo.svg" class="w-32" alt="Logo" />
          <button @click="closeSideNav" class="text-gray-400 hover:text-gray-600">
            <i class="fa-solid fa-times text-xl"></i>
          </button>
        </div>

        <!-- User Profile Section -->
        <div class="p-6 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-full overflow-hidden">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnFf6DXcgRxe71BOQm1orHpnKjJloo9c2jg&s"
                alt="Kimmy Natasa" class="w-full h-full object-cover" />
            </div>
            <div>
              <div class="text-gray-800 font-medium">Kimmy Natasa</div>
              <p class="text-sm text-blue-400">Verified</p>
            </div>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="py-4">
          <router-link to="/d-home" @click="closeSideNav"
            class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium"
            :class="{ 'text-g bg-gray-50': ['/d-home'].includes($route.path) }">
            <i class="fa-solid fa-car text-lg me-4 w-5"></i>
            Home
          </router-link>

          <router-link to="/" @click="closeSideNav"
            class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium"
            :class="{ 'text-g bg-gray-50': ['/', '/navigate', '/show-more'].includes($route.path) }">
            <i class="fa-solid fa-car text-lg me-4 w-5"></i>
            Book Your Ride
          </router-link>

          <router-link to="/my-rides" @click="closeSideNav"
            class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium"
            :class="{ 'text-g bg-gray-50': $route.path === '/my-rides' }">
            <i class="fa-solid fa-list text-lg me-4 w-5"></i>
            My Rides
          </router-link>

          <router-link to="/support" @click="closeSideNav"
            class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium"
            :class="{ 'text-g bg-gray-50': $route.path === '/support' }">
            <i class="fa-solid fa-headset text-lg me-4 w-5"></i>
            Help & Support
          </router-link>

          <!-- Additional Menu Items -->
          <div class="border-t border-gray-100 mt-4 pt-4">
            <a href="#" class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium">
              <i class="fa-solid fa-user text-lg me-4 w-5"></i>
              Profile
            </a>
            <a href="#" class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium">
              <i class="fa-solid fa-cog text-lg me-4 w-5"></i>
              Settings
            </a>
            <a href="#" class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium">
              <i class="fa-solid fa-sign-out-alt text-lg me-4 w-5"></i>
              Logout
            </a>
          </div>
        </nav>
      </div>
    </div>

    <div class="h-screen sm:pt-20">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "AppLayout",
  data() {
    return {
      isSideNavOpen: false
    };
  },
  methods: {
    toggleSideNav() {
      this.isSideNavOpen = !this.isSideNavOpen;
    },
    closeSideNav() {
      this.isSideNavOpen = false;
    }
  }
};
</script>

<style>
body {
  font-family: "Outfit", sans-serif;
}
</style>
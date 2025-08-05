<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header class="hidden sm:block z-20 absolute w-full top-0 bg-white border-b shadow-lg border-gray-200 px-6 h-20 overflow-hidden">
      <div class="flex items-center justify-between h-full">
        
        <!-- Logo -->
        <router-link to="/">
          <img src="/logo.svg" class="w-40" alt="Logo" />
        </router-link>

        <!-- Navigation -->
        <nav class="flex space-x-8 items-center h-full relative font-bold">
          <router-link to="/" class="relative h-full flex items-center" :class="{ 'text-g': ['/', '/navigate', '/show-more'].includes($route.path) }">
            Book Your Ride
            <div v-if="['/','/navigate', '/show-more'].includes($route.path)" class="absolute -bottom-[7px] left-0 right-0 h-[14px] bg-g rounded-full"></div>
          </router-link>

          <router-link to="/my-rides" class="relative h-full flex items-center" :class="{ 'text-g': $route.path === '/my-rides' }">
            My Rides
            <div v-if="$route.path === '/my-rides'" class="absolute -bottom-[7px] left-0 right-0 h-[14px] bg-g rounded-full"></div>
          </router-link>

          <router-link to="/support" class="relative h-full flex items-center" :class="{ 'text-g': $route.path === '/support' }">
            Help & Support
            <div v-if="$route.path === '/support'" class="absolute -bottom-[7px] left-0 right-0 h-[14px] bg-g rounded-full"></div>
          </router-link>
        </nav>

        <!-- User Profile -->
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-full overflow-hidden">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnFf6DXcgRxe71BOQm1orHpnKjJloo9c2jg&s" 
              alt="Kimmy Natasa"
              class="w-full h-full object-cover"
            />
          </div>
          <div>
            <span class="text-gray-800 font-medium">Kimmy Natasa</span>
            <p class="text-sm text-blue-400 -mt-1">Verified</p>
          </div>
        </div>

      </div>
    </header>

    <!-- mobile nav -->
    <div v-if="!['/messages'].includes($route.path)" class="sm:hidden flex justify-between p-5 w-full absolute top-0 left-0 z-50">
      <div class="flex items-center">
        <div class="bg-g w-10 h-10 rounded-full flex items-center justify-center text-white me-4">
          <i class="fa-solid fa-bars"></i>
        </div>
        <span class="font-bold text-xl">{{  $route.meta.title }}</span>
      </div>
      
      <div class="bg-white w-10 h-10 rounded-full flex items-center justify-center text-xl text-1">
        <i class="fa-solid fa-bell"></i>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "AppLayout",
};
</script>

<style>
body {
  font-family: "Outfit", sans-serif;
}
</style>

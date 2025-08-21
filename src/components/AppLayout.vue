<template>
  <div class="h-screen bg-white">
    <template v-if="auth?.role === 'provider' && auth?.step === 1">
      <div class="w-full h-full flex items-center justify-center">
        <router-link class="text-g underline" to="/auth/complete">Please complete your profile first</router-link>
      </div>
    </template>
    <template v-else>
      <!-- Header (Desktop) -->
      <header
        class="hidden sm:block z-20 absolute w-full top-0 bg-white border-b shadow-lg border-gray-200 px-6 h-20 overflow-hidden">
        <div class="flex items-center justify-between h-full">
          <!-- Logo -->
          <router-link to="/">
            <img src="/logo.svg" class="w-32 md:w-40" alt="Logo" />
          </router-link>

          <!-- Navigation -->
          <nav class="flex space-x-4 md:space-x-8 text-sm md:text-md items-center h-full relative font-bold">
            <template v-for="link in navLinks" :key="link.to">
              <router-link :to="link.to" class="relative h-full flex items-center"
                :class="{ 'text-g': link.activePaths.includes($route.path) }">
                {{ link.label }}
                <div v-if="link.activePaths.includes($route.path)"
                  class="absolute -bottom-[7px] left-0 right-0 h-[14px] bg-g rounded-full"></div>
              </router-link>
            </template>
          </nav>

          <!-- User Profile -->
          <router-link to="/profile" class="flex items-center space-x-3">
            <div class="w-10 h-10 p-0.5 bg-g rounded-full overflow-hidden">
              <img :src="showImg(auth?.profileImage)" alt="Kimmy Natasa"
                class="w-full h-full rounded-full bg-white object-cover" />
            </div>
            <div class="hidden md:block">
              <span class="text-gray-800 font-bold">{{ auth?.name || 'Unknown User' }}</span>
              <p v-if="auth?.role === 'user' || auth?.approvalStatus === 'verified'"
                class="text-sm text-g-2 font-bold mt-0.5">
                Verified</p>
              <p v-else-if="auth?.approvalStatus" class="text-sm text-g-danger font-bold mt-0.5 capitalize">Unverified
              </p>
            </div>
          </router-link>
        </div>
      </header>

      <!-- Mobile Header -->
      <div v-if="!['/messages'].includes($route.path)"
        class="sm:hidden flex justify-between p-5 py-9 w-full absolute top-0 left-0 z-50">
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

      <!-- Side Navigation Overlay (Mobile) -->
      <div v-if="isSideNavOpen" @click="closeSideNav" class="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
        <div @click.stop :class="[
          'fixed left-0 top-0 h-full w-80 max-w-[95%] overflow-auto bg-white shadow-xl transform transition-transform duration-300 ease-in-out pt-6',
          isSideNavOpen ? 'translate-x-0' : '-translate-x-full'
        ]">
          <!-- Side Nav Header -->
          <div class="flex items-center justify-between p-6 border-b border-gray-200">
            <img src="/logo.svg" class="w-32" alt="Logo" />
            <button @click="closeSideNav" class="text-gray-400 hover:text-gray-600">
              <i class="fa-solid fa-times text-xl"></i>
            </button>
          </div>

          <!-- User Profile -->
          <div class="p-6 border-b border-gray-100">
            <router-link to="/profile" @click="closeSideNav">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnnFf6DXcgRxe71BOQm1orHpnKjJloo9c2jg&s"
                    alt="Kimmy Natasa" class="w-full h-full object-cover" />
                </div>
                <div>
                  <span class="text-gray-800 font-bold">{{ auth?.name || 'Unknown User' }}</span>
                  <p v-if="auth?.role === 'user' || auth?.approvalStatus === 'verified'"
                    class="text-sm text-g-2 font-bold mt-0.5">Verified</p>
                  <p v-else-if="auth?.approvalStatus" class="text-sm text-g-danger font-bold mt-0.5 capitalize">
                    Unverified</p>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Navigation Menu -->
          <nav class="py-4">
            <template v-for="link in navLinks" :key="link.to">
              <router-link :to="link.to" @click="closeSideNav"
                class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium"
                :class="{ 'text-g bg-gray-50': link.activePaths.includes($route.path) }">
                <i :class="link.icon + ' text-lg me-4 w-5'"></i>
                {{ link.label }}
              </router-link>
            </template>

            <!-- Extra menu items -->
            <div class="border-t border-gray-100 mt-4 pt-4">
              <template v-for="link in extraLinks" :key="link.to">
                <router-link :to="link.to" @click="closeSideNav"
                  class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium"
                  :class="{ 'text-g bg-gray-50': link.activePaths.includes($route.path) }">
                  <i :class="link.icon + ' text-lg me-4 w-5'"></i>
                  {{ link.label }}
                </router-link>
              </template>
              <button @click="showAlert(); closeSideNav()"
                class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium">
                <i class="fa-solid fa-sign-out-alt text-lg me-4 w-5"></i> Logout
              </button>
            </div>
          </nav>
        </div>
      </div>

      <!-- Page Content -->
      <div class="h-screen sm:pt-20">
        <router-view />
        <div v-if="$route.path !== '/navigate'" class="sm:hidden h-[86px] w-full fixed top-0 left-0 bg-glass shadow-lg rounded-b-lg z-10"></div>
      </div>
    </template>
  </div>
</template>

<script>
import socket from '@/plugins/socket';
import Swal from 'sweetalert2';
export default {
  name: "AppLayout",
  data() {
    return {
      isSideNavOpen: false,
      links: [
        {
          label: "Home",
          roles: ['provider'],
          to: "/d-home",
          icon: "fa-solid fa-car",
          activePaths: ["/d-home"]
        },
        {
          label: "Book Your Ride",
          roles: ['user'],
          to: "/",
          icon: "fa-solid fa-car",
          activePaths: ["/", "/navigate", "/show-more"]
        },
        {
          label: "My Rides",
          roles: ['user', 'provider'],
          to: "/my-rides",
          icon: "fa-solid fa-list",
          activePaths: ["/my-rides"]
        },
        {
          label: "My Payments",
          roles: ['provider'],
          to: "/payments",
          icon: "fa-solid fa-list",
          activePaths: ["/payments"]
        },
        {
          label: "Help & Support",
          roles: ['user', 'provider'],
          to: "/support",
          icon: "fa-solid fa-headset",
          activePaths: ["/support"]
        },
      ],
      extraLinks: [
        {
          label: "Reset Password",
          roles: ['user', 'provider'],
          to: "/reset-pass",
          icon: "fa-solid fa-cog",
          activePaths: ["/reset-pass"]
        }
      ],
    };
  },
  computed: {
    navLinks() {
      return this.links.filter(link => link.roles.includes(this.auth?.role)) || [];
    }
  },
  mounted() {
    const existAuth = this.$store.getters.auth;
    if (existAuth?._id) {
      socket.emit("user-connected", { userId: existAuth?._id });

    } else {
      this.httpReq({
        customUrl: 'user/me', method: 'get', callback: (data) => {
          socket.emit("user-connected", { userId: data?._id });
          this.$store.commit('setAuth', data);
        }
      });
    }
  },
  methods: {
    toggleSideNav() {
      this.isSideNavOpen = !this.isSideNavOpen;
    },
    closeSideNav() {
      this.isSideNavOpen = false;
    },
    showAlert() {
      Swal.fire({
        title: 'Do you want to Logout?',
        text: 'You won’t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cancel',
        cancelButtonText: 'Logout',
      }).then((result) => {
        if (!result.isConfirmed) {
          localStorage.removeItem('token');
          this.$store.commit('setAuth', null);
          this.$router.push('/auth/login');
        }
      });
    }
  }
};
</script>

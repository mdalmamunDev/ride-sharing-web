<template>
  <div class="h-screen bg-white">
    <template v-if="auth?.step == 0">
      <!-- here create a layout were user can choose his role -->
      <ChooseRole />
    </template>
    <template v-if="auth?.role === 'provider' && auth?.step === 1">
      <div class="w-full h-full flex items-center justify-center text-xl">
        Please <router-link class="text-g underline mx-1" to="/auth/complete">complete</router-link> your profile
        first
      </div>
    </template>
    <template v-else>
      <!-- Header (Desktop) -->
      <header
        class="hidden sm:block z-20 absolute w-full top-0 bg-white border-b shadow-lg border-gray-200 px-6 h-20 overflow-hidden">
        <div class="flex items-center justify-between h-full">
          <!-- Logo -->
          <button @click="$router.push(auth?.role === 'provider' ? '/d-home' : '/')">
            <img src="/logo.svg" class="w-32 md:w-40" alt="Logo" />
          </button>

          <!-- Navigation -->
          <nav class="flex space-x-4 md:space-x-8 text-sm md:text-md items-center h-full relative font-semibold">
            <template v-for="link in navLinks" :key="link.to">
              <router-link :to="link.to" class="relative h-full flex items-center"
                :class="{ 'text-1 font-bold': link.activePaths.includes($route.path) }">
                {{ link.label }}
                <div v-if="link.activePaths.includes($route.path)"
                  class="absolute -bottom-[7px] left-0 right-0 h-[14px] bg-g rounded-full"></div>
              </router-link>
            </template>
          </nav>

          <!-- User Profile -->
          <div class="flex items-center space-x-3">
            <router-link to="/profile" class="flex items-center space-x-2">
              <div class="w-10 h-10 p-0.5 bg-g rounded-full overflow-hidden">
                <img :src="showImg(auth?.profileImage)" alt="Kimmy Natasa"
                  class="w-full h-full rounded-full bg-white object-cover" />
              </div>
              <div class="hidden md:block pr-2">
                <span class="text-gray-800 font-bold">{{ auth?.name || 'Unknown User' }}</span>
                <p v-if="auth?.role === 'user' || auth?.approvalStatus === 'verified'"
                  class="text-sm text-g-2 font-bold mt-0.5">
                  Verified</p>
                <p v-else-if="auth?.approvalStatus" class="text-sm text-g-danger font-bold mt-0.5 capitalize">Unverified
                </p>
              </div>
            </router-link>
            <!-- <button @click="$router.push('/notifications')">
              <img class="w-8" src="/images/role.svg" alt="">
            </button> -->
            <!-- <button @click="showNotifications = !showNotifications">
              <img class="w-8" src="/images/role.svg" alt=""> -->
            <button @click="showNotifications = !showNotifications; haveNewNotification = false">
              <img v-if="haveNewNotification" class="w-8" src="/icons/bell_dot.svg" alt="">
              <img v-else class="w-8" src="/icons/bell.svg" alt="">
            </button>
          </div>
        </div>
      </header>

      <!-- Mobile Header -->
      <div v-if="!['/messages'].includes($route.path)"
        class="sm:hidden flex justify-between p-5 py-9 w-full absolute top-0 left-0 z-50">
        <div class="flex items-center">
          <button @click="toggleSideNav"
            class="bg-g w-10 h-10 rounded-full flex items-center justify-center text-white me-4">
            <img src="/images/role.svg" alt="">
          </button>
          <span class="font-bold text-xl">{{ $route.meta.title }}</span>
        </div>
        <router-link to="notifications" @click="haveNewNotification = false"
          class="bg-white w-10 h-10 rounded-full flex items-center justify-center text-xl text-1">
          <img v-if="haveNewNotification" src="/icons/bell_dot.svg" alt="">
          <img v-else src="/icons/bell.svg" alt="">
        </router-link>
      </div>

      <transition name="fade">
        <!-- Side Navigation Overlay (Mobile) -->
        <div v-if="isSideNavOpen" @click="closeSideNav" class="sm:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
          <!-- Drawer -->
          <transition name="slide-left">
            <div v-if="isSideNavOpen" @click.stop
              class="fixed left-0 top-0 h-full w-80 max-w-[95%] overflow-auto bg-white shadow-xl pt-6">
              <!-- Side Nav Header -->
              <div class="flex items-center justify-between p-6 border-b border-gray-200">
                <img src="/logo.svg" class="w-32 h-[42px]" alt="Logo" />
                <button @click="closeSideNav" class="text-gray-400 hover:text-gray-600">
                  <i class="fa-solid fa-times text-xl"></i>
                </button>
              </div>

              <!-- User Profile -->
              <div class="p-6 border-b border-gray-100">
                <router-link to="/profile" @click="closeSideNav">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 rounded-full overflow-hidden">
                      <img :src="showImg(auth?.profileImage)" alt="Profile" class="w-full h-full object-cover" />
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
                    <i :class="link.icon + ' text-lg me-4 w-5 text-1'"></i>
                    {{ link.label }}
                  </router-link>
                </template>

                <!-- Extra menu items -->
                <div class="border-t border-gray-100 mt-4 pt-4">
                  <template v-for="link in extraLinks" :key="link.to">
                    <router-link :to="link.to" @click="closeSideNav"
                      class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium"
                      :class="{ 'text-g bg-gray-50': link.activePaths.includes($route.path) }">
                      <img :src="`/icons/${link.icon}`" alt="" class="me-4 w-5">
                      {{ link.label }}
                    </router-link>
                  </template>
                  <button @click="showAlert(); closeSideNav()"
                    class="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 font-medium">
                    <i class="fa-solid fa-sign-out-alt text-lg me-4 w-5 text-1"></i> Logout
                  </button>
                </div>
              </nav>
            </div>
          </transition>
        </div>
      </transition>

      <!-- Notifications -->
      <transition name="fade">
        <div v-if="showNotifications"
          class="hidden sm:block w-[500px] max-w-[40%] max-h-[70vh] p-4 bg-white overflow-auto absolute top-20 right-2 z-50 border rounded-lg shadow-lg">
          <notifications-comp @afterClick="showNotifications = false"></notifications-comp>
        </div>
      </transition>

      <!-- Page Content -->
      <div class="h-screen sm:pt-20">
        <router-view />
        <div v-if="$route.path !== '/navigate'"
          class="sm:hidden h-[86px] w-full fixed top-0 left-0 bg-glass shadow-lg rounded-b-lg z-10"></div>
      </div>
    </template>
  </div>
</template>

<script>
import socket from '@/plugins/socket';
import Swal from 'sweetalert2';
import NotificationsComp from '@/components/NotificationsComp.vue';
import ChooseRole from './ChooseRole.vue';
export default {
  name: "AppLayout",
  components: { NotificationsComp, ChooseRole },
  data() {
    return {
      isSideNavOpen: false,
      showNotifications: false,
      haveNewNotification: false,
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
          roles: ["user", "provider"],
          to: "/reset-pass",
          icon: "lock_24.svg",
          activePaths: ["/reset-pass"]
        },
        {
          label: "Terms & Conditions",
          roles: ["user", "provider"],
          to: "/terms",
          icon: "docs.svg",
          activePaths: ["/terms"]
        },
        {
          label: "Privacy",
          roles: ["user", "provider"],
          to: "/privacy",
          icon: "privacy.svg",
          activePaths: ["/privacy"]
        },
        {
          label: "About Us",
          roles: ["user", "provider"],
          to: "/about-us",
          icon: "about_us.svg",
          activePaths: ["/about-us"]
        },
        {
          label: "Help & Support",
          roles: ["user", "provider"],
          to: "/a/support",
          icon: "support.svg",
          activePaths: ["/a/support"]
        },
        {
          label: "Saved Places",
          roles: ["user", "provider"],
          to: "/saved-places",
          icon: "saved_places.svg",
          activePaths: ["/saved-places"]
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
      socket?.emit("user-connected", { userId: existAuth?._id });
      this.startLocationSharing(existAuth?._id)
    } else {
      this.httpReq({
        customUrl: 'user/me',
        method: 'get',
        callback: (data) => {
          socket?.emit("user-connected", { userId: data?._id });
          this.startLocationSharing(data?._id)
          this.$store.commit('setAuth', data);
        },
        errorCallback: () => {
          localStorage.removeItem('token');
          this.$router.push('/auth/login');
        }
      });
    }

    this.checkNewNotification();
  },
  methods: {
    startLocationSharing(userId) {
      if (navigator.geolocation) {
        setInterval(() => {
          navigator.geolocation.getCurrentPosition((pos) => {
            const data = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
              userId // optional user ID
            };
            socket?.emit("location-share", data);
          });
        }, 5000); // update every 5s
      }
    },
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
    },

    checkNewNotification() {
      this.httpReq({
        customUrl: 'notification/count',
        method: 'get',
        callback: (data) => {
          this.haveNewNotification = data > 0;
        }
      });
    },
  }
};
</script>


<style>
/* Fade for backdrop */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide for drawer */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease;
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}
</style>

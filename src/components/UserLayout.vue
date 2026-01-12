<template>
  <div class="flex flex-col sm:flex-row gap-8 sm:p-4 pt-0 h-full mt-[80px] sm:mt-0">

    <!-- Sidebar -->
    <aside class="hidden sm:flex w-64 bg-white rounded-xl shadow-lg py-10 flex-col justify-between">
      <!-- Menu -->
      <nav class="space-y-1">
        <router-link v-for="item in menuItems" :key="item.name" :to="item.route"
          class="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition" :class="isRoute(item.route)
            ? 'bg-purple-50 text-1'
            : 'text-gray-600 hover:bg-gray-50'">
          <img :src="`/icons/${item.icon}`" />
          <span>{{ item.label }}</span>
        </router-link>
      </nav>

      <!-- Actions -->
      <div class="space-y-2">
        <button @click="showAlert"
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
          <img :src="`/icons/logout.svg`" />
          <span>Log out</span>
        </button>

        <button
          class="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
          <img :src="`/icons/delete_acc.svg`" />
          <span>Delete account</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 bg-white rounded-xl sm:shadow-lg overflow-auto">
      <div class="p-4 sm:p-20 mx-auto min-h-[80vh] pb-24">
        <router-view />
      </div>
    </div>

  </div>
</template>


<script>
import Swal from 'sweetalert2';

export default {
  name: 'UserLayout',

  data() {
    return {
      menuItems: [
        {
          label: 'Personal Info',
          route: '/profile',
          icon: 'user-2.svg',
        },
        {
          label: 'Reset Password',
          route: '/reset-pass',
          icon: 'lock_24.svg',
        },
        {
          label: 'Terms & Conditions',
          route: '/terms',
          icon: 'docs.svg',
        },
        {
          label: 'Privacy',
          route: '/privacy',
          icon: 'privacy.svg',
        },
        {
          label: 'About Us',
          route: '/about-us',
          icon: 'about_us.svg',
        },
        {
          label: 'Help & Support',
          route: '/a/support',
          icon: 'support.svg',
        },
        {
          label: 'Saved Places',
          route: '/saved-places',
          icon: 'saved_places.svg',
        },
      ],
    };
  },

  methods: {
    showAlert() {
      Swal.fire({
        title: 'Do you want to logout?',
        text: 'You will need to login again.',
        icon: 'warning',
        showCancelButton: true,
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
  },
};
</script>

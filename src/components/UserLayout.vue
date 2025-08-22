<template>
  <div class="flex flex-col sm:flex-row gap-8 sm:p-4 pt-0 h-full mt-[80px] sm:mt-0">
    <!-- Sidebar (hidden on mobile) -->
    <div class="hidden sm:flex w-64 bg-white rounded-xl shadow-lg p-4 flex-col justify-between py-10">
      <div class="space-y-2">
        <router-link to="profile" class="w-full flex items-center gap-2 border border-gray-300 px-4 py-2 rounded"
          :class="isRoute('profile') ? 'bg-g text-white' : ''">
          <i class="fas fa-user"></i>
          <span>Profile</span>
        </router-link>
        <router-link to="notifications" class="w-full flex items-center gap-2 border border-gray-300 px-4 py-2 rounded"
          :class="isRoute('notifications') ? 'bg-g text-white' : ''">
          <i class="fa-solid fa-bell"></i>
          <span>Notifications</span>
        </router-link>
        <router-link to="reset-pass" class="w-full flex items-center gap-2 border border-gray-300 px-4 py-2 rounded"
          :class="isRoute('reset-pass') ? 'bg-g text-white' : ''">
          <i class="fa-solid fa-key"></i>
          <span>Reset Password</span>
        </router-link>
        <!-- Future settings -->
        <!-- <router-link
          to="settings"
          class="w-full flex items-center gap-2 border border-gray-300 px-4 py-2 rounded"
          :class="isRoute('settings') ? 'bg-1 text-white' : ''"
        >
          <i class="fas fa-cog"></i>
          <span>App Settings</span>
        </router-link> -->
      </div>

      <button @click="showAlert"
        class="w-full flex items-center gap-2 border border-gray-300 px-4 py-2 rounded text-red-600">
        <img src="/icons/logout.svg" alt="">
        <span>Logout</span>
      </button>
    </div>

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
  name: "UserLayout",

  methods: {
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

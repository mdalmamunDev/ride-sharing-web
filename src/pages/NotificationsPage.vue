<template>
  <div class="h-full w-full flex flex-col bg-white">
    <!-- Fixed Top Header -->
    <!-- <div class="sm:hidden flex justify-between p-3 pt-7 bg-g text-white rounded-b-xl shadow-lg z-50">
      <div class="flex items-center">
        <button @click="$router.back()" class="w-10 h-10 rounded-full flex items-center justify-center me-4">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div>
          <h2 class="font-bold text-xl">{{ user.name || 'N/A' }}</h2>
          <p><i class="fa-regular fa-envelope"></i> {{ user.email || 'N/A' }}</p>
        </div>
      </div>

      <img class="bg-white p-0.5 w-12 h-12 rounded-full" :src="showImg(user.profileImage)"/>
    </div> -->

    <!-- Scrollable Messages Section -->
    <div class="w-full flex-1 overflow-y-auto flex items-end">
      <notifications-comp  class="w-full"></notifications-comp>
    </div>
  </div>
</template>



<script>
import NotificationsComp from '@/components/NotificationsComp.vue';

export default {
  name: "NotificationsPage",
  components: {NotificationsComp},
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    //
    
  },
  methods: {
    //
  },
};
</script>
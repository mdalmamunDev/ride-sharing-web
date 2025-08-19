<template>
  <div class="h-full overflow-y-scroll p-6 bg-no-repeat bg-left-bottom"
    style="background-image: url('images/bottm-left-circles.svg');">

    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center py-3 mb-8 mt-[80px] sm:mt-0 z-40">
        <h1 class="hidden sm:block text-2xl font-bold text-gray-900">My Rides</h1>

        <!-- Tab Buttons -->
        <div class="w-full sm:w-auto flex bg-purple-100 rounded-full shadow-sm">
          <button @click="activeTab = 'scheduled'" :class="[
            'flex-1 sm:flex-auto px-5 sm:px-12 py-2 text-sm font-medium rounded-full transition-all duration-200',
            activeTab === 'scheduled'
              ? 'bg-g text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          ]">
            Scheduled Rides
          </button>
          <button @click="activeTab = 'completed'" :class="[
            'flex-1 sm:flex-auto px-5 sm:px-12 py-2 text-sm font-medium rounded-full transition-all duration-200',
            activeTab === 'completed'
              ? 'bg-g text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          ]">
            Completed
          </button>
        </div>
      </div>

      <!-- Rides Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link to="navigate" v-for="ride in dataList?.data" :key="ride.bookingId"
          class="bg-glass bg-gray-100 rounded-2xl p-3 shadow-sm border border-gray-100">
          <!-- Map Placeholder -->
          <div class="flex gap-2 items-center mb-6">
            <img class="w-18 h-18" src="/images/map-thumb.svg" alt="">

            <address-comp :from-address="ride.fromAddress" :to-address="ride.toAddress" class="flex flex-1" :height="60"
              stroke="#5C58EB" />

          </div>

          <div class="bg-white/50 px-3 rounded-2xl">
            <!-- Ride Details -->
            <div class="">
              <div class="flex justify-between items-center py-3 border-b">
                <span class="text-xs text-gray-500">Booking ID</span>
                <span class="text-xs font-medium text-gray-700">{{ ride.jobId }}</span>
              </div>

              <div class="flex justify-between items-center py-3 border-b">
                <span class="text-xs text-gray-500">Date & Time</span>
                <span class="text-xs font-medium text-gray-700">
                  {{ getDate(ride.dateTime) }} {{ getTime(ride.dateTime) }}
                </span>
              </div>

              <div class="flex justify-between items-center py-3 border-b">
                <span class="text-xs text-gray-500">Driver</span>
                <span class="text-xs font-medium text-gray-700">{{ ride.providerName || 'N/A' }}</span>
              </div>

              <div class="flex justify-between items-center py-3 border-b">
                <span class="text-xs text-gray-500">Car seats</span>
                <span class="text-xs font-medium text-gray-700">{{ ride.seat || 'N/A' }}</span>
              </div>

              <div class="flex justify-between items-center py-3 border-b">
                <span class="text-xs text-gray-500">Payment Status</span>
                <span class="text-xs font-medium" :class="ride.status !== 'created' ? 'text-g' : 'text-g-danger'">
                  {{ ride.status !== 'created' ? 'Paid' : 'Pending' }}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <!-- fetch more data -->
      <pagination-comp />


      <div class="sm:hidden h-[86px] w-full fixed top-0 left-0 bg-glass shadow-lg rounded-b-lg"></div>
    </div>
  </div>
</template>

<script>
import AddressComp from '@/components/AddressComp.vue';
import PaginationComp from '@/components/PaginationComp.vue';

export default {
  name: "MyRidesPage",
  components: { AddressComp, PaginationComp },
  data() {
    return {
      activeTab: 'scheduled',
    };
  },
  computed: {
    // filteredRides() {
    //   return this.rides.filter(ride => ride.status === this.activeTab);
    // }
  },
  watch: {
    activeTab(val) {
      if (val === 'scheduled') this.$route.meta.dataUrl = 'job/user/ongoing';
      else this.$route.meta.dataUrl = 'job/user/history';


      this.$store.commit('setFilters', { limit: 9 });
      this.fetchData();
    }
  },
  mounted() {
    this.$store.commit('setFilters', { limit: 9 });
    this.fetchData();
  }
};
</script>
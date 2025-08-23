<template>
  <div class="h-full overflow-y-scroll p-6 
         bg-no-repeat bg-left-bottom 
         sm:bg-[url('images/bottm-left-circles.svg')]">

    <div class="max-w-7xl h-full mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center py-3 mb-8 mt-[80px] sm:mt-0 z-40">
        <h1 class="hidden sm:block text-2xl font-bold text-gray-900">My Rides</h1>

        <!-- Tab Buttons -->
        <div class="w-full sm:w-auto flex bg-purple-100 rounded-full shadow-sm">
          <button @click="activeTab = 'scheduled'" :class="[
            'flex-1 sm:flex-auto px-5 sm:px-12 py-3 text-sm font-medium rounded-full transition-all duration-200',
            activeTab === 'scheduled'
              ? 'bg-g text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          ]">
            Scheduled Rides
          </button>
          <button @click="activeTab = 'completed'" :class="[
            'flex-1 sm:flex-auto px-5 sm:px-12 py-3 text-sm font-medium rounded-full transition-all duration-200',
            activeTab === 'completed'
              ? 'bg-g text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          ]">
            Completed
          </button>
        </div>
      </div>

      <!-- Rides Grid -->
      <pagination-comp>
        <div class="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <div v-for="ride in dataList?.data" :key="ride.jobId" @click="goNavigate(ride)"
            :class="ride.status !== 'completed' ? 'cursor-pointer text-blue-600' : ''"
            class="bg-glass bg-gray-100 rounded-2xl p-3 shadow-sm border border-gray-100">
            <!-- Map Placeholder -->
            <div class="flex gap-2 items-center mb-6">
              <img class="w-18 h-18" src="/images/map-thumb.svg" alt="">

              <address-comp :from-address="ride.fromAddress" :to-address="ride.toAddress" class="flex flex-1"
                :height="60" stroke="#5C58EB" />

            </div>

            <div class="bg-white px-3 rounded-2xl">
              <!-- Ride Details -->
              <div class="">
                <div class="flex justify-between items-center py-3 border-b">
                  <span class="text-xs text-gray-500">Booking ID</span>
                  <span class="text-xs font-medium text-gray-700">
                    <BookingId :value="ride.jobId" />
                  </span>
                </div>

                <div class="flex justify-between items-center py-3 border-b">
                  <span class="text-xs text-gray-500">Date & Time</span>
                  <span class="text-xs font-medium text-gray-700">
                    {{ getDate(ride.dateTime) }} {{ getTime(ride.dateTime) }}
                  </span>
                </div>

                <div v-if="auth?.role === 'user'" class="flex justify-between items-center py-3 border-b">
                  <span class="text-xs text-gray-500">Driver</span>
                  <span class="text-xs font-medium text-gray-700">{{ ride.providerName || 'N/A' }}</span>
                </div>

                <div v-else-if="auth?.role === 'provider'" class="flex justify-between items-center py-3 border-b">
                  <span class="text-xs text-gray-500">Passenger</span>
                  <span class="text-xs font-medium text-gray-700">{{ ride.userName || 'N/A' }}</span>
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
          </div>
        </div>
      </pagination-comp>

      <!-- fetch more data -->
      <!-- <pagination-comp /> -->


      <details-box :is-open="isOpenOverview" title="Pay Now" @close="isOpenOverview = false" container-class="px-0">
        <!-- <h3 class="text-lg font-semibold text-gray-800 mb-6 text-start">Overview</h3> -->
        <AddressComp class="px-6 py-4 rounded-xl mb-3 bg-blue-50" :from-address="overview?.fromAddress"
          :to-address="overview.toAddress" :height="56" :distance="overview?.distance"></AddressComp>


        <div class="px-6 space-y-2 text-sm my-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Ride Price</span>
            <span class="text-blue-500 font-semibold">${{ overview?.fare?.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-gray-600">Charge</span>
            <span class="text-blue-500 font-semibold">${{ overview?.charge?.toFixed(2) }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-gray-600">Pickup time</span>
            <span class="text-gray-800 font-medium">{{ getTime(overview.dateTime) }}</span>
          </div>

          <div class="flex justify-between items-center">
            <span class="text-gray-600">Pickup Date</span>
            <span class="text-gray-800 font-medium">{{ getDate(overview.dateTime) }}</span>
          </div>

          <hr class="my-4">

          <div class="flex justify-between items-center text-lg font-semibold">
            <span class="text-gray-800">Total Amount</span>
            <span class="text-blue-500">${{ overview?.totalFare?.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Disclaimer -->
        <div class="mt-8 p-4 bg-blue-50 rounded-xl">
          <h4 class="font-semibold text-gray-800 mb-2 text-start">Disclaimer:</h4>
          <p class="text-xs font-bold leading-relaxed text-start">
            Payment must be made at least 2 hours in advance.
            Cancellation is allowed up to 1 hour before the scheduled
            pickup. Within 5-24 hours get 50% and you will Get driver is
            on the way or not message.
          </p>
        </div>


        <div class="px-6 w-full">
          <button class="btn-g w-full mt-3" @click="pay(overview.jobId); isOpenOverview = false">
            Pay Now
          </button>
        </div>
      </details-box>
    </div>
  </div>
</template>

<script>
import AddressComp from '@/components/AddressComp.vue';
import BookingId from '@/components/BookingId.vue';
import DetailsBox from '@/components/DetailsBox.vue';
import PaginationComp from '@/components/PaginationComp.vue';

export default {
  name: "MyRidesPage",
  components: { AddressComp, PaginationComp, DetailsBox, BookingId },
  data() {
    return {
      activeTab: 'scheduled',
      isOpenOverview: false,

      overview: {},
    };
  },
  computed: {
    // filteredRides() {
    //   return this.rides.filter(ride => ride.status === this.activeTab);
    // }
  },
  watch: {
    activeTab(val) {
      if (val === 'scheduled') this.$route.meta.dataUrl = 'job/ongoing';
      else this.$route.meta.dataUrl = 'job/history';
      this.fetchData();
    }
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    goNavigate(ride) {
      if (ride.status === 'completed') return;
      if (ride.status === 'created') {
        this.isOpenOverview = true;
        this.overview = ride;
        return;
      }
      this.$router.push(`navigate?jobId=${ride.jobId}`);
    },
  },
};
</script>
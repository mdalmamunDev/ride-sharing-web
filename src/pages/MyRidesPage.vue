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
      <router-link to="navigate" v-for="ride in filteredRides" :key="ride.bookingId"
        class="bg-glass bg-black/5 rounded-2xl p-3 shadow-sm border border-gray-100">
        <!-- Map Placeholder -->
        <div class="flex gap-2 items-center mb-6">
          <img class="w-18 h-18" src="/images/map-thumb.svg" alt="">
          <div className="flex flex-1">
            <svg width="24" height="60" viewBox="0 0 24 76" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.2901 9.17005L7.70015 3.07005C4.95015 1.62005 1.96015 4.55005 3.35015 7.33005L4.97015 10.57C5.42015 11.47 5.42015 12.53 4.97015 13.43L3.35015 16.67C1.96015 19.45 4.95015 22.37 7.70015 20.93L19.2901 14.83C21.5701 13.63 21.5701 10.37 19.2901 9.17005Z"
                stroke="#5C58EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12 24L12 52" stroke="#858585" stroke-linecap="round" stroke-dasharray="4 4" />
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M4.23926 62.3912C4.25367 58.1506 7.70302 54.7247 11.9436 54.7391C16.1842 54.7535 19.6102 58.2028 19.5958 62.4434V62.5304C19.5436 65.2869 18.0045 67.8347 16.1175 69.826C15.0384 70.9466 13.8333 71.9387 12.5262 72.7825C12.1767 73.0848 11.6583 73.0848 11.3088 72.7825C9.36033 71.5143 7.65019 69.9131 6.25665 68.0521C5.01461 66.4293 4.30942 64.4597 4.23926 62.4173L4.23926 62.3912Z"
                stroke="#5C58EB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="11.9179" cy="62.539" r="2.46087" stroke="#5C58EB" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>

            <!-- Address Text -->
            <div className="relative h-[60px] w-full ms-2 overflow-hidden text-sm">
              <p className="text-gray-800 absolute top-0 truncate whitespace-nowrap">1901 Thornridge Cir, Shiloh</p>
              <p className="text-gray-800 absolute bottom-0 truncate whitespace-nowrap">4140 Parker Rd, Allentown, New
                Mexico</p>
            </div>
          </div>
        </div>

        <div class="bg-white/50 px-3 rounded-2xl">
          <!-- Ride Details -->
          <div class="">
            <div class="flex justify-between items-center py-3 border-b">
              <span class="text-xs text-gray-500">Booking ID</span>
              <span class="text-xs font-medium text-gray-700">{{ ride.bookingId }}</span>
            </div>

            <div class="flex justify-between items-center py-3 border-b">
              <span class="text-xs text-gray-500">Date & Time</span>
              <span class="text-xs font-medium text-gray-700">{{ ride.dateTime }}</span>
            </div>

            <div class="flex justify-between items-center py-3 border-b">
              <span class="text-xs text-gray-500">Driver</span>
              <span class="text-xs font-medium text-gray-700">{{ ride.driver }}</span>
            </div>

            <div class="flex justify-between items-center py-3 border-b">
              <span class="text-xs text-gray-500">Car seats</span>
              <span class="text-xs font-medium text-gray-700">{{ ride.carSeats }}</span>
            </div>

            <div class="flex justify-between items-center py-3 border-b">
              <span class="text-xs text-gray-500">Payment Status</span>
              <span class="text-xs font-medium text-g">{{ ride.paymentStatus }}</span>
            </div>
          </div>
        </div>
      </router-link>
    </div>

    <div class="sm:hidden h-[86px] w-full fixed top-0 left-0 bg-glass shadow-lg rounded-b-lg"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyRidesPage",
  data() {
    return {
      activeTab: 'scheduled',
      rides: [
        {
          bookingId: 'SR126456',
          pickup: '1901 Thornridge Cir, Shiloh',
          destination: '4140 Parker Rd, Allentown',
          dateTime: '16 July 2023, 10:30 PM',
          driver: 'Jane Cooper',
          carSeats: '4',
          paymentStatus: 'Advance Paid',
          status: 'scheduled'
        },
        {
          bookingId: 'SR126456',
          pickup: '1901 Thornridge Cir, Shiloh',
          destination: '4140 Parker Rd, Allentown',
          dateTime: '16 July 2023, 10:30 PM',
          driver: 'Jane Cooper',
          carSeats: '4',
          paymentStatus: 'Advance Paid',
          status: 'scheduled'
        },
        {
          bookingId: 'SR126456',
          pickup: '1901 Thornridge Cir, Shiloh',
          destination: '4140 Parker Rd, Allentown',
          dateTime: '16 July 2023, 10:30 PM',
          driver: 'Jane Cooper',
          carSeats: '4',
          paymentStatus: 'Advance Paid',
          status: 'scheduled'
        },
        {
          bookingId: 'CR126457',
          pickup: '1901 Thornridge Cir, Shiloh',
          destination: '4140 Parker Rd, Allentown',
          dateTime: '15 July 2023, 2:15 PM',
          driver: 'Jane Cooper',
          carSeats: '4',
          paymentStatus: 'Completed',
          status: 'completed'
        },
        {
          bookingId: 'CR126458',
          pickup: '1901 Thornridge Cir, Shiloh',
          destination: '4140 Parker Rd, Allentown',
          dateTime: '14 July 2023, 9:45 AM',
          driver: 'Jane Cooper',
          carSeats: '4',
          paymentStatus: 'Completed',
          status: 'completed'
        }
      ]
    };
  },
  computed: {
    filteredRides() {
      return this.rides.filter(ride => ride.status === this.activeTab);
    }
  }
};
</script>
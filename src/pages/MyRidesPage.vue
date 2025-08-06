<template>
  <div class="bg-gray-50 min-h-screen p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-2xl font-semibold text-gray-900">My Rides</h1>
        
        <!-- Tab Buttons -->
        <div class="flex bg-white rounded-full p-1 shadow-sm">
          <button 
            @click="activeTab = 'scheduled'"
            :class="[
              'px-6 py-2 text-sm font-medium rounded-full transition-all duration-200',
              activeTab === 'scheduled' 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            Scheduled Rides
          </button>
          <button 
            @click="activeTab = 'completed'"
            :class="[
              'px-6 py-2 text-sm font-medium rounded-full transition-all duration-200',
              activeTab === 'completed' 
                ? 'bg-blue-500 text-white shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            Completed
          </button>
        </div>
      </div>

      <!-- Rides Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="ride in filteredRides" 
          :key="ride.bookingId"
          class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
        >
          <!-- Map Placeholder -->
          <div class="bg-gray-100 rounded-xl h-24 mb-4 relative overflow-hidden">
            <!-- Simple route visualization -->
            <div class="absolute inset-0 flex items-center justify-center">
              <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"/>
              </svg>
            </div>
            <!-- Route line -->
            <div class="absolute top-1/2 left-4 right-4 h-0.5 bg-blue-400 transform -translate-y-1/2"></div>
            <!-- Start point -->
            <div class="absolute top-1/2 left-4 w-2 h-2 bg-green-500 rounded-full transform -translate-y-1/2 -translate-x-1/2"></div>
            <!-- End point -->
            <div class="absolute top-1/2 right-4 w-2 h-2 bg-red-500 rounded-full transform -translate-y-1/2 translate-x-1/2"></div>
          </div>

          <!-- Route Info -->
          <div class="space-y-2 mb-4">
            <div class="flex items-center text-gray-600 text-sm">
              <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="3"/>
              </svg>
              {{ ride.pickup }}
            </div>
            <div class="flex items-center text-gray-600 text-sm">
              <svg class="w-4 h-4 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
              </svg>
              {{ ride.destination }}
            </div>
          </div>

          <!-- Ride Details -->
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">Booking ID</span>
              <span class="text-xs font-medium text-gray-700">{{ ride.bookingId }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">Date & Time</span>
              <span class="text-xs font-medium text-gray-700">{{ ride.dateTime }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">Driver</span>
              <span class="text-xs font-medium text-gray-700">{{ ride.driver }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">Car seats</span>
              <span class="text-xs font-medium text-gray-700">{{ ride.carSeats }}</span>
            </div>
            
            <div class="flex justify-between items-center">
              <span class="text-xs text-gray-500">Payment Status</span>
              <span class="text-xs font-medium text-cyan-500">{{ ride.paymentStatus }}</span>
            </div>
          </div>
        </div>
      </div>
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
<template>
  <div class="h-full overflow-y-auto md:overflow-y-none bg-white flex flex-col md:flex-row text-gray-800">
    <!-- Map Panel - Shows first on mobile, second on desktop -->
    <div class="w-full md:w-1/2 relative order-1 md:order-2 z-10">
      <div class="h-64 md:h-full">
        <!-- <div class="w-full h-full bg-gray-200 flex items-center justify-center">
          <div class="text-center text-gray-500">
            <i class="fa-solid fa-map-location-dot text-4xl mb-2"></i>
            <p>Map View</p>
          </div>
        </div> -->
        <div class="absolute inset-0">
          <img src="images/map-placeholder-d.png" alt="Map" class="w-full h-full max-h-[100vh] object-cover" />
        </div>
      </div>
    </div>

    <div class="h-[76px] w-full fixed top-0 left-0 bg-glass shadow-lg rounded-b-lg"></div>

    <!-- Form Panel - Shows second on mobile, first on desktop -->
    <div class="w-full h-full overflow-y-none md:overflow-y-auto md:w-1/2 p-8 px-1 xl:px-8 order-2 md:order-1">
      <div class="mx-auto w-full max-w-3xl">
        <h1 class="hidden sm:block text-3xl md:text-4xl font-bold my-8 text-center">Available Rides</h1>

        <!-- Tabs -->
        <div class="flex mb-6 bg-purple-100 rounded-full">
          <button :class="[
            'flex-1 py-2 font-bold rounded-full transition',
            rideType === 'split'
              ? 'bg-g text-white'
              : 'text-1 hover:bg-gray-100'
          ]" @click="rideType = 'split'">
            Split Your Ride
          </button>
          <button :class="[
            'flex-1 py-2 font-bold rounded-full ml-2 transition',
            rideType === 'private'
              ? 'bg-g text-white'
              : 'text-1 hover:bg-gray-100'
          ]" @click="rideType = 'private'">
            Private Ride
          </button>
        </div>

        <div v-for="(item, index) in 5" :key="index"
          class="bg-gray-50 rounded-2xl p-6 shadow border border-gray-100 mb-3">
          <!-- Driver Info Header -->
          <div class="block lg:flex space-y-2 items-center justify-between mb-6">
            <!-- Driver Profile -->
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 rounded-full overflow-hidden">
                <img :src="rideRequest.driverImage" :alt="rideRequest.driverName" class="w-full h-full object-cover" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 text-lg">{{ rideRequest.driverName }}</h3>
                <div class="flex items-center space-x-1">
                  <i class="fa-solid fa-star text-orange-400 text-sm"></i>
                  <span class="text-sm font-medium text-gray-700">{{ rideRequest.rating }}</span>
                  <span class="text-sm text-gray-400">({{ rideRequest.reviewCount }})</span>
                </div>
              </div>
            </div>

            <!-- Right Side Info -->
            <div class="flex items-center justify-between space-x-4 pt-5 lg:pt-0">
              <!-- Pickup Time -->
              <div class="flex items-center space-x-2 bg-purple-100 px-3 py-2 rounded-full">
                <i class="fa-solid fa-clock text-purple-600 text-sm"></i>
                <span class="text-sm font-medium text-purple-700"><span class="lg:hidden">Pick up @</span>{{
                  rideRequest.pickupTime }}</span>
              </div>

              <!-- Price -->
              <div class="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-full">
                <i class="fa-solid fa-dollar-sign text-white text-xs text-center bg-green-600 w-4 h-4 rounded-full"></i>
                <span class="text-sm font-medium text-green-700">{{ rideRequest.price }}</span>
              </div>
            </div>
          </div>

          <!-- Booking ID -->
          <div class="flex justify-between items-center mb-6 bg-purple-100 p-3 rounded-xl font-semibold">
            <span class="text-sm text-gray-600 font-bold">Booking ID:</span>
            <span class="text-sm text-blue-600">{{ rideRequest.bookingId }}</span>
          </div>

          <!-- Route Information -->
          <div class="block lg:flex justify-between space-y-3 items-center lg:space-x-4 mb-6">
            <div class="flex gap-2">
              <!-- Distance -->
              <div class="text-center text-gray-400">
                <div class="text-lg font-semibold">{{ rideRequest.distance }}</div>
                <div class="text-xs">Km</div>
              </div>

              <!-- Route Details -->
              <div class="flex-1">
                <!-- Pickup Location -->
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-3 h-3 rounded-full bg-green-500"></div>
                  <span class="text-sm text-gray-700">{{ rideRequest.pickupLocation }}</span>
                </div>

                <!-- Destination -->
                <div class="flex items-center space-x-3">
                  <i class="fa-solid fa-location-dot text-red-500 text-sm ml-0.5"></i>
                  <span class="text-sm text-gray-700">{{ rideRequest.destination }}</span>
                </div>
              </div>
            </div>
            <!-- Action Buttons -->
            <div class="flex space-x-3">
              <button @click="declineRide"
                class="flex-1 bg-purple-100 text-purple-600 font-medium py-3 px-6 rounded-full hover:bg-purple-200 transition-colors duration-200">
                Decline
              </button>
              <button @click="acceptRide" class="flex-1 btn-g text-white font-medium py-3 px-6 shadow-md">
                Accept
              </button>
            </div>
          </div>

        </div>

        <p class="mt-10 text-sm text-center">
          Have Issues Booking? Get In Touch With <a href="#" class="text-g font-medium">Our Support</a>
        </p>
      </div>
    </div>
  </div>

  <ModalComp title="Confirm To Payment" submitBtnText="Pay Now" @submit="openAlert">
    <h3 class="text-lg font-semibold text-gray-800 mb-6">Overview</h3>

    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Ride Price</span>
        <span class="text-blue-500 font-semibold">$40</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600">Car Type</span>
        <span class="text-gray-800 font-medium">Sedan (4 Seater)</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600">Luggage Type</span>
        <span class="text-gray-800 font-medium">Type</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600">Weight</span>
        <span class="text-gray-800 font-medium">10 Kg</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600">Pickup time</span>
        <span class="text-gray-800 font-medium">30 Min</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600">Car Seats</span>
        <span class="text-gray-800 font-medium">4</span>
      </div>

      <div class="flex justify-between items-center pt-2">
        <span class="text-gray-600">Your Pickup time</span>
        <span class="text-gray-800 font-medium">10:30 PM</span>
      </div>

      <hr class="my-4">

      <div class="flex justify-between items-center text-lg font-semibold">
        <span class="text-gray-800">Total Amount</span>
        <span class="text-blue-500">$40</span>
      </div>
    </div>

    <!-- Disclaimer -->
    <div class="mt-8 p-4 bg-blue-50 rounded-xl">
      <h4 class="font-semibold text-gray-800 mb-2">Disclaimer:</h4>
      <p class="text-sm font-bold leading-relaxed">
        Payment must be made at least 2 hours in advance.
        Cancellation is allowed up to 1 hour before the scheduled
        pickup. Within 5-24 hours get 50% and you will Get driver is
        on the way or not message.
      </p>
    </div>
  </ModalComp>

  <AlertBox ok-btn-text="View Your Booking">

    <!-- Booking ID -->
    <div class="mb-8 flex gap-2 justify-center text-sm">
      <span class="font-bold">Booking ID:</span>
      <span class="text-g">#123456</span>
    </div>
  </AlertBox>

  <!-- box ride view -->
  <details-box :is-open="isOpenRideViewBox">
    <!-- Header -->
    <div className="px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm font-bold">Status:</span>
          <span className="ml-2 text-g font-medium">Pending Confirmation</span>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold">Booking ID:</span>
          <span className="ml-2 font-mono text-sm text-g">SR128656</span>
        </div>
      </div>
    </div>

    <!-- Route Information -->
    <div className="px-6 py-4 bg-blue-50 rounded-xl mb-3 bg-blue-50">
      <div className="flex">
        <svg width="24" height="76" viewBox="0 0 24 76" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.2901 9.17005L7.70015 3.07005C4.95015 1.62005 1.96015 4.55005 3.35015 7.33005L4.97015 10.57C5.42015 11.47 5.42015 12.53 4.97015 13.43L3.35015 16.67C1.96015 19.45 4.95015 22.37 7.70015 20.93L19.2901 14.83C21.5701 13.63 21.5701 10.37 19.2901 9.17005Z"
            stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M12 24L12 52" stroke="#858585" stroke-linecap="round" stroke-dasharray="4 4" />
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M4.23926 62.3912C4.25367 58.1506 7.70302 54.7247 11.9436 54.7391C16.1842 54.7535 19.6102 58.2028 19.5958 62.4434V62.5304C19.5436 65.2869 18.0045 67.8347 16.1175 69.826C15.0384 70.9466 13.8333 71.9387 12.5262 72.7825C12.1767 73.0848 11.6583 73.0848 11.3088 72.7825C9.36033 71.5143 7.65019 69.9131 6.25665 68.0521C5.01461 66.4293 4.30942 64.4597 4.23926 62.4173L4.23926 62.3912Z"
            stroke="#333333" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="11.9179" cy="62.539" r="2.46087" stroke="#333333" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round" />
        </svg>

        <!-- Address Text -->
        <div className="relative h-[76px] w-full ms-2 overflow-hidden">
          <p className="text-gray-800 absolute top-0 truncate whitespace-nowrap">1901 Thornridge Cir, Shiloh</p>
          <p className="text-gray-800 absolute bottom-0 truncate whitespace-nowrap">4140 Parker Rd, Allentown, New
            Mexico
          </p>
        </div>
      </div>
    </div>

    <!-- Trip Details -->
    <div className="px-6 py-4 bg-blue-50 rounded-xl mb-3">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm font-bold">Date</span>
          <span className="text-sm text-gray-800">25 May 2025</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-bold">Time</span>
          <span className="text-sm text-gray-800">11:00 AM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-bold">Passenger</span>
          <span className="text-sm text-gray-800">2</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-bold">Luggages</span>
          <span className="text-sm text-gray-800">1 Bag (10kg)</span>
        </div>
      </div>
    </div>

    <!-- Pricing Breakdown -->
    <div className="px-6 py-4 bg-blue-50 rounded-xl mb-3">
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm font-bold">Base Fare</span>
          <span className="text-sm text-gray-800">$6.99</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-bold">Booking Fee</span>
          <span className="text-sm text-gray-800">$2.13</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-bold">Minimum Fare</span>
          <span className="text-sm text-gray-800">$7.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm font-bold">Cancellation Fee</span>
          <span className="text-sm text-gray-800">$6.00</span>
        </div>
        <div className="border-t pt-3 flex justify-between">
          <span className="font-semibold text-gray-800">Total Fare</span>
          <span className="font-semibold text-blue-600 text-lg">$65.90</span>
        </div>
      </div>
    </div>

    <!-- Action Button -->
    <button @click="isOpenRideViewBox = false; $router.push('/navigate')" class="w-full py-3 btn-g">
      View Your Ride
    </button>
  </details-box>
  <!-- box ride view end -->

</template>

<script>
import AlertBox from '@/components/AlertBox.vue';
import DetailsBox from '@/components/DetailsBox.vue';
import ModalComp from '@/components/ModalComp.vue';

export default {
  name: 'DriverHomePage',
  components: {
    ModalComp,
    AlertBox,
    DetailsBox,
  },
  data() {
    return {
      rideType: 'split',
      rideRequest: {
        driverName: "Bernard Alvarado",
        driverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
        rating: "4.8",
        reviewCount: "293",
        pickupTime: "16:28",
        price: "15.00",
        bookingId: "SR1284E6",
        distance: "8.7",
        pickupLocation: "Parateek Wisteria Sector 77, Niod...",
        destination: "HCL Technologies Sector 126, Rai..."
      },
      isOpenRideViewBox: false,
    };
  },
  mounted() {
    this.$store.commit('setFormData', {
      passengers: 1,
      luggages: [{}]
    })
  },
  methods: {
    acceptRide() {
      console.log("Ride accepted:", this.rideRequest.bookingId);
      // Add your accept ride logic here
      alert(`Ride ${this.rideRequest.bookingId} accepted!`);
    },
    declineRide() {
      console.log("Ride declined:", this.rideRequest.bookingId);
      // Add your decline ride logic here
      alert(`Ride ${this.rideRequest.bookingId} declined.`);
    },
  },
  watch: {
    rideType(newVal, oldVal) {
      console.log(`Switched from ${oldVal} to ${newVal} ride`);
    },
  },
};
</script>

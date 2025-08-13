<template>
  <div class="h-full overflow-y-auto bg-white flex flex-col md:flex-row text-gray-800">
    <!-- Map Panel - Shows first on mobile, second on desktop -->
    <div class="w-full md:w-1/2 relative order-1 md:order-2">
      <div class="h-[60vh] md:h-full">
        <!-- <div class="w-full h-full bg-gray-200 flex items-center justify-center">
          <div class="text-center text-gray-500">
            <i class="fa-solid fa-map-location-dot text-4xl mb-2"></i>
            <p>Map View</p>
          </div>
        </div> -->
        <div class="absolute inset-0 h-full max-h-[100vh]">
          <!-- <MapComp :locations="locations" icon="car" authIcon="user" /> -->
          <img src="images/map-placeholder.png" alt="Map" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <!-- Form Panel - Shows second on mobile, first on desktop -->
    <div class="w-full h-full md:w-1/2 p-2 sm:p-8 md:p-16 order-2 md:order-1">
      <h1 class="hidden sm:block text-3xl md:text-4xl font-bold mb-4 text-center">Let's Book Your Ride</h1>

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

      <!-- Form -->
      <form @submit.prevent="submitBooking" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <!-- Passengers -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-600 mb-1">Passengers</label>
            <div class="flex items-center justify-between bg-gray-100 w-full p-3 px-6 rounded-xl overflow-hidden">
              <button type="button" @click="decreasePassengers">
                <i class="fa-solid fa-circle-minus text-purple-800"></i>
              </button>
              <span>{{ formData.passengers }}</span>
              <button type="button" @click="increasePassengers">
                <i class="fa-solid fa-circle-plus text-purple-800"></i>
              </button>
            </div>
          </div>

          <!-- Date and Time -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">Select Date & Time</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <input type="datetime-local" v-model="formData.dateTime"
                class="w-full bg-gray-100 rounded-xl p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300" />
            </div>
          </div>

          <!-- Type Of Car -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">Type Of Car</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-car"></i>
              </div>
              <select v-model="formData.carType"
                class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                <option value="">--Select--</option>
                <option value="economy">Economy</option>
                <option value="comfort">Comfort</option>
                <option value="premium">Premium</option>
                <option value="luxury">Luxury</option>
                <option value="suv">SUV</option>
                <option value="van">Van</option>
                <option value="minibus">Minibus</option>
                <option value="executive">Executive</option>
              </select>
            </div>
          </div>

          <!-- Options -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">Options</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-gear"></i>
              </div>
              <select v-model="formData.options"
                class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                <option value="">--Select--</option>
                <option value="ac">Air Conditioning</option>
                <option value="wifi">WiFi</option>
                <option value="child-seat">Child Seat</option>
                <option value="wheelchair">Wheelchair Accessible</option>
                <option value="pet-friendly">Pet Friendly</option>
                <option value="extra-space">Extra Space</option>
                <option value="phone-charger">Phone Charger</option>
                <option value="refreshments">Refreshments</option>
              </select>
            </div>
          </div>

          <template v-for="(luggage, i) in formData.luggages" :key="i">
            <!-- Luggage Type -->
            <div class="w-full">
              <label class="text-sm font-medium text-gray-600 mb-1">Luggage Type</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                  <i class="fa-solid fa-briefcase"></i>
                </div>
                <select v-model="luggage.type"
                  class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                  <option value="">--Select--</option>
                  <option value="carry-on">Carry-on</option>
                  <option value="small">Small Bag</option>
                  <option value="medium">Medium Suitcase</option>
                  <option value="large">Large Suitcase</option>
                  <option value="extra-large">Extra Large</option>
                  <option value="sports">Sports Equipment</option>
                  <option value="fragile">Fragile Items</option>
                  <option value="multiple">Multiple Bags</option>
                </select>
              </div>
            </div>

            <!-- Weight -->
            <div class="w-full">
              <label class="text-sm font-medium text-gray-600 mb-1">Weight</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                  <i class="fa-solid fa-weight-scale"></i>
                </div>
                <div class="flex">
                  <select v-model="luggage.weight"
                    class="w-full bg-gray-100 rounded-xl rounded-e-none p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                    <option value="">--Select--</option>
                    <option value="5">5 kg</option>
                    <option value="10">10 kg</option>
                    <option value="15">15 kg</option>
                    <option value="20">20 kg</option>
                    <option value="25">25 kg</option>
                    <option value="30">30 kg</option>
                    <option value="35">35 kg</option>
                    <option value="40">40+ kg</option>
                  </select>
                  <button v-if="i === formData.luggages?.length - 1" @click="addItem(formData.luggages, {})"
                    class="p-2 text-lg rounded-e-xl text-white bg-green-600">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                  <button v-else @click="removeItem(formData.luggages, i)"
                    class="p-2 text-lg rounded-e-xl text-white bg-red-600">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                </div>
              </div>
            </div>
          </template>

          <!-- From Location -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">From</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <input type="text" placeholder="Get Ride From" v-model="formData.fromLocation"
                class="w-full bg-gray-100 rounded-xl p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300" />
            </div>
          </div>

          <!-- To Location -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">To</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <input type="text" placeholder="Get Ride To" v-model="formData.toLocation"
                class="w-full bg-gray-100 rounded-xl p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300" />
            </div>
          </div>
        </div>

        <button type="submit" class="w-full py-3 btn-g">Complete Your Booking</button>
      </form>

      <p class="mt-10 text-sm text-center">
        Have Issues Booking? Get In Touch With <router-link to="/support" class="text-g font-medium">Our
          Support</router-link>
      </p>
    </div>
  </div>

  <details-box :is-open="isOpenOverview" title="Overview" @close="isOpenOverview = false">
    <!-- <h3 class="text-lg font-semibold text-gray-800 mb-6 text-start">Overview</h3> -->

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
      <h4 class="font-semibold text-gray-800 mb-2 text-start">Disclaimer:</h4>
      <p class="text-sm font-bold leading-relaxed">
        Payment must be made at least 2 hours in advance.
        Cancellation is allowed up to 1 hour before the scheduled
        pickup. Within 5-24 hours get 50% and you will Get driver is
        on the way or not message.
      </p>
    </div>


    <button class="btn-g w-full mt-3" @click="openAlert(); isOpenOverview = false">
      Pay Now
    </button>
  </details-box>

  <AlertBox ok-btn-text="View Your Booking" @ok="handleBookingOk">
    <!-- Success Message -->
    <h2 class="text-xl font-bold text-gray-800 mb-2">Your Ride Booked Successfully!</h2>
    <p class="text-gray-600 text-sm mb-6">
      Thanks for your Booking and we will send you a confirmation shortly.
    </p>
    <!-- Booking ID -->
    <div class="mb-8 flex gap-2 justify-center text-sm">
      <span class="font-bold">Booking ID:</span>
      <span class="text-g">#123456</span>
    </div>
  </AlertBox>

  <!-- box ride view -->
  <details-box :is-open="isOpenRideViewBox" :show-close-btn="false">
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
        <div className="relative h-[86px] w-full ms-2 overflow-hidden">
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

<!-- global google -->
<script>
import AlertBox from '@/components/AlertBox.vue';
import DetailsBox from '@/components/DetailsBox.vue';
// import MapComp from '@/components/MapComp.vue';

export default {
  name: 'BookingPage',
  components: { AlertBox, DetailsBox },
  data() {
    return {
      rideType: 'split',
      isOpenOverview: false,
      isOpenRideViewBox: false,

      locations: [
        { lat: 23.797309, lng: 90.393681, title: "Driver 1" },
        { lat: 23.796512, lng: 90.395500, title: "Driver 2" },
        { lat: 23.795121, lng: 90.396267, title: "Driver 3" },
        { lat: 23.793729, lng: 90.395500, title: "Driver 4" },
        { lat: 23.792932, lng: 90.393681, title: "Driver 5" },
        { lat: 23.793729, lng: 90.391861, title: "Driver 6" },
        { lat: 23.795121, lng: 90.391095, title: "Driver 7" },
        { lat: 23.796512, lng: 90.391861, title: "Driver 8" },
      ],
    };
  },
  mounted() {
    this.$store.commit('setFormData', {
      passengers: 1,
      luggages: [{}]
    });
  },
  methods: {
    submitBooking() {
      console.log('Booking Submitted:', {
        rideType: this.rideType,
        ...this.form,
      });
      this.isOpenOverview = true;
    },
    increasePassengers() {
      this.formData.passengers++;
    },
    decreasePassengers() {
      if (this.formData.passengers > 1) {
        this.formData.passengers--;
      }
    },
    handleBookingOk() {
      this.isOpenRideViewBox = true;
    },
    handleViewRideOk() {
      this.isOpenRideViewBox = false;
    }
  },
  watch: {
    // rideType(newVal, oldVal) {
    //   console.log(`Switched from ${oldVal} to ${newVal} ride`);
    // },
  },
};
</script>

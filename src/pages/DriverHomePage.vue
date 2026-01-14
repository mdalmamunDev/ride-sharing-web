<template>
  <div class="h-full overflow-y-auto md:overflow-y-none bg-white flex flex-col md:flex-row text-gray-800">
    <!-- Map Panel - Shows first on mobile, second on desktop -->
    <div class="w-full md:w-1/2 relative order-1 md:order-2 z-20">
      <div class="h-[60vh] md:h-full">
        <!-- <div class="w-full h-full bg-gray-200 flex items-center justify-center">
          <div class="text-center text-gray-500">
            <i class="fa-solid fa-map-location-dot text-4xl mb-2"></i>
            <p>Map View</p>
          </div>
        </div> -->
        <div class="absolute inset-0 max-h-[100vh]">
          <!-- <MapComp :locations="locations" icon="user" authIcon="car"/> -->
          <img src="images/map-placeholder-d.png" alt="Map" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <!-- Form Panel - Shows second on mobile, first on desktop -->
    <div class="w-full h-full overflow-y-none md:overflow-y-auto md:w-1/2 p-8 px-1 xl:px-8 order-2 md:order-1">
      <div class="mx-auto w-full max-w-3xl">
        <h1 class="hidden sm:block text-3xl md:text-4xl font-bold my-8 text-center">Available Rides</h1>

        <!-- Tabs -->
        <div class="flex mb-6 bg-purple-100 rounded-full mx-1 sm:mx-0">
          <button :class="[
            'flex-1 py-3 font-bold rounded-full transition',
            rideType === 'split'
              ? 'bg-g text-white'
              : 'text-1 hover:bg-purple-200 duration-300'
          ]" @click="rideType = 'split'">
            Split Your Ride
          </button>
          <button :class="[
            'flex-1 py-3 font-bold rounded-full ml-2 transition',
            rideType === 'private'
              ? 'bg-g text-white'
              : 'text-1 hover:bg-purple-200 duration-300'
          ]" @click="rideType = 'private'">
            Private Ride
          </button>
        </div>

        <pagination-comp>
          <div v-for="(trip, index) in dataList.data" :key="index"
            class="bg-gray-50 rounded-2xl p-2 sm:p-6 shadow border border-gray-100 mb-3">
            <!-- Driver Info Header -->
            <div class="block lg:flex space-y-2 items-center justify-between mb-6">
              <!-- Driver Profile -->
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                  <img :src="showImg(trip.userProfile)" :alt="trip.userName" class="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 text-lg">{{ trip.userName }}</h3>
                  <div class="flex items-center space-x-1">
                    <i class="fa-solid fa-star text-orange-400 text-sm"></i>
                    <span class="text-sm font-medium text-gray-700">{{ trip.avgRating?.toFixed(2) }}</span>
                    <span class="text-sm text-gray-400">({{ trip.totalRating }})</span>
                  </div>
                </div>
              </div>

              <!-- Right Side Info -->
              <div class="flex items-center justify-between space-x-4 pt-5 lg:pt-0">
                <!-- Pickup Time -->
                <div class="flex items-center space-x-2 bg-purple-100 px-3 py-2 rounded-full">
                  <i class="fa-solid fa-clock text-purple-600 text-sm"></i>
                  <span class="text-sm font-medium text-purple-700"><span class="lg:hidden">Pick up @</span>
                    {{ getTime(trip.dateTime) }}
                  </span>
                </div>

                <!-- Price -->
                <div class="flex items-center space-x-2 bg-green-100 px-3 py-2 rounded-full">
                  <i
                    class="fa-solid fa-dollar-sign text-white text-xs text-center bg-green-600 w-4 h-4 rounded-full"></i>
                  <span class="text-sm font-medium text-green-700">{{ trip.fare?.toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <!-- Booking ID -->
            <div class="flex justify-between items-center mb-6 bg-purple-100 p-3 rounded-xl font-semibold">
              <span class="text-sm text-gray-600 font-bold">Booking ID:</span>
              <BookingId class="text-sm text-blue-600" :value="trip.jobId" />
            </div>

            <!-- Route Information -->
            <div class="block lg:flex justify-between space-y-3 items-center lg:space-x-4 mb-6">
              <div class="flex gap-2">
                <!-- Distance -->
                <div class="text-center text-gray-400">
                  <div class="text-lg font-semibold">{{ trip.distance?.toFixed(2) }}</div>
                  <div class="text-xs">Km</div>
                </div>

                <!-- Route Details -->
                <div class="flex-1">
                  <!-- Pickup Location -->
                  <div class="flex items-center space-x-3 mb-3">
                    <div class="w-3 h-3 rounded-full bg-green-500"></div>
                    <span class="text-sm text-gray-700">{{ printText(trip.fromAddress, 25) }}</span>
                  </div>

                  <!-- Destination -->
                  <div class="flex items-center space-x-3">
                    <i class="fa-solid fa-location-dot text-red-500 text-sm ml-0.5"></i>
                    <span class="text-sm text-gray-700">{{ printText(trip.toAddress, 25) }}</span>
                  </div>
                </div>
              </div>
              <!-- Action Buttons -->
              <div class="flex space-x-3">
                <button @click="declineTrip(trip.trId)"
                  class="flex-1 bg-purple-100 text-purple-600 font-medium py-2 px-3 sm:py-3 sm:px-6 rounded-full hover:bg-purple-200 transition-colors duration-200">
                  Decline
                </button>
                <button @click="showDetails(trip)"
                  class="flex-1 btn-g text-white font-medium py-2 px-3 sm:py-3 sm:px-6 shadow-md">
                  Accept
                </button>
              </div>
            </div>

          </div>
        </pagination-comp>

        <p class="mt-10 pb-10 text-sm text-center">
          Have Issues Booking? Get In Touch With <a href="#" class="text-g font-medium">Our Support</a>
        </p>
      </div>
    </div>
  </div>

  <AlertBox ok-btn-text="View The Map" @ok="$router.push(`/navigate?jobId=${details.jobId}`); closeAlert()"
    title="Ride Accepted" message="Reach the location by 10:25 PM to pick up the passenger" />

  <!-- box ride view -->
  <details-box :is-open="isOpenRideViewBox" @close="isOpenRideViewBox = false"
    @click-outside="isOpenRideViewBox = false">
    <!-- Profile Header -->
    <div class="text-center pb-6">
      <div class="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
        <img :src="showImg(details.userProfile)" :alt="details.userName" class="w-full h-full object-cover">
      </div>

      <div class="mb-4 flex items-center justify-center gap-3">
        <h1 class="text-2xl font-semibold text-gray-800">{{ details.userName || 'N/A' }}</h1>
        <span class=""><i class="fa fa-star text-orange-500 me-1"></i>{{ details.avgRating?.toFixed(2) }}</span>
      </div>

      <!-- Contact Info -->
      <div class="flex justify-between items-center space-x-8">
        <div class="flex items-center text-purple-600">
          <i class="fas fa-envelope text-sm mr-2"></i>
          <span class="text-sm">{{ details.userEmail || 'N/A' }}</span>
        </div>
        <div class="flex items-center text-purple-600">
          <i class="fas fa-phone text-sm mr-2"></i>
          <span class="text-sm">{{ details.userPhone || 'N/A' }}</span>
        </div>
      </div>
    </div>

    <!-- Route Information -->
    <AddressComp class="px-6 py-4 bg-blue-50 rounded-xl mb-3 bg-blue-50" :from-address="details.fromAddress"
      :to-address="details.toAddress" />

    <!-- Trip Details -->
    <div class="px-6 bg-blue-50 rounded-xl mb-3">
      <div class="flex justify-between py-3 border-b">
        <span class="text-sm font-bold">Ride Price</span>
        <span class="text-sm text-purple-600 font-bold">${{ details.fare?.toFixed(2) }}</span>
      </div>
      <div class="flex justify-between py-3 border-b">
        <span class="text-sm font-bold">Booking ID</span>
        <BookingId class="text-sm text-gray-900" :value="details.jobId" />
      </div>
      <div class="flex justify-between py-3 border-b">
        <span class="text-sm font-bold">Type</span>
        <span class="text-sm text-gray-800">{{ details.type }}</span>
      </div>
      <div class="flex justify-between py-3 border-b">
        <span class="text-sm font-bold">Date</span>
        <span class="text-sm text-gray-800">{{ getDate(details.dateTime) }}</span>
      </div>
      <div class="flex justify-between py-3 border-b">
        <span class="text-sm font-bold">Time</span>
        <span class="text-sm text-gray-800">{{ getTime(details.dateTime) }}</span>
      </div>
      <div class="flex justify-between py-3 border-b">
        <span class="text-sm font-bold">Passenger</span>
        <span class="text-sm text-gray-800">{{ details.passengers }}</span>
      </div>
      <div class="flex justify-between py-3 border-b">
        <span class="text-sm font-bold">Luggages</span>
        <span class="text-sm text-gray-800">
          {{ details?.luggages?.length }} Bag
          ({{details?.luggages?.reduce((sum, item) => sum + item.weight, 0)}})Kg
        </span>
      </div>
    </div>

    <!-- <div class="w-full text-start">
      <h3 class="font-bold mb-3">Passenger Note:</h3>
      <p class="text-gray-500 test-xs">Please enter with your change or transfer to the account on the headrest. </p>
    </div> -->

    <!-- Action Button -->
    <button @click="acceptTrip(details.jobId, details.trId)" class="w-full py-3 mt-4 btn-g">
      Accept Ride
    </button>
  </details-box>
  <!-- box ride view end -->

</template>

<script>
import AddressComp from '@/components/AddressComp.vue';
import AlertBox from '@/components/AlertBox.vue';
import BookingId from '@/components/BookingId.vue';
import DetailsBox from '@/components/DetailsBox.vue';
import PaginationComp from '@/components/PaginationComp.vue';

export default {
  name: 'DriverHomePage',
  components: { AlertBox, DetailsBox, PaginationComp, AddressComp, BookingId },
  data() {
    return {
      rideType: 'split',
      isOpenRideViewBox: false,
      details: {},

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
    this.fetchData();
  },
  methods: {
    showDetails(trip) {
      this.isOpenRideViewBox = true;
      this.details = trip;
    },
    acceptTrip(id, trId) {
      this.httpReq({
        customUrl: `job/provider/accept/${id}/${trId}`, callback: () => {
          this.isOpenRideViewBox = false;
          this.openAlert();
          this.fetchData();
        }
      });
    },
    declineTrip(trId) {
      this.httpReq({
        customUrl: `job/provider/decline/tr/${trId}`, callback: () => {
          this.fetchData();
        }
      });
    },
  },
  watch: {
    rideType(newVal, oldVal) {
      console.log(`Switched from ${oldVal} to ${newVal} ride`);
    },
  },
};
</script>

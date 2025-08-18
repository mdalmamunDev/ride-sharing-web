<template>
  <div class="sm:relative h-full w-full overflow-y-auto">
    <!-- Map Placeholder -->
    <div class="sm:absolute h-[50%] sm:h-full inset-0">
      <div class="w-full h-full bg-gray-300 flex items-center justify-center text-lg text-gray-500">
        <!-- Google Map will be rendered here -->
        <!-- <img class="w-full h-full object-cover" src="/images/map-placeholder2.png" alt=""> -->
        <MapComp :settings="mapSettings" :destination="location" />
      </div>
    </div>

    <!-- Driver Details Bottom Card -->
    <div
      class=" bg-glass sm:absolute bottom-10 left-10  w-[100%] sm:w-[90%] max-w-5xl sm:shadow-xl rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-9 gap-0 sm:gap-4">
      <!-- Left Section -->
      <div class="sm:col-span-2 flex sm:flex-col justify-between mb-8 sm:mb-0 border-b sm:border-none pb-3 sm:pb-0">
        <p class="text-lg text-gray-500 font-bold ">Arriving in <span class="text-g">10 Mins</span></p>
        <p class="text-lg flex gap-1 items-center">10:30 PM |
          <button @click="isShowComplete = true"
            class="bg-green-100/50 rounded border border-green-500 px-1 text-green-600 font-bold hover:bg-green-200 duration-200">
            Complete
          </button>
        </p>
        <div class="p-2 rounded-2xl bg-purple-100/50 hidden sm:block">
          <p class="text-gray-500 text-xs mb-2"><i class="fa-regular fa-envelope text-g"></i> janecooper@email.com</p>
          <p class="text-gray-500 text-xs"><i class="fa-solid fa-phone-volume text-g"></i> +1 234 567 8901</p>
        </div>
      </div>

      <!-- Middle Section -->
      <div class="sm:col-span-3 p-6 rounded-2xl bg-purple-100/50 flex items-center justify-between">
        <button @click="isShowUser = true" class="hidden sm:flex items-center justify-center flex-col">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane Cooper"
            class="w-16 h-16 rounded-full object-cover bg-g p-0.5" />
          <h3 class="text-sm font-semibold mt-1">Jane Cooper</h3>
        </button>
        <router-link to="/user-details" class="flex sm:hidden items-center justify-center flex-col">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane Cooper"
            class="w-16 h-16 rounded-full object-cover bg-g p-0.5" />
          <h3 class="text-sm font-semibold mt-1">Jane Cooper</h3>
        </router-link>
        <img src="/images/car.png" alt="Car" class="w-28 mt-1" />
      </div>

      <!-- Right Section -->
      <div className="flex sm:col-span-4 p-6 rounded-2xl sm:bg-blue-100/50">
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
        <div className="relative h-[70px] w-full ms-2 overflow-hidden">
          <p className="text-gray-800 absolute top-0 truncate whitespace-nowrap">1901 Thornridge Cir, Shiloh</p>
          <p className="text-gray-800 absolute bottom-0 truncate whitespace-nowrap">4140 Parker Rd, Allentown, New
            Mexico</p>
        </div>
      </div>

      <!-- Chat Mobile -->
      <router-link to="/messages" class="btn-g sm:hidden w-full p-3 flex items-center justify-center gap-4">
        <i class="fa-solid fa-comment-dots text-3xl"></i> Chat with your driver
      </router-link>
    </div>

    <!-- Chat Web -->
    <button
      class="hidden sm:block absolute bottom-6 right-6 bg-g text-white text-2xl w-[50px] h-[50px] shadow-lg rounded-full flex items-center gap-2"
      @click="showMsg = !showMsg">
      <i class="fa-solid fa-comment-dots"></i>
    </button>
    <div v-if="showMsg"
      class="hidden sm:block absolute bottom-20 right-6 max-w-md mx-auto h-[70%] bg-white flex flex-col rounded-xl">
      <messages-com />
    </div>

    <!-- user details -->
    <details-box class="hidden sm:flex" :is-open="isShowUser" @close="isShowUser = false" maxW="md">
      <UserDetails />
    </details-box>

    <!-- mark as completed -->
    <details-box :is-open="isShowComplete" max-w="sm" @close="isShowComplete = false" title="Fare Breakdown">
      <!-- Fare Items -->
      <div class="space-y-3">
        <div class="flex justify-between items-center">
          <span class="text-gray-700 text-sm">Base Fare</span>
          <span class="text-gray-900 text-sm font-medium">${{ 99 }}</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-gray-700 text-sm">Booking Fee</span>
          <span class="text-gray-900 text-sm font-medium">${{ 99 }}</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-gray-700 text-sm">Minimum Fare</span>
          <span class="text-gray-900 text-sm font-medium">${{ 99 }}</span>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-gray-700 text-sm">Cancellation Fee</span>
          <span class="text-gray-900 text-sm font-medium">${{ 99 }}</span>
        </div>
      </div>

      <!-- Divider -->
      <hr class="my-4 border-gray-200">

      <!-- Total -->
      <div class="flex justify-between items-center">
        <span class="text-blue-600 text-sm font-medium">Total Fare</span>
        <span class="text-blue-600 text-sm font-semibold">${{ 99 }}</span>
      </div>

      <button @click="isShowComplete = false, isShowReview = true" class="btn-g w-full mt-10">Mark As Completed</button>
    </details-box>

    <!-- revive user -->
    <details-box :is-open="isShowReview" max-w="sm" :show-close-btn="false" title="How was your ride?">
      <!-- Profile Section -->
      <div class="flex flex-col items-center mb-6">
        <!-- Profile Image -->
        <div class="w-16 h-16 rounded-full overflow-hidden mb-3">
          <img src="	https://randomuser.me/api/portraits/women/44.jpg" alt="alt" class="w-full h-full object-cover" />
        </div>

        <!-- Driver Name -->
        <h3 class="text-lg font-medium text-gray-900 mb-3">{{ driverName }}</h3>

        <!-- Star Rating -->
        <div class="flex items-center space-x-1 mb-2 text-xl">
          <i v-for="i in 4" :key="i" class="fa fa-star text-orange-500"></i>
          <i class="fa-regular fa-star"></i>
        </div>
      </div>

      <!-- Comment Section -->
      <div class="relative">
        <!-- Label and Character Count -->
        <div class="flex justify-between items-center mb-2">
          <label class="text-sm text-gray-600">Write your comment</label>
          <span class="text-xs text-gray-400">20/300</span>
        </div>

        <!-- Text Area -->
        <textarea v-model="comment" placeholder="This ride was awesome!"
          class="w-full h-20 p-3 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxlength="300"></textarea>
      </div>

      <button @click="isShowReview = false" class="btn-g w-full mt-3">Submit Review</button>
    </details-box>
  </div>
</template>



<script>
import DetailsBox from '@/components/DetailsBox.vue';
import UserDetails from '@/components/UserDetails.vue';
import MessagesCom from '@/components/MessagesCom.vue';
import MapComp from '@/components/MapComp.vue';


export default {
  name: 'NavigatePage',
  components: { MessagesCom, DetailsBox, UserDetails, MapComp },
  data() {
    return {
      rideType: 'split',
      showMsg: false,
      isShowUser: false,
      isShowComplete: false,
      isShowReview: false,
      location: { lat: 23.786320, lng: 90.391597 },

      mapSettings: {
        zoomControl: true,
        zoomControlOptions: {
          position: 12,
        },

        mapTypeControl: true,
        mapTypeControlOptions: {
          position: 12,
        },

        scaleControl: false,
        scaleControlOptions: {
          position: 12,
        },

        fullscreenControl: true,
        fullscreenControlOptions: {
          position: 12,
        },
      }
    };
  },
  mounted() {
    this.$store.commit('setFormData', {
      passengers: 1,
      luggages: [{}]
    });


    // const destLoc = { lat: 23.795519, lng: 90.3936814 };
    // const manualStart = new Date("2025-08-11T15:30:00");

    this.simulateSimpleMove();
  },
  methods: {
    simulateSimpleMove() {
      const destination = { lat: 23.795519, lng: 90.3936814 };

      const steps = 500;
      let stepCount = 0;

      const latStep = (destination.lat - this.location.lat) / steps;
      const lngStep = (destination.lng - this.location.lng) / steps;

      const interval = setInterval(() => {
        if (stepCount >= steps) {
          clearInterval(interval);
          console.log("Arrived at destination");
          return;
        }

        // this.location.lat += latStep;
        // this.location.lng += lngStep;
        this.location = {lat: this.location.lat + latStep, lng: this.location.lng + lngStep}
        

        // console.log(`Current position: ${this.location.lat.toFixed(6)}, ${this.location.lng.toFixed(6)}`);

        stepCount++;
      }, 500);
    }


  },
};
</script>

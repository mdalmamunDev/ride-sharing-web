<template>
  <div v-if="!isLoading" class="sm:relative h-full w-full overflow-y-auto">
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
        <p class="lg:text-lg text-gray-500 font-bold ">
          <template v-if="auth?.role === 'user'">Arriving</template>
          <template v-else-if="auth?.role === 'provider'">Pickup</template>
          in <span class="text-g">{{ timeLeft || 'N/A' }}</span>
        </p>
        <p class="text-xs lg:text-lg flex gap-1 items-center">{{ getTime(details?.dateTime) || 'N/A' }}
          <!-- <template v-if="auth?.role === 'user'"> -->
          |
          <button @click="isShowComplete = true"
            class="bg-green-100/50 rounded border border-green-500 px-1 text-green-600 font-bold hover:bg-green-200 duration-200">
            Complete
          </button>
          <!-- </template> -->
        </p>
        <div class="p-2 rounded-2xl bg-purple-100 hidden sm:block">
          <p class="text-gray-500 text-xs mb-2"><i class="fa-regular fa-envelope text-g"></i>
            {{ details?.otherUser?.email || 'N/A' }}
          </p>
          <p class="text-gray-500 text-xs"><i class="fa-solid fa-phone-volume text-g"></i>
            {{ details?.otherUser?.phone || 'N/A' }}
          </p>
        </div>
      </div>

      <!-- Middle Section -->
      <div class="sm:col-span-3 p-3  rounded-2xl bg-purple-100 flex items-center"
        :class="auth?.role === 'user' ? 'justify-between' : 'justify-center'">
        <button @click="isShowUser = true" class="hidden sm:flex items-center justify-center flex-col">
          <img :src="showImg(details?.otherUser?.profileImage)" :alt="details?.otherUser?.name || 'Image'"
            class="w-24 h-24 rounded-full object-cover bg-g p-0.5" />
          <h3 class="text-md font-bold mt-2">{{ details?.otherUser?.name || 'N/A' }}</h3>
        </button>
        <router-link :to="`/user-details?userId=${details?.otherUser?._id}`"
          class="flex sm:hidden items-center justify-center flex-col">
          <img :src="showImg(details?.otherUser?.profileImage)" :alt="details?.otherUser?.name || 'Image'"
            class="w-16 h-16 rounded-full object-cover bg-g p-0.5" />
          <h3 class="text-md font-bold mt-2">{{ details?.otherUser?.name || 'N/A' }}</h3>
        </router-link>
        <img v-if="auth?.role === 'user'" src="/images/car.png" alt="Car" class="w-28 mt-1" />
      </div>

      <!-- Right Section -->
      <address-comp :height="80" :width="30" :from-address="details.fromAddress" :to-address="details.toAddress"
        text-size="md" class="sm:col-span-4 p-6 rounded-2xl sm:bg-blue-100/50 flex items-center">
      </address-comp>

      <!-- Chat Mobile -->
      <router-link :to="`/messages?receiverId=${details?.otherUser?._id}`"
        class="btn-g sm:hidden w-full p-3 flex items-center justify-center gap-4">
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
      <messages-com :receiver-id="details?.otherUser?._id" />
    </div>

    <!-- user details -->
    <details-box class="hidden sm:flex" :is-open="isShowUser" @close="isShowUser = false" maxW="md">
      <user-details :user-id="details?.otherUser?._id" />
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
import AddressComp from '@/components/AddressComp.vue';


export default {
  name: 'NavigatePage',
  components: { MessagesCom, DetailsBox, UserDetails, MapComp, AddressComp },
  data() {
    return {
      details: {},
      timeLeft: 0,
      timer: null,
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
    // get job id
    const jobId = this.$route.query?.jobId;
    if (!jobId) {
      this.showToast('No ride found', 'error');
      this.$router.back();
      return;
    }

    this.httpReq({
      urlSuffix: jobId,
      method: 'get',
      callback: (data) => {
        if (!data) {
          this.showToast('No ride found', 'error');
          this.$router.back();
          return;
        }
        this.details = data;

        this.updateTimeLeft(); // initial calculation
        this.timer = setInterval(this.updateTimeLeft, 60000); // update every 1 min
      }
    })


    // const destLoc = { lat: 23.795519, lng: 90.3936814 };
    // const manualStart = new Date("2025-08-11T15:30:00");

    // this.simulateSimpleMove();
  },
  beforeUnmount() {
    clearInterval(this.timer); // cleanup
  },
  methods: {
    updateTimeLeft() {
      const target = new Date(this.details?.dateTime).getTime();
      const now = Date.now();
      const diffMs = target - now;

      let minutes = Math.floor(diffMs / 60000);

      if (minutes < 60) {
        this.timeLeft = `${minutes} Min`;
      } else if (minutes < 1440) { // 60 * 24
        let hours = Math.floor(minutes / 60);
        this.timeLeft = `${hours} Hr`;
      } else {
        let days = Math.floor(minutes / 1440);
        this.timeLeft = `${days} Day`;
      }
    },

    // simulateSimpleMove() {
    //   const destination = { lat: 23.795519, lng: 90.3936814 };

    //   const steps = 500;
    //   let stepCount = 0;

    //   const latStep = (destination.lat - this.location.lat) / steps;
    //   const lngStep = (destination.lng - this.location.lng) / steps;

    //   const interval = setInterval(() => {
    //     if (stepCount >= steps) {
    //       clearInterval(interval);
    //       console.log("Arrived at destination");
    //       return;
    //     }

    //     // this.location.lat += latStep;
    //     // this.location.lng += lngStep;
    //     this.location = { lat: this.location.lat + latStep, lng: this.location.lng + lngStep }


    //     // console.log(`Current position: ${this.location.lat.toFixed(6)}, ${this.location.lng.toFixed(6)}`);

    //     stepCount++;
    //   }, 500);
    // }


  },
};
</script>

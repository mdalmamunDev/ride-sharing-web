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


          <!-- <pre>{{ formData }}</pre> -->
        </div>
      </div>
    </div>

    <!-- Form Panel - Shows second on mobile, first on desktop -->
    <div class="w-full my-auto sm:max-h-full sm:overflow-auto md:w-1/2 p-2 sm:p-8 md:p-16 order-2 md:order-1">
      <h1 class="hidden sm:block text-3xl md:text-4xl font-bold mb-4 text-center">{{ formData._id ? 'Update' : "Let's Book" }} Your Ride</h1>

      <!-- Tabs -->
      <div class="flex mb-6 bg-purple-100 rounded-full">
        <button :class="[
          'flex-1 py-2 font-bold rounded-full transition',
          formData.type === 'split'
            ? 'bg-g text-white'
            : 'text-1 hover:bg-gray-100'
        ]" @click="formData.type = 'split'">
          Split Your Ride
        </button>
        <button :class="[
          'flex-1 py-2 font-bold rounded-full ml-2 transition',
          formData.type === 'private'
            ? 'bg-g text-white'
            : 'text-1 hover:bg-gray-100'
        ]" @click="formData.type = 'private'">
          Private Ride
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitBooking" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <!-- Passengers -->
          <div class="flex flex-col">
            <label class="text-sm font-medium text-gray-600 mb-1">Passengers</label>
            <div class="flex items-center justify-between bg-gray-100 w-full p-3 rounded-xl overflow-hidden">
              <button type="button" @click="decreasePassengers">
                <img class="w-5" src="/icons/minus.svg" alt="-">
              </button>
              <span>{{ formData.passengers }}</span>
              <button type="button" @click="increasePassengers">
                <img class="w-5" src="/icons/plus.svg" alt="+">
              </button>
            </div>
          </div>

          <!-- Date and Time -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">Select Date & Time</label>
            <div class="relative w-full">
              <!-- Calendar Icon -->
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-calendar-days"></i>
              </div>

              <!-- Vue Datepicker -->
              <Datepicker
                placeholder="Date & Time"
                v-model="formData.dateTime"
                :enable-time-picker="true"
                :required="true"
                :minute-increment="5"
                :disabled-dates="disablePastAndNearDates"
                class="w-full bg-gray-100 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>

          <!-- Type Of Car -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">Type Of Car</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <img src="/icons/car.svg" alt="">
              </div>
              <select v-model="selectedCarModel" @change="changeCarModel" required
                class="w-full bg-gray-100 rounded-xl p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                <option value="" disabled>Select Car Model</option>
                <option v-for="(item, index) in carModels" :key="index" :value="item">{{ item.name }}</option>
              </select>
            </div>
          </div>

          <!-- Options -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">Options</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <img src="/icons/car.svg" alt="">
              </div>
              <select v-model="formData.seat" required
                class="w-full bg-gray-100 rounded-xl p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                <option value="" disabled>Select Car Option</option>
                <option v-for="(item, index) in seatList" :key="index" :value="item">{{ item }} Seater</option>
              </select>
            </div>
          </div>

          <template v-for="(luggage, i) in formData.luggages" :key="i">
            <!-- Luggage Type -->
            <div class="w-full">
              <label class="text-sm font-medium text-gray-600 mb-1">Luggage Type</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                  <img src="/icons/luggage.svg" alt="">
                </div>
                <select v-model="luggage.type" required
                  class="w-full bg-gray-100 rounded-xl p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                  <option v-for="(label, key) in JobLuggageTypes" :key="key" :value="key">
                    {{ label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Weight -->
            <div class="w-full">
              <label class="text-sm font-medium text-gray-600 mb-1">Weight</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                  <img src="/icons/weight.svg" alt="">
                </div>
                <div class="flex">
                  <select v-model="luggage.weight"
                    class="w-full bg-gray-100 rounded-xl rounded-e-none p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                    <option :value="10">10 kg</option>
                    <option :value="15">15 kg</option>
                    <option :value="20">20 kg</option>
                    <option :value="25">25 kg</option>
                    <option :value="30">30 kg</option>
                    <option :value="35">35 kg</option>
                    <option :value="40">40+ kg</option>
                  </select>
                  <button type="button" v-if="i === formData.luggages?.length - 1"
                    @click="addItem(formData.luggages, { ...defLuggage })"
                    class="p-2 text-lg rounded-e-xl text-white bg-g">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                  <button type="button" v-else @click="removeItem(formData.luggages, i)"
                    class="p-2 text-lg rounded-e-xl text-white bg-g-danger">
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
                <img src="/icons/location.svg" alt="">
              </div>
              <input ref="mapAddressInput1" type="text" placeholder="Get Ride From"
                class="w-full bg-gray-100 rounded-xl p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300" />
            </div>
          </div>

          <!-- To Location -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">To</label>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <img src="/icons/location.svg" alt="">
              </div>
              <input ref="mapAddressInput2" type="text" placeholder="Ride Destination"
                class="w-full bg-gray-100 rounded-xl p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300" />
            </div>
          </div>
        </div>

        <div class="w-full flex justify-center">
          <button type="submit" class="max-w-full w-[300px] py-3 btn-g">{{ formData._id ? 'Update Trip' : 'Find Now' }}</button>
        </div>
      </form>

      <p class="mt-10 text-sm text-center font-bold">
        Have Issues Booking? Get In Touch With
        <router-link to="/support" class="text-[#5C58EB]">Our Support</router-link>
      </p>
    </div>
  </div>

  <details-box :is-open="isOpenOverview" title="Overview" @close="isOpenOverview = false" container-class="px-0">
    <!-- <h3 class="text-lg font-semibold text-gray-800 mb-6 text-start">Overview</h3> -->
    <AddressComp class="px-6 py-4 rounded-xl mb-3 bg-blue-50" 
      :from-address="overview.fromAddress" :to-address="overview.toAddress" :height="56" :distance="overview.distance"
    ></AddressComp>
    

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
        <span class="text-gray-600">Distance</span>
        <span class="text-gray-800">${{ overview?.distance?.toFixed(2) }}km</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600">Car Type</span>
        <span class="text-gray-800 font-medium">{{ findObj(carModels, overview?.carModelId)?.name }} ({{ overview?.seat }} Seater)</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600">Luggages</span>
        <span class="text-gray-800 font-medium">{{ overview?.luggages?.length }} ({{overview?.luggages?.reduce((sum,
          item) => sum + item.weight, 0)}})Kg</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-gray-600">Passengers</span>
        <span class="text-gray-800 font-medium">{{ overview?.passengers }}</span>
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
      <button class="btn-g w-full mt-3" @click="openAlert(); isOpenOverview = false">
        Pay Now
      </button>

      <button class="w-full mt-3 border rounded-full p-2 bg-purple-50 hover:bg-purple-100 duration-300" @click="isOpenOverview = false">
        Update
      </button>
    </div>
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
import AddressComp from '@/components/AddressComp.vue';
import AlertBox from '@/components/AlertBox.vue';
import DetailsBox from '@/components/DetailsBox.vue';
import Datepicker from '@vuepic/vue-datepicker';

import '@vuepic/vue-datepicker/dist/main.css';

export default {
  name: 'BookingPage',
  components: { AlertBox, DetailsBox, Datepicker, AddressComp },
  data() {
    return {
      isOpenOverview: false,
      isOpenRideViewBox: false,

      carModels: [],
      selectedCarModel: "",
      seatList: [],

      overview: {},

      defLuggage: { type: "suitcase", weight: 10 },
      defForm: {},
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
    this.defForm = {
      type: 'split',
      passengers: 1,
      luggages: [{ ...this.defLuggage }],
      seat: "",

    };

    this.$store.commit('setFormData', this.defForm);
    this.httpReq({
      customUrl: 'car-model/all', method: 'get', callback: (list) => {
        this.carModels = list;
      }
    });

    if (!window.google) {
      const script = document.createElement("script");
      const key = process.env.VUE_APP_GOOGLE_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=setAutoComplete`;
      script.async = true;
      window.setAutoComplete = this.setAutoComplete;
      document.head.appendChild(script);
    } else {
      this.setAutoComplete();
    }
  },
  methods: {
    submitBooking() {
      if (!this.formData.coordinates || !this.formData.destCoordinates) {
        this.showToast('Please select your locations', 'error');
        return;
      }
      if(this.formData.seat < this.formData.passengers ) {
        this.showToast(`The selected car cannot accommodate ${this.formData.passengers} passenger(s). Maximum seats available: ${this.formData.seat}.`, 'error');
        return;
      }

      const method = this.formData._id ? 'put' : 'post';
      const urlSuffix = this.formData._id || '';

      this.httpReq({
        method,
        urlSuffix,
        callback: (data, extra) => {
          this.isOpenOverview = true;
          this.overview = {...data, ...extra};
          this.$store.commit('setFormData', {...data});
        }
      })
    },
    setAutoComplete() {
      const initAutocomplete = (ref, coordinates) => {
        const el = ref.$el || ref;
        if (!el) return;

        const autocomplete = new google.maps.places.Autocomplete(el, {
          types: ["address"],
          fields: ["address_components", "formatted_address", "geometry"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();

          if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            this.formData[coordinates] = [lng, lat];
          } else {
            console.error("No geometry data found for this place.");
          }
        });
      };

      // Initialize both inputs
      initAutocomplete(this.$refs.mapAddressInput1, 'coordinates');
      initAutocomplete(this.$refs.mapAddressInput2, 'destCoordinates');

    },
    calculateRoadDistance(originArr, destArr) {
      if (!originArr || originArr.length !== 2 || !destArr || destArr.length !== 2) return 0;
      // originArr = [lng, lat], destArr = [lng, lat]
      if (!window.google) return;

      const originLatLng = new google.maps.LatLng(originArr[1], originArr[0]);
      const destLatLng = new google.maps.LatLng(destArr[1], destArr[0]);

      const directionsService = new google.maps.DirectionsService();

      directionsService.route(
        {
          origin: originLatLng,
          destination: destLatLng,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result.routes.length > 0) {
            const route = result.routes[0];
            const distanceMeters = route.legs[0].distance.value;
            const distanceText = route.legs[0].distance.text;
            const durationText = route.legs[0].duration.text;

            console.log("Distance (m):", distanceMeters);
            console.log("Distance:", distanceText);
            console.log("Duration:", durationText);

            // Optional: store in Vue data
            // this.distance = distanceText;
            // this.duration = durationText;
          } else {
            console.error("Directions request failed:", status);
          }
        }
      );
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
    },

    changeCarModel() {
      this.formData.carModelId = this.selectedCarModel?._id || "";
      this.formData.seat = "";
      this.seatList = this.selectedCarModel?.seats || [];
    },

    disablePastAndNearDates(date) {
      const nowPlus2Hrs = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return date < nowPlus2Hrs;
    },
  },
};
</script>

<style>
.dp__pointer {
  cursor: pointer;
  border: none;
  background: rgb(243 244 246);
  border-radius: 10px;
  height: 46px;
}

.dp__input_icon {
  color: blueviolet;
}

.dp__active_date {
  /* color: #5C58EB; */
  background: #5C58EB;
  font-weight: 700;
}

/* .dp__calendar_row {
  gap: 0 10px;
} */
</style>
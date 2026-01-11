<template>
  <div v-show="auth?.role === 'user'" class="h-full overflow-y-auto bg-white flex flex-col md:flex-row text-gray-800">
    <!-- Map Panel - Shows first on mobile, second on desktop -->
    <div class="w-full md:w-1/2 relative order-1 md:order-2 z-20">
      <div class="h-[60vh] md:h-full">
        <div class="absolute inset-0 h-full max-h-[100vh]">
          <img src="images/map-placeholder.png" alt="Map" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>

    <!-- Form Panel - Shows second on mobile, first on desktop -->
    <div class="w-full my-auto sm:max-h-full sm:overflow-auto md:w-1/2 p-4 sm:p-8 md:p-16 order-2 md:order-1">
      <h1 class="hidden sm:block text-3xl md:text-4xl font-bold mb-10 text-center">
        {{ formData._id ? 'Update ' : "Let's Book " }} Your Ride
      </h1>

      <!-- Tabs -->
      <div class="flex mb-6 bg-purple-100 rounded-full">
        <button :class="[
          'flex-1 py-3 font-bold rounded-full transition',
          formData.type === 'split'
            ? 'bg-g text-white'
            : 'text-1 hover:bg-purple-200 duration-300'
        ]" @click="formData.type = 'split'">
          Split Ride
        </button>
        <button :class="[
          'flex-1 py-3 font-bold rounded-full ml-2 transition',
          formData.type === 'private'
            ? 'bg-g text-white'
            : 'text-1 hover:bg-purple-200 duration-300'
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
            <div class="flex items-center justify-between bg-gray-100 w-full p-4 rounded-xl overflow-hidden">
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

              <!-- Display selected date and time -->
              <input 
                type="text" 
                :value="formattedDateTime" 
                @click="showDatePicker = true"
                placeholder="Select Date & Time"
                readonly
                required
                class="w-full bg-gray-100 py-4 pl-10 pr-6 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-purple-300 cursor-pointer" 
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
                class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
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
              <select v-model="formData.seat" required :disabled="!formData.carModelId"
                class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                <option value="" disabled>Select Car Option</option>
                <option v-for="(item, index) in seatList" :key="index" :value="item">{{ item }} Seater</option>
              </select>
            </div>
          </div>

          <div class="col-span-2">
            <label class="text-sm font-medium text-gray-600 mb-1">Luggages</label>

            <div class="flex flex-wrap gap-2 mb-2">
              <!-- Selected items -->
              <span
                v-for="(item, index) in formData.luggages"
                :key="index"
                class="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-50 rounded-md text-sm font-medium hover:bg-violet-100 transition-colors"
              >
                {{ JobLuggageTypes[item] }}

                <button
                  type="button"
                  @click="removeItem(formData.luggages, index)"
                  class="hover:bg-violet-300 rounded-full w-5 h-5 flex items-center justify-center transition-colors"
                  aria-label="Remove"
                >
                  <i class="fa-solid fa-xmark text-sm"></i>
                </button>
              </span>

              <!-- Select -->
              <select
                v-if="formData.luggages?.length < 5"
                @change="onAddLuggage"
                class="px-3 py-1.5 bg-violet-50 rounded-md text-sm font-medium hover:bg-violet-100 transition-colors"
              >
                <option value="" disabled selected>Add Luggage</option>
                <option
                  v-for="(label, key) in JobLuggageTypes"
                  :key="key"
                  :value="key"
                >
                  {{ label }}
                </option>
              </select>
            </div>

            <textarea
              v-model="formData.luggageDetails"
              placeholder="Enter Your Luggage Details"
              class="w-full bg-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
            ></textarea>
          </div>
          


          <!-- From Location -->
          <div class="w-full col-span-2 sm:col-span-1">
            <div class="mb-1 flex items-center justify-between">
              <label class="text-sm font-medium text-gray-600">From</label>
              
              <div class="text-xs" :class="formData.coordinates ? 'text-1' : 'text-gray-400'">
                <button type="button" 
                  v-if="isCoordinateSaved(formData?.coordinates)"
                  class="flex items-center gap-1"
                  @click="removePlace(formData?.coordinates)"
                >
                  <i class="fa fa-star"></i>
                  <span>Saved place</span>
                </button>
                <button v-else type="button" @click="savePlace(formData.coordinates)" class="flex items-center gap-1">
                  <i class="far fa-star"></i>
                  <span>Save this place</span>
                </button>
              </div>
            </div>
            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <img src="/icons/location.svg" alt="">
              </div>
              <input ref="mapAddressInput1" type="text" placeholder="Get Ride From"
                class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300" />
            </div>
            <button type="button" @click="isOpenSavedPlace = true" class="text-1 font-semibold text-md">Choose from Saved Places</button>
          </div>

          <!-- To Location -->
          <div class="w-full col-span-2 sm:col-span-1">
            <div class="mb-1 flex items-center justify-between">
              <label class="text-sm font-medium text-gray-600">To</label>

              <div class="text-xs" :class="formData.destCoordinates ? 'text-1' : 'text-gray-400'">
                <button type="button" 
                  v-if="isCoordinateSaved(formData?.destCoordinates)"
                  class="flex items-center gap-1"
                  @click="removePlace(formData?.destCoordinates)"
                >
                  <i class="fa fa-star"></i>
                  <span>Saved place</span>
                </button>
                <button v-else type="button" @click="savePlace(formData.destCoordinates)" class="flex items-center gap-1">
                  <i class="far fa-star"></i>
                  <span>Save this place</span>
                </button>
              </div>
            </div>

            <div class="relative w-full">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <img src="/icons/location.svg" alt="">
              </div>

              <input ref="mapAddressInput2" type="text" placeholder="Ride Destination"
                class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>

            <button type="button" @click="isOpenSavedPlace = true" class="text-1 font-semibold text-md">Choose from Saved Places</button>
          </div>


          <!-- Choose from save places -->
          <details-box 
            :is-open="isOpenSavedPlace" 
            title="Choose from Saved Places" 
            @close="isOpenSavedPlace = false"
            container-class="p-8"
          >
            <div class="bg-blue-100/70 rounded-2xl px-4">
              <!-- Radio Options -->
              <label v-for="(item, index) in savedPlaceAddresses" :key="index" class="flex items-center text-start gap-3 py-4 cursor-pointer border-b border-white">
                <input type="radio" name="location" class="text-blue-600 accent-blue-600"
                :value="item" 
                v-model="selectedSavedPlace"
              >
                <span class="text-gray-800 font-medium">{{ item.address }}</span>
              </label>
            </div>

            <!-- Buttons -->
            <div class="space-y-3 mt-6">
              <button @click="handleSavedPlaceSelected('coordinates')" class="btn-g w-full p-4">
                Choose as start address
              </button>
              <button @click="handleSavedPlaceSelected('destCoordinates')" class="btn-g w-full p-4">
                Choose as ride destination
              </button>
            </div>
          </details-box>


          <div class="col-span-2">
            <label class="text-sm font-medium text-gray-600 mb-1">Note</label>

            <textarea
              v-model="formData.note"
              placeholder="Enter note for driver"
              class="w-full bg-gray-100 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-purple-300"
            ></textarea>
          </div>
        </div>

        <div class="w-full flex justify-center">
          <button
            type="submit"
            class="w-full sm:w-[300px] py-4 btn-g disabled:opacity-60 disabled:cursor-not-allowed"
            :disabled="!availableProviders?.length"
            :title="availableProviders?.length
              ? `${availableProviders.length} providers available for your selected option`
              : 'No providers available for your selected option'"
          >
            {{ formData._id ? 'Update Trip' : 'Complete Your Booking' }}
          </button>

        </div>
      </form>

      <p class="mt-10 text-sm text-center font-bold">
        Have Issues Booking? Get In Touch With
        <router-link to="/support" class="text-[#5C58EB]">Our Support</router-link>
      </p>
    </div>
  </div>

  <!-- Date Picker Modal -->
  <div v-if="showDatePicker" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl p-3">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold text-gray-800">Date</h3>
        <button @click="showDatePicker = false" class="text-2xl text-gray-500 hover:text-gray-700">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <Datepicker 
        v-model="selectedDate" 
        :enable-time-picker="false"
        :disabled-dates="disablePastAndNearDates"
        inline
        auto-apply
        @update:model-value="handleDateSelected"
      />
    </div>
  </div>

  <!-- Time Picker Modal -->
  <div v-if="showTimePicker" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <TimePicker 
      v-model="selectedTime" 
      @confirm="handleTimeConfirmed"
      @cancel="showTimePicker = false"
    />
  </div>

  <!-- Overview Modal -->
  <details-box :is-open="isOpenOverview" title="Overview" @close="isOpenOverview = false" container-class="px-0">
    <!-- <h3 class="text-lg font-semibold text-gray-800 mb-6 text-start">Overview</h3> -->
    <AddressComp class="px-6 py-4 rounded-xl mb-3 bg-blue-50" :from-address="overview.fromAddress"
      :to-address="overview.toAddress" :height="56" :distance="overview.distance"></AddressComp>


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
        <span class="text-gray-800 font-medium">{{ overview?.luggages?.length }}</span>
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
      <button class="btn-g w-full mt-3" @click="pay(formData._id); isOpenOverview = false">
        Pay Now
      </button>

      <button class="w-full mt-3 border rounded-full p-2 bg-purple-50 hover:bg-purple-100 duration-300"
        @click="isOpenOverview = false">
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
      <BookingId class="text-blue-600 font-semibold" :value="successOverview._id" />
    </div>
  </AlertBox>

  <!-- box ride view -->
  <details-box :is-open="isOpenRideViewBox" :show-close-btn="false">
    <!-- Header -->
    <div class="px-6 py-4">
      <div class="flex justify-between items-center">
        <div>
          <span class="text-sm font-bold">Status:</span>
          <span class="ml-2 text-g font-medium">Pending</span>
        </div>
        <div class="text-right">
          <BookingId class="text-blue-600 font-semibold" :value="successOverview?._id || 'N/A'" />
        </div>
      </div>
    </div>

    <!-- Route Information -->
    <address-comp :to-address="successOverview?.toAddress" :from-address="successOverview?.fromAddress"
      class="px-6 py-4 bg-blue-50 rounded-xl mb-3 bg-blue-50">
    </address-comp>

    <!-- Trip Details -->
    <div class="px-6 py-4 bg-blue-50 rounded-xl mb-3">
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-sm font-bold">Date</span>
          <span class="text-sm text-gray-800">{{ getDate(successOverview?.dateTime) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm font-bold">Time</span>
          <span class="text-sm text-gray-800">{{ getTime(successOverview?.dateTime) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm font-bold">Passenger</span>
          <span class="text-sm text-gray-800">{{ successOverview?.passengers }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm font-bold">Luggages</span>
          <span class="text-sm text-gray-800">
            {{ successOverview?.luggages?.length }}
          </span>
        </div>
      </div>
    </div>

    <!-- Pricing Breakdown -->
    <div class="px-6 py-4 bg-blue-50 rounded-xl mb-3">
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-sm font-bold">Fare</span>
          <span class="text-sm text-gray-800">{{ successOverview?.fare?.toFixed(2) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm font-bold">Charge</span>
          <span class="text-sm text-gray-800">{{ successOverview?.charge?.toFixed(2) }}</span>
        </div>
        <div class="border-t pt-3 flex justify-between">
          <span class="font-semibold text-gray-800">Total Fare</span>
          <span class="font-semibold text-blue-600 text-lg">{{ successOverview?.totalFare?.toFixed(2) }}</span>
        </div>
      </div>
    </div>

    <!-- Action Button -->
    <button @click="isOpenRideViewBox = false; $router.push(`/navigate?jobId=${successOverview?._id}`)" class="w-full py-4 btn-g">
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
import TimePicker from '@/components/TimePicker.vue';

import '@vuepic/vue-datepicker/dist/main.css';
import BookingId from '@/components/BookingId.vue';

export default {
  name: 'BookingPage',
  components: { AlertBox, DetailsBox, Datepicker, AddressComp, TimePicker, BookingId },
  data() {
    return {
      isOpenOverview: false,
      isOpenRideViewBox: false,
      showDatePicker: false,
      showTimePicker: false,
      isOpenSavedPlace: false,
      selectedDate: null,
      selectedTime: '14:30',

      carModels: [],
      savedPlaceCoordinates: [],
      savedPlaceAddresses: [],
      selectedCarModel: "",
      seatList: [],
      selectedSavedPlace: null,

      overview: {},
      successOverview: {},

      availableProviders: [],

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
  computed: {
    formattedDateTime() {
      if (!this.formData.dateTime) return '';
      
      const date = new Date(this.formData.dateTime);
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      return date.toLocaleString('en-US', options);
    }
  },
  mounted() {
    this.defForm = {
      type: 'split',
      passengers: 1,
      luggages: [],
      seat: "",

    };

    this.$store.commit('setFormData', this.defForm);
    this.httpReq({
      customUrl: 'car-model/all', method: 'get', callback: (list) => {
        this.carModels = list;
      }
    });
    this.getSavedPlaces();

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


    const { session_id } = this.$route.query;
    if (session_id) {
      this.httpReq({
        customUrl: 'payment/check', urlSuffix: session_id, callback: (data) => {
          if (data) {
            this.openAlert();
            this.$router.replace({ query: {} });
            this.successOverview = data;
          }
        }
      })
    }

  },
  methods: {
    getSavedPlaces() {
      this.httpReq({
      customUrl: 'user-setting/ready/saved-places', method: 'get', callback: ({ready, setting}) => {
        this.savedPlaceCoordinates = setting?.value;
        this.savedPlaceAddresses = ready;
      }
    });
    },
    handleDateSelected(date) {
      if (date) {
        this.selectedDate = date;
        this.showDatePicker = false;
        this.showTimePicker = true;
      }
    },
    handleTimeConfirmed(time) {
      // time is in 24-hour format like "14:30"
      const [hours, minutes] = time.split(':').map(Number);
      
      // Combine selected date with selected time
      const dateTime = new Date(this.selectedDate);
      dateTime.setHours(hours, minutes, 0, 0);
      
      // Store in formData
      this.formData.dateTime = dateTime;
      
      // Close time picker
      this.showTimePicker = false;
    },
    submitBooking() {
      if (!this.formData.coordinates || !this.formData.destCoordinates) {
        this.showToast('Please select your locations', 'error');
        return;
      }
      if (this.formData.seat < this.formData.passengers) {
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
          this.overview = { ...data, ...extra };
          this.$store.commit('setFormData', { ...data });
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
      if(this.formData.passengers < 10) {
        this.formData.passengers++;
      }
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

    onAddLuggage(event) {
      const value = event.target.value;

      // ALLOW duplicates
      this.formData.luggages.push(value);

      // reset select
      event.target.value = '';
    },

    savePlace(coordinates) {
      if(!coordinates) return;

      this.savedPlaceCoordinates?.push(coordinates);

      this.httpReq({
        customUrl: 'user-setting/add-saved-place',
        method: 'put',
        data: {coordinates: this.formData.coordinates},
        callback: this.getSavedPlaces,
      });
    },
    removePlace(coordinates) {
      if(!coordinates) return;

      this.savedPlaceCoordinates = this.savedPlaceCoordinates.filter(savedCoord => 
        JSON.stringify(savedCoord) !== JSON.stringify(coordinates)
      );

      this.httpReq({
        customUrl: 'user-setting/remove-saved-place',
        method: 'delete',
        data: {coordinates: this.formData.coordinates},
        callback: this.getSavedPlaces,
      });
    },

    handleSavedPlaceSelected(field) { // field = 'coordinates' | 'destCoordinates'
      // Check if a place is selected
      if (!this.selectedSavedPlace) {
        this.showToast('Please select a saved place first', 'error');
        return;
      }
      
      // Set the coordinates to the form data
      this.formData[field] = this.selectedSavedPlace.coordinates;
      
      // Also update the corresponding input field with the address
      if (field === 'coordinates') {
        // Update "From" input field
        const fromInput = this.$refs.mapAddressInput1;
        if (fromInput) {
          fromInput.value = this.selectedSavedPlace.address;
        }
      } else if (field === 'destCoordinates') {
        // Update "To" input field
        const toInput = this.$refs.mapAddressInput2;
        if (toInput) {
          toInput.value = this.selectedSavedPlace.address;
        }
      }
      
      // Reset the selected saved place
      this.selectedSavedPlace = null;
      // Close the modal
      this.isOpenSavedPlace = false;
      
    },

     // Check if coordinates exist in saved places
    isCoordinateSaved(coordinates) {
      if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
        return false;
      }
      
      if (!this.savedPlaceCoordinates || !Array.isArray(this.savedPlaceCoordinates)) {
        return false;
      }
      
      // Compare each coordinate pair
      return this.savedPlaceCoordinates.some(savedCoord => {
        if (!Array.isArray(savedCoord) || savedCoord.length !== 2) {
          return false;
        }
        
        // Compare with precision (floating point comparison)
        const latMatch = Math.abs(savedCoord[0] - coordinates[0]) < 0.000001;
        const lngMatch = Math.abs(savedCoord[1] - coordinates[1]) < 0.000001;
        
        return latMatch && lngMatch;
      });
    },
  },
  watch: {
    auth(newVal) {
      if (newVal.role === 'provider') {
        this.$router.push('/d-home');
        return;
      }

    },
    'formData.seat'(newVal) {
      if(!this.formData.carModelId || !newVal) return;

      this.httpReq({
        customUrl: `provider/by-vehicle/${this.formData.carModelId}/${newVal}`, method: 'get', callback: (providers) => {
          this.availableProviders = providers || [];
        }
      });
    },
  }
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
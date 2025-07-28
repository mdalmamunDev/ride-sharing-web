<template>
  <div class="min-h-screen bg-white flex text-gray-800">
    <!-- Left Panel -->
    <div class="w-full md:w-1/2 p-8 md:p-16 mt-8">
      <h1 class="text-3xl md:text-4xl font-bold mb-4 text-center">Let's Book Your Ride</h1>

      <!-- Tabs -->
      <div class="flex mb-6 bg-purple-100 rounded-full">
        <button
          :class="[
            'flex-1 py-2 font-medium rounded-full transition',
            rideType === 'split'
              ? 'bg-g text-white'
              : 'text-gray-700 hover:bg-gray-100'
          ]"
          @click="rideType = 'split'"
        >
          Split Your Ride
        </button>
        <button
          :class="[
            'flex-1 py-2 font-medium rounded-full ml-2 transition',
            rideType === 'private'
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          ]"
          @click="rideType = 'private'"
        >
          Private Ride
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submitBooking" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <!-- passengers -->
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
              <!-- Icon -->
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-calendar-days"></i>
              </div>
              <!-- Input -->
              <input
                type="datetime-local"
                v-model="inputValue"
                class="w-full bg-gray-100 rounded-xl p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>

          <!-- Type Of Car -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">Type Of Car</label>
            <div class="relative w-full">
              <!-- Icon -->
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-car"></i>
              </div>
              <!-- Input -->
              <select class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
              <option :value="undefined">--Select--</option>
              <option v-for="opt in 8" value="a" :key="opt">{{ opt }}</option>
              </select>
            </div>
          </div>

          <!-- Options -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">Options</label>
            <div class="relative w-full">
              <!-- Icon -->
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-car"></i>
              </div>
              <!-- Input -->
              <select class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                <option :value="undefined">--Select--</option>
                <option v-for="opt in 8" value="a" :key="opt">{{ opt }}</option>
              </select>
            </div>
          </div>

          <!-- Luggage Type -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">Luggage Type</label>
            <div class="relative w-full">
              <!-- Icon -->
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-briefcase"></i>
              </div>
              <!-- Input -->
              <select class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                <option :value="undefined">--Select--</option>
                <option v-for="opt in 8" value="a" :key="opt">{{ opt }}</option>
              </select>
            </div>
          </div>

          <!-- Weight -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">Weight</label>
            <div class="relative w-full">
              <!-- Icon -->
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-weight-scale"></i>
              </div>
              <!-- Input -->
              <select class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300">
                <option :value="undefined">--Select--</option>
                <option v-for="opt in 8" value="a" :key="opt">{{ opt }} kg</option>
              </select>
            </div>
          </div>
          
          <!-- From Location -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">From</label>
            <div class="relative w-full">
              <!-- Icon -->
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <!-- Input -->
              <input
                type="text"
                placeholder="Get Ride From"
                v-model="inputValue"
                class="w-full bg-gray-100 rounded-xl p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>
          
          <!-- To Location -->
          <div class="w-full">
            <label class="text-sm font-medium text-gray-600 mb-1">From</label>
            <div class="relative w-full">
              <!-- Icon -->
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
                <i class="fa-solid fa-location-dot"></i>
              </div>
              <!-- Input -->
              <input
                type="text"
                placeholder="Get Ride To"
                v-model="inputValue"
                class="w-full bg-gray-100 rounded-xl p-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>
        </div>

        <button type="submit" class="w-full py-3 rounded-full bg-g text-white font-semibold shadow-md hover:opacity-90 transition">
          Complete Your Booking
        </button>
      </form>

      <p class="mt-10 text-sm text-center">
        Have Issues Booking? Get In Touch With <a href="#" class="text-g font-medium">Our Support</a>
      </p>
    </div>

    <!-- Right Map Panel -->
    <div class="hidden md:block w-1/2 relative">
      <div class="absolute inset-0">
        <img src="images/map-placeholder.png" alt="Map" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'BookingPage',
  data() {
    return {
      rideType: 'split',
    };
  },
  mounted() {
    this.$store.commit('setFormData', {
      passengers: 1
    })
  },
  methods: {
    submitBooking() {
      console.log('Booking Submitted:', {
        rideType: this.rideType, 
        ...this.form,
      });
      alert('Booking Submitted!');
    },
    increasePassengers() {
      this.formData.passengers++;
    },
    decreasePassengers() {
      if (this.formData.passengers > 1) {
        this.formData.passengers--;
      }
    }
  },
  watch: {
    rideType(newVal, oldVal) {
      console.log(`Switched from ${oldVal} to ${newVal} ride`);
    },
  },
};
</script>

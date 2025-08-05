<template>
  <div class="sm:relative h-screen w-full overflow-auto">
    <!-- Map Placeholder -->
    <div class="sm:absolute h-[50%] sm:h-full inset-0">
      <div class="w-full h-full bg-gray-300 flex items-center justify-center text-lg text-gray-500">
        Google Map will be rendered here
      </div>
    </div>

    <!-- Driver Details Bottom Card -->
    <div class="sm:absolute bottom-10 left-10  w-[100%] max-w-5xl bg-white sm:shadow-xl rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-9 gap-4">
      <!-- Left Section -->
      <div class="sm:col-span-2 flex sm:flex-col justify-between mb-4 sm:mb-0">
        <p class="text-lg text-gray-500 font-bold ">Arriving in <span class="text-g">10 Mins</span></p>
        <p class="text-lg">10:30 PM</p>
        <div class="p-2 rounded-2xl bg-purple-100 hidden sm:block">
          <p class="text-gray-500 text-xs mb-2"><i class="fa-regular fa-envelope text-g"></i> janecooper@email.com</p>
          <p class="text-gray-500 text-xs"><i class="fa-solid fa-phone-volume text-g"></i> +1 234 567 8901</p>
        </div>
      </div>

      <!-- Middle Section -->
      <div class="sm:col-span-3 p-6 rounded-2xl bg-purple-100 flex items-center justify-between">
        <div class="flex items-center justify-center flex-col">
          <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane Cooper"
            class="w-16 h-16 rounded-full object-cover bg-g p-0.5" />
          <h3 class="text-sm font-semibold mt-1">Jane Cooper</h3>
        </div>
        <img src="/images/car.png" alt="Car" class="w-28 mt-1" />
      </div>
      <div className="flex sm:col-span-4 p-6 rounded-2xl bg-blue-100">
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
            Mexico</p>
        </div>
      </div>
    </div>

    <!-- Chat Button -->
    <button
      class="absolute bottom-6 right-6 bg-g text-white text-xl p-2 xl:text-3xl xl:p-3 shadow-lg rounded-full flex items-center gap-2">
      <i class="fa-solid fa-comment-dots"></i>
    </button>
  </div>
</template>


<script>

export default {
  name: 'NavigatePage',
  data() {
    return {
      rideType: 'split',
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
    submitBooking() {
      console.log('Booking Submitted:', {
        rideType: this.rideType,
        ...this.form,
      });
      this.openModal();
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
    rideType(newVal, oldVal) {
      console.log(`Switched from ${oldVal} to ${newVal} ride`);
    },
  },
};
</script>

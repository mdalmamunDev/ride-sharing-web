<template>
  <div class="min-h-screen bg-white flex text-gray-800">
    <!-- Left Panel -->
    <div class="w-full md:w-1/2 p-8 md:p-16">
      <h1 class="text-3xl md:text-4xl font-bold mb-4">Let's Book Your Ride</h1>

      <!-- Tabs -->
      <div class="flex mb-6">
        <button
          :class="[
            'flex-1 py-2 font-medium rounded-full transition',
            rideType === 'split'
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white'
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
      <form @submit.prevent="submitBooking" class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <InputField label="Passengers" v-model="form.passengers" />
          <InputField label="Select Date & Time" v-model="form.datetime" />
          <InputField label="Type Of Car" v-model="form.typeOfCar" />
          <InputField label="Options" v-model="form.options" />
          <InputField label="Luggage Type" v-model="form.luggageType" />
          <InputField label="Weight" v-model="form.weight" />
          <InputField label="From" v-model="form.from" />
          <InputField label="To" v-model="form.to" />
        </div>

        <button
          type="submit"
          class="w-full py-3 mt-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold shadow-md hover:opacity-90 transition"
        >
          Complete Your Booking
        </button>
      </form>

      <p class="mt-4 text-sm">
        Have Issues Booking? Get In Touch With
        <a href="#" class="text-blue-600 font-medium">Our Support</a>
      </p>
    </div>

    <!-- Right Map Panel -->
    <div class="hidden md:block w-1/2 relative">
      <div class="absolute inset-0">
        <img src="/map-placeholder.png" alt="Map" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<script>
import InputField from '@/components/InputField.vue';

export default {
  name: 'BookRide',
  components: {
    InputField,
  },
  data() {
    return {
      rideType: 'split',
      form: {
        passengers: '2',
        datetime: '',
        typeOfCar: 'Sedan',
        options: '4 Seater',
        luggageType: 'Suitcase',
        weight: '10 Kg',
        from: '',
        to: '',
      },
    };
  },
  methods: {
    submitBooking() {
      console.log('Booking Submitted:', {
        rideType: this.rideType,
        ...this.form,
      });
      alert('Booking Submitted!');
    },
  },
  watch: {
    rideType(newVal, oldVal) {
      console.log(`Switched from ${oldVal} to ${newVal} ride`);
    },
  },
};
</script>

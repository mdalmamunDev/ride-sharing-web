<template>
<div class="h-full overflow-y-scroll p-6 bg-no-repeat bg-left-bottom"
     style="
        background-image: url('images/bottm-left-circles.svg'), url('images/top-right-circles.svg');
        background-position: left bottom, right top;
        background-repeat: no-repeat, no-repeat;
     ">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <h1 class="hidden sm:block text-2xl font-semibold text-gray-900 text-center">Help & Support</h1>

      <!-- Contact Info Section -->
      <div class="bg-glass rounded-xl p-6 mb-6 shadow-md mt-20 sm:mt-8">
        <div class="block sm:flex justify-between items-center space-y-2">
          <!-- Email -->
          <div class="flex items-center space-x-2">
            <div
              class="h-6 w-6 flex justify-center items-center rounded-full bg-purple-100/70 text-purple-500 text-xs">
              <i class="fa-solid fa-envelope"></i>
            </div>
            <span class="text-sm text-gray-600">info@etriride.com</span>
          </div>

          <!-- Phone -->
          <div class="flex items-center space-x-2">
            <div
              class="h-6 w-6 flex justify-center items-center rounded-full bg-purple-100/70 text-purple-500 text-xs">
              <i class="fa fa-phone"></i>

            </div>
            <span class="text-sm text-gray-600">+1 234 567 8901</span>
          </div>
        </div>
      </div>

      <!-- Support Form -->
      <div class="bg-glass rounded-xl p-6 shadow-lg">
        <form @submit.prevent="submitForm">
          <!-- Full Name and Phone Number Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input v-model="form.fullName" type="text" placeholder="Enter your full name"
                class="w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input v-model="form.phoneNumber" type="tel" placeholder="Enter your phone number"
                class="w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
            </div>
          </div>

          <!-- Email and Booking ID Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input v-model="form.email" type="email" placeholder="Enter your email"
                class="w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Booking ID</label>
              <input v-model="form.bookingId" type="text" placeholder="Enter your booking ID (Optional)"
                class="w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
            </div>
          </div>

          <!-- Message -->
          <div class="mb-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
            <textarea v-model="form.message" rows="5" placeholder="Write your message..."
              class="w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors resize-none"></textarea>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="w-full btn-g">
            Submit
          </button>
        </form>
      </div>
    </div>

    
    <div class="h-[76px] w-full fixed top-0 left-0 bg-glass shadow-lg rounded-b-lg"></div>
  </div>
</template>

<script>
export default {
  name: "SupportPage",
  data() {
    return {
      form: {
        fullName: '',
        phoneNumber: '',
        email: '',
        bookingId: '',
        message: ''
      }
    };
  },
  methods: {
    submitForm() {
      // Handle form submission
      console.log('Form submitted:', this.form);

      // You can add form validation here
      if (!this.form.fullName || !this.form.email || !this.form.message) {
        alert('Please fill in required fields');
        return;
      }

      // Add your API call or form processing logic here
      alert('Thank you for your message! We will get back to you soon.');

      // Reset form
      this.form = {
        fullName: '',
        phoneNumber: '',
        email: '',
        bookingId: '',
        message: ''
      };
    }
  }
};
</script>
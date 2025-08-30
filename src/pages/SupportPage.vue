<template>
  <div class="h-full overflow-y-scroll bg-no-repeat bg-left-bottom" style="
        background-image: url('images/bottm-left-circles.svg'), url('images/top-right-circles.svg');
        background-position: left bottom, right top;
        background-repeat: no-repeat, no-repeat;
     ">
    <div class="max-w-2xl mx-auto sm:mt-10 p-6 bg-white rounded-lg">
      <!-- Header -->
      <h1 class="hidden sm:block text-2xl font-bold text-gray-900 text-center">Help & Support</h1>

      <!-- Contact Info Section -->
      <div class="bg-gray-100 rounded-xl p-3 mb-6 mt-20 sm:mt-8">
        <div class="block sm:flex justify-between items-center space-y-2 sm:space-y-0">
          <!-- Email -->
          <div class="flex items-center space-x-2 sm-space-x-0">
            <div class="h-6 w-6 flex justify-center items-center rounded-full bg-purple-100/70 text-purple-500 text-xs">
              <img src="/icons/email-2.svg" alt="">
            </div>
            <span class="text-sm text-gray-600">{{ support?.email || 'N/A' }}</span>
          </div>

          <!-- Phone -->
          <div class="flex items-center space-x-2 sm-space-x-0">
            <div class="h-6 w-6 flex justify-center items-center rounded-full bg-purple-100/70 text-purple-500 text-xs">
              <img src="/icons/phone-2.svg" alt="">

            </div>
            <span class="text-sm text-gray-600">{{ support?.phone || 'N/A' }}</span>
          </div>
        </div>
      </div>

      <!-- Support Form -->
      <form @submit.prevent="httpReq">
        <!-- Full Name and Phone Number Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input readonly :value="auth?.name" type="text" placeholder="Enter your full name"
              class="w-full px-4 py-3 bg-gray-100 border rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input readonly :value="auth?.phone" type="tel" placeholder="Enter your phone number"
              class="w-full px-4 py-3 bg-gray-100 border rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
          </div>
        </div>

        <!-- Email and Booking ID Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input readonly :value="auth?.email" type="email" placeholder="Enter your email"
              class="w-full px-4 py-3 bg-gray-100 border rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Booking ID</label>
            <input v-model="formData.jobId" type="text" placeholder="Enter your booking ID (Optional)"
              class="w-full px-4 py-3 bg-gray-100 border rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
          </div>
        </div>

        <!-- Message -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
          <textarea v-model="formData.reason" rows="5" placeholder="Write your message..."
            class="w-full px-4 py-3 bg-gray-100 border rounded-2xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors resize-none"></textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="w-full btn-g">
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SupportPage",
  data() {
    return {
      support: {},
    };
  },
  mounted() {
    this.$store.commit('setFormData', {});

    this.httpReq({
      customUrl: 'setting/support',
      method: 'get',
      callback: ({value}) => {
        this.support = value;
      }
    })
  },
  methods: {
    submitReport() {
      this.httpReq({
        customUrl: 'report'
      })
    }
  }
};
</script>
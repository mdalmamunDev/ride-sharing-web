<template>
  <div class="h-full overflow-y-scroll p-6 bg-no-repeat bg-left-bottom"
    style="background-image: url('images/bottm-left-circles.svg');">

    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold text-gray-900">My payment</h1>
        <div class="flex items-center gap-6">
          <!-- Balance Card -->
          <div class="bg-g text-white px-8 h-10 rounded-full flex items-center gap-20 shadow-lg">
            <span class="text-sm font-medium">My Balance</span>
            <span class="text-3xl font-bold">$ 453.00</span>
          </div>

          <!-- Request Withdrawal Button -->
          <button
            class="bg-purple-200 text-purple-600 px-8 h-10 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200">
            Request Withdrawal
          </button>
        </div>
      </div>

      <!-- Recent Transactions Section -->
      <div class="bg-glass rounded-2xl shadow-lg overflow-hidden">
        <div class="p-8 pb-6">
          <h2 class="text-xl font-semibold text-gray-800">Recent Transactions</h2>
        </div>

        <!-- Transaction Table -->
        <!-- Grid Container -->
        <div class="grid gap-4">
          <!-- Transaction Row -->
          <div v-for="(item, index) in 15" :key="index"
            class="flex items-center justify-between border-b border-gray-100 py-4 px-2 sm:px-6">

            <!-- User -->
            <div class="row-span-1 flex items-center gap-4 min-w-0">
              <div class="w-14 h-14 rounded-full overflow-hidden">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23E5E7EB'/%3E%3Cpath d='M28 28c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm0 3.5c-4.667 0-14 2.333-14 7v3.5h28v-3.5c0-4.667-9.333-7-14-7z' fill='%239CA3AF'/%3E%3C/svg%3E"
                  alt="John Doe" class="w-full h-full object-cover">
              </div>
              <p class="font-semibold text-gray-900 text-lg truncate">John Doe</p>
            </div>

            <!-- Booking ID -->
            <div class="row-span-1 text-sm text-gray-500 text-right">
              Booking ID SR1284E6
            </div>

            <!-- Date -->
            <div class="row-span-1 text-sm text-gray-500 text-right">
              05 Jan 2023
            </div>

            <!-- Time -->
            <div class="row-span-1 text-sm text-gray-500 text-right">
              10:00 AM
            </div>

            <!-- Amount -->
            <div class="row-span-1 text-right font-bold text-purple-500 text-lg">
              $ 10.00
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="h-[76px] w-full fixed top-0 left-0 bg-glass shadow-lg rounded-b-lg"></div>
  </div>
</template>

<script>
export default {
  name: "MyPaymentsPage",
  data() {
    return {
      //
    };
  },
  computed: {
    //
  }
};
</script>
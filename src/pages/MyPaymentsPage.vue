<template>
  <div class="h-full overflow-y-scroll p-0 sm:p-6 bg-no-repeat bg-left-bottom"
    style="background-image: url('images/bottm-left-circles.svg');">

    <div class="max-w-7xl mx-auto pt-[100px] sm:pt-0 sm:p-8">
      <!-- Header -->
      <div class="w-full flex items-center justify-between mb-8 p-2">
        <h1 class="w-1/3 text-3xl font-bold text-gray-900 hidden sm:block">My payment</h1>
        <div class="w-full sm:w-2/3 grid grid-cols-2 sm:grid-cols-3 gap-2">
          <!-- Balance Card -->
          <div
            class="col-span-1 sm:col-span-2 bg-g text-white px-8 h-10 rounded-full flex items-center justify-between  shadow-lg">
            <span class="text-xs sm:text-sm font-medium">Balance</span>
            <span class="text-sm sm:text-3xl font-bold">$453.00</span>
          </div>

          <!-- Request Withdrawal Button -->
          <button
            class="col-span-1 bg-purple-200 w-full text-purple-600 px-8 h-10 rounded-full text-xs sm:text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200">
            Request Withdrawal
          </button>
        </div>
      </div>

      <!-- Recent Transactions Section -->
      <div class="bg-glass rounded-2xl shadow-lg overflow-hidden">
        <div class="px-2 sm:px-4 py-6">
          <h2 class="text-xl font-semibold text-gray-800">Recent Transactions</h2>
        </div>

        <!-- Transaction Table -->
        <!-- Grid Container -->
        <div class="grid gap-4">
          <!-- Transaction Row -->
          <div v-for="(item, index) in 15" :key="index"
            class="flex items-center justify-between border-b border-gray-100 py-4 px-0 px-2 sm:px-6 ">

            <!-- User -->
            <div class="row-span-1 flex items-center gap-4 min-w-0">
              <div class="w-14 h-14 rounded-full overflow-hidden">
                <img
                  src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23E5E7EB'/%3E%3Cpath d='M28 28c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm0 3.5c-4.667 0-14 2.333-14 7v3.5h28v-3.5c0-4.667-9.333-7-14-7z' fill='%239CA3AF'/%3E%3C/svg%3E"
                  alt="John Doe" class="w-full h-full object-cover">
              </div>
              <div>
                <p class="font-semibold text-gray-900 text-lg truncate">John Doe</p>
                <p class="text-xs block sm:hidden">
                  <span class="text-[10px] text-gray-500">B. ID</span> <span class="font-bold">SR1284E6</span>
                </p>
              </div>
            </div>

            <!-- Booking ID -->
            <div class="hidden sm:block row-span-1 text-sm text-right">
              <span class="text-gray-500 ">B. ID</span> <span class="text-gray-800 font-bold">SR1284E6</span>
            </div>

            <!-- Date -->
            <div class="row-span-1 text-sm text-gray-500 text-right flex flex-col justify-center items-center">
              05 Jan 2023
              <br>
              <span class="block sm:hidden">10:00 AM</span>
            </div>

            <!-- Time -->
            <div class="hidden sm:block row-span-1 text-sm text-gray-500 text-right">
              10:00 AM
            </div>

            <!-- Amount -->
            <div class="row-span-1 text-right font-bold text-purple-500 text-lg">
              $10.00
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hidden h-[86px] w-full fixed top-0 left-0 bg-glass shadow-lg rounded-b-lg"></div>
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
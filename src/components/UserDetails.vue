<template>
  <div class="">
    <!-- Profile Header -->
    <div class="text-center pt-8 pb-6">
      <div class="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
          alt="Jane Cooper" class="w-full h-full object-cover">
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Jane Cooper</h1>

      <!-- Contact Info -->
      <div class="flex justify-between items-center space-x-8">
        <div class="flex items-center text-purple-600">
          <i class="fas fa-envelope text-sm mr-2"></i>
          <span class="text-sm">janecooper@gmail.com</span>
        </div>
        <div class="flex items-center text-purple-600">
          <i class="fas fa-phone text-sm mr-2"></i>
          <span class="text-sm">+1 234 567 8901</span>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-gradient-to-r from-purple-200 to-purple-100 rounded-2xl p-6 mb-6">
      <div class="flex justify-between items-center">
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-600 mb-1">1,600</div>
          <div class="text-sm text-gray-600">Rides Taken</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-orange-500 mb-1">4.9</div>
          <div class="text-sm text-gray-600">Rating</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-indigo-600 mb-1">4 Years</div>
          <div class="text-sm text-gray-600">Experience</div>
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">
        Reviews <span class="text-gray-400 font-normal">(150)</span>
      </h2>
      <button class="text-blue-500 text-sm font-medium hover:text-blue-600">
        View All
      </button>
    </div>

    <!-- Review 1 -->
    <div v-for="(item, index) in 20" :key="index" class="bg-blue-50 rounded-xl p-4 mb-4">
      <div class="flex items-start justify-between mb-3">
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-300 mr-3">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
              alt="Devon Lane" class="w-full h-full object-cover">
          </div>
          <div class="text-start">
            <h3 class="font-semibold text-gray-800">Devon Lane</h3>
            <p class="text-xs text-gray-500">Passenger</p>
          </div>
        </div>
        <div class="flex items-center">
          <i class="fas fa-star text-orange-400 text-sm mr-1"></i>
          <span class="font-bold text-gray-800">5.0</span>
        </div>
      </div>
      <p class="text-gray-700 text-sm leading-relaxed text-start">
        "Expedited service was requested and pickup from the driver was very fast and earlier than expected"
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: "UserDetails",
};
</script>
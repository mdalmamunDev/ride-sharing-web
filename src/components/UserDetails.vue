<template>
  <div class="">
    <!-- Profile Header -->
    <div class="text-center pt-12 sm:pt-0 pb-6">
      <div class="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
        <img :src="showImg(user.profileImage)" alt="Profile" class="w-full h-full object-cover">
      </div>
      <h1 class="text-2xl font-bold text-gray-800 mb-4">{{ user.name || 'N/A' }}</h1>

      <!-- Contact Info -->
      <div class="flex justify-between items-center space-x-8">
        <div class="flex items-center text-purple-600">
          <i class="fas fa-envelope text-sm mr-2"></i>
          <span class="text-sm">{{ user.email || 'N/A' }}</span>
        </div>
        <div class="flex items-center text-purple-600">
          <i class="fas fa-phone text-sm mr-2"></i>
          <span class="text-sm">{{ user.phone || 'N/A' }}</span>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="bg-gradient-to-r from-purple-200 to-purple-100 rounded-2xl p-6 mb-6">
      <div class="flex justify-between items-center">
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-600 mb-1">{{ user.totalRides || '0' }}</div>
          <div class="text-sm text-gray-600">Rides Taken</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-orange-500 mb-1">{{ user.avgRating?.toFixed(1) || '0' }}</div>
          <div class="text-sm text-gray-600">Rating</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-indigo-600 mb-1">{{ timeAgo(user.createdAt) }}</div>
          <div class="text-sm text-gray-600">Experience</div>
        </div>
      </div>
    </div>

    <!-- Reviews Section -->
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-bold text-gray-800">
        Reviews <span class="text-gray-400 font-normal">({{ dataList?.pagination?.totalCount || 0 }})</span>
      </h2>
      <!-- <button class="text-blue-500 text-sm font-medium hover:text-blue-600">
        View All
      </button> -->
    </div>

    <!-- Review 1 -->
    <pagination-comp class="w-full" :custom-url="'review/' + this.userId">
      <div v-for="(item, index) in dataList.data" :key="index" class="bg-blue-50 rounded-xl p-4 mb-4">
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full overflow-hidden bg-gray-300 mr-3">
              <img :src="showImg(item.reviewerId?.profileImage)" alt="Profile" class="w-full h-full object-cover">
            </div>
            <div class="text-start">
              <h3 class="font-semibold text-gray-800">{{ item.reviewerId?.name || 'N/A' }}</h3>
              <p class="text-xs text-gray-500">{{ Role[item.reviewerId?.role] || 'N/A' }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <i class="fas fa-star text-orange-400 text-sm mr-1"></i>
            <span class="font-bold text-gray-800">{{ item.rating?.toFixed(1) }}</span>
          </div>
        </div>
        <p class="text-gray-700 text-sm leading-relaxed text-start">
          {{ item.comment }}
        </p>
      </div>
    </pagination-comp>
  </div>
</template>

<script>
import PaginationComp from './PaginationComp.vue';


export default {
  name: "UserDetails",
  components: { PaginationComp },
  data() {
    return {
      user: {},
    }
  },
  props: {
    userId: String,
  },
  mounted() {
    if (!this.userId) {
      this.showToast('User not found', 'error');
      return;
    }

    this.fetchData({
      customUrl: 'user/single/' + this.userId,
      callback: ({ data }) => {
        this.user = data;
      }
    });
    this.fetchData({ customUrl: 'review/' + this.userId });

  },
  methods: {
    timeAgo(dateString) {
      const date = new Date(dateString);
      // check invalid date
      if (isNaN(date.getTime())) return "N/A";
      const now = new Date();

      let diff = now.getTime() - date.getTime(); // in ms
      if (diff < 0) diff = 0; // prevent negative

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (years > 0) return `${years} Year${years > 1 ? 's' : ''}`;
      if (months > 0) return `${months} Month${months > 1 ? 's' : ''}`;
      return `${days} Day${days > 1 ? 's' : ''}`;
    }
  }
};
</script>
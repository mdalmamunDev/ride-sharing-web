<template>
  <div class="max-w-2xl mx-auto p-6">
    <h1 class="text-2xl font-bold text-center mb-8 text-gray-800">
      Saved Places
    </h1>

    <!-- Error Message -->
    <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
      <svg class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-red-700">{{ error }}</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="animate-pulse space-y-4">
      <div class="h-20 bg-gray-200 rounded-lg"></div>
      <div class="h-20 bg-gray-200 rounded-lg"></div>
      <div class="h-20 bg-gray-200 rounded-lg"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="placeList.length === 0" class="text-center py-12">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <p class="text-gray-500 text-lg">No saved places yet</p>
      <p class="text-gray-400 text-sm mt-2">Start adding your favorite locations</p>
    </div>

    <!-- Places List -->
    <div v-else class="space-y-3">
      <div v-for="(item, index) in placeList" :key="item.id || index"
        class="group relative p-4 bg-white shadow-md border border-gray-200 rounded-lg hover:shadow-lg hover:border-gray-300 transition-all duration-200">
        <div class="flex items-start gap-3">
          <img class="my-auto" src="/icons/location.svg" />
          <p class="flex-1 text-gray-700 leading-relaxed pr-8">
            {{ item.address }}
          </p>
          <button @click="handleDelete(item, index)" :disabled="deletingIndex === index"
            class="absolute right-4 top-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Delete place">
            <svg v-if="deletingIndex === index"
              class="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin"
              viewBox="0 0 24 24"></svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  name: "SavedPlacesPage",
  data() {
    return {
      placeList: [],
      loading: true,
      error: null,
      deletingIndex: null,
    };
  },
  mounted() {
    this.fetchPlaces();
  },
  methods: {
    fetchPlaces() {
      this.loading = true;
      this.error = null;

      this.httpReq({
        method: 'get',
        callback: (setting) => {
          this.placeList = setting?.ready || [];
          this.loading = false;
        },
        errorCallback: () => {
          this.error = 'Failed to load saved places. Please try again.';
          this.loading = false;
        }
      });
    },

    async handleDelete(item, index) {
      const result = await Swal.fire({
        title: 'Delete Place?',
        text: "This place will remove from your list forever.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
      });

      if (!result.isConfirmed) {
        return;
      }

      this.deletingIndex = index;

      this.httpReq({
        method: 'delete',
        customUrl: 'user-setting/remove-saved-place',
        data: { coordinates: item.coordinates },
        callback: () => {
          this.placeList.splice(index, 1);
          this.deletingIndex = null;
        },
        errorCallback: () => {
          this.deletingIndex = null;
        }
      });
    }
  }
};
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
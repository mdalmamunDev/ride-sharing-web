<template>
  <div class="flex flex-col items-center gap-2 h-full w-full">
    <!-- Notification Card -->
    <pagination-comp custom-url="notification">
      <div v-for="(item, index) in dataList?.data" :key="index"
        class=" bg-purple-100 border border-purple-200 rounded-lg p-4 max-w-md w-full shadow-sm">
        <div class="flex items-start space-x-3">
          <!-- User Icon -->
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <img src="/icons/bell.svg" alt="">
            </div>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h3 class="text-gray-900 font-bold text-sm mb-1">
              {{ item.title }}
            </h3>
            <p class="text-gray-600 text-sm mb-3 leading-relaxed">
              {{ item.message }}
            </p>
            <div class="flex items-center space-x-3 text-xs text-gray-500">
              <span>{{ getDate(item.createdAt) }}</span>
              <span>{{ getTime(item.createdAt) }}</span>
            </div>
          </div>
        </div>
      </div>
    </pagination-comp>
  </div>
</template>

<script>
import PaginationComp from './PaginationComp.vue';

export default {
  name: "AppLayout",
  components: { PaginationComp },
  data() {
    return {
      //
    }
  },
  mounted() {
    this.fetchData();
  }
}
</script>
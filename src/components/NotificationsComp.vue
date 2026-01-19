<template>
  <!-- Notification Card -->
  <PaginationCustomComp custom-url="notification" :resData="notificationRes" @setData="(data) => notificationRes = data">
    <div class="flex flex-col items-center gap-2 h-full w-full">
      <div v-for="(item, index) in notificationRes?.data" :key="index"
        @click="onClickItem(item)"
        class="max-w-xl border border-purple-200 rounded-lg p-4 w-full shadow-sm"
        :class="{
          'bg-white': item.viewStatus,
          'bg-purple-100': !item.viewStatus,
          'cursor-pointer': !!getLink(item.type)
        }">
        <div class="flex items-start space-x-3">
          <!-- User Icon -->
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <img :src="`/icons/notification_type/${item.type || 'default'}.svg`" alt="">
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
    </div>
  </PaginationCustomComp>
</template>

<script>
import PaginationCustomComp from './PaginationCustomComp.vue';


export default {
  name: "AppLayout",
  components: { PaginationCustomComp },
  data() {
    return {
      notificationRes: null,
    }
  },
  mounted() {
    this.fetchData({
      customUrl: 'notification',
      callback: (data) => this.notificationRes = data 
    });


    
  },

  methods: {
    onClickItem(item) {
      const link = this.getLink(item.type);
      if(link) this.$router.push(link);
      this.$emit('afterClick');
    },

    getLink(type) {
      if (type === 'ride') return '/my-rides';
      if (type === 'account') return '/profile';
      if (type === 'payment' && this.auth?.role === 'provider') return '/payments';
    }
  },
}
</script>
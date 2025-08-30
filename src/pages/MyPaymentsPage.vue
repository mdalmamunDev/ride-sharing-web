<template>
  <div class="h-full overflow-y-scroll p-0 sm:p-6 bg-no-repeat bg-left-bottom"
    style="background-image: url('images/bottm-left-circles.svg');">

    <div class="max-w-7xl h-full mx-auto pt-[100px] sm:pt-0 sm:p-8">
      <!-- Desktop Header -->
      <div class="hidden sm:flex w-full items-center justify-between mb-8 p-2">
        <h1 class="w-1/3 text-3xl font-bold text-gray-900">My payment</h1>
        <div class="w-2/3 grid grid-cols-3 gap-2">
          <!-- Balance Card -->
          <div class="col-span-2 bg-g text-white px-8 h-12 rounded-full flex items-center justify-between shadow-lg">
            <span class="text-sm font-medium">My Balance</span>
            <span class="text-3xl font-bold">{{ dataList?.extra?.wallet?.toFixed(2) || "N/A" }}</span>
          </div>

          <!-- Request Withdrawal Button -->
          <button @click="openAlert"
            class="col-span-1 bg-purple-200 text-purple-600 px-8 h-12 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200">
            Request Withdrawal
          </button>
        </div>
      </div>

      <!-- Mobile Header -->
      <div class="block sm:hidden w-full mb-8 p-2">
        <div class="grid grid-cols-2 gap-2">
          <!-- Balance Card -->
          <div
            class="col-span-2 p-3 bg-g text-white px-4 rounded-2xl flex flex-col items-center justify-between shadow-lg">
            <span class="text-md font-medium">My Balance</span>
            <span class="text-4xl font-bold">{{ dataList?.extra?.wallet?.toFixed(2) || "N/A" }}</span>
          </div>

          <!-- Request Withdrawal Button -->
          <button @click="openAlert"
            class="col-span-2 bg-purple-200 text-purple-600 px-4 h-12 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-200">
            Request Withdrawal
          </button>
        </div>
      </div>
      <alert-box :show-icon="false" title="Withdraw" ok-btn-text="Send Request" @ok="requestWithdrawal">
        <div class="mb-4 text-start">
          <label class="block text-md font-medium mb-1">Amount</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
              <i class="fa fa-dollar"></i>
            </span>
            <input type="number" min="0" step="1" :max="parseInt(dataList?.extra?.wallet) || Infinity" placeholder="Enter amount"
              v-model="amount" class="pl-12 pr-4 py-5 w-full rounded-full bg-gray-100 text-sm outline-none" required />
          </div>
        </div>
      </alert-box>

      <!-- Recent Transactions Section -->
      <div class="bg-glass h-full sm:h-auto overflow-hidden">
        <div class="px-2 sm:px-4 py-6">
          <h2 class="text-xl font-bold text-gray-800">Recent Transactions</h2>
        </div>

        <!-- Grid Container -->
        <pagination-comp>
          <div class="grid gap-4 w-full">
            <template v-for="(item, index) in dataList?.data" :key="index">

              <!-- ✅ Desktop Transaction Row -->
              <div class="hidden sm:flex items-center justify-between border rounded-md border-gray-100 py-4 px-6">

                <!-- User -->
                <div class="flex items-center gap-4 min-w-0">
                  <div class="w-14 h-14 rounded-full overflow-hidden">
                    <img :src="showImg(item.userId?.profileImage)" :alt="item.userId?.name"
                      class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p class="font-semibold text-gray-900 text-lg truncate">{{ item.userId?.name }}</p>
                  </div>
                </div>

                <!-- Booking ID -->
                <div class="text-sm text-right">
                  <span class="text-gray-500">B. ID </span>
                  <booking-id :value="item.jobId" class="text-gray-800 font-bold"></booking-id>
                </div>

                <!-- Date -->
                <div class="text-sm text-gray-500 text-right">
                  {{ getDate(item.createdAt) }}
                </div>

                <!-- Time -->
                <div class="text-sm text-gray-500 text-right">
                  {{ getTime(item.createdAt) }}
                </div>

                <!-- Amount -->
                <div class="text-right">
                  <span class="font-bold text-purple-500 text-lg">${{ item.amount?.toFixed(2) }}</span>
                </div>
              </div>

              <!-- ✅ Mobile Transaction Row -->
              <div class="block sm:hidden border rounded-lg border-gray-200 p-3 shadow-sm bg-white">
                <div class="flex items-center justify-between">
                  <!-- Left: User -->
                  <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-full overflow-hidden">
                      <img :src="showImg(item.userId?.profileImage)" :alt="item.userId?.name"
                        class="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p class="font-semibold text-gray-900 text-sm truncate mb-2">{{ item.userId?.name }}</p>
                      <p class="text-[11px] text-gray-500">
                        <span class="font-medium">Booking ID </span>
                        <booking-id :value="item.jobId"></booking-id>
                      </p>
                    </div>
                  </div>

                  <!-- Right: Amount -->
                  <div class="text-right">
                    <span class="font-bold text-purple-500 text-sm">${{ item.amount?.toFixed(2) }}</span>
                    <p class="text-[11px] text-gray-500 mt-2">{{ getDate(item.createdAt) }} · {{ getTime(item.createdAt)
                    }}
                    </p>
                  </div>
                </div>
              </div>

            </template>
          </div>
        </pagination-comp>
      </div>
    </div>

    <div class="hidden h-[86px] w-full fixed top-0 left-0 bg-glass shadow-lg rounded-b-lg"></div>
  </div>
</template>

<script>
import AlertBox from '@/components/AlertBox.vue';
import BookingId from '@/components/BookingId.vue';
import PaginationComp from '@/components/PaginationComp.vue';

export default {
  name: "MyPaymentsPage",
  components: { PaginationComp, BookingId, AlertBox },
  data() {
    return {
      amount: '',
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    requestWithdrawal() {
      this.httpReq({ 
        customUrl: 'payment/withdraw/request', 
        data: { amount: this.amount },
        callback: (data) => {
          console.log(data);
          if(data.url) {
            window.location = data.url;
          }
        }
      })
    }
  }
};
</script>
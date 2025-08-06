<template>
  <div class="h-screen flex flex-col bg-white">
    <!-- Fixed Top Header -->
    <div class=" sm:hidden flex justify-between p-3 bg-g text-white rounded-b-xl shadow-lg z-50">
      <div class="flex items-center">
        <button @click="$router.back()" class="w-10 h-10 rounded-full flex items-center justify-center me-4">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div>
          <h2 class="font-bold text-xl">Jane Cooper</h2>
          <p><i class="fa-regular fa-envelope"></i> janecooper@gmail.com</p>
        </div>
      </div>

      <img class="bg-white p-0.5 w-12 h-12 rounded-full"
        src="https://www.eviemagazine.com/_next/image?url=https%3A%2F%2Fwww.datocms-assets.com%2F109366%2F1698864667-how-to-stop-being-a-nice-girl.jpeg%3Far64%3DNTo2%26crop%3Dfaces%26fit%3Dcrop%26fm%3Dwebp&w=1920&q=75"
        alt=""
      />
    </div>

    <!-- Scrollable Messages Section -->
    <div class="flex-1 overflow-y-auto flex items-end">
      <!-- Adjust `mt-[88px]` based on your header height -->
      <messages-com class="w-full"></messages-com>
    </div>
  </div>
</template>



<script>
import MessagesCom from '@/components/MessagesCom.vue';

export default {
  name: "MessagePage",
  components: {MessagesCom},
  data() {
    return {
      //
    };
  },
  methods: {
    //
  },
};
</script>
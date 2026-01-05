<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div>
      <button 
        @click="showPicker = true" 
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Select Time: {{ selectedTime }}
      </button>
      
      <div v-if="showPicker" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <TimePicker 
          v-model="selectedTime" 
          @confirm="handleConfirm"
          @cancel="handleCancel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TimePicker from '@/components/TimePicker.vue';


export default {
  components: { TimePicker },
  data() {
    return {
      selectedTime: '14:30',
      showPicker: false
    };
  },
  methods: {
    handleConfirm(time) {
      console.log('Selected time:', time); // Returns "14:30" in 24h format
      this.showPicker = false;
    },
    handleCancel() {
      this.showPicker = false;
    }
  }
};
</script>
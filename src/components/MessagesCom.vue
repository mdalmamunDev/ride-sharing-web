<template>
  <div>
    <!-- Chat Messages Container -->
    <div class="flex-1 p-4 space-y-3 overflow-y-auto">
      <!-- Incoming message -->
      <div class="flex justify-end">
        <div class="bg-purple-500 text-white rounded-xl rounded-br-none px-6 py-3 max-w-xs shadow-sm">
          <p class="text-xs font-medium">Hi Jane Cooper</p>
        </div>
      </div>

      <!-- Incoming message -->
      <div class="flex justify-end">
        <div class="bg-purple-500 text-white rounded-xl rounded-br-none px-6 py-3 max-w-xs shadow-sm">
          <p class="text-xs font-medium">How are you? And where are you from?</p>
        </div>
      </div>

      <!-- Outgoing message -->
      <div class="flex justify-start">
        <div class="bg-blue-100 text-gray-800 rounded-xl rounded-bl-none px-6 py-3 max-w-xs shadow-sm">
          <p class="text-sm">I am good. And I'm from United State</p>
        </div>
      </div>

      <!-- Incoming message -->
      <div class="flex justify-end">
        <div class="bg-purple-500 text-white rounded-xl rounded-br-none px-6 py-3 max-w-xs shadow-sm">
          <p class="text-xs font-medium">Ohh, great.</p>
        </div>
      </div>

      <!-- Incoming message -->
      <div class="flex justify-end">
        <div class="bg-purple-500 text-white rounded-xl rounded-br-none px-6 py-3 max-w-xs shadow-sm">
          <p class="text-xs font-medium">How long do you need to arrive at location</p>
        </div>
      </div>

      <!-- Outgoing message -->
      <div class="flex justify-start">
        <div class="bg-blue-100 text-gray-800 rounded-xl rounded-bl-none px-6 py-3 max-w-xs shadow-sm">
          <p class="text-sm">I need 10 mins</p>
        </div>
      </div>

      <!-- Incoming message -->
      <div class="flex justify-end">
        <div class="bg-purple-500 text-white rounded-xl rounded-br-none px-6 py-3 max-w-xs shadow-sm">
          <p class="text-xs font-medium">Ok, no problem. We are waiting</p>
        </div>
      </div>

      <!-- Outgoing message -->
      <div class="flex justify-start">
        <div class="bg-blue-100 text-gray-800 rounded-xl rounded-bl-none px-6 py-3 max-w-xs shadow-sm">
          <p class="text-sm">Yes sure</p>
        </div>
      </div>

    </div>

    <!-- Input Area -->
    <div class="p-4 border-t border-gray-200">
      <div class="flex items-center space-x-3">
        <!-- Text Input -->
        <div class="flex-1 relative">
          <input type="text" placeholder="Chat with your driver"
            class="w-full px-4 py-3 bg-gray-50 rounded-full text-sm text-gray-600 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12">
          <!-- Attachment Icon -->
          <button class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <i class="fas fa-paperclip text-lg"></i>
          </button>
        </div>

        <!-- Voice Message Button -->
        <button
          class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MessagesCom",
  props: {
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      newMessage: '',
      isRecording: false,
      isTyping: false,
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        // Add your message sending logic here
        console.log('Sending message:', this.newMessage);

        // Clear input
        this.newMessage = '';

        // Simulate typing indicator
        this.simulateTyping();
      }
    },

    toggleVoiceRecording() {
      this.isRecording = !this.isRecording;

      if (this.isRecording) {
        console.log('Started voice recording');
        // Add voice recording logic here
      } else {
        console.log('Stopped voice recording');
        // Stop voice recording logic here
      }
    },

    openAttachment() {
      console.log('Opening attachment picker');
      // Add attachment logic here
    },

    closeChat() {
      this.$emit('close');
    },

    simulateTyping() {
      this.isTyping = true;
      setTimeout(() => {
        this.isTyping = false;
      }, 2000);
    }
  },
};
</script>

<style scoped>
/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}

/* Animation for typing dots */
@keyframes bounce {

  0%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }
}
</style>
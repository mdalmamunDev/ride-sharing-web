<template>
  <div class="h-full relative">
    <!-- Chat Messages Container -->
    <div ref="chatContainer"
      class="overflow-y-auto flex flex-col-reverse p-4 space-y-reverse space-y-3 h-full pb-[95px]">
      <div v-for="(msg, index) in messages" :key="index" class="flex"
        :class="msg.isIncoming ? 'justify-start' : 'justify-end'">
        <div :class="[
          'px-6 py-3 max-w-xs shadow-sm rounded-xl',
          msg.isIncoming
            ? 'bg-blue-100 text-gray-800 rounded-bl-none'
            : 'bg-purple-500 text-white rounded-br-none'
        ]">
          <p class="text-sm">{{ msg.text }}</p>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="absolute bottom-0 right-0 w-full h-[80px] p-4 border-t border-gray-200 bg-white/30 backdrop-blur-md rounded-lg shadow-lg">
      <div class="flex items-center space-x-3">
        <!-- Text Input -->
        <div class="flex-1 relative">
          <input v-model="newMessage" type="text" placeholder="Chat with your driver"
            class="w-full px-4 py-3 bg-gray-50 rounded-full text-sm text-gray-600 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-12"
            @keydown.enter="sendMessage" />
          <!-- Attachment Icon -->
          <file-uploader class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <i class="fas fa-paperclip text-lg"></i>
          </file-uploader>
        </div>

        <!-- Send Button -->
        <button @click="sendMessage" class="btn-g w-12 h-12 flex items-center justify-center shadow-lg">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import FileUploader from './FileUploader.vue';

export default {
  name: "MessagesCom",
  components: { FileUploader },
  data() {
    return {
      newMessage: '',
      messages: [
        { text: "Ok, no problem. We are waiting", isIncoming: true },
        { text: "I need 10 mins", isIncoming: false },
        { text: "How long do you need to arrive at location", isIncoming: true },
        { text: "Ohh, great.", isIncoming: true },
        { text: "I am good. And I'm from United State", isIncoming: false },
        { text: "How are you? And where are you from?", isIncoming: true },
        { text: "Hi Jane Cooper", isIncoming: true },
        { text: "Ok, no problem. We are waiting", isIncoming: true },
        { text: "I need 10 mins", isIncoming: false },
        { text: "How long do you need to arrive at location", isIncoming: true },
        { text: "Ohh, great.", isIncoming: true },
        { text: "I am good. And I'm from United State", isIncoming: false },
        { text: "How are you? And where are you from?", isIncoming: true },
        { text: "Hi Jane Cooper", isIncoming: true },
        { text: "Ok, no problem. We are waiting", isIncoming: true },
        { text: "I need 10 mins", isIncoming: false },
        { text: "How long do you need to arrive at location", isIncoming: true },
        { text: "Ohh, great.", isIncoming: true },
        { text: "I am good. And I'm from United State", isIncoming: false },
        { text: "How are you? And where are you from?", isIncoming: true },
        { text: "Hi Jane Cooper", isIncoming: false },
      ],
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        this.messages.unshift({
          text: this.newMessage.trim(),
          isIncoming: false,
        });
        this.newMessage = '';
      }
    },
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
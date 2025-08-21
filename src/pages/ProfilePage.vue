<template>
  <div class="max-w-xl mx-auto">
    <div class="flex items-center gap-6 pb-6">
      <FileUploader v-if="!noEdit" :accept="'image/*'" @uploaded="(data) => { formData.profileImage = data?.path }">
        <img :src="showImg(formData?.profileImage)" @error="onImageError" alt="Avatar"
          class="w-20 h-20 rounded-full object-cover" />
      </FileUploader>
      <img v-else :src="showImg(formData?.profileImage)" @error="onImageError" alt="Avatar"
        class="w-20 h-20 rounded-full object-cover" />
      <div>
        <h2 class="text-2xl font-bold">{{ auth?.name }}</h2>
        <span class="text-sm text-gray-600 capitalize">{{ auth?.role }}</span>
      </div>
    </div>

    <form class="space-y-6" @submit.prevent="updateProfile">
      <div class="w-full">
        <label class="text-sm font-semibold">Name</label>
        <div class="relative w-full mt-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
            <img src="/icons/user.svg" alt="">
          </div>
          <input v-model="formData.name" required :readonly="noEdit"
            class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none"
            :class="noEdit ? '' : 'focus:ring-2 focus:ring-purple-300'" />
        </div>
      </div>
      <div class="w-full">
        <label class="text-sm font-semibold">Email</label>
        <div class="relative w-full mt-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
            <img src="/icons/email.svg" alt="">
          </div>
          <input :value="auth?.email" required readonly
            class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none" />
        </div>
      </div>
      <div class="w-full">
        <label class="text-sm font-semibold">Phone</label>
        <div class="relative w-full mt-1">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-purple-800">
            <img src="/icons/phone.svg" alt="">
          </div>
          <input v-model="formData.phone" required :readonly="noEdit"
            class="w-full bg-gray-100 rounded-xl p-4 pl-10 pr-6 focus:outline-none"
            :class="noEdit ? '' : 'focus:ring-2 focus:ring-purple-300'" />
        </div>
      </div>

      <action-button type="submit" class="w-full py-4">
        {{ noEdit ? 'Edit' : 'Update' }} profile
      </action-button>
    </form>
  </div>
</template>

<script>
import ActionButton from '@/components/ActionButton.vue';
import FileUploader from '@/components/FileUploader.vue';

export default {
  name: "ProfilePage",
  components: { FileUploader, ActionButton },
  data: () => {
    return {
      noEdit: true,
    }
  },
  mounted() {
    this.httpReq({
      method: 'get', callback: ({ id, name, phone, profileImage }) => {
        this.$store.commit('setFormData', { id, name, phone, profileImage });
      }
    });
  },
  methods: {
    updateProfile() {
      if (this.noEdit) {
        this.noEdit = false;
        return;
      }
      this.noEdit = true;

      this.httpReq({
        method: 'put', callback: (data) => {
          this.$store.commit('setAuth', data);
        }
      })
    },
  },
};
</script>

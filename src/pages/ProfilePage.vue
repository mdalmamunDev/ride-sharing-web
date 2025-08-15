<template>
  <div class="max-w-xl mx-auto">
    <div class="flex items-center gap-6 mb-6">
      <FileUploader v-if="!noEdit" :accept="'image/*'" @uploaded="(data) => {formData.profileImage = data?.path}">
        <img :src="showImg(formData?.profileImage)" @error="onImageError" alt="Avatar" class="w-20 h-20 rounded-full object-cover" />
      </FileUploader>
      <img v-else :src="showImg(formData?.profileImage)" @error="onImageError" alt="Avatar" class="w-20 h-20 rounded-full object-cover" />
      <div>
        <h2 class="text-2xl font-bold">{{ auth?.name }}</h2>
        <span class="text-sm text-gray-600">Admin</span>
      </div>
    </div>

    <form class="space-y-6" @submit.prevent="updateProfile">
      <div>
        <label class="block text-sm font-semibold mb-1">Full name</label>
        <input :readonly="noEdit" type="text" v-model="formData.name" class="w-full border rounded px-4 py-2" />
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Email</label>
        <input readonly type="email" :value="auth?.email" class="w-full border rounded px-4 py-2" />
      </div>

      <div>
        <label class="block text-sm font-semibold mb-1">Contact number</label>
        <input :readonly="noEdit" type="text" v-model="formData.phone" class="w-full border rounded px-4 py-2" />
      </div>

      <button type="submit" class="w-full bg-[#5B84D7] text-white py-3 rounded text-lg font-medium hover:bg-blue-700" >
        {{ noEdit ? 'Edit' : 'Update' }} profile
      </button>
    </form>
  </div>
</template>

<script>
import FileUploader from '@/components/FileUploader.vue';

export default {
  name: "ProfilePage",
  components: { FileUploader },
  data: () => {
    return {
      noEdit: true,
    }
  },
  mounted() {
    this.httpReq({method: 'get', callback: ({id, name, phone, profileImage}) => {
      this.$store.commit('setFormData', {id, name, phone, profileImage});
    }});
  },
  methods: {
    updateProfile() {
      if(this.noEdit) {
        this.noEdit = false;
        return;
      }
      this.noEdit = true;

      this.httpReq({method: 'put', callback: (data) => {
        this.$store.commit('setAuth', data);
      }})
    },
  },
};
</script>

<template>
  <div class="cursor-pointer overflow-hidden" @click="triggerFileInput">
    <slot></slot>
    <input ref="fileInput" type="file" :accept="accept" multiple style="display:none" @change="handleFileChange" />
    <!-- Hidden input to sync array -->
    <input class="hidden" :value="JSON.stringify(modelValue)" type="text"
      @input="$emit('update:modelValue', JSON.parse($event.target.value))" />

    <!-- Preview images -->
    <div v-if="modelValue.length" class="grid grid-cols-3 gap-2">
      <div v-for="(img, index) in modelValue" :key="index"
        class="w-full h-24 overflow-hidden rounded-lg relative group">
        <img :src="showImg(img)" class="w-full h-full object-cover" />
        <button class="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 rounded hidden group-hover:block"
          @click.stop="removeImage(index)">
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiImageUpload',
  props: {
    accept: {
      type: String,
      default: '*/*'
    },
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileChange(event) {
      const files = Array.from(event.target.files);
      if (!files.length) return;

      const formObj = new FormData();
      files.forEach(file => formObj.append('files', file));

      try {
        await this.httpReq({
          customUrl: 'upload/multiple',
          data: formObj,
          callback: (data) => {
            // assuming backend returns an array of uploaded file paths
            this.$emit('uploaded', data);
            this.$emit('update:modelValue', data);
          }
        });
      } catch (err) {
        console.error('Upload failed', err);
      }

      event.target.value = '';
    },
    removeImage(index) {
      const updated = [...this.modelValue];
      updated.splice(index, 1);
      this.$emit('update:modelValue', updated);
    }
  }
};
</script>

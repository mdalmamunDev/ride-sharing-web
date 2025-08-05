<template>
  <div class="cursor-pointer">
    <div @click="triggerFileInput">
      <slot></slot>
    </div>
    <input ref="fileInput" type="file" :accept="accept" style="display:none" @change="handleFileChange" />
  </div>
</template>

<script>
export default {
  name: 'ImageUpload',
  props: {
    accept: {
      type: String,
      default: '*/*'
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      const formObj = new FormData();
      formObj.append('file', file);
      this.httpReq({customUrl: 'upload', data: formObj, callback: (data) => {
        this.$emit('uploaded', data);
      }})
      event.target.value = '';
    }
  }
}
</script>

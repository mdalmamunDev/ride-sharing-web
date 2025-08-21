import ActionButton from "@/components/ActionButton.vue";

export default {
  components: { ActionButton },
  data() {
    return {
      JobLuggageTypes: {
        suitcase: 'Suitcase',
        duffel_bag: 'Duffel Bag',
        backpack: 'Backpack',
        trolley: 'Trolley',
        handbag: 'Handbag',
        sports_bag: 'Sports Bag',
        box: 'Box',
        golf_bag: 'Golf Bag'
      }
    };
  },
  computed: {
    auth() {
      const existAuth = this.$store.getters.auth;
      if (existAuth) return existAuth;

      this.$store.commit('setAuth', {});
      this.httpReq({
        customUrl: 'user/me', method: 'get', callback: (data) => {
          this.$store.commit('setAuth', data);

          if (data.role === 'provider' && data.step === 1)
            this.$router.push('/auth/complete');
        }
      });
      return this.$store.getters.auth
    },
    /**
     * Retrieve the list of data from the Vuex store.
     * This is a computed property to automatically react to changes in the store.
     */
    dataList() {
      return this.$store.getters.dataList
    },

    /**
     * Retrieve form data from the Vuex store.
     * This is a computed property to automatically react to changes in the store.
     */
    formData() {
      return this.$store.getters.formData;
    },
    filters() {
      return this.$store.getters.filters;
    },

    isModalOpen() {
      return this.$store.getters.isModalOpen;
    },
    isAlert() {
      return this.$store.getters.isAlert;
    },

    isLoading() {
      return this.$store.getters.isLoading;
    },

    showFooter() {
      return this.$store.getters.showFooter;
    },

    /**
     * Retrieve configuration data from the Vuex store.
     * This is a computed property to automatically react to changes in the store.
     */
    Config() {
      const exist = this.$store.getters.Config;
      if (exist) return exist;

      this.$store.commit('setConfig', {});
      this.httpReq({
        customUrl: 'settings/config', method: 'get', callback: (data) => {
          this.$store.commit('setConfig', data);
        }
      });
      return this.$store.getters.Config
    },

    perPage() {
      const settings = this.$store.getters.settings;
      return settings && settings.items_per_page ? +settings.items_per_page : 10;
    },

    // filters() {
    //   return this.$store.getters.filters;
    // }
  },
  methods: {
    pay(jobId) {
      // if(!jobId)
      this.httpReq({
        customUrl: 'job/pay', urlSuffix: jobId, callback: ({ url }) => {
          if (url && typeof url === 'string') {
            window.location.href = url;
          }
        }
      })
    },
    openModal() {
      this.$store.commit('setIsModalOpen', true);
    },
    closeModal() {
      this.$store.commit('setIsModalOpen', false);
      this.$store.commit('setFormData', {});
    },
    openAlert() {
      this.$store.commit('setIsAlert', true);
    },
    closeAlert() {
      this.$store.commit('setIsAlert', false);
    },
    formatDate(date) {
      if (!date) return date;
      const d = new Date(date);
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      const year = d.getFullYear();
      return `${month}-${day}-${year}`;
    },
    inputDate(date) {
      return date && !isNaN(new Date(date)) ? new Date(date).toISOString().split('T')[0] : '';
    },
    onImageError(event) {
      event.target.src = '/images/error-img.png'; // Fallback image
    },
    asset(path) {
      const baseFilePath = process.env.VUE_APP_BASE_FILE_PATH || '';
      return `${baseFilePath}/${path}`;
    },
    findObj(list, keyValue, key = '_id') {
      if (!list || !keyValue || !key) return null;
      return list.find(obj => obj[key] === keyValue);
    },
    showImg(path) {
      if (!path) return '/images/def.png';

      const baseFilePath = process.env.VUE_APP_BASE_FILE_PATH || '';

      // Extract file extension
      const ext = path.split('.').pop()?.toLowerCase();

      // List of image extensions
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

      if (imageExtensions.includes(ext)) {
        return `${baseFilePath}/${path}`;
      } else {
        return '/icons/file.png';
      }
    },
    printText(text, max) {
      if (!text) return '';
      return text.length > max ? text.slice(0, max) + '...' : text;
    },
    isRoute(route) {
      return this.$route && this.$route.fullPath && this.$route.fullPath.includes(route);
    },
    showToast(message, type = "success") {
      this.$toast(message, {
        type: type,
        timeout: 3000,        // 3 seconds timeout
        position: "top-right", // Toast position at top-right
      });
    },
    printStr(str, len = 20) {
      if (!str || typeof str !== 'string') return str;
      return str.length > len ? str.substring(0, len) + '...' : str;
    },

    removeItem(arr, index) {
      if (Array.isArray(arr) && arr.length > 1) {
        arr.splice(index, 1);
      }
    },
    addItem(arr, item) {
      if (Array.isArray(arr)) {
        arr.push(item);
      }
    },
    getTime(dateTime) {
      if (!dateTime) return "";

      const date = new Date(dateTime);
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";

      // Convert 24h to 12h
      hours = hours % 12;
      if (hours === 0) hours = 12;

      return `${hours}:${minutes} ${ampm}`;
    },
    getDate(dateTime) {
      if (!dateTime) return "";
      return new Date(dateTime).toLocaleDateString();
    },
    printArea(title, ref = 'printArea') {
      const content = this.$refs[ref].innerHTML;

      const printWindow = window.open('', '_blank', 'width=900,height=700');

      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
            <link href="styles/main.css" rel="stylesheet">
            <style>
              @media print {
                body {
                  margin: 0;
                  padding: 1rem;
                }
              }
            </style>
          </head>
          <body onload="window.print(); window.close();">
            ${content}
          </body>
        </html>
      `);

      printWindow.document.close();
    }
  },
};
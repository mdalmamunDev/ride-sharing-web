export default {
  data() {
    return {
      conditionColorMap : {
        GOOD: "#28a745", // Green
        BLOWTHROUGH:"#dc3545", // Red
        LEAKING: "#17a2b8", // Teal 
        RAPID_CYCLING: "#fd7e14", // Orange
        PLUGGED: "#6f42c1", // Purple
        COLD: "#20c997", // Light teal
        FLOODED: "#007bff", // Blue
        OUT_OF_SERVICE: "#6c757d", // Gray
        NOT_TESTED: "#adb5bd", // Light gray
        REMOVED: "#343a40", // Dark gray
        ABANDONED: "#795548", // Brown
        NOT_FOUND: "#ffc107", // Amber
        UNKNOWN: "#6c757d", // Muted gray
        LOSS_OF_SIGNAL: "#ff6f61", // Coral
        DEVICE_NOT_CONFIGURED: "#ffb74d", // Soft orange
        ALARM: "#e53935", // Bright red
        RELIEF_ALARM: "#d81b60", // Pink
        OVER_TEMPERATURE: "#ff5722", // Deep orange
        OVER_PRESSURE: "#f44336", // Red
        STATUS_ALERT: "#ff9800", // Alert yellow
        NO_DATE_AVAILABLE: "#9e9e9e", // Neutral gray
        FAULT: "#b00020", // Strong red
      },
      
      eqTypes: [ 'TRAP', 'VALVE', 'PUMP', 'REGULATOR', 'FLOW_METER', 'SIGHT_GLASS', 'OTHER' ],
      eqConnectionType : [ 'FLANGE', 'THREADED', 'WELD', 'SOCKET_WELD', 'BUTT_WELD', 'UNION', 'OTHER' ],
      eqStandard : ['ASME', 'DIN', 'JIS', 'ISO', 'OTHER'],
      eqApplication: ['PROCESS', 'HEATING', 'COOLING', 'VENT', 'DRAIN', 'OTHER'],
      eqServices: [ 'CONTINUOUS', 'INTERMITTENT', 'SEASONAL', 'STANDBY', 'OTHER' ],
      eqSupply: [ 'HIGH_PRESSURE', 'MEDIUM_PRESSURE', 'LOW_PRESSURE', 'OTHER' ],
      eqDischarge: [ 'ATMOSPHERE', 'CLOSED', 'FLASH_TANK', 'OTHER' ],
      eqLineSize: [ 'SIZE_0_5', 'SIZE_0_75', 'SIZE_1', 'SIZE_1_25', 'SIZE_1_5', 'SIZE_2', 'SIZE_2_5', 'SIZE_3', 'SIZE_4', 'SIZE_6', 'OTHER' ],
      eqPipeOrientation: ['HORIZONTAL', 'VERTICAL', 'ANGLED'],
      eqInsulationTypes:  [ 'ALUMINUM_SILICATE', 'ASBESTOS', 'CALCIUM_SILICATE', 'FIBER_GLASS', 'FOAM_GLASS', 'MINERAL_WOOL', 'NONE', 'UNKNOWN'],
    };
  },
  computed: {
    auth() {
      const existAuth = this.$store.getters.auth;
      if(existAuth) return existAuth;

      this.$store.commit('setAuth', {});
      this.httpReq({customUrl: 'user/profile', method: 'get', callback: (data) => {
        this.$store.commit('setAuth', data);
      }});
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

    isModalOpen() {
      return this.$store.getters.isModalOpen;
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
      if(exist) return exist;

      this.$store.commit('setConfig', {});
      this.httpReq({customUrl: 'settings/config', method: 'get', callback: (data) => {
        this.$store.commit('setConfig', data);
      }});
      return this.$store.getters.Config
    },

    perPage() {
      const settings = this.$store.getters.settings;
      return settings && settings.items_per_page ? +settings.items_per_page : 10;
    },

    filters() {
      return this.$store.getters.filters;
    }
  },
  methods: {
    openModal() {
      this.$store.commit('setIsModalOpen', true);
    },
    closeModal() {
      this.$store.commit('setIsModalOpen', false);
      this.$store.commit('setFormData', {});
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
      if(!str || typeof str !== 'string') return str;
      return  str.length > len ? str.substring(0, len) + '...' : str;
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
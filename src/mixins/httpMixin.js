import Axios from "axios";

export default {
  methods: {
    urlGenerate(customUrl = false, suffix = false) {
      let url = process.env.VUE_APP_API_URL;

      if (customUrl)
        url += '/' + customUrl;
      else
        url += '/' + this.$route.meta.dataUrl;

      if (suffix)
        url += '/' + suffix;

      return url;
    },

    async fetchData({ customUrl = false, url = false, page = false, append = false, callback = false, errorCallback = false } = {}) {
      if (!callback && !append) {
        this.$store.commit('setDataList', null);
      }

      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const apiUrl = url || this.urlGenerate(customUrl);

        // Add filters if present
        if (page) this.filters.page = page;
        let params = {};
        if (this.filters) params = { ...this.filters };

        const response = await Axios.get(apiUrl, { headers, params });

        const data = response.data;

        if (typeof callback === 'function') {
          if (!data) return;

          callback(data, response);

          if (response.status && data.message) {
            let type = 'info';
            if (response.status >= 200 && response.status < 300) type = 'success';
            else if (response.status >= 400) type = 'error';
            this.showToast(data.message, type);
          }
        } else {
          if (append) data.data?.unshift(...this.dataList.data || {})
          
          this.$store.commit('setDataList', data);
          if (response.status && data.message) {
            let type = 'info';
            if (response.status >= 200 && response.status < 300) type = 'success';
            else if (response.status >= 400) type = 'error';
            this.showToast(data.message, type);
          }
        }
      } catch (error) {
        if (typeof errorCallback === 'function') {
          errorCallback(error.response?.data, error.response);
        }
        const message = error.response?.data?.message || error.message || 'Something went wrong!';
        this.showToast(message, 'error');
      }
    },

    httpReq({ url = false, customUrl = false, urlSuffix = false, method = 'post', callback = false, errorCallback = false, data = false, token = false } = {}) {
      const _this = this;
      this.$store.commit('setIsLoading', true);

      // Attach authentication token if available
      if (!token) {
        token = localStorage.getItem('token');
      }

      if (token) {
        Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        delete Axios.defaults.headers.common['Authorization'];
      }

      Axios({
        method: method,  // HTTP method (GET, POST, etc.)
        url: url ? url : _this.urlGenerate(customUrl, urlSuffix),  // Generate the full URL
        data: data ? data : (this.$store ? this.$store.getters.formData : {})      // The data to be sent with the request (for POST/PUT)
      })
        .then(function (response) {
          if (!response.data) return;
          if (typeof callback === 'function') {
            callback(response.data.data, response.data.extra, response);  // Execute the callback with the response
          }
          if (response.status && response.data.message) {
            let type = 'info';
            if (response.status >= 200 && response.status < 300) type = 'success';
            else if (response.status >= 400) type = 'error';
            _this.showToast(response.data.message, type);
          }
        })
        .catch(function (error) {
          if (typeof errorCallback === 'function') {
            errorCallback(error.response?.data, error.response);
          }
          const message = error.response?.data?.message || error.message || 'Something went wrong!';
          _this.showToast(message, 'error');
        })
        .finally(() => {
          _this.$store.commit('setIsLoading', false);
        });
    },


    submitForm({ customUrl = false, urlSuffix = false, callback = false, errorCallback = false } = {}) {
      const _this = this;

      if (!this.formData) {
        this.showToast('No form data available', 'error');
        return;
      }
      this.$store.commit('setIsLoading', true);

      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      let method = 'post';
      if (this.formData.id) {
        method = 'put';
        if (!urlSuffix) {
          urlSuffix = this.formData.id; // Use the ID from formData for PUT requests
        }
      }
      Axios({
        method: method,
        url: _this.urlGenerate(customUrl, urlSuffix),
        data: this.formData,
        headers
      })
        .then(function (response) {
          const data = response.data;
          if (response.status && data.message) {
            let type = 'info';
            if (response.status >= 200 && response.status < 300) type = 'success';
            else if (response.status >= 400) type = 'error';
            _this.showToast(data.message, type);
          }
          if (typeof callback === 'function') {
            callback(data, response);
          }
          _this.$store.commit('setFormData', {}); // Clear form data after submission
        })
        .catch(function (error) {
          const message = error.response?.data?.message || error.message || 'Something went wrong!';
          _this.showToast(message, 'error');
          if (typeof errorCallback === 'function') {
            errorCallback(error.response?.data, error.response);
          }
        })
        .finally(() => {
          _this.$store.commit('setIsLoading', false);
          _this.closeModal();
          _this.fetchData();
        });
    }
  }
}

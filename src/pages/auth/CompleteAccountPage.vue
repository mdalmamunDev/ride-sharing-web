<template>
  <div class="h-screen overflow-y-scroll bg-no-repeat bg-left-bottom" style="
          background-image: url('/images/bottm-left-circles.svg'), url('/images/top-right-circles.svg');
          background-position: left bottom, right top;
          background-repeat: no-repeat, no-repeat;
       ">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="w-full flex justify-center my-10">
        <img src="/logo.svg" alt="Logo">
      </div>
      <h1 class="hidden sm:block text-2xl font-semibold text-gray-900 text-center mb-2">Vehicle Registration</h1>
      <p class="text-center text-sm text-gray-600 mb-8">Enter your vehicle information and upload required documents</p>

      <file-uploader>
        <div class="w-36 h-36 my-10 mx-auto bg-glass bg-purple-800/10 rounded-full flex items-center justify-center">
          <img src="/icons/add-image.svg" alt="">
        </div>
      </file-uploader>

      <!-- Form -->
      <div class="bg-glass rounded-xl p-6 shadow-lg">
        <form @submit.prevent="submitForm">
          <!-- Personal Information Row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input v-model="formData.dateOfBirth" type="date" placeholder="Enter date of birth"
                class="w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input v-model="formData.phoneNumber" type="tel" placeholder="Enter phone number"
                class="w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input v-model="formData.address" type="text" placeholder="Enter your address"
                class="w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
            </div>
          </div>

          <template v-for="(vehicle, index) in formData.vehicles" :key="index">
            <!-- Vehicle Section Header -->
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-900">Vehicle #{{ index + 1 }}</h2>
              <button v-if="index === formData.vehicles?.length - 1" type="button" @click="addVehicle"
                class="px-4 py-2 text-sm font-medium text-purple-600 border border-purple-600 rounded-full hover:bg-purple-50/40 transition-colors">
                Add vehicle
              </button>
              <button v-else type="button" @click="removeVehicle(index)"
                class="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-full hover:bg-red-50/40 transition-colors">
                Remove vehicle
              </button>
            </div>

            <!-- Vehicle Forms -->
            <div class="mb-8 last:mb-0">
              <div class="border-t border-gray-200 pt-6 mb-6"></div>

              <!-- Vehicle Information Row -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <input v-model="vehicle.model" type="text" placeholder="Vehicle model"
                    class="w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
                </div>
                <div>
                  <input v-model="vehicle.number" type="text" placeholder="Vehicle number"
                    class="w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
                </div>
                <div>
                  <input v-model="vehicle.year" type="number" placeholder="Manufacturing year" min="1900" max="2024"
                    class="w-full px-4 py-3 bg-transparent border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white/50 transition-colors" />
                </div>
              </div>

              <!-- Document Upload Section -->
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <!-- Upload CNIC -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Upload CNIC</label>
                  <div class="grid grid-cols-2 gap-2">
                    <!-- Front Side -->
                    <file-uploader>
                      <div
                        class="border-2 border-dashed border-purple-300 rounded-lg p-3 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 min-h-[100px] flex flex-col items-center justify-center">
                        <i class="fa-solid fa-plus text-purple-400 text-xl mb-2"></i>
                        <p class="text-xs text-gray-500">Upload image of CNIC (front side)</p>
                      </div>
                    </file-uploader>

                    <!-- Back Side -->
                    <file-uploader>
                      <div
                        class="border-2 border-dashed border-purple-300 rounded-lg p-3 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 min-h-[100px] flex flex-col items-center justify-center">
                        <i class="fa-solid fa-plus text-purple-400 text-xl mb-2"></i>
                        <p class="text-xs text-gray-500">Upload image of CNIC (back side)</p>
                      </div>
                    </file-uploader>
                  </div>
                </div>

                <!-- Upload Driving License -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Upload Driving License</label>
                  <file-uploader>
                    <div
                      class="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 min-h-[100px] flex flex-col items-center justify-center">
                      <i class="fa-solid fa-plus text-purple-400 text-2xl mb-2"></i>
                      <p class="text-xs text-gray-500">Upload image of your driving license</p>
                    </div>
                  </file-uploader>
                </div>

                <!-- Upload Car Papers -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Upload Car Papers</label>
                  <file-uploader>
                    <div
                      class="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 min-h-[100px] flex flex-col items-center justify-center">
                      <i class="fa-solid fa-plus text-purple-400 text-2xl mb-2"></i>
                      <p class="text-xs text-gray-500">Upload image of your car papers</p>
                    </div>
                  </file-uploader>
                </div>
              </div>
            </div>
          </template>

          <!-- Submit Button -->
          <button type="submit" class="w-full btn-g">
            Submit Registration
          </button>
        </form>
      </div>
    </div>

    <!-- Alert Box -->
    <alert-box title="Driver Registration Received"
      message="We will review the provided information and get back to you after verification"
      ok-btn-text="Go Back To Home Screen" @ok="$router.push('/d-home')"/>
  </div>
</template>

<script>
import AlertBox from '@/components/AlertBox.vue';
import FileUploader from '@/components/FileUploader.vue';

export default {
  name: "VehicleRegistrationPage",
  components: { FileUploader, AlertBox },
  data() {
    return {
      //
    };
  },
  mounted() {
    this.$store.commit('setFormData',
      {
        dateOfBirth: '',
        phoneNumber: '',
        address: '',
        vehicles: [
          {
            model: '',
            number: '',
            year: ''
          }
        ]
      }
    )
  },
  methods: {
    addVehicle() {
      this.formData.vehicles.push({
        model: '',
        number: '',
        year: ''
      });
    },
    removeVehicle(index) {
      this.formData.vehicles.splice(index, 1);
    },
    submitForm() {
      console.log('Form submitted:', this.form);

      // // Basic validation
      // if (!this.formData.dateOfBirth || !this.formData.phoneNumber || !this.formData.address) {
      //   alert('Please fill in all personal information fields');
      //   return;
      // }

      // // Validate vehicles
      // for (let i = 0; i < this.formData.vehicles.length; i++) {
      //   const vehicle = this.formData.vehicles[i];
      //   if (!vehicle.model || !vehicle.number || !vehicle.year) {
      //     alert(`Please fill in all vehicle information for vehicle ${i + 1}`);
      //     return;
      //   }
      // }

      this.openAlert();
    }
  }
};
</script>
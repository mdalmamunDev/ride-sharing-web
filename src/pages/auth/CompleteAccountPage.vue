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
      <h1 class="hidden sm:block text-2xl font-bold text-gray-900 text-center mb-2">Complete Your Profile</h1>
      <p class="text-center text-sm text-gray-600 mb-8">Enter your information and create your new account</p>

      <file-uploader>
        <div class="w-36 h-36 my-10 mx-auto bg-glass bg-purple-800/10 rounded-full flex items-center justify-center">
          <img src="/icons/add-image.svg" alt="">
        </div>
      </file-uploader>

      <!-- Form -->
      <div class="bg-glass rounded-xl p-6">
        <form @submit.prevent="submitForm">
          <!-- Personal Information Row -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

            <div>
              <label class="block text-sm font-medium  text-gray-700 mb-2">Date of Birth</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                  <img src="/icons/cake.svg">
                </span>
                <input type="date" v-model="formData.dateOfBirth" placeholder="Enter your first name & last name"
                  class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                  <img src="/icons/phone.svg">
                </span>
                <input type="tel" v-model="formData.phone" placeholder="Enter phone number"
                  class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                  <img src="/icons/location.svg">
                </span>
                <input type="address" v-model="formData.address" placeholder="Enter your address"
                  class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
              </div>
            </div>
          </div>

          <template v-for="(vehicle, index) in formData.vehicles" :key="index">
            <!-- Vehicle Section Header -->
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold text-gray-900">Vehicle #{{ index + 1 }}</h2>
              <button v-if="index === formData.vehicles?.length - 1" type="button" @click="addVehicle"
                class="w-[200px] py-1.5 text-sm font-medium text-1 border border-[#5C58EB] rounded-full hover:bg-purple-100/40 transition-colors">
                Add more vehicles
              </button>
              <button v-else type="button" @click="removeVehicle(index)"
                class="w-[200px] py-1.5 text-sm font-medium text-red-600 border border-red-600 rounded-full hover:bg-red-100/40 transition-colors">
                Remove vehicle
              </button>
            </div>

            <!-- Vehicle Forms -->
            <div class="mb-8 last:mb-0">
              <!-- <div class="border-t border-gray-200 pt-6 mb-6"></div> -->

              <!-- Vehicle Information Row -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                    <img src="/icons/car-2.svg">
                  </span>
                  <input type="text" v-model="vehicle.model" placeholder="Vehicle model"
                    class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
                </div>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                    <img src="/icons/docs-2.svg">
                  </span>
                  <input type="text" v-model="vehicle.number" placeholder="Vehicle number"
                    class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
                </div>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                    <img src="/icons/calender-2.svg">
                  </span>
                  <input type="number" min="1900" :max="new Date().getFullYear()" v-model="vehicle.year" placeholder="Manufacturing year"
                    class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
                </div>
              </div>
            </div>
          </template>



          <!-- Document Upload Section -->
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <!-- Upload CNIC -->
            <div class="col-span-1 lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Upload CNIC</label>
              <div class="grid grid-cols-2 gap-2">
                <!-- Front Side -->
                <file-uploader>
                  <div
                    class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-3 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 min-h-[100px] flex flex-col items-center justify-center">
                    <i class="fa-solid fa-plus text-purple-400 text-xl mb-2"></i>
                    <p class="text-xs text-gray-500">Upload image of CNIC (front side)</p>
                  </div>
                </file-uploader>

                <!-- Back Side -->
                <file-uploader>
                  <div
                    class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-3 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 min-h-[100px] flex flex-col items-center justify-center">
                    <i class="fa-solid fa-plus text-purple-400 text-xl mb-2"></i>
                    <p class="text-xs text-gray-500">Upload image of CNIC (back side)</p>
                  </div>
                </file-uploader>
              </div>
            </div>

            <!-- Upload Driving License -->
            <div class="col-span-1 lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Upload Driving License</label>
              <file-uploader>
                <div
                  class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 min-h-[100px] flex flex-col items-center justify-center">
                  <i class="fa-solid fa-plus text-purple-400 text-2xl mb-2"></i>
                  <p class="text-xs text-gray-500">Upload image of your driving license</p>
                </div>
              </file-uploader>
            </div>

            <!-- Upload Car Papers -->
            <div class="col-span-1 lg:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-2">Upload Car Papers</label>
              <file-uploader>
                <div
                  class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 min-h-[100px] flex flex-col items-center justify-center">
                  <i class="fa-solid fa-plus text-purple-400 text-2xl mb-2"></i>
                  <p class="text-xs text-gray-500">Upload image of your car papers</p>
                </div>
              </file-uploader>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="w-full flex justify-center">
            <button type="submit" class="btn-g px-28">Submit</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Alert Box -->
    <alert-box title="Driver Registration Received"
      message="We will review the provided information and get back to you after verification"
      ok-btn-text="Go Back To Home Screen" @ok="$router.push('/d-home')" />
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
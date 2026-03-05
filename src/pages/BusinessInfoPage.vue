<template>
  <!-- Form -->
  <div class="bg-glass rounded-xl p-6">
    <form @submit.prevent="submitForm">
      <!-- Personal Information Row -->
      <template v-if="formData.vehicles && formData.vehicles.length">
        <template v-for="(vehicle, index) in formData.vehicles" :key="index">
          <!-- Vehicle Section Header -->
          <div class="flex justify-between items-center mb-6">
            <!-- Title -->
            <h2 class="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <img src="/icons/car.svg" alt="">
              Vehicle #{{ index + 1 }}
            </h2>

            <!-- Actions -->
            <div class="flex items-center gap-2">
              <!-- Remove Button -->
              <button v-if="formData.vehicles.length > 1" type="button" @click="removeVehicle(index)"
                class="w-[100px] flex items-center justify-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600  border border-red-600 rounded-full hover:bg-red-50 transition-all">
                <i class="fa-solid fa-trash"></i>
                Remove
              </button>

              <!-- Add Button -->
              <button v-if="index === formData.vehicles.length - 1 && index < 4" type="button" @click="addVehicle"
                class="w-[100px] flex items-center justify-center gap-1 px-3 py-1.5 text-sm font-medium text-[#5C58EB] border border-[#5C58EB] rounded-full hover:bg-purple-50 transition-all">
                <i class="fa-solid fa-plus"></i>
                Add
              </button>
            </div>
          </div>


          <!-- Vehicle Forms -->
          <div class="mb-8 last:mb-0">
            <!-- Vehicle Information Row -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div class="relative">
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                  <img src="/icons/car-2.svg">
                </span>
                <select v-model="vehicle.carModelId" @change="changeCarModel(vehicle)" placeholder="Vehicle model"
                  required class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none">
                  <option value="" disabled>Select Car Model</option>
                  <option v-for="(item, index) in carModels" :key="index" :value="item._id">{{ item.name }}</option>
                </select>
              </div>
              <div class="relative">
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                  <img class="w-[24px]" src="/icons/seat-2.svg">
                </span>
                <select v-model="vehicle.seat" required
                  class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none">
                  <option value="" disabled>Select Car Option</option>
                  <!-- Use vehicle.availableSeats instead of seatList -->
                  <option v-for="(item, index) in vehicle.availableSeats || []" :key="index" :value="item">{{ item }}
                    Seater</option>
                </select>
              </div>
              <div class="relative">
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                  <img src="/icons/docs-2.svg">
                </span>
                <input type="text" v-model="vehicle.licenseNo" placeholder="Vehicle number"
                  class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
              </div>
              <div class="relative">
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                  <img src="/icons/calender-2.svg">
                </span>
                <input type="number" min="1900" :max="new Date().getFullYear()" v-model="vehicle.year"
                  placeholder="Manufacturing year"
                  class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
              </div>
            </div>
          </div>
        </template>
      </template>


      <!-- Document Upload Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Upload CNIC</label>
          <div class="grid grid-cols-2 gap-2">
            <!-- Upload CNIC -->
            <div class="col-span-1">
              <!-- Front Side -->
              <file-uploader v-model="formData.cnicFront"
                class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 h-[100px] flex flex-col items-center justify-center">
                <img v-if="formData.cnicFront" class="w-full h-full object-cover" :src="showImg(formData.cnicFront)"
                  alt="">
                <div class="p-3" v-else>
                  <i class="fa-solid fa-plus text-purple-400 text-xl mb-2"></i>
                  <p class="text-[10px] text-gray-400">Upload image of CNIC <br />(front side)</p>
                </div>
              </file-uploader>
            </div>
            <div class="col-span-1">
              <!-- Back Side -->
              <file-uploader v-model="formData.cnicBack"
                class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 h-[100px] flex flex-col items-center justify-center">
                <img v-if="formData.cnicBack" class="w-full h-full object-cover" :src="showImg(formData.cnicBack)"
                  alt="">
                <div class="p-3" v-else>
                  <i class="fa-solid fa-plus text-purple-400 text-xl mb-2"></i>
                  <p class="text-[10px] text-gray-400">Upload image of CNIC <br />(back side)</p>
                </div>
              </file-uploader>
            </div>
          </div>
        </div>

        <!-- Upload Driving License -->

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Upload Driving License</label>
          <div class="grid grid-cols-2 gap-2">
            <div class="col-span-1">
              <file-uploader v-model="formData.licenseFront"
                class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 h-[100px] flex flex-col items-center justify-center">
                <img v-if="formData.licenseFront" class="w-full h-full object-cover"
                  :src="showImg(formData.licenseFront)" alt="">
                <div class="p-3" v-else>
                  <i class="fa-solid fa-plus text-purple-400 text-xl mb-2"></i>
                  <p class="text-[10px] text-gray-400">Upload image of your driving license (front side)</p>
                </div>
              </file-uploader>
            </div>
            <div class="col-span-1">
              <file-uploader v-model="formData.licenseBack"
                class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 h-[100px] flex flex-col items-center justify-center">
                <img v-if="formData.licenseBack" class="w-full h-full object-cover" :src="showImg(formData.licenseBack)"
                  alt="">
                <div class="p-3" v-else>
                  <i class="fa-solid fa-plus text-purple-400 text-xl mb-2"></i>
                  <p class="text-[10px] text-gray-400">Upload image of your driving license (back side)</p>
                </div>
              </file-uploader>
            </div>
          </div>
        </div>

        <!-- Upload Car Papers -->
        <div class="col-span-1">
          <label class="block text-sm font-medium text-gray-700 mb-2">Upload Car Papers</label>
          <file-uploader-multiple v-model="formData.carPapers"
            class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 h-[100px] flex flex-col items-center justify-center">
            <div class="p-3" v-if="!formData.carPapers?.length">
              <i class="fa-solid fa-plus text-purple-400 text-2xl mb-2"></i>
              <p class="text-[10px] text-gray-400">Upload image of your car papers</p>
            </div>
          </file-uploader-multiple>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="w-full mt-14 flex justify-center">
        <button type="submit" class="btn-g px-28">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import FileUploader from '@/components/FileUploader.vue';
import FileUploaderMultiple from '@/components/FileUploaderMultiple.vue';
import Swal from 'sweetalert2';

export default {
  name: "BusinessInfoPage",
  components: { FileUploader, FileUploaderMultiple },
  data() {
    return {
      vehicle: { carModelId: "", seat: "", licenseNo: "", year: "" },
      carModels: [],
      selectedCarModel: {},
      seatList: [],
    };
  },
  computed: {
    // Add formData computed property if using Vuex
    formData() {
      return this.$store.state.formData || {
        vehicles: [],
        cnicFront: null,
        cnicBack: null,
        licenseFront: null,
        licenseBack: null,
        carPapers: []
      };
    }
  },
  mounted() {
    this.httpReq({
      customUrl: 'provider/me',
      method: 'get',
      callback: (provider) => {
        // Initialize vehicles if empty
        if (!provider.vehicles || provider.vehicles.length === 0) {
          provider.vehicles = [{
            carModelId: "",
            seat: "",
            licenseNo: "",
            year: ""
          }];
        }

        // set seats 
        for (const vehicle of provider?.vehicles) {
          const selectedModel = this.carModels.find(model => model._id === vehicle.carModelId);
          if (selectedModel) {
            vehicle.availableSeats = selectedModel.seats || []; // Store available seats for this vehicle
          }
        }

        this.$store.commit('setFormData', provider);
      }
    });
    this.httpReq({
      customUrl: 'car-model/all',
      method: 'get',
      callback: (list) => {
        this.carModels = list;
      }
    })
  },
  methods: {
    addVehicle() {
      const newVehicle = {
        carModelId: "",
        seat: "",
        licenseNo: "",
        year: "",
        seatList: [] // Individual seat list for each vehicle
      };
      this.formData.vehicles.push(newVehicle);
    },
    removeVehicle(index) {
      this.formData.vehicles.splice(index, 1);
    },
    submitForm() {
      // const { cnicFront, cnicBack, licenseFront, licenseBack, carPapers } = this.formData;
      // if (!cnicFront || !cnicBack || !licenseFront || licenseBack || !carPapers) {
      //   this.showToast("Please fill the required documents first.", 'error');
      //   return;
      // }

      Swal.fire({
        title: 'Are you sure?',
        html: `
          <div class="text-center">
            <p>After submitting your business information, your profile will go under review.</p>
            <p class="font-semibold text-red-600 mt-2">During this period, you won't be able to take any new rides.</p>
            <p class="text-sm text-gray-500 mt-3">Do you want to proceed?</p>
          </div>
        `,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, submit for review',
        cancelButtonText: 'Cancel',
        width: '500px',
        customClass: {
          popup: 'rounded-2xl',
          confirmButton: 'px-6 py-2 rounded-lg',
          cancelButton: 'px-6 py-2 rounded-lg'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.httpReq({
            callback: () => {
              this.openAlert();
            }
          })
        }
      });
    },

    changeCarModel(vehicle) {
      // Find the selected car model from carModels
      const selectedModel = this.carModels.find(model => model._id === vehicle.carModelId);

      if (selectedModel) {
        // Update the seatList for this specific vehicle
        // You can either update a global seatList or attach seatList to each vehicle
        vehicle.seat = ""; // Clear the seat selection
        vehicle.availableSeats = selectedModel.seats || []; // Store available seats for this vehicle
      }
    }
  }
};
</script>
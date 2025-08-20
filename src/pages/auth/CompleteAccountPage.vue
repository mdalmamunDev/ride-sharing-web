<template>
  <div class="h-screen overflow-y-scroll bg-no-repeat bg-left-bottom" style="
          background-image: url('/images/bottm-left-circles.svg'), url('/images/top-right-circles.svg');
          background-position: left bottom, right top;
          background-repeat: no-repeat, no-repeat;
       ">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="w-full flex justify-center my-10">
        <img src="/logo.svg" alt="Logo">
      </div>
      <h1 class="hidden sm:block text-2xl font-bold text-gray-900 text-center mb-2">Complete Your Profile</h1>
      <p class="text-center text-sm text-gray-600 mb-8">Enter your information and create your new account</p>

      <file-uploader v-model="formData.profileImage"
        class="w-36 h-36 my-10 mx-auto bg-glass bg-purple-800/10 rounded-full flex items-center justify-center">
        <img class="w-full h-full object-cover" :src="showImg(formData.profileImage)" alt="">
      </file-uploader>

      <!-- Form -->
      <div class="bg-glass rounded-xl p-6">
        <form @submit.prevent="submitForm">
          <!-- Personal Information Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

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
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div class="relative">
                <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                  <img class="w-[24px]" src="/icons/gender.svg">
                </span>
                <select type="address" v-model="formData.gender" placeholder="Enter your address" required
                  class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none">
                  <option value="" disabled>Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
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
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                    <img src="/icons/car-2.svg">
                  </span>
                  <select v-model="selectedCarModel" @change="changeCarModel(vehicle)" placeholder="Vehicle model"
                    required class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none">
                    <option :value="{}" disabled>Select Car Model</option>
                    <option v-for="(item, index) in carModels" :key="index" :value="item">{{ item.name }}</option>
                  </select>
                </div>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                    <img class="w-[24px]" src="/icons/seat-2.svg">
                  </span>
                  <select type="text" v-model="vehicle.seat" required
                    class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none">
                    <option value="" disabled>Select Car Option</option>
                    <option v-for="(item, index) in seatList" :key="index" :value="item">{{ item }} Seater</option>
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



          <!-- Document Upload Section -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <!-- Upload CNIC -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Upload CNIC (Front)</label>
              <!-- Front Side -->
              <file-uploader v-model="formData.cnicFront"
                class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 h-[100px] flex flex-col items-center justify-center">
                <img v-if="formData.cnicFront" class="w-full h-full object-cover" :src="showImg(formData.cnicFront)"
                  alt="">
                <div class="p-3" v-else>
                  <i class="fa-solid fa-plus text-purple-400 text-xl mb-2"></i>
                  <p class="text-[10px] text-gray-400">Upload image of CNIC (front side)</p>
                </div>
              </file-uploader>
            </div>
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Upload CNIC (Back)</label>
              <!-- Back Side -->
              <file-uploader v-model="formData.cnicBack"
                class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 h-[100px] flex flex-col items-center justify-center">
                <img v-if="formData.cnicBack" class="w-full h-full object-cover" :src="showImg(formData.cnicBack)"
                  alt="">
                <div class="p-3" v-else>
                  <i class="fa-solid fa-plus text-purple-400 text-xl mb-2"></i>
                  <p class="text-[10px] text-gray-400">Upload image of CNIC (back side)</p>
                </div>
              </file-uploader>
            </div>

            <!-- Upload Driving License -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Upload Driving License</label>
              <file-uploader v-model="formData.license"
                class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 h-[100px] flex flex-col items-center justify-center">
                <img v-if="formData.license" class="w-full h-full object-cover" :src="showImg(formData.license)" alt="">
                <div class="p-3" v-else>
                  <i class="fa-solid fa-plus text-purple-400 text-2xl mb-2"></i>
                  <p class="text-[10px] text-gray-400">Upload image of your driving license</p>
                </div>
              </file-uploader>
            </div>

            <!-- Upload Car Papers -->
            <div class="col-span-1">
              <label class="block text-sm font-medium text-gray-700 mb-2">Upload Car Papers</label>
              <file-uploader-multiple v-model="formData.carPapers"
                class="bg-purple-50 border-2 border-dashed border-purple-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/20 transition-all duration-200 h-[100px] flex flex-col items-center justify-center">
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
import FileUploaderMultiple from '@/components/FileUploaderMultiple.vue';

export default {
  name: "VehicleRegistrationPage",
  components: { FileUploader, FileUploaderMultiple, AlertBox },
  data() {
    return {
      vehicle: { carModelId: "", seat: "", licenseNo: "", year: "" },
      carModels: [],
      selectedCarModel: {},
      seatList: [],
    };
  },
  mounted() {
    this.httpReq({
      customUrl: 'user/me', method: 'get', callback: ({ role, step, profileImage, dateOfBirth, phone, address }) => {
        if (role !== 'provider' || step !== 1) {
          this.$router.back();
          return;
        }

        this.$store.commit('setFormData', {
          profileImage,
          dateOfBirth,
          phone,
          address,
          gender: "",
          vehicles: [this.vehicle],
        }
        )
      }
    });
    this.httpReq({
      customUrl: 'car-model/all', method: 'get', callback: (list) => {
        this.carModels = list;
      }
    })

  },
  methods: {
    addVehicle() {
      this.formData.vehicles.push(this.vehicle);
    },
    removeVehicle(index) {
      this.formData.vehicles.splice(index, 1);
    },
    submitForm() {
      const { cnicFront, cnicBack, license, carPapers } = this.formData;
      if (!cnicFront || !cnicBack || !license || !carPapers) {
        this.showToast("Please fill the required documents first.", 'error');
        return;
      }

      this.httpReq({
        callback: () => {
          this.openAlert();
        }
      })
    },

    changeCarModel(vehicle) {
      vehicle.carModelId = this.selectedCarModel?._id || "";
      vehicle.seat = "";
      this.seatList = this.selectedCarModel?.seats || [];
    }
  }
};
</script>
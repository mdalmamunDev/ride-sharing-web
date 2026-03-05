<template>
  <div class="flex flex-col items-center w-full pt-10">
    <!-- Heading -->
    <h2 class="text-2xl font-bold mb-2 text-center">Create An Account</h2>
    <p class="text-sm text-gray-500 mb-6 text-center">Enter your information and create an account.</p>

    <!-- Toggle -->
    <div class="flex w-full max-w-md mb-6 gap-3 justify-center">
      <!-- Passenger -->
      <button :class="[
        'flex-1 py-4 rounded-full font-semibold shadow transition-all duration-300 transform hover:scale-105 hover:shadow-lg',
        formData.role === 'user'
          ? 'bg-g text-white hover:brightness-110'
          : 'bg-purple-200 text-purple-600 hover:bg-purple-300'
      ]" @click="formData.role = 'user'">
        Passenger
      </button>

      <!-- Driver -->
      <button :class="[
        'flex-1 py-4 rounded-full font-semibold shadow transition-all duration-300 transform hover:scale-105 hover:shadow-lg',
        formData.role === 'provider'
          ? 'bg-g text-white hover:brightness-110'
          : 'bg-purple-200 text-purple-600 hover:bg-purple-300'
      ]" @click="formData.role = 'provider'">
        Driver
      </button>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-5">
      <div>
        <label for="name" class="block text-sm font-medium mb-1">Name</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <img src="/icons/user.svg">
          </span>
          <input type="text" id="name" placeholder="Enter your first name & last name" v-model="formData.name"
            class="pl-12 pr-4 py-5 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
        </div>
      </div>
      <div>
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <img src="/icons/email.svg">
          </span>
          <input type="email" id="email" placeholder="Enter your email" v-model="formData.email"
            class="pl-12 pr-4 py-5 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
        </div>
      </div>
      <div>
        <label for="phone" class="block text-sm font-medium mb-1">Phone</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <img src="/icons/phone.svg">
          </span>
          <input type="phone" id="phone" placeholder="Enter your phone number" v-model="formData.phone"
            class="pl-12 pr-4 py-5 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
        </div>
      </div>
      <div>
        <label for="password" class="block text-sm font-medium mb-1">Password</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <img src="/icons/lock.svg" alt="">
          </span>
          <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Enter your password"
            v-model="formData.password" class="pl-12 pr-10 py-5 w-full rounded-full bg-gray-100 text-sm outline-none"
            required />
          <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-1 cursor-pointer"
            @click="showPassword = !showPassword">
            <img v-if="showPassword" src="/icons/eye.svg" alt="">
            <img v-else src="/icons/eye-s.svg" alt="">
          </span>
        </div>
      </div>
      <!-- <div>
        <label for="password2" class="block text-sm font-medium mb-1">Confirm Password</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <i class="fa-solid fa-lock"></i>
          </span>
          <input :type="showPassword2 ? 'text' : 'password'" id="password2" placeholder="Confirm password"
            v-model="formData.confirmPassword"
            class="pl-12 pr-10 py-3 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
          <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-1 cursor-pointer"
            @click="showPassword2 = !showPassword2">
            <i :class="showPassword2 ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
          </span>
        </div>
      </div> -->
      <action-button type="submit" extra-class="w-full py-5">Sign Up</action-button>

      <div class="my-6 w-full text-center relative">
        <div class="absolute top-1/2 w-full border-t border-gray-300 transform -translate-y-1/2"></div>
        <span class="relative bg-white px-4 text-gray-500 text-sm font-medium">Or</span>
      </div>

      <!-- Social Login Buttons -->
      <social-login/>
    </form>

    <div class="flex justify-end items-center text-sm mt-10 mb-2 text-gray-400 font-bold">
      Already a member? <router-link to="/auth/login" class="text-[#5C58EB] font-bold ms-1">Login now</router-link>
    </div>


    <!-- Mail Verify -->
    <details-box :is-open="isOpenVerify" :show-close-btn="false" title="Enter your 6 digit code"
      message="Please check your email and enter your 6 digit code.">
      <div class="flex flex-col items-center w-full">

        <form @submit.prevent="handleVerify" class="space-y-6">
          <div class="w-full">
            <div class="grid grid-cols-6 gap-2 justify-center">
              <input v-for="(c, i) in code" :key="i" type="text" inputmode="numeric" maxlength="1"
                autocomplete="one-time-code"
                class="text-2xl text-center bg-gray-100 h-20 col-span-1 rounded-md focus:outline-none focus:border-blue-500"
                v-model="code[i]" @input="handleInput($event, i)" @paste="handlePaste"
                @keydown="handleKeydown($event, i)" :ref="'code' + i" />
            </div>
          </div>

          <action-button class="w-full py-4 btn-g font-semibold">Verify your account</action-button>
        </form>
        <div class="flex justify-end items-center text-sm mt-4">
          Don't get code?<span @click="handleResend"
            class="text-g hover:underline ms-1 cursor-pointer font-bold">Resend</span>
        </div>
      </div>
    </details-box>
  </div>
</template>

<script>
import DetailsBox from '@/components/DetailsBox.vue';
import SocialLogin from '@/components/SocialLogin.vue';

export default {
  name: "SignupPage",
  components: { DetailsBox, SocialLogin },
  data() {
    return {
      showPassword: false,
      showPassword2: false,

      isOpenVerify: false,
      code: Array(6).fill(""),
    };
  },
  mounted() {
    this.$store.commit('setFormData', {
      name: '',
      email: '',
      phone: '',
      role: 'user',
      password: '',
      confirmPassword: '',
    })
  },
  watch: {
    'formData.password'(newVal) {
      this.formData.confirmPassword = newVal; // assign password value to confirmPassword
    }
  },
  methods: {
    handleSubmit() {
      this.httpReq({
        callback: ({ verificationToken }) => {

          localStorage.setItem('resetPasswordToken', verificationToken);
          this.isOpenVerify = true;
        }
      });
    },


    handleVerify() {
      if (this.code.some(c => !c)) {
        this.error = "Please enter the full 6-digit code.";
        return;
      }

      const resetPasswordToken = localStorage.getItem('resetPasswordToken');
      if (!resetPasswordToken) {
        this.showToast('Reset token error', 'error');
        return;
      }

      const codeStr = this.code.join("");
      this.httpReq({
        customUrl: 'auth/verify-email',
        token: resetPasswordToken,
        data: {
          otp: codeStr,
        },
        callback: () => {
          this.isOpenVerify = false;
          this.code = "";

          this.$router.push('login');

          // remove the token
          localStorage.removeItem('resetPasswordToken');
        },
      });
    },
    handleInput(e, idx) {
      this.error = ""; // Clear any previous error
      const val = e.target.value.replace(/[^0-9]/g, "");
      if (!val) {
        this.code[idx] = "";
        return;
      }
      // If user pastes or types multiple digits, fill forward
      if (val.length > 1) {
        val.split('').forEach((char, i2) => {
          if (idx + i2 < 6) this.code[idx + i2] = char;
        });
        this.$nextTick(() => {
          const lastIdx = Math.min(idx + val.length - 1, 5);
          const lastInput = this.$refs[`code${lastIdx}`];
          if (lastInput && lastInput[0]) lastInput[0].focus();
        });
        return;
      }
      this.code[idx] = val;
      if (idx < 5) {
        this.$nextTick(() => {
          const nextInput = this.$refs[`code${idx + 1}`];
          if (nextInput && nextInput[0]) nextInput[0].focus();
        });
      }
    },
    handlePaste(e) {
      const paste = (e.clipboardData || window.clipboardData).getData('text');
      if (!paste) return;
      const chars = paste.replace(/[^0-9]/g, '').split('').slice(0, 6);
      chars.forEach((char, i) => {
        this.code[i] = char;
      });
      this.$nextTick(() => {
        const lastIdx = chars.length - 1;
        if (lastIdx >= 0 && this.$refs[`code${lastIdx}`] && this.$refs[`code${lastIdx}`][0]) {
          this.$refs[`code${lastIdx}`][0].focus();
        }
      });
      e.preventDefault();
    },
    handleKeydown(e, idx) {
      if (e.key === 'Backspace') {
        if (this.code[idx]) {
          this.code[idx] = "";
        } else if (idx > 0) {
          this.$nextTick(() => {
            const prevInput = this.$refs[`code${idx - 1}`];
            if (prevInput && prevInput[0]) prevInput[0].focus();
          });
        }
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        this.$nextTick(() => {
          const prevInput = this.$refs[`code${idx - 1}`];
          if (prevInput && prevInput[0]) prevInput[0].focus();
        });
      } else if (e.key === 'ArrowRight' && idx < 5) {
        this.$nextTick(() => {
          const nextInput = this.$refs[`code${idx + 1}`];
          if (nextInput && nextInput[0]) nextInput[0].focus();
        });
      }
    },
    handleResend() {
      const resetPasswordToken = localStorage.getItem('resetPasswordToken');
      if (!resetPasswordToken) {
        this.showToast('Reset token error', 'error');
        return;
      }

      this.httpReq({
        token: resetPasswordToken,
        customUrl: 'auth/resend-otp',
        data: {},
        callback: ({ verificationToken }) => {
          // reset the token
          localStorage.setItem('resetPasswordToken', verificationToken);
        },
      });
    },
  },
};
</script>

<style scoped>
.bg-gradient-to-r {
  background: linear-gradient(90deg, #43e9fe 0%, #a259ff 100%);
}

.shadow {
  box-shadow: 0 4px 16px rgba(162, 89, 255, 0.08);
}
</style>

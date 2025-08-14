<template>
  <div class="flex flex-col items-center w-full pt-8">
    <!-- Heading -->
    <h2 class="text-2xl font-bold mb-2 text-center">Welcome Back</h2>
    <p class="text-sm text-gray-500 mb-6 text-center">Enter your email &amp; password to login.</p>

    <!-- Toggle -->
    <div class="flex w-full max-w-md mb-6 gap-3 justify-center">
      <!-- Passenger -->
      <button :class="[
        'flex-1 py-4 rounded-full font-semibold shadow transition-all duration-300 transform hover:scale-105 hover:shadow-lg',
        userType === 'user'
          ? 'bg-g text-white hover:brightness-110'
          : 'bg-purple-200 text-purple-600 hover:bg-purple-300'
      ]" @click="userType = 'user'">
        Passenger
      </button>

      <!-- Driver -->
      <button :class="[
        'flex-1 py-4 rounded-full font-semibold shadow transition-all duration-300 transform hover:scale-105 hover:shadow-lg',
        userType === 'provider'
          ? 'bg-g text-white hover:brightness-110'
          : 'bg-purple-200 text-purple-600 hover:bg-purple-300'
      ]" @click="userType = 'provider'">
        Driver
      </button>
    </div>


    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-5">
      <div>
        <label for="email" class="block text-sm font-medium mb-1">Email</label>
        <div class="relative">
          <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
            <img src="/icons/email.svg" alt="">
          </span>
          <input type="email" id="email" placeholder="Enter your email" v-model="formData.email"
            class="pl-12 pr-4 py-5 w-full rounded-full bg-gray-100 text-sm outline-none" required />
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
      <div class="flex justify-end items-center mb-2">
        <a class="text-purple-400 font-bold hover:cursor-pointer" @click="isOpenForgotPass = true">
          Forgot password?
        </a>
      </div>
      <button type="submit" class="w-full py-4 btn-g font-semibold">Login</button>

      <div class="my-6 w-full text-center relative">
        <div class="absolute top-1/2 w-full border-t border-gray-300 transform -translate-y-1/2"></div>
        <span class="relative bg-white px-4 text-gray-500 text-sm font-medium">Or</span>
      </div>

      <!-- Social Login Buttons -->
      <div class="w-full grid grid-cols-2 gap-4">
        <button class="col-span-1 flex items-center justify-center bg-gray-100 py-4 rounded-full duration-300 transform hover:bg-gray-200">
          <img src="/icons/fb.svg" alt="">
        </button>
        <button class="col-span-1 flex items-center justify-center bg-gray-100 py-4 rounded-full duration-300 transform hover:bg-gray-200">
          <img src="/icons/google.svg" alt="">
        </button>
      </div>
    </form>

    <div class="flex justify-end items-center text-sm mt-10 mb-2">
      Not a member? <router-link to="/auth/signup" class="text-[#5C58EB] font-bold ms-1">Sign up now</router-link>
    </div>

    <details-box :is-open="isOpenForgotPass" :show-close-btn="false" title="Enter your 6 digit code"
      message="Please check your email and enter your 6 digit code.">
      <div class="flex flex-col items-center w-full">
        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="w-full max-w-md space-y-5">
          <div>
            <label for="email" class="block text-sm font-medium mb-1 text-start">Email</label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
                <img src="/icons/email.svg" alt="">
              </span>
              <input type="email" id="email" placeholder="Enter your email"
                class="pl-12 pr-4 py-4 w-full rounded-full bg-[#F3F3F3] text-sm outline-none" required />
            </div>
          </div>
          <button type="submit" @click="isOpenForgotPass = false; isOpenVerify = true"
            class="w-full py-4 btn-g font-semibold">Continue</button>
        </form>
      </div>
    </details-box>

    <details-box :is-open="isOpenVerify" :show-close-btn="false" title="Enter your 6 digit code"
      message="Please check your email and enter your 6 digit code.">
      <div class="flex flex-col items-center w-full">

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="w-full">
            <div class="grid grid-cols-6 gap-2 justify-center">
              <input v-for="(c, i) in code" :key="i" type="text" inputmode="numeric" maxlength="1"
                autocomplete="one-time-code"
                class="text-2xl text-center bg-gray-100 h-20 col-span-1 rounded-md focus:outline-none focus:border-blue-500"
                v-model="code[i]" @input="handleInput($event, i)" @paste="handlePaste"
                @keydown="handleKeydown($event, i)" :ref="'code' + i" />
            </div>
          </div>

          <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>

          <button type="submit" @click="isOpenVerify = false; isOpenReset = true"
            class="w-full py-4 btn-g font-semibold" :disabled="loading">
            <span v-if="loading" class="flex justify-center items-center">
              <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity- 75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            </span>
            <span v-else>Verify your account</span>
          </button>
        </form>
        <div class="flex justify-end items-center text-sm mt-4">
          Don't get code? <span class="text-g hover:underline ms-1 cursor-pointer font-bold">Resend</span>
        </div>
      </div>
    </details-box>

    <details-box :is-open="isOpenReset" :show-close-btn="false" title="Setup New Password"
      message="Enter your new password.">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="password" class="block text-sm font-medium mb-1 text-start">Password</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
              <img src="/icons/lock.svg" alt="">
            </span>
            <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Enter your password"
              class="pl-12 pr-10 py-5 w-full rounded-full bg-gray-100 text-sm outline-none" required />
            <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-1 cursor-pointer"
              @click="showPassword = !showPassword">
              <img v-if="showPassword" src="/icons/eye.svg" alt="">
              <img v-else src="/icons/eye-s.svg" alt="">
            </span>
          </div>
        </div>
        <div>
          <label for="password" class="block text-sm font-medium mb-1 text-start">Confirm Password</label>
          <div class="relative">
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-1">
              <img src="/icons/lock.svg" alt="">
            </span>
            <input :type="showPassword ? 'text' : 'password'" id="password" placeholder="Enter again your password"
              class="pl-12 pr-10 py-5 w-full rounded-full bg-gray-100 text-sm outline-none" required />
            <span class="absolute right-4 top-1/2 transform -translate-y-1/2 text-1 cursor-pointer"
              @click="showPassword = !showPassword">
              <img v-if="showPassword" src="/icons/eye.svg" alt="">
              <img v-else src="/icons/eye-s.svg" alt="">
            </span>
          </div>
        </div>
        <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
        <button type="submit" @click="isOpenReset = false" class="w-full py-4 btn-g font-semibold" :disabled="loading">
          <span v-if="loading"><i class="fa fa-spinner fa-spin mr-2"></i> Resetting...</span>
          <span v-else>Submit</span>
        </button>
      </form>
    </details-box>

  </div>
</template>

<script>
import DetailsBox from '@/components/DetailsBox.vue';

export default {
  name: "LoginPage",
  components: { DetailsBox },
  data() {
    return {
      userType: 'user',
      showPassword: false,
      isOpenForgotPass: false,
      isOpenVerify: false,
      isOpenReset: false,

      email: "", // Should be set from previous step or route param
      code: Array(6).fill(""),
      loading: false,
      error: "",

    };
  },
  methods: {
    handleSubmit() {
      // this.httpReq({
      // data: {
      //   email: this.email,
      //   password: this.password,
      // },
      // callback: ({token}) => {
      //   if(!token) return;
      //   localStorage.setItem('token', token);
      this.$router.replace(this.userType === 'user' ? '/' : '/d-home');
      // }
      // });
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

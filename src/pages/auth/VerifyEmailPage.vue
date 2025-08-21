<template>
  <div class="flex flex-col items-center w-full pt-8">
    <h1 class="text-4xl font-bold mb-2">Verify Email</h1>
    <p class="text-sm text-gray-600 mb-8"> Please check your email and enter the code</p>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div class="w-full">
        <div class="grid grid-cols-6 gap-4 justify-center">
          <input
            v-for="(c, i) in code"
            :key="i"
            type="text"
            inputmode="numeric"
            maxlength="1"
            autocomplete="one-time-code"
            class="text-2xl text-center bg-gray-200 h-14 w-12 rounded-md focus:outline-none focus:border-blue-500"
            v-model="code[i]"
            @input="handleInput($event, i)"
            @paste="handlePaste"
            @keydown="handleKeydown($event, i)"
            :ref="'code' + i"
          />
        </div>
      </div>

      <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>
      <action-button extra-class="w-full py-3">Verify</action-button>
    </form>
    <div class="flex justify-end items-center text-sm mt-10 mb-2">
      Don't get code? <span class="text-g hover:underline ms-1 cursor-pointer">Resend</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerifyEmailPage",
  data() {
    return {
      code: Array(6).fill(""),
      loading: false,
      error: "",
    };
  },
  methods: {
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
          const nextInput = this.$refs[`code${idx+1}`];
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
            const prevInput = this.$refs[`code${idx-1}`];
            if (prevInput && prevInput[0]) prevInput[0].focus();
          });
        }
      } else if (e.key === 'ArrowLeft' && idx > 0) {
        this.$nextTick(() => {
          const prevInput = this.$refs[`code${idx-1}`];
          if (prevInput && prevInput[0]) prevInput[0].focus();
        });
      } else if (e.key === 'ArrowRight' && idx < 5) {
        this.$nextTick(() => {
          const nextInput = this.$refs[`code${idx+1}`];
          if (nextInput && nextInput[0]) nextInput[0].focus();
        });
      }
    },
    handleSubmit() {
      if (this.code.some(c => !c)) {
        this.error = "Please enter the full 6-digit code.";
        return;
      }

      const resetPasswordToken = localStorage.getItem('resetPasswordToken');
      if(!resetPasswordToken) {
        this.showToast('Reset token error', 'error');
        return;
      }

      const codeStr = this.code.join("");
      this.httpReq({
        token: resetPasswordToken,
        data: {
          otp: codeStr,
        },
        callback: ({token}) => {
          if (token) {
            localStorage.setItem('resetToken', token);
            this.$router.push('/auth/reset-password');
          } else {
            this.$router.push('/auth/login');
          }
        },
        errorCallback: ({message}) => {
          this.error = message || "An error occurred.";
        }
      });
      
      // remove the token
      localStorage.removeItem('resetPasswordToken');
    },
  },
};
</script>

<style>
.loader {
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>

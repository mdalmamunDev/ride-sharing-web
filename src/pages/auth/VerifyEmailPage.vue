<template>
  <div>
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
            class="text-2xl text-center border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            v-model="code[i]"
            @input="handleInput($event, i)"
            @paste="handlePaste"
            @keydown="handleKeydown($event, i)"
            :ref="'code' + i"
          />
        </div>
      </div>

      <div v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</div>

      <button type="submit" class="w-full bg-[#5680C0] text-white py-3 rounded-md text-base font-medium hover:bg-blue-700 transition" :disabled="loading">
        <span v-if="loading" class="flex justify-center items-center">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </span>
        <span v-else>Verify</span>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "VerifyEmailPage",
  data() {
    return {
      email: "", // Should be set from previous step or route param
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
      this.loading = true;
      const codeStr = this.code.join("");
      this.httpReq({
        data: {
          email: this.email,
          code: codeStr,
        },
        callback: ({token}) => {
          this.loading = false;
          if (token) {
            localStorage.setItem('resetToken', token);
            this.$router.push('/auth/reset-password');
          } else {
            this.error = "Verification failed.";
          }
        },
        errorCallback: ({message}) => {
          this.loading = false;
          this.error = message || "An error occurred.";
        }
      });
    },
  },
  mounted() {
    // Try to get email from query param
    const emailFromQuery = this.$route.query.email;
    if (emailFromQuery) {
      this.email = emailFromQuery;
    }
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

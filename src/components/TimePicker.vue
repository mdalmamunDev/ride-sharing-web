<template>
  <div class="bg-white rounded-lg shadow-lg w-64 overflow-hidden">
    <!-- Header -->
    <div class="bg-blue-500 text-white p-4">
      <div class="flex items-center justify-center gap-4">
        <div class="text-4xl font-light text-center">
          <span 
            :class="['cursor-pointer', mode === 'hour' ? 'opacity-100' : 'opacity-60']"
            @click="switchMode('hour')"
          >
            {{ displayHour }}
          </span>
          <span class="mx-1">:</span>
          <span 
            :class="['cursor-pointer', mode === 'minute' ? 'opacity-100' : 'opacity-60']"
            @click="switchMode('minute')"
          >
            {{ displayMinute }}
          </span>
        </div>
        <div class="flex flex-col text-sm gap-1">
          <button 
            @click="setPeriod('AM')"
            :class="[
              'px-2 py-1 rounded transition-colors',
              period === 'AM' ? 'bg-blue-600' : 'bg-blue-500 opacity-60 hover:opacity-80'
            ]"
          >
            AM
          </button>
          <button 
            @click="setPeriod('PM')"
            :class="[
              'px-2 py-1 rounded transition-colors',
              period === 'PM' ? 'bg-blue-600' : 'bg-blue-500 opacity-60 hover:opacity-80'
            ]"
          >
            PM
          </button>
        </div>
      </div>
    </div>

    <!-- Clock Face -->
    <div class="p-4 bg-gray-50">
      <div 
        class="relative w-44 h-44 mx-auto cursor-pointer"
        @click="handleCircleClick"
      >
        <svg class="absolute inset-0 w-full h-full">
          <!-- Connection line -->
          <line
            :x1="centerRadius"
            :y1="centerRadius"
            :x2="lineEndX"
            :y2="lineEndY"
            stroke="#2196F3"
            stroke-width="2"
          />
          <!-- Center dot -->
          <circle :cx="centerRadius" :cy="centerRadius" r="4" fill="#2196F3" />
          <!-- End dot -->
          <circle :cx="lineEndX" :cy="lineEndY" r="16" fill="#2196F3" />
        </svg>

        <!-- Hour Numbers -->
        <template v-if="mode === 'hour'">
          <div
            v-for="(hour, index) in hours"
            :key="'hour-' + hour"
            @click.stop="handleNumberClick(hour)"
            :class="[
              'absolute text-sm w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors text-gray-700 hover:bg-gray-200',
              // display12Hour === hour ? 'text-white font-medium' : 'text-gray-700 hover:bg-gray-200'
            ]"
            :style="getNumberPosition(hour, index)"
          >
            {{ hour }}
          </div>
        </template>

        <!-- Minute Numbers -->
        <template v-else>
          <div
            v-for="(minute, index) in minutes"
            :key="'minute-' + minute"
            @click.stop="handleNumberClick(minute)"
            :class="[
              'absolute text-sm w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors',
              selectedMinute === minute ? 'text-white font-medium' : 'text-gray-700 hover:bg-gray-200'
            ]"
            :style="getNumberPosition(minute, index)"
          >
            {{ minute.toString().padStart(2, '0') }}
          </div>
        </template>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-4 p-4 bg-white">
      <button 
        @click="handleCancel"
        class="text-blue-500 font-medium px-4 py-2 hover:bg-blue-50 rounded transition-colors"
      >
        Cancel
      </button>
      <button 
        @click="handleOk"
        class="text-blue-500 font-medium px-4 py-2 hover:bg-blue-50 rounded transition-colors"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimePicker',
  props: {
    modelValue: {
      type: String,
      default: '14:30'
    }
  },
  emits: ['update:modelValue', 'cancel', 'confirm'],
  data() {
    return {
      selectedHour: 14,
      selectedMinute: 30,
      period: 'PM',
      mode: 'hour'
    };
  },
  computed: {
    display12Hour() {
      const hour = this.selectedHour % 12;
      return hour === 0 ? 12 : hour;
    },
    displayHour() {
      return this.display12Hour.toString().padStart(2, '0');
    },
    displayMinute() {
      return this.selectedMinute.toString().padStart(2, '0');
    },
    hours() {
      return Array.from({ length: 12 }, (_, i) => i + 1);
    },
    minutes() {
      return [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    },
    centerRadius() {
      return 85;
    },
    outerRadius() {
      return 70;
    },
    selectedAngle() {
      if (this.mode === 'hour') {
        return ((this.display12Hour % 12) * 30 - 90) * (Math.PI / 180);
      } else {
        return (this.selectedMinute * 6 - 90) * (Math.PI / 180);
      }
    },
    lineEndX() {
      return this.centerRadius + this.outerRadius * Math.cos(this.selectedAngle);
    },
    lineEndY() {
      return this.centerRadius + this.outerRadius * Math.sin(this.selectedAngle);
    },
    timeValue() {
      return `${this.selectedHour.toString().padStart(2, '0')}:${this.displayMinute}`;
    }
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          const [hour, minute] = newValue.split(':').map(Number);
          this.selectedHour = hour;
          this.selectedMinute = minute;
          this.period = hour >= 12 ? 'PM' : 'AM';
        }
      }
    }
  },
  methods: {
    getPositionOnCircle(index, total, radius) {
      const angle = (index * 360 / total - 90) * (Math.PI / 180);
      return {
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle)
      };
    },
    handleCircleClick(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const x = e.clientX - rect.left - centerX;
      const y = e.clientY - rect.top - centerY;
      
      let angle = Math.atan2(y, x) * (180 / Math.PI) + 90;
      if (angle < 0) angle += 360;

      if (this.mode === 'hour') {
        const hourIndex = Math.round(angle / 30) % 12;
        const hour12 = hourIndex === 0 ? 12 : hourIndex;
        this.selectedHour = this.convert12To24(hour12);
        setTimeout(() => this.mode = 'minute', 200);
      } else {
        const minuteIndex = Math.round(angle / 6) % 60;
        this.selectedMinute = minuteIndex;
      }
    },
    handleNumberClick(value) {
      if (this.mode === 'hour') {
        this.selectedHour = this.convert12To24(value);
        setTimeout(() => this.mode = 'minute', 200);
      } else {
        this.selectedMinute = value;
      }
    },
    convert12To24(hour12) {
      if (this.period === 'AM') {
        return hour12 === 12 ? 0 : hour12;
      } else {
        return hour12 === 12 ? 12 : hour12 + 12;
      }
    },
    setPeriod(newPeriod) {
      if (this.period !== newPeriod) {
        this.period = newPeriod;
        if (newPeriod === 'AM') {
          this.selectedHour = this.selectedHour >= 12 ? this.selectedHour - 12 : this.selectedHour;
        } else {
          this.selectedHour = this.selectedHour < 12 ? this.selectedHour + 12 : this.selectedHour;
        }
      }
    },
    switchMode(newMode) {
      this.mode = newMode;
    },
    getNumberPosition(value, index) {
      const pos = this.getPositionOnCircle(index, 12, this.outerRadius);
      return {
        left: `${this.centerRadius + pos.x - 16}px`,
        top: `${this.centerRadius + pos.y - 16}px`
      };
    },
    handleCancel() {
      this.$emit('cancel');
    },
    handleOk() {
      this.$emit('update:modelValue', this.timeValue);
      this.$emit('confirm', this.timeValue);
    }
  }
};
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
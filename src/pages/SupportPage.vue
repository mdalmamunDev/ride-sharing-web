<template>
  <div class="h-full overflow-y-scroll bg-no-repeat bg-left-bottom" style="
        background-image: url('images/bottm-left-circles.svg'), url('images/top-right-circles.svg');
        background-position: left bottom, right top;
        background-repeat: no-repeat, no-repeat;
     ">
    <support-comp class="max-w-2xl mx-auto sm:mt-10 p-6 bg-white rounded-lg"/>
  </div>
</template>

<script>
import SupportComp from '@/components/SupportComp.vue';

export default {
  name: "SupportPage",
  components: {SupportComp},
};
</script>
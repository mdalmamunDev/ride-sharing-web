<template>
  <div class="p-5 pt-14 h-screen">
    <UserDetails/>
    <div class="p-10"></div>
    <div class="p-5 pt-2 fixed bottom-0 left-0 w-full bg-white/30 backdrop-blur-md rounded-lg p-4 shadow-lg">
      <button @click="$router.push('/messages')" class="btn-g w-full">Chat</button>
    </div>
  </div>
</template>



<script>
import UserDetails from '@/components/UserDetails.vue';

export default {
  name: "MessagePage",
  components: {UserDetails},
  data() {
    return {
      //
    };
  },
  methods: {
    //
  },
};
</script>
<template>
  <div id="app">
    <!-- <SpeedInsights></SpeedInsights> -->
    <router-view />
    <!-- This renders matched component -->
  </div>
</template>

<script>
// import { SpeedInsights } from '@vercel/speed-insights/vue';
// import { io } from "socket.io-client";
export default {
  name: "App",
  components: {
    // SpeedInsights,
  },
  mounted() {
    // const socket = io(process.env.VUE_APP_SOCKET);

    // socket.on("connect", () => {
    //   console.log("Socket Connected:");
    //   // TODO: 
    //   socket.emit("user-connected", { userId: this.auth?.id, fcmToken: "TOKEN" });
    // });

  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>

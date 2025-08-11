<template>
  <div id="map" class="w-full h-full"></div>
</template>

<script>


export default {
  name: "MapComp",
  props: {
    locations: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: 'car'
    },
    authIcon: {
      type: String,
      default: 'user'
    },
  },
  data() {
    return {
      markers: {}, // store markers by customer ID
      map: null,
    };
  },
  mounted() {
    // Load Google Maps script dynamically
    if (!window.google) {
      const script = document.createElement("script");
      const key = process.env.VUE_APP_GOOGLE_API_KEY;
      console.log(key);
      
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
      script.async = true;
      window.initMap = this.initMap; // Bind Vue method
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  methods: {
    initMap() {
      this.map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16,
        center: { lat: 23.795519, lng: 90.3936814 }, // fallback center
        // Position all controls at bottom center (or bottom right/left)
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER,
        },

        mapTypeControl: true,
        mapTypeControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER,
        },

        scaleControl: false,
        scaleControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT,
        },

        streetViewControl: false,
        // streetViewControlOptions: {
        //   position: google.maps.ControlPosition.BOTTOM_CENTER,
        // },

        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_CENTER,
        },
      });

      this.getUserLocation();
      this.addMarker();
    },

    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            let userLatLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            userLatLng = { lat: 23.795519, lng: 90.3936814 };

            // Center map on user location
            this.map.setCenter(userLatLng);

            // Add or update user marker
            if (this.userMarker) {
              this.userMarker.setPosition(userLatLng);
            } else {
              this.userMarker = new google.maps.Marker({
                position: userLatLng,
                map: this.map,
                title: "You are here",
                icon: {
                  url: `/icons/map-${this.authIcon}.png`,
                  scaledSize: new google.maps.Size(50, 50),
                },
              });
            }
          },
          (error) => {
            console.error("Error getting location", error);
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    },
    addMarker() {
      this.locations.forEach((loc, index) => {
        const marker = new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map: this.map,
          title: loc.title,
          icon: {
            url: `/icons/map-${this.icon}.png`, // Flag icon
            scaledSize: new google.maps.Size(50, 50),
          },
          label: `${index + 1}`, // Numbered markers
        });

        // Optional: store markers for later reference
        this.markers[`loc-${index}`] = marker;

        // Optional: Info window on click
        const infoWindow = new google.maps.InfoWindow({
          content: `<strong>${loc.title}</strong>`,
        });
        marker.addListener("click", () => {
          infoWindow.open(this.map, marker);
        });
      });
    },
  },
};
</script>
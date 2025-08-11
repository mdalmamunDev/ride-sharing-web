<template>
  <div id="map" class="w-full h-full"></div>
</template>

<script>
export default {
  name: "MapComp",
  props: {
    locations: { type: Array, default: () => [] },
    icon: { type: String, default: "car" },
    authIcon: { type: String, default: "user" },
    settings: { type: Object, default: () => ({}) },
    destination: { // <-- NEW PROP
      type: Object, // { lat: Number, lng: Number }
      default: null
    }
  },
  data() {
    return {
      markers: {},
      map: null,
      userLatLng: null,
      directionsService: null,
      directionsRenderer: null
    };
  },
  mounted() {
    if (!window.google) {
      const script = document.createElement("script");
      const key = process.env.VUE_APP_GOOGLE_API_KEY;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`;
      script.async = true;
      window.initMap = this.initMap;
      document.head.appendChild(script);
    } else {
      this.initMap();
    }
  },
  methods: {
    initMap() {
      if (!google) return;

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
            position: google.maps.ControlPosition.BOTTOM_CENTER,
          },

          streetViewControl: false,
          // streetViewControlOptions: {
          //   position: google.maps.ControlPosition.BOTTOM_CENTER,
          // },

          fullscreenControl: true,
          fullscreenControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_CENTER,
          },
          
        ...this.settings
      });

      // Initialize Directions
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      });
      this.directionsRenderer.setMap(this.map);

      this.getUserLocation();
      this.addMarkers();
    },

    getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.userLatLng = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            // For testing you can force a fixed location
            this.userLatLng = { lat: 23.795519, lng: 90.3936814 }; // TODO: test mode

            this.map.setCenter(this.userLatLng);

            if (this.userMarker) {
              this.userMarker.setPosition(this.userLatLng);
            } else {
              this.userMarker = new google.maps.Marker({
                position: this.userLatLng,
                map: this.map,
                title: "You are here",
                icon: {
                  url: `/icons/map-${this.authIcon}.png`,
                  scaledSize: new google.maps.Size(50, 50)
                }
              });
            }

            // If destination is passed, show route
            if (this.destination) {
              this.showRoute(this.destination);
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

    addMarkers() {
      this.locations.forEach((loc, index) => {
        const marker = new google.maps.Marker({
          position: { lat: loc.lat, lng: loc.lng },
          map: this.map,
          title: loc.title,
          icon: {
            url: `/icons/map-${this.icon}.png`,
            scaledSize: new google.maps.Size(50, 50)
          },
          label: `${index + 1}`
        });

        this.markers[`loc-${index}`] = marker;

        const infoWindow = new google.maps.InfoWindow({
          content: `<strong>${loc.title}</strong>`
        });
        marker.addListener("click", () => {
          infoWindow.open(this.map, marker);
        });
      });
    },

    showRoute(destination) {
      if (!this.userLatLng) {
        console.error("User location not available yet.");
        return;
      }

      // Add live traffic layer to map
      const trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(this.map);

      this.directionsService.route(
        {
          origin: this.userLatLng,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true, // get multiple routes
          drivingOptions: {
            departureTime: new Date(), // now, for traffic conditions
            trafficModel: google.maps.TrafficModel.BEST_GUESS
          }
        },
        (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            let fastestRoute = response.routes[0];
            let minDuration = Infinity;

            response.routes.forEach(route => {
              const leg = route.legs[0];
              const duration = leg.duration_in_traffic
                ? leg.duration_in_traffic.value
                : leg.duration.value;
              if (duration < minDuration) {
                minDuration = duration;
                fastestRoute = route;
              }
            });

            // ✅ Suppress default A/B markers
            this.directionsRenderer.setOptions({ suppressMarkers: true });

            // ✅ Show only fastest route
            const filteredResponse = { ...response, routes: [fastestRoute] };
            this.directionsRenderer.setDirections(filteredResponse);

            const leg = fastestRoute.legs[0];

            // ✅ Custom End Marker
            this.updateMarker('destination', leg.end_location, `/icons/map-${this.icon}.png`);

            console.log(
              "Distance:", leg.distance.text,
              "Time (with traffic):",
              leg.duration_in_traffic
                ? leg.duration_in_traffic.text
                : leg.duration.text
            );
          } else {
            console.error("Directions request failed due to " + status);
          }
        }
      );
    },
    updateMarker(key, position, iconUrl) {
      if (this.markers[key]) {
        // Update existing marker position
        this.markers[key].setPosition(position);
      } else {
        // Create new marker and store it
        this.markers[key] = new google.maps.Marker({
          position,
          map: this.map,
          icon: {
            url: iconUrl,
            scaledSize: new google.maps.Size(40, 40),
          }
        });
      }
    },
  },
  watch: {
    destination(newDest) {
      if (newDest) {
        this.updateMarker('destination', newDest, `/icons/map-${this.icon}.png`);
      }
    }
  }
};
</script>

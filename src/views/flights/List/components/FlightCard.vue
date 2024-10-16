<template>
  <b-card v-if="offer" no-body class="border">
    <b-card-body class="p-4 pb-0">
      <b-row class="g-4">
        <b-col md="3">
          <img :src="flightLogo" class="w-80px mb-3" alt="" />
          <!-- Airline and Flight Information -->
          <h6 class="fw-normal mb-0">{{ getCarrierNameFromDictionary(offer.itineraries[0].segments[0].carrierCode) }}</h6>
          <h6 class="fw-normal mb-0">{{ getAircraftNameFromDictionary(offer.itineraries[0].segments[0].aircraft.code) }}</h6>
        </b-col>

        <b-col sm="4" md="3">
  <h4>{{ formatTime(offer.itineraries[0].segments[0].departure.at) }}</h4>
  <h6 class="mb-0">{{ formatDate(offer.itineraries[0].segments[0].departure.at) }}</h6>
  <p class="mb-0">{{ offer.itineraries[0].segments[0].departure.iataCode }} - Terminal {{ offer.itineraries[0].segments[0].departure.terminal }}</p>
  <p class="mb-0">{{ getLocationDetails(offer.itineraries[0].segments[0].departure.iataCode) }}</p> <!-- City and Country info -->
</b-col>

<b-col sm="4" md="3">
  <!-- Updated logic to show the last arrival details in case of transit -->
  <h4>{{ formatTime(lastArrival.at) }}</h4>
          <h6 class="mb-0">{{ formatDate(lastArrival.at) }}</h6>
          <p class="mb-0">{{ lastArrival.iataCode }} - Terminal {{ lastArrival.terminal || 'N/A' }}</p>
          <p class="mb-0">{{ getLocationDetails(lastArrival.iataCode) }}</p> <!-- City and Country info -->

</b-col>


        <b-col sm="4" md="3">
          <!-- Price Information -->
          <h4>{{ currency }} {{ offer.price.total }}</h4>
          <router-link :to="{ name: 'flights.details' }" class="btn btn-dark">Book Now</router-link>
          <b-button
            variant="link"
            v-b-modal.flightdetail
            class="btn btn-link text-decoration-underline p-0 mb-0"
            @click="openFlightDetails(offer)"
          >
            <BIconEyeFill class="ms-1 mb-1" />
            Flight Details
          </b-button>
        </b-col>
      </b-row>
    </b-card-body>

    <div class="card-footer p-4">
      <div class="bg-light p-2 rounded-2">
        <ul class="list-inline d-sm-flex justify-content-sm-between mb-0 mx-4">
          <li class="list-inline-item text-danger">Only {{ offer.numberOfBookableSeats }} Seats Left</li>
          <li class="list-inline-item">Total time: {{ formatDuration(offer.itineraries[0].duration) }}</li>
          <li class="list-inline-item text-success">Refundable</li>
        </ul>
      </div>
    </div>
    <FlightDetailModal :flight="selectedFlight" />
  </b-card>
</template>

<script lang="ts" setup>
import flightLogo from '@/assets/images/element/09.svg';
import { currency } from '@/helpers/constants';
import { BIconEyeFill } from 'bootstrap-icons-vue';
import { computed } from 'vue'; // Import the computed function
import { ref } from 'vue';
import FlightDetailModal from '@/views/flights/List/components/FlightDetailModal.vue';

// Props for flight data
const props = defineProps({
  offer: {
    type: Object,
    required: true
  },
  dictionaries: {
    type: Object,
    required: true
  }
});

// State to hold the selected flight data
const selectedFlight = ref(null);

// Function to handle flight details button click
const openFlightDetails = (flight: any) => {
  selectedFlight.value = flight;
  console.log("Selected Flight Data: ", selectedFlight.value);
};

// Utility function to get the carrier name
const getCarrierNameFromDictionary = (carrierCode: string) => {
  return props.dictionaries.carriers[carrierCode] || carrierCode;
};

const getAircraftNameFromDictionary = (aircraftCode: string) => {
  // Check if the aircraft code exists in the dictionaries and return the corresponding name
  if (props.dictionaries && props.dictionaries.aircraft) {
    return props.dictionaries.aircraft[aircraftCode] || 'Unknown Aircraft';
  }
  return 'Unknown Aircraft';  // Fallback if data is not available
};

// Function to get the location details (city and country) from dictionaries using the IATA code
const getLocationDetails = (iataCode: string) => {
  if (props.dictionaries && props.dictionaries.locations && props.dictionaries.locations[iataCode]) {
    const location = props.dictionaries.locations[iataCode];
    return `${location.cityCode}, ${location.countryCode}`; // e.g., "BKK, TH"
  }
  return 'Unknown Location';  // Fallback in case the location is not found
};


// Utility Functions
const formatTime = (datetime: string) => {
  const date = new Date(datetime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (datetime: string) => {
  const date = new Date(datetime);
  return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDuration = (duration: string) => {
  const hours = duration.match(/(\d+)H/);
  const minutes = duration.match(/(\d+)M/);
  return `${hours ? hours[1] + 'h' : ''} ${minutes ? minutes[1] + 'm' : ''}`;
};

// Computed property to get the last arrival details in case of transit
const lastArrival = computed(() => {
  const segments = props.offer.itineraries[0].segments;
  return segments.length > 1 ? segments[segments.length - 1].arrival : segments[0].arrival;
});
</script>
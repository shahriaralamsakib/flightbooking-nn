<template>
  <b-col md="6" xl="12">
    <b-card no-body class="border">
      <b-card-header class="border-bottom">
        <b-card-title tag="h5" class="mb-0">Your Booking</b-card-title>
      </b-card-header>

      <b-card-body>
        <small>
          <BIconTicket class="me-1" />
          Flight Ticket
        </small>
        <div v-for="(itinerary, itineraryIndex) in offer.itineraries" :key="itineraryIndex">
  <!-- Header for each itinerary: Outbound Flight / Return Flight -->
  <div class="d-flex mt-2">
    <img :src="element9" class="w-40px me-2" alt="" />
    <h6 class="fw-normal mb-0">
      {{ getCityName(itinerary.segments[0].departure.iataCode) }}
      <BIconArrowRight />
      {{ getCityName(itinerary.segments[itinerary.segments.length - 1].arrival.iataCode) }}
    </h6>
  </div>

  <!-- Flight details -->
  <ul class="nav nav-divider small text-body mt-1 mb-0">
    <li class="nav-item">{{ formatDate(itinerary.segments[0].departure.at) }}</li>
    <li class="nav-item">{{ result }}</li>
    <li class="nav-item">{{ formatDuration(itinerary.duration) }}</li>
  </ul>

  <!-- Add a separator between itineraries (if multiple itineraries) -->
  <hr v-if="itineraryIndex !== offer.itineraries.length - 1" class="my-4" />
</div>

        <hr />

        <small>
          <BIconPerson class="" />
          Traveler detail
        </small>
        <h6 class="mb-0 fw-normal mt-2">{{ travelerDetails.firstName }} {{ travelerDetails.lastName }}</h6>
        <ul class="nav nav-divider small text-body mt-1 mb-0">
          <li class="nav-item">Adult</li>
          <li class="nav-item">{{ genderdetail }}</li>
          <li class="nav-item">{{ travelerDetails.dateOfBirth }}</li>
        </ul>
      </b-card-body>

      <b-card-footer class="border-top text-center p-3">
        <a href="#" class="btn btn-link mb-0 p-0">Review booking</a>
      </b-card-footer>
    </b-card>
  </b-col>
</template>
<script setup lang="ts">
import { BIconTicket, BIconPerson, BIconArrowRight } from 'bootstrap-icons-vue'
import element9 from '@/assets/images/element/09.svg'
import { useRoute } from 'vue-router';
import airportData from '@/assets/airports.json'
import { computed } from 'vue';
import TravelerDetails from '@/views/flights/Details/components/TravelerDetails.vue';

// Get the route object to access query parameters
const route = useRoute();

// Log the entire route object to debug
console.log(route.query); // Check if 'dictionaries' exists in route.query

// Parse the `offer` and `dictionaries` objects from query parameters
const offer = route.query.offer ? JSON.parse(route.query.offer as string) : null;
const dictionaries = route.query.dictionaries ? JSON.parse(route.query.dictionaries as string) : null;
const travelerDetails = route.query.travelerDetails ? JSON.parse(route.query.travelerDetails as string) : null;

console.log("Booking Offer:", offer);
console.log("Booking Dictionaries:", dictionaries);
console.log("Booking travelerDetails:", travelerDetails);

const getAirportDataByIataCode = (iataCode: string) => {
  return airportData.find((airport) => airport.code === iataCode) || {}
}

// Retrieve City Name by IATA Code
const getCityName = (iataCode: string) => {
  const airport = getAirportDataByIataCode(iataCode)
  return (airport as { city: string }).city || 'Unknown City';

}

const formatTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDuration = (isoDuration: string) => {
  // Example ISO duration: "PT2H30M"
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?/);
  const hours = match?.[1] ? match[1].replace('H', 'hr ') : '';
  const minutes = match?.[2] ? match[2].replace('M', 'min') : '';
  return `${hours}${minutes}`;
};

const segmentCount = (offer: { itineraries: { segments: { length: number }[] }[] }) => {
  const segment = offer.itineraries[0].segments;

  if (segment.length === 1) {
    return 'Direct';
  } else if (segment.length === 2) {
    return '1 Stop';
  } else if (segment.length === 3) {
    return '2 Stops';
  } else {
    return `${segment.length - 1} Stops`; // Handles cases with more than 3 segments
  }
};

const gender = (title: string) => {
  if (title === 'mr'){
    return 'Male';
  }
  else {
    return "Female"
  }
};

const genderdetail = gender(travelerDetails.title);

console.log(genderdetail);

const result = segmentCount(offer);
console.log('result',result);

const lastArrival = computed(() => {
  const segments = offer.itineraries[0].segments;
  return segments.length > 1 ? segments[segments.length - 1].arrival : segments[0].arrival;
});
</script>

<template>
  <NavBar4 />

  <main>
    <section>
      <b-container class="position-relative" data-sticky-container>
        <b-row class="g-4">
          <b-col xl="9">
            <div class="vstack gap-4">
              <div class="d-flex align-items-center">
                <h1 class="display-4 mb-0">
                  <font-awesome-icon :icon="faPlane" class="rtl-flip" />
                </h1>
                <div class="ms-3">
                  <ul class="list-inline mb-2">
                    <li class="list-inline-item me-2">
                      <h3 class="mb-0">{{ getCityName(offer.itineraries[0].segments[0].departure.iataCode) }}</h3>
                    </li>
                    <li class="list-inline-item me-2">
                      <h3 class="mb-0">
                        <BIconArrowRight class="mb-1 mx-1" />
                      </h3>
                    </li>
                    <li class="list-inline-item me-0">
                      <h3 class="mb-0">{{ getCityName(lastArrival.iataCode) }}</h3>
                    </li>
                  </ul>
                  <ul class="nav nav-divider h6 fw-normal text-body mb-0">
                    <li class="nav-item">{{ formatTime(offer.itineraries[0].segments[0].departure.at) }}</li>
                    <li class="nav-item">{{ result }}</li>
                    <li class="nav-item">{{ formatDuration(offer.itineraries[0].duration) }}</li>
                  </ul>
                </div>
              </div>
              <BaggageFareRules />
              <Information />
              <TravelerDetails />
            </div>
          </b-col>

          <aside class="col-xl-3">
            <CustomStickyElement data-sticky data-margin-top="80" data-sticky-for="1199">
              <b-row class="g-4">
                <FareSummary />
                <OfferDiscount />
                <CancelPolicy />
              </b-row>
            </CustomStickyElement>
          </aside>
        </b-row>
      </b-container>
    </section>
  </main>

  <Footer />

  <BackToTop />
</template>

<script setup lang="ts">
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { BIconArrowRight } from 'bootstrap-icons-vue'

import NavBar4 from '@/views/flights/Details/components/NavBar4.vue'
import BaggageFareRules from '@/views/flights/Details/components/BaggageFareRules.vue'
import Information from '@/views/flights/Details/components/Information.vue'
import TravelerDetails from '@/views/flights/Details/components/TravelerDetails.vue'
import FareSummary from '@/views/flights/Details/components/FareSummary.vue'
import OfferDiscount from '@/views/flights/Details/components/OfferDiscount.vue'
import CancelPolicy from '@/views/flights/Details/components/CancelPolicy.vue'
import Footer from '@/views/flights/Details/components/Footer.vue'
import BackToTop from '@/components/BackToTop.vue'
import CustomStickyElement from '@/components/CustomStickyElement.vue'
import { useRoute } from 'vue-router';
import { computed } from 'vue'
import airportData from '@/assets/airports.json'

// Get the route object to access query parameters
const route = useRoute();

// Log the entire route object to debug
console.log(route.query); // Check if 'dictionaries' exists in route.query

// Parse the `offer` and `dictionaries` objects from query parameters
const offer = route.query.offer ? JSON.parse(route.query.offer as string) : null;
const dictionaries = route.query.dictionaries ? JSON.parse(route.query.dictionaries as string) : null;

console.log("Offer:", offer);
console.log("Dictionaries:", dictionaries);

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

const getLocationDetails = (iataCode: string) => {
  const location = dictionaries.locations[iataCode];
  return location ? `${location.cityCode}, ${location.countryCode}` : 'Unknown Location';
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

const result = segmentCount(offer);
console.log('result',result); // Output will be "1 Stop" based on the sampleOffer object


const lastArrival = computed(() => {
  const segments = offer.itineraries[0].segments;
  return segments.length > 1 ? segments[segments.length - 1].arrival : segments[0].arrival;
});

</script>

<template>
  <b-card no-body class="border w-100">
    <!-- Flight Summary Header -->
    <b-card-header class="d-sm-flex justify-content-sm-between align-items-center">
  <!-- Image and Text in the same row -->
  <div class="d-flex align-items-center">
    <img :src="`https://pics.avs.io/200/200/${offer.itineraries[0].segments[0].carrierCode}.png`" class="w-100px me-2" alt="Airline Logo" />
    <div>
      <!-- Carrier Name -->
      <h6 class="fw-normal mb-0">
        {{ getCarrierNameFromDictionary(offer.itineraries[0].segments[0].carrierCode) }}
      </h6>
      <!-- Aircraft Name -->
      <h6 class="fw-normal mb-0">
        {{ getAircraftNameFromDictionary(offer.itineraries[0].segments[0].aircraft.code) }}
      </h6>
    </div>
  </div>

  <!-- Travel Class -->
  <h6 class="fw-normal mb-0">
    <span class="text-body">Travel Class:</span> {{ offer.travelerPricings[0].fareDetailsBySegment[0].cabin }}
  </h6>
</b-card-header>


    <!-- Flight Summary Body -->
    <!-- <b-card-body class="p-4 pb-0">
      <b-row class="g-4">
        <b-col sm="4" md="3">
          <h4>{{ formatTime(offer.itineraries[0].segments[0].departure.at) }}</h4>
          <p class="mb-0">
            {{ offer.itineraries[0].segments[0].departure.iataCode }} - Terminal
            {{ offer.itineraries[0].segments[0].departure.terminal }}
            {{ getLocationDetails(offer.itineraries[0].segments[0].departure.iataCode) }}
          </p>
        </b-col>

        <b-col sm="4" md="3" class="my-sm-auto text-center">
          <h5>{{ formatDuration(offer.itineraries[0].duration) }}</h5>
          <div class="position-relative my-4">
            <hr class="bg-primary opacity-5 position-relative" />
            <div class="icon-md bg-primary text-white rounded-circle position-absolute top-50 start-50 translate-middle">
              <font-awesome-icon :icon="faPlane" class="fa-fw rtl-flip" />
            </div>
          </div>
        </b-col>

        <b-col sm="4" md="3">
          <h4>{{ formatTime(lastArrival.at) }}</h4>
          <p class="mb-0">
            {{ lastArrival.iataCode }} - Terminal
            {{ lastArrival.terminal || 'N/A' }}
            {{ getLocationDetails(lastArrival.iataCode) }}
          </p>
        </b-col>

        <b-col md="3" class="text-md-end">
          <h4>{{ currency }} {{ offer.price.total }}</h4>
          <router-link
            :to="{ name: 'flights.details', query: { offer: JSON.stringify(offer), dictionaries: JSON.stringify(dictionaries) } }"
            class="btn btn-dark mb-0 mb-sm-2"
          >
            Book Now
          </router-link>




        </b-col>
      </b-row>
    </b-card-body> -->

    <!-- Iterate over itineraries -->
<b-card-body class="p-4 pb-0" v-for="(itinerary, index) in offer.itineraries" :key="index">
  <!-- Display "Return Flight" heading before the second itinerary -->
  <!-- <template v-if="index === 1">
    <h4 class="text-center mt-4 mb-3">Return Flight</h4>
  </template> -->

  <b-row class="g-4">
    <!-- Departure Information -->
    <b-col sm="4" md="3">
      <h4>{{ itinerary.segments[0].departure.iataCode }}</h4>
      <h4>{{ formatTime(itinerary.segments[0].departure.at) }}</h4>
      <p class="mb-0">
        {{ itinerary.segments[0].departure.iataCode }} - Terminal
        {{ itinerary.segments[0].departure.terminal || 'N/A' }}<span><br></span>
        {{ getCityName(itinerary.segments[0].departure.iataCode) }},
        {{ getCountryName(itinerary.segments[0].departure.iataCode) }}
      </p>
    </b-col>

    <!-- Duration and Flight Icon -->
    <b-col sm="4" md="3" class="my-sm-auto text-center">
      <h5>{{ formatDuration(itinerary.duration) }}</h5>
      <div class="position-relative my-4">
        <hr class="bg-primary opacity-5 position-relative" />
        <div class="icon-md bg-primary text-white rounded-circle position-absolute top-50 start-50 translate-middle">
          <font-awesome-icon :icon="faPlane" class="fa-fw rtl-flip" />
        </div>
      </div>
    </b-col>

    <!-- Arrival Information -->
    <b-col sm="4" md="3">
      <h4>{{ itinerary.segments[itinerary.segments.length - 1].arrival.iataCode }}</h4>
      <h4>{{ formatTime(lastArrival.at) }}</h4>
      <p class="mb-0">
        {{ lastArrival.iataCode }} - Terminal
        {{ lastArrival.terminal || 'N/A' }} <span><br></span>
        {{ getCityName(lastArrival.iataCode) }},
        {{ getCountryName(lastArrival.iataCode) }}
      </p>
    </b-col>

    <!-- Price and Book Now Button -->
    <b-col md="3" class="text-md-end">
      <!-- Only show price and book button for the first itinerary card -->
      <template v-if="index === 0">
        <h4>{{ currency }} {{ offer.price.total }}</h4>
        <router-link
          :to="{ name: 'flights.details', query: { offer: JSON.stringify(offer), dictionaries: JSON.stringify(dictionaries) } }"
          class="btn btn-dark mb-0 mb-sm-2"
        >
          Book Now
        </router-link>
      </template>
    </b-col>
  </b-row>

  <!-- Divider between itineraries -->
  <h3 
  v-if="index < offer.itineraries.length - 1" 
  class="my-4 text-center py-2" 
  style="background-color: #f8f9fa; color: #333; border-radius: 4px;"
>
  Return Flight
</h3>

</b-card-body>


    <!-- Flight Details Toggle Button -->
    <div class="card-footer pt-4">
      <ul class="list-inline bg-light rounded-2 d-sm-flex text-center justify-content-sm-between mb-0 px-4 py-2">
      <li class="list-inline-item text-danger"> Only {{ offer.numberOfBookableSeats }} Seats Left</li>
      <li class="list-inline-item text-danger">Non-Refundable</li>
      <li class="list-inline-item">
        <button
          @click="showFlightDetails = !showFlightDetails"
          class="btn-more d-flex align-items-center collapsed p-0 mb-0"
          style="border: none; box-shadow: none;">
          Flight Detail
          <font-awesome-icon :icon="faAngleDown" class="ms-2" />
        </button>
      </li>
    </ul>


      <!-- Flight Detail Section (Tabs) -->
      <b-collapse :visible="showFlightDetails" class="multi-collapse">
        <div class="pt-3">
          <!-- Tabs -->
          <b-tabs nav-class="nav nav-pills nav-justified nav-responsive bg-primary bg-opacity-10 rounded p-2 mb-3">
            
            <!-- Flight Information Tab -->
            
            <!-- <b-tab title="Flight Information">
              <b-card no-body class="border">
                <b-card-body class="p-4">
                  <b-row class="g-4">

                    <b-col v-for="(segment, index) in offer.itineraries[0].segments" :key="index" sm="12">
                      <b-row class="g-4">
                        <b-col sm="4">
                          <h4>{{ segment.departure.iataCode }}</h4>
                          <h6 class="mb-0">{{ formatTime(segment.departure.at) }}</h6>
                          <p class="mb-0">{{ getLocationDetails(segment.departure.iataCode) }}</p>
                        </b-col>

                        <b-col sm="4" class="my-sm-auto text-center">
                          <h5>{{ formatDuration(segment.duration) }}</h5>
                          <div class="position-relative my-4">
                            <hr class="bg-primary opacity-5 position-relative" />
                            <div class="icon-md bg-primary text-white rounded-circle position-absolute top-50 start-50 translate-middle">
                              <font-awesome-icon :icon="faPlane" class="fa-fw rtl-flip" />
                            </div>
                          </div>
                        </b-col>

                        <b-col sm="4">
                          <h4>{{ segment.arrival.iataCode }}</h4>
                          <h6 class="mb-0">{{ formatTime(segment.arrival.at) }}</h6>
                          <p class="mb-0">{{ getLocationDetails(segment.arrival.iataCode) }}</p>
                        </b-col>
                      </b-row>

                      <div v-if="offer.itineraries[0].segments[index + 1]" class="bg-light text-center fw-normal rounded-2 mt-3 mb-4 p-2">
                            Change of planes: {{ calculateLayover(segment.arrival.at, offer.itineraries[0].segments[index + 1].departure.at) }} Layover in {{ getLocationDetails(offer.itineraries[0].segments[index + 1].departure.iataCode) }}
                      </div>
                      <hr class="my-4" />
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-card>
            </b-tab> -->

            <b-tab title="Flight Information">
  <b-card no-body class="border">
    <b-card-body class="p-4">
      <!-- Outbound Flight Details -->
      <b-row class="g-4">
        <!-- Outbound Flight Heading -->
        <b-col cols="12" class="bg-light text-center py-2 mb-3">
          <h5 class="mb-0">Outbound Flight</h5>
        </b-col>

        <!-- Loop through each outbound segment -->
        <b-col v-for="(segment, index) in offer.itineraries[0].segments" :key="'outbound-' + index" sm="12">
          <b-row class="g-4">
            <b-col sm="4">
              <h4>{{ segment.departure.iataCode }}</h4>
              <h6 class="mb-0">{{ formatTime(segment.departure.at) }}</h6>
              <p class="mb-0">{{ getLocationDetails(segment.departure.iataCode) }}</p>
            </b-col>

            <b-col sm="4" class="my-sm-auto text-center">
              <h5>{{ formatDuration(segment.duration) }}</h5>
              <div class="position-relative my-4">
                <hr class="bg-primary opacity-5 position-relative" />
                <div class="icon-md bg-primary text-white rounded-circle position-absolute top-50 start-50 translate-middle">
                  <font-awesome-icon :icon="faPlane" class="fa-fw rtl-flip" />
                </div>
              </div>
            </b-col>

            <b-col sm="4">
              <h4>{{ segment.arrival.iataCode }}</h4>
              <h6 class="mb-0">{{ formatTime(segment.arrival.at) }}</h6>
              <p class="mb-0">{{ getLocationDetails(segment.arrival.iataCode) }}</p>
            </b-col>
          </b-row>

          <!-- Display layover information if there's a next segment -->
          <div v-if="offer.itineraries[0].segments[index + 1]" class="bg-light text-center fw-normal rounded-2 mt-3 mb-4 p-2">
            Change of planes: {{ calculateLayover(segment.arrival.at, offer.itineraries[0].segments[index + 1].departure.at) }}
            Layover in {{ getLocationDetails(offer.itineraries[0].segments[index + 1].departure.iataCode) }}
          </div>

          <hr class="my-4" />
        </b-col>
      </b-row>

      <!-- Return Flight Details -->
      <b-row class="g-4 mt-4">
        <!-- Return Flight Heading -->
        <b-col v-if="offer.itineraries.length > 1" cols="12" class="bg-light text-center py-2 mb-3">
          <h5 class="mb-0">Return Flight</h5>
        </b-col>

        <!-- Loop through each return segment -->
        <b-col v-for="(segment, index) in offer.itineraries[1]?.segments" :key="'return-' + index" sm="12">
          <b-row class="g-4">
            <b-col sm="4">
              <h4>{{ segment.departure.iataCode }}</h4>
              <h6 class="mb-0">{{ formatTime(segment.departure.at) }}</h6>
              <p class="mb-0">{{ getLocationDetails(segment.departure.iataCode) }}</p>
            </b-col>

            <b-col sm="4" class="my-sm-auto text-center">
              <h5>{{ formatDuration(segment.duration) }}</h5>
              <div class="position-relative my-4">
                <hr class="bg-primary opacity-5 position-relative" />
                <div class="icon-md bg-primary text-white rounded-circle position-absolute top-50 start-50 translate-middle">
                  <font-awesome-icon :icon="faPlane" class="fa-fw rtl-flip" />
                </div>
              </div>
            </b-col>

            <b-col sm="4">
              <h4>{{ segment.arrival.iataCode }}</h4>
              <h6 class="mb-0">{{ formatTime(segment.arrival.at) }}</h6>
              <p class="mb-0">{{ getLocationDetails(segment.arrival.iataCode) }}</p>
            </b-col>
          </b-row>

          <!-- Display layover information if there's a next segment in the return itinerary -->
          <div v-if="offer.itineraries[1].segments[index + 1]" class="bg-light text-center fw-normal rounded-2 mt-3 mb-4 p-2">
            Change of planes: {{ calculateLayover(segment.arrival.at, offer.itineraries[1].segments[index + 1].departure.at) }}
            Layover in {{ getLocationDetails(offer.itineraries[1].segments[index + 1].departure.iataCode) }}
          </div>

          <hr class="my-4" />
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</b-tab>

            <!-- <b-tab title="Flight Information">
              <b-card no-body class="border">
                <b-card-body class="p-4">
                  <b-row class="g-4">
                    <b-col sm="4">
                      <h4>{{ offer.itineraries[0].segments[0].departure.iataCode }}</h4>
                      <h6 class="mb-0">{{ formatTime(offer.itineraries[0].segments[0].departure.at) }}</h6>
                      <p class="mb-0">{{ getLocationDetails(offer.itineraries[0].segments[0].departure.iataCode) }}</p>
                    </b-col>

                    <b-col sm="4" class="my-sm-auto text-center">
                      <h5>{{ formatDuration(offer.itineraries[0].duration) }}</h5>
                      <div class="position-relative my-4">
                        <hr class="bg-primary opacity-5 position-relative" />
                        <div class="icon-md bg-primary text-white rounded-circle position-absolute top-50 start-50 translate-middle">
                          <font-awesome-icon :icon="faPlane" class="fa-fw rtl-flip" />
                        </div>
                      </div>
                    </b-col>

                    <b-col sm="4">
                      <h4>{{ lastArrival.iataCode }}</h4>
                      <h6 class="mb-0">{{ formatTime(lastArrival.at) }}</h6>
                      <p class="mb-0">{{ getLocationDetails(lastArrival.iataCode) }}</p>
                    </b-col>
                  </b-row>
                </b-card-body>
              </b-card>
            </b-tab> -->

            <!-- Fare Detail Tab -->
            <b-tab title="Fare Detail">
              <b-card no-body>
                <div class="table-responsive-lg">
                  <table class="table caption-bottom mb-0">
                    <caption class="pb-0">*From The Date Of Departure</caption>
                    <thead class="table-dark">
                      <tr>
                        <th scope="col" class="border-0 rounded-start">Base Fare</th>
                        <th scope="col" class="border-0">Taxes and Fees</th>
                        <th scope="col" class="border-0 rounded-end">Total Fees</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{{ currency }} {{ offer.price.base }}</td>
                        <td>{{ currency }} {{ offer.price.totalTaxes }}</td>
                        <td><h5 class="mb-0">{{ currency }} {{ offer.price.total }}</h5></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-card>
            </b-tab>

            <!-- Baggage Rules Tab -->
            <b-tab title="Baggage Rules">
              <b-card no-body class="border">
                <b-card-body>
                  <div class="table-responsive-lg">
                    <table class="table caption-bottom mb-0">
                      <caption class="pb-0">*1PC = 23KG</caption>
                      <thead class="table-dark">
                        <tr>
                          <th scope="col" class="border-0 rounded-start">Baggage Type</th>
                          <th scope="col" class="border-0">Check In</th>
                          <th scope="col" class="border-0 rounded-end">Cabin</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(segment, index) in offer.travelerPricings[0].fareDetailsBySegment" :key="index">
                          <!-- Baggage Type: showing the class (e.g., 'S', 'U') -->
                          <td>{{ segment.class }}</td>

                          <!-- Check In: showing weight and weight unit (e.g., '30 KG') -->
                          <td>{{ segment.includedCheckedBags.weight }} {{ segment.includedCheckedBags.weightUnit }}</td>

                          <!-- Cabin: showing the cabin (e.g., 'ECONOMY') -->
                          <td>{{ segment.cabin }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card-body>
              </b-card>
            </b-tab>


            <!-- Cancellation Rules Tab -->
            <b-tab title="Cancellation Rules">
              <b-card no-body class="border">
                <b-card-body>
                  <div class="table-responsive-lg">
                    <table class="table caption-bottom mb-0">
                      <caption class="pb-0">*Cancellations Rules is not Found.</caption>
                      <thead class="table-dark">
                        <tr>
                          <th scope="col" class="border-0 rounded-start">Time Frame</th>
                          <th scope="col" class="border-0 rounded-end">Air Fee + Other Fees</th>
                        </tr>
                      </thead>
                      <tbody>
                        <!-- <tr v-for="(rule, index) in cancellationRules" :key="index">
                          <td>{{ rule.timeFrame }}</td>
                          <td v-if="rule.refundable === false">Non Refundable</td>
                          <td v-else>{{ currency }} {{ rule.airFee }} + {{ currency }} {{ rule.otherFee }}</td>
                        </tr> -->
                        <tr >
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-card-body>
              </b-card>
            </b-tab>


          </b-tabs>
        </div>
      </b-collapse>
    </div>
  </b-card>
</template>

<script lang="ts" setup>
import element12 from '@/assets/images/element/12.svg';
import { currency } from '@/helpers/constants';
import { faAngleDown, faPlane } from '@fortawesome/free-solid-svg-icons';
import { computed, defineProps, ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import airportData from '@/assets/airports.json'

// Define the props
const props = defineProps({
  offer: {
    type: Object,
    required: true,
  },
  dictionaries: {
    type: Object,
    required: true,
  },
});

// Local reactive state to hold offer and dictionaries data
const localOffer = ref({ ...props.offer });
const localDictionaries = ref({ ...props.dictionaries });
console.log('Initial Dictionaries:', localDictionaries.value);

const showFlightDetails = ref(false);

// Get the route and extract parameters if needed
const route = useRoute();

// Simulate fetching the offer object by ID and updating the local state
// onMounted(() => {
//   const offerId = route.params.offerId;
  
//   // Fetch the offer object based on the offerId
//   // This could be an API call or accessing a store
//   fetchOfferById(offerId).then((data) => {
//     // Update local refs instead of props
//     localOffer.value = data.offer;
//     localDictionaries.value = data.dictionaries;
//   });
// });

// // Mock function to simulate fetching an offer by ID
// const fetchOfferById = async (id: string) => {
//   // Replace this with actual data fetching logic
//   return {
//     offer: {
//       id,
//       itineraries: [{ segments: [{ arrival: '2023-10-02T18:00:00Z' }] }],
//     },
//     dictionaries: {
//       carriers: {
//       },
//       aircraft: {
//       },
//       locations: {
//       },
//     },
//   };
// };

// Utility functions to get data from dictionaries

const getAirportDataByIataCode = (iataCode: string) => {
  return airportData.find((airport) => airport.code === iataCode) || {}
}

// Retrieve City Name by IATA Code
const getCityName = (iataCode: string) => {
  const airport = getAirportDataByIataCode(iataCode) as { city: string };
  return airport.city || 'Unknown City'
}

// Retrieve Country Name by IATA Code
const getCountryName = (iataCode: string) => {
  const airport = getAirportDataByIataCode(iataCode) as { country: string };
  return airport.country || 'Unknown Country'
}

const getCarrierNameFromDictionary = (carrierCode: string) => {
  return localDictionaries.value.carriers[carrierCode] || carrierCode;
};

const getAircraftNameFromDictionary = (aircraftCode: string) => {
  return localDictionaries.value.aircraft[aircraftCode] || 'Unknown Aircraft';
};

const getLocationDetails = (iataCode: string) => {
  const location = localDictionaries.value.locations[iataCode];
  return location ? `${location.cityCode}, ${location.countryCode}` : 'Unknown Location';
};

// Utility functions for formatting
const formatTime = (datetime: string) => {
  const date = new Date(datetime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDuration = (duration: string) => {
  const hours = duration.match(/(\d+)H/);
  const minutes = duration.match(/(\d+)M/);
  return `${hours ? hours[1] + 'hr' : ''} ${minutes ? minutes[1] + 'min' : ''}`;
};

// Calculate layover time between flights
const calculateLayover = (arrivalTime: string, departureTime: string) => {
  const arrival = new Date(arrivalTime);
  const departure = new Date(departureTime);
  const diffInMilliseconds = departure.getTime() - arrival.getTime();

  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}hr ${minutes}min`;
};

// Computed property to get the last arrival time
const lastArrival = computed(() => {
  const segments = localOffer.value.itineraries[0].segments;
  return segments.length > 1 ? segments[segments.length - 1].arrival : segments[0].arrival;
});

// Watch for changes in the 'offer' prop and update local state accordingly
watch(
  () => props.offer,
  (newOffer) => {
    console.log('Offer updated:', newOffer);
    localOffer.value = { ...newOffer };
  }
);

// Watch for changes in the 'dictionaries' prop and update local state accordingly
watch(
  () => props.dictionaries,
  (newDictionaries) => {
    console.log('Dictionaries updated:', newDictionaries);
    localDictionaries.value = { ...newDictionaries };
  }
);

</script>

<!-- <script lang="ts" setup>
import element12 from '@/assets/images/element/12.svg';
import { currency } from '@/helpers/constants';
import { faAngleDown, faPlane } from '@fortawesome/free-solid-svg-icons';
import { computed, defineProps, ref, watch } from 'vue';

const props = defineProps({
  offer: {
    type: Object,
    required: true,
  },
  dictionaries: {
    type: Object,
    required: true,
  },
});

const showFlightDetails = ref(false);

import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { spacialOffers } from '../../Home/data';

const route = useRoute();
const offer = props.offer;
const dictionaries = props.dictionaries;

console.log('dictionaries:', offer);

onMounted(() => {
  const offerId = route.params.offerId;
  
  // Fetch the offer object based on the offerId
  // This could be an API call or accessing a store
  fetchOfferById(offerId).then(data => {
    offer.value = data;
    dictionaries.value = data;
  });
});

// Mock function to simulate fetching an offer by ID
const fetchOfferById = async (id) => {
  // Replace this with actual data fetching logic
  return {
    id,
  };
};

const getCarrierNameFromDictionary = (carrierCode: string) => {
  return props.dictionaries.carriers[carrierCode] || carrierCode;
};


const calculateLayover = (arrivalTime: string, departureTime: string) => {
  const arrival = new Date(arrivalTime);
  const departure = new Date(departureTime);
  const diffInMilliseconds = departure.getTime() - arrival.getTime();

  // Calculate hours and minutes
  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}hr ${minutes}min`;
};

const getAircraftNameFromDictionary = (aircraftCode: string) => {
  // Check if the aircraft code exists in the dictionaries and return the corresponding name
  if (props.dictionaries && props.dictionaries.aircraft) {
    return props.dictionaries.aircraft[aircraftCode] || 'Unknown Aircraft';
  }
  return 'Unknown Aircraft';  // Fallback if data is not available
};

const getLocationDetails = (iataCode: string) => {
  const location = props.dictionaries.locations[iataCode];
  return location ? `${location.cityCode}, ${location.countryCode}` : 'Unknown Location';
};

const formatTime = (datetime: string) => {
  const date = new Date(datetime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDuration = (duration: string) => {
  const hours = duration.match(/(\d+)H/);
  const minutes = duration.match(/(\d+)M/);
  return `${hours ? hours[1] + 'hr' : ''} ${minutes ? minutes[1] + 'min' : ''}`;
};

const lastArrival = computed(() => {
  const segments = props.offer.itineraries[0].segments;
  return segments.length > 1 ? segments[segments.length - 1].arrival : segments[0].arrival;
});

// Watch for changes in 'offer' prop
watch(
  () => props.offer,
  (newOffer, oldOffer) => {
    console.log('Offer updated:', newOffer);
    // Perform actions based on the updated offer
  }
);

// Watch for changes in 'dictionaries' prop
watch(
  () => props.dictionaries,
  (newDictionaries, oldDictionaries) => {
    console.log('Dictionaries updated:', newDictionaries);
    // Perform actions based on the updated dictionaries
  }
);

</script> -->

<style scoped>
.w-30px {
  width: 30px;
}
</style>
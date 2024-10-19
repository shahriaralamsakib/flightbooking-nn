<template>
  <b-card no-body class="border">
    <b-card-header class="d-flex justify-content-between pb-0">
      <h6 class="fw-normal mb-0"><span class="text-body">Travel Class:</span> {{ offer.travelerPricings[0].fareDetailsBySegment[0].cabin }}</h6>
      <a
        href="#"
        class="btn btn-link text-decoration-underline p-0 mb-0"
        @click="showModal = !showModal"
      >
        <BIconEyeFill class="mb-1" />
        Baggage & Fare Rules
      </a>
    </b-card-header>

    <!-- <div>
      <h1>Flight Details</h1>
      <pre>{{ offer }}</pre>
      <pre>{{ dictionaries.aircraft }}</pre>
    </div> -->

    <b-card-body class="p-4">
  <!-- Loop through each itinerary (outbound and return flights) -->
  <b-col v-for="(itinerary, itineraryIndex) in offer.itineraries" :key="itineraryIndex">
  
  <!-- Heading for Outbound and Return Flights -->
  <b-row>
    <b-col cols="12" class="bg-light text-center py-2 mb-3">
      <h5 class="mb-0">
        {{ itineraryIndex === 0 ? 'Outbound Flight' : 'Return Flight' }}
      </h5>
    </b-col>
  </b-row>

  <!-- Loop through each segment of the itinerary -->
  <b-row class="g-4" v-for="(segment, segmentIndex) in itinerary.segments" :key="segmentIndex">
    <b-col md="3">
      <img :src="`https://pics.avs.io/200/200/${segment.carrierCode}.png`" class="w-100px me-2" alt="Airline Logo" />
      <h6 class="fw-normal mb-0">{{ getCarrierNameFromDictionary(segment.carrierCode) }}</h6>
      <h6 class="fw-normal mb-0">{{ getAircraftNameFromDictionary(segment.aircraft.code) }} - {{ segment.number }}</h6>
    </b-col>

    <b-col sm="4" md="3">
      <h4>{{ segment.departure.iataCode }}</h4>
      <h6>{{ formatTime(segment.departure.at) }}</h6>
      <p class="mb-2">{{ formatDate(segment.departure.at) }}</p>
      <p class="mb-2">{{ getAirportName(segment.departure.iataCode) }}</p>
      <p class="mb-2">{{ getCityName(segment.departure.iataCode) }}</p>
      <p class="mb-2">{{ getCountryName(segment.departure.iataCode) }}</p>
      <p class="mb-0">Terminal - {{ segment.departure.terminal }}</p>
    </b-col>

    <b-col sm="4" md="3" class="text-center my-sm-auto">
      <h5>{{ formatDuration(segment.duration) }}</h5>
      <div class="position-relative my-4">
        <hr class="bg-primary opacity-5 position-relative" />
        <div class="icon-md bg-primary text-white rounded-circle position-absolute top-50 start-50 translate-middle">
          <font-awesome-icon :icon="faPlane" class="fa-fw rtl-flip" />
        </div>
      </div>
    </b-col>

    <b-col sm="4" md="3">
      <h4>{{ segment.arrival.iataCode }}</h4>
      <h6>{{ formatTime(segment.arrival.at) }}</h6>
      <p class="mb-2">{{ formatDate(segment.arrival.at) }}</p>
      <p class="mb-2">{{ getAirportName(segment.arrival.iataCode) }}</p>
      <p class="mb-2">{{ getCityName(segment.arrival.iataCode) }}</p>
      <p class="mb-2">{{ getCountryName(segment.arrival.iataCode) }}</p>
      <p class="mb-0">Terminal - {{ segment.arrival.terminal }}</p>
    </b-col>
    
    <!-- Show layover information if there's a next segment -->
    <div v-if="itinerary.segments[segmentIndex + 1]" class="bg-light rounded-2 text-center text-danger p-2 my-4">
      Change of planes: {{ calculateLayover(segment, itinerary.segments[segmentIndex + 1]) }} Layover
    </div>
  </b-row>

  <!-- Horizontal separator between itineraries -->
  <hr v-if="itineraryIndex !== offer.itineraries.length - 1" class="my-4" />
</b-col>
</b-card-body>


    <!-- <b-card-body class="p-4">
      <b-row class="g-4">
        <b-col md="3">
          <img :src="element9" class="w-80px mb-3" alt="" />
          <h6 class="fw-normal mb-0">Phillippines Airline</h6>
          <h6 class="fw-normal mb-0">PA - 5620</h6>
        </b-col>

        <b-col sm="4" md="3">
          <h4>BOM</h4>
          <h6>14:50</h6>
          <p class="mb-2">Sun, 29 Jan 2023</p>
          <p class="mb-2">Chhatrapati Shivaji International Airport</p>
          <p class="mb-0">Terminal - 2, Gate - 25</p>
        </b-col>

        <b-col sm="4" md="3" class="text-center my-sm-auto">
          <h5>9hr 50min</h5>
          <div class="position-relative my-4">
            <hr class="bg-primary opacity-5 position-relative" />
            <div
              class="icon-md bg-primary text-white rounded-circle position-absolute top-50 start-50 translate-middle"
            >
              <font-awesome-icon :icon="faPlane" class="fa-fw rtl-flip" />
            </div>
          </div>
        </b-col>

        <b-col sm="4" md="3">
          <h4>CDG</h4>
          <h6>11:50</h6>
          <p class="mb-2">Sun, 29 Jan 2023</p>
          <p class="mb-2">Ch. De Gaulle, Paris, France</p>
          <p class="mb-0">Terminal - 2E, Gate - 3</p>
        </b-col>
      </b-row>

      <div class="bg-light rounded-2 text-center text-danger p-2 my-4">
        Change of planes: 3h 15m Layover in France
      </div>

      <b-row class="g-4">
        <b-col md="3">
          <img :src="element9" class="w-80px mb-3" alt="" />
          <h6 class="fw-normal mb-0">Phillippines Airline</h6>
          <h6 class="fw-normal mb-0">PA-645</h6>
        </b-col>

        <b-col sm="4" md="3">
          <h4>CDG</h4>
          <h6>2:50</h6>
          <p class="mb-2">Sun, 30 Jan 2023</p>
          <p class="mb-2">Ch. De Gaulle, Paris, France</p>
          <p class="mb-0">Terminal - 2E, Gate - 3</p>
        </b-col>

        <b-col sm="4" md="3" class="text-center my-sm-auto">
          <h5>5hr 50min</h5>
          <div class="position-relative my-4">
            <hr class="bg-primary opacity-5 position-relative" />
            <div
              class="icon-md bg-primary text-white rounded-circle position-absolute top-50 start-50 translate-middle"
            >
              <font-awesome-icon :icon="faPlane" class="fa-fw rtl-flip" />
            </div>
          </div>
        </b-col>

        <b-col sm="4" md="3">
          <h4>JFK</h4>
          <h6>7:35</h6>
          <p class="mb-2">Sun, 30 Jan 2023</p>
          <p class="mb-2">John F Kennedy Intl-NY</p>
          <p class="mb-0">Terminal - 4, Gate - 08</p>
        </b-col>
      </b-row>
    </b-card-body> -->
  </b-card>

  <!-- Baggage and fare Modal -->
  <b-modal
    size="lg"
    class="fade"
    id="baggageFare"
    v-model="showModal"
    title="Baggage & Fare Rules"
    title-tag="h5"
    hide-footer
  >
    <div class="">
      <b-card no-body class="border">
        <b-card-header class="border-bottom">
          <b-card-title tag="h5" class="mb-0">
            <img :src="element9" class="h-80px" alt="" />
            BOM - CDG
          </b-card-title>
        </b-card-header>

        <b-card-body>
          <div class="table-responsive-lg">
            <table class="table table-bordered rounded caption-bottom overflow-hidden mb-0">
              <thead class="table-dark border-light">
                <tr>
                  <th scope="col">Baggage Type</th>
                  <th scope="col">Check In</th>
                  <th scope="col">Cabin</th>
                </tr>
              </thead>

              <tbody class="border-top-0">
                <tr>
                  <td>Adult</td>
                  <td>2 PC</td>
                  <td>7 Kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card-body>

        <b-card-footer class="d-flex justify-content-between align-items-center pt-0 px-sm-4">
          <span>*1PC = 23KG</span>
          <a href="#" class="btn btn-sm btn-primary-soft mb-0">Add luggage</a>
        </b-card-footer>
      </b-card>

      <div class="mt-4 px-2">
        <span class="badge bg-light text-success mb-2"
          ><i class="bi bi-star-fill me-2"></i>Travel Hack</span
        >
        <h5 class="mb-2">This itinerary includes a self-transfer</h5>
        <p class="mb-0">
          Please note, that it is the sole responsibility of the passenger to ensure his or her
          eligibility to enter the destination or transit countries (as applicable). We accept no
          liability in this regard. Please check the travel rules of all regulatory websites before
          to booking as well as commencing.
        </p>
      </div>
    </div>
  </b-modal>
</template>

<script setup lang="ts">
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import { BIconEyeFill } from 'bootstrap-icons-vue'
import element9 from '@/assets/images/element/09.svg'
import { ref } from 'vue'
import { useRoute } from 'vue-router';
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

const showModal = ref(false)

// Helper function to get airport data by IATA code
const getAirportDataByIataCode = (iataCode: string) => {
  return airportData.find((airport) => airport.code === iataCode) || {}
}

// Retrieve City Name by IATA Code
const getCityName = (iataCode: string): string => {
  const airport = getAirportDataByIataCode(iataCode) as { city: string };
  return airport.city || 'Unknown City';
};

// Retrieve Country Name by IATA Code
const getCountryName = (iataCode: string) => {
  const airport = getAirportDataByIataCode(iataCode) as { country: string };
  return airport.country || 'Unknown Country'
}

const getAirportName = (iataCode: string) => {
  const airport = getAirportDataByIataCode(iataCode) as { name: string };
  return airport.name || iataCode
}

// Helper Functions
// const getAirlineName = (carrierCode: string) => {
//   const airlineNames: { [key: string]: string } = {
//     BG: 'Bangladesh Biman Airlines',
//     PA: 'Philippines Airline',
//     // Add more airlines as needed
//   };
//   return airlineNames[carrierCode] || 'Unknown Airline';
// };

// const getAirlineLogo = (carrierCode: string) => {
//   return `https://path/to/logos/${carrierCode}.png`; // Use actual paths for airline logos
// };

// const getAirportName = (iataCode: string) => {
//   const airportNames: { [key: string]: string } = {
//     DAC: 'Hazrat Shahjalal International Airport',
//     BKK: 'Suvarnabhumi Airport',
//     // Add more airports as needed
//   };
//   return airportNames[iataCode] || iataCode;
// };

const getAircraftNameFromDictionary = (aircraftCode: string) => {
  // Check if the aircraft code exists in the dictionaries and return the corresponding name
  if (dictionaries && dictionaries.aircraft) {
    return dictionaries.aircraft[aircraftCode] || 'Unknown Aircraft';
  }
  return 'Unknown Aircraft';  // Fallback if data is not available
};

const getCarrierNameFromDictionary = (carrierCode: string) => {
  return dictionaries.carriers[carrierCode] || carrierCode;
};

const formatTime = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatDate = (dateTime: string) => {
  const date = new Date(dateTime);
  return date.toLocaleDateString([], { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDuration = (isoDuration: string): string => {
  // Example ISO duration: "PT2H30M"
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?/);

  if (!match) {
    // Handle case where there is no match (optional: return a default value)
    return 'Invalid duration';
  }

  const hours = match[1] ? match[1].replace('H', 'hr ') : '';
  const minutes = match[2] ? match[2].replace('M', 'min') : '';
  return `${hours}${minutes}`;
};


interface Segment {
  arrival: {
    at: string;  // Assuming this is a string representing a date
  };
  departure: {
    at: string;
  };
}

const calculateLayover = (currentSegment: Segment, nextSegment: Segment): string => {
  const arrivalTime = new Date(currentSegment.arrival.at);
  const departureTime = new Date(nextSegment.departure.at);
  
  // Calculate the difference in milliseconds
  const layoverDuration = departureTime.getTime() - arrivalTime.getTime();
  
  // Convert the duration to hours and minutes
  const hours = Math.floor(layoverDuration / (1000 * 60 * 60));
  const minutes = Math.floor((layoverDuration % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
};
</script>

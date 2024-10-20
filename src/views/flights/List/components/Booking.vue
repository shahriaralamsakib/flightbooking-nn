<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- <FlightListFilter :visible=true @updateFilters="handleUpdateFilters" /> -->
  <section class="pt-0">
    <b-container>
      <div
        class="rounded-3 p-3 p-sm-5"
        :style="{
          backgroundImage: `url(${bg01})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover'
        }"
      >
      <b-row>
          <b-col md="10" class="mx-auto text-center">
            <h1 class="text-dark display-3 pt-sm-5 my-5">Ready to take off?</h1>
          </b-col>
        </b-row>
      <b-row>
        <b-col cols="12">
          <b-form class="bg-mode border rounded position-relative px-4 pt-4 mb-4 mb-sm-0">
            <b-row class="g-4">
              <b-col cols="12">
                    <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
                      <strong>Warning!</strong> {{ errorMessage }}
                      <button type="button" class="btn-close" @click="errorMessage = null" aria-label="Close"></button>
                    </div>
                  </b-col>
              <b-col lg="6">
                <ul class="nav nav-pills nav-pills-dark" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link rounded-start rounded-0 mb-0"
                      :class="show && 'active'"
                      id="pills-one-way-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-one-way"
                      type="button"
                      role="tab"
                      aria-selected="true"
                      @click="show = true"
                    >
                      One Way
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link rounded-end rounded-0 mb-0"
                      :class="!show && 'active'"
                      id="pills-round-trip-tab"
                      data-bs-toggle="pill"
                      data-bs-target="#pills-round-trip"
                      type="button"
                      role="tab"
                      aria-selected="false"
                      @click="show = false"
                    >
                      Round Trip
                    </button>
                  </li>
                </ul>
              </b-col>

              <b-col lg="3" class="ms-auto">
                <div class="form-control-bg-light form-fs-md">
                  <SelectFormInput
                    id="class"
                    v-model="selectedClass"
                    :options="classOptions"
                    :choice-options="{ searchEnabled: true }"
                  />
                </div>
              </b-col>

              <b-col lg="3" class="ms-auto">
                <div class="form-control-bg-light form-fs-md">
                  <SelectFormInput
                    id="travelers"
                    v-model="selectedTravelers"
                    :options="travelerOptions"
                    :choice-options="{ searchEnabled: true }"
                  />
                </div>
              </b-col>
            </b-row>

            <div class="tab-content mt-4" id="pills-tabContent">
              <!-- One Way Form -->
              <div
                class="tab-pane fade"
                :class="show && 'show active'"
                id="pills-one-way"
                role="tabpanel"
                aria-labelledby="pills-one-way-tab"
              >
                <b-row class="g-4">
                  <b-col md="6" lg="4" class="position-relative">
                    <div class="form-border-transparent form-fs-lg bg-light rounded-3 h-100 p-3">
                      <label class="mb-1">
                        <BIconGeoAlt class="me-2" />
                        From
                      </label>
                      <SelectFormInput
                        id="location"
                        v-model="selectedDestination"
                        :options="destinationOptions"
                        :choice-options="{ searchEnabled: true }"
                        :max-options-visible="5"
                      />
                    </div>

                    <div class="btn-flip-icon mt-3 mt-md-0">
                      <button class="btn btn-white shadow btn-round mb-0">
                        <font-awesome-icon :icon="faRightLeft" />
                      </button>
                    </div>
                  </b-col>

                  <b-col md="6" lg="4">
                    <div class="form-border-transparent form-fs-lg bg-light rounded-3 h-100 p-3">
                      <label class="mb-1">
                        <BIconSend class="me-2" />
                        To
                      </label>
                      <SelectFormInput
                        id="location2"
                        v-model="selectedDestination2"
                        :options="destinationOptions"
                        :choice-options="{ searchEnabled: true }"
                      />
                    </div>
                  </b-col>

                  <b-col lg="4">
                    <div class="form-border-transparent form-fs-lg bg-light rounded-3 h-100 p-3">
                      <label class="mb-1">
                        <BIconCalendar class="me-2" />
                        Departure
                      </label>
                      <CustomFlatpicker
                        id="departureday"
                        placeholder="Select date"
                        v-model="departureDate"
                        :options="{ dateFormat: 'd M Y', defaultDate: '19 Nov 2022' }"
                      />
                    </div>
                  </b-col>

                  <b-col cols="12" class="text-end pt-0">
                    <button class="btn btn-primary mb-n4" @click="findTicket">
                      Find ticket
                      <BIconArrowRight class="ps-3 w-25" />
                    </button>
                  </b-col>
                </b-row>
              </div>

              <!-- Round Trip Form -->
              <div
                class="tab-pane fade"
                :class="!show && 'show active'"
                id=""
                role="tabpanel"
                aria-labelledby=""
              >
                <b-row class="g-4">
                  <b-col md="6" xl="3" class="position-relative">
                    <div class="form-border-transparent form-fs-lg bg-light rounded-3 h-100 p-3">
                      <label class="mb-1">
                        <BIconGeoAlt class="me-2" />
                        From
                      </label>
                      <SelectFormInput
                        id="location3"
                        v-model="selectedDestination3"
                        :options="destinationOptions"
                        :choice-options="{ searchEnabled: true }"
                      />
                    </div>

                    <div class="btn-flip-icon mt-3 mt-md-0">
                      <button class="btn btn-white shadow btn-round mb-0">
                        <font-awesome-icon :icon="faRightLeft" />
                      </button>
                    </div>
                  </b-col>

                  <b-col md="6" xl="3">
                    <div class="form-border-transparent form-fs-lg bg-light rounded-3 h-100 p-3">
                      <label class="mb-1">
                        <BIconSend class="me-2" />
                        To
                      </label>
                      <SelectFormInput
                        id="location4"
                        v-model="selectedDestination4"
                        :options="destinationOptions"
                        :choice-options="{ searchEnabled: true }"
                      />
                    </div>
                  </b-col>

                  <b-col md="6" xl="3">
                    <div class="form-border-transparent form-fs-lg bg-light rounded-3 h-100 p-3">
                      <label class="mb-1">
                        <BIconCalendar class="me-2" />
                        Departure
                      </label>
                      <CustomFlatpicker
                        id="departureDate"
                        placeholder="Select date"
                        v-model="departureDate"
                        :options="{ dateFormat: 'd M Y' }"
                      />
                    </div>
                  </b-col>

                  <b-col md="6" xl="3">
                    <div class="form-border-transparent form-fs-lg bg-light rounded-3 h-100 p-3">
                      <label class="mb-1">
                        <BIconCalendar class="me-2" />
                        Return
                      </label>
                      <CustomFlatpicker
                        id="returnDate"
                        placeholder="Select date"
                        v-model="returnDate"
                        :options="{ dateFormat: 'd M Y' }"
                      />
                    </div>
                  </b-col>

                  <b-col cols="12" class="text-end pt-0">
                    <button class="btn btn-primary mb-n4" @click="findTicket" :disabled="loading">
                      <span v-if="!loading">Find ticket</span>
                      <span v-else>Finding tickets...</span>
                      <BIconArrowRight class="ps-3 w-25" v-if="!loading" />
                    </button>
                  </b-col>
                  <!-- <b-col cols="12" class="text-end pt-0">
                    <button class="btn btn-primary mb-n4" @click="findTicket">
                      Find ticket
                      <BIconArrowRight class="ps-3 w-25" />
                    </button>
                  </b-col> -->
                </b-row>
              </div>
            </div>

             <!-- Preloader Section -->
             <!-- <b-col cols="12" class="text-center" v-if="loading">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </b-col> -->
          </b-form>
        </b-col>
      </b-row>
    </div>
    </b-container>
    <!-- Full-Screen Preloader -->
    <div v-if="loading" class="fullscreen-preloader">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  </section>
  <section class="pt-0">
    <b-container>
      <b-row style="display: flex;">
        <aside class="col-xl-4 col-xxl-3">
          <div class="d-none d-xl-block">
            <b-form class="rounded-3 shadow">
    <!-- Popular filters -->
    <b-card no-body class="card-body rounded-0 rounded-top p-4">
      <h6 class="mb-2">Stops</h6>
      <b-col cols="12">
        <div class="d-flex justify-content-between align-items-center">
          <b-form-radio v-model="isNonStop" :value="false">Multiple-Stop</b-form-radio>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <b-form-radio v-model="isNonStop" :value="true">Non-Stop</b-form-radio>
        </div>
      </b-col>
    </b-card>

    <hr class="my-0" />

    <!-- Price -->
    <b-card no-body class="card-body rounded-0 p-4">
      <h6 class="mb-2">Price</h6>
      <div class="position-relative">
        <div class="d-flex justify-content-between">
          <span>€ {{ priceRange[0] }}</span>
          <span>€{{ priceRange[1] }}</span>
        </div>
        <VueSlider
          v-model="priceRange"
          :min="0"
          :max="61000"
          :dotSize="19"
          :dotStyle="dotStyle"
          :processStyle="processStyle"
          :railStyle="railStyle"
          tooltip="none"
        />
      </div>
    </b-card>

    <!-- Preferred Airline -->
    <b-card no-body class="card-body rounded-0 p-4">
      <h6 class="mb-2">Preferred Airline</h6>
      <b-col cols="12">
        <div class="form-check" v-for="(airline, index) in preferredAirlines" :key="index">
          <input
            class="form-check-input"
            type="checkbox"
            :id="'airline-' + index"
            :value="airline.code"
            v-model="selectedAirlines"
          />
          <label class="form-check-label" :for="'airline-' + index">
            <img :src="airline.imgSrc" class="h-15px fa-fw me-2" alt="" />{{ airline.name }}
          </label>
        </div>
      </b-col>
    </b-card>

    <!-- Departure Time -->
    <!-- <b-card no-body class="card-body rounded-0 rounded-bottom p-4">
      <h6 class="mb-2">Departure Time</h6>
      <b-col cols="12">
        <div class="d-flex justify-content-between align-items-center">
          <b-form-checkbox v-model="departureTime[0]">00:00 - 06:00</b-form-checkbox>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <b-form-checkbox v-model="departureTime[1]">06:00 - 12:00</b-form-checkbox>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <b-form-checkbox v-model="departureTime[2]">12:00 - 18:00</b-form-checkbox>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <b-form-checkbox v-model="departureTime[3]">18:00 - 00:00</b-form-checkbox>
        </div>
      </b-col>
    </b-card> -->
  </b-form>

  <div class="d-flex justify-content-between p-2 p-xl-0 mt-xl-4">
    <b-button variant="link" class="p-0 mb-0" @click="clearFilters">Clear all</b-button>
    <b-button variant="primary" class="mb-0" @click="applyFilters">Filter Result</b-button>
  </div>
          </div>
        </aside>

        <b-col xl="8" xxl="9">
          <div class="vstack gap-4">
            <!-- Loop through paginated flight offers and pass to FlightCard component -->
            <!-- <FlightCard 
              v-for="(offer, index) in paginatedOffers" 
              :key="index" 
              :offer="offer" 
              :dictionaries="dictionaries"
            /> -->
            <FlightCard3
              v-for="(offer, index) in paginatedOffers" 
              :key="index" 
              :offer="offer" 
              :dictionaries="dictionaries" 
            />
            <Pagination 
              :currentPage="currentPage" 
              :totalOffers="flightOffers.length" 
              :pageSize="pageSize"
              @page-changed="changePage"
            />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import CustomFlatpicker from '@/components/CustomFlatpicker.vue'
import bg01 from '@/assets/images/bg/01.jpg'
import SelectFormInput from '@/components/SelectFormInput.vue'
import { dictionaries, flightOffers } from '@/stores/flightStore'
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
//, faAngleDown, faPlane
import { BIconArrowRight, BIconCalendar, BIconGeoAlt, BIconSend } from 'bootstrap-icons-vue'
import { ref, computed, onMounted } from 'vue'
// import FlightListFilter from '@/views/flights/List/components/FlightListFilter.vue';
// import FlightCard from '@/views/flights/List/components/FlightCard.vue';
import FlightCard3 from '@/views/flights/List/components/FlightCard3.vue';
// import FlightDetailModal from '@/views/flights/List/components/FlightDetailModal.vue';
import Pagination from '@/views/flights/List/components/Pagination.vue';
import VueSlider from 'vue-3-slider-component';
// import { currency } from '@/helpers/constants';
import { defineEmits } from 'vue';

const flightListSection = ref<HTMLElement | null>(null);

// Pagination logic
const currentPage = ref(1); // Current page
const pageSize = ref(5);    // Number of results per page
const paginatedOffers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  const end = start + pageSize.value;
  return flightOffers.value.slice(start, end);
});
const changePage = (newPage: number) => {
  currentPage.value = newPage;
};

// Boolean to toggle between one way and round trip
const show = ref(true);
const loading = ref(false);
const meta = ref({});

// Validation and error handling
const errorMessage = ref<string | null>(null);  // To store the error message
const validateForm = (): boolean => {
  errorMessage.value = null;  // Reset the error message

  const isOneWay = show.value;  // Determine if it's a one-way trip
  if (isOneWay) {
    if (!selectedDestination.value || !selectedDestination2.value || !departureDate.value || selectedDestination.value === 'select-location' || selectedDestination2.value === 'select-location') {
      errorMessage.value = 'Please fill all required fields for the one-way trip.';
      return false;
    }
    if (selectedDestination.value === selectedDestination2.value) {
      errorMessage.value = 'Departure and Destination Location cannot be the same for a one-way trip.';
      return false;
    }
  } else {
    if (!selectedDestination3.value || !selectedDestination4.value || !departureDate.value || !returnDate.value || selectedDestination3.value === 'select-location' || selectedDestination4.value === 'select-location') {
      errorMessage.value = 'Please fill all required fields for the round trip.';
      return false;
    }
    if (selectedDestination3.value === selectedDestination4.value) {
      errorMessage.value = 'Departure and Destination Location cannot be the same for a round trip.';
      return false;
    }
  }
  if (selectedClass.value === 'select-class' || selectedTravelers.value === 'select-travelers') {
    errorMessage.value = 'Please select a class and number of travelers.';
    return false;
  }
  return true;  // If all validations pass
};

// Form state

interface FormData {
  originLocationCode?: string;
  destinationLocationCode?: string;
  departureDate?: string;
  returnDate?: string;
  travelClass?: string;
  adults?: string;
  show?: boolean;
}


const fillFormWithData = (data: FormData) => {
  // Determine if it's a one-way or round-trip
  if (data.returnDate) {
    show.value = false; // Round Trip
  } else {
    show.value = true; // One Way
  }

  // Populate the form fields with provided data
  selectedDestination.value = data.originLocationCode || '';
  selectedDestination2.value = data.destinationLocationCode || '';
  departureDate.value = data.departureDate || '';
  returnDate.value = data.returnDate || ''; // Fill return date if it exists
  selectedClass.value = data.travelClass || '';
  selectedTravelers.value = data.adults || '';
};


const selectedDestination = ref('select-location');
const selectedDestination2 = ref('select-location');
const selectedDestination3 = ref('select-location');
const selectedDestination4 = ref('select-location');
const selectedClass = ref('select-class');
const selectedTravelers = ref('select-travelers');
const departureDate = ref();
const returnDate = ref();
interface Filters {
  originLocationCode?: string | null;
  destinationLocationCode?: string | null;
  departureDate?: string | null;
  travelClass?: string | null;
  adults?: number | null;
  max?: number | null;
  maxPrice?: number;  // New field
  nonStop?: boolean;  // New field
  includedAirlineCodes?: string[];  // New field
}

const filterData = ref<Filters | null>(null);



// Filter variables
const priceRange = ref([0,  61000]);  // Price range (min, max)
const isNonStop = ref(false);  // Stops selection
const selectedAirlines = ref([]);  // Selected airlines
// const departureTime = ref([false, false, false, false]);  // Departure times

// Function to clear all filters
const clearFilters = () => {
  priceRange.value = [0, 61000];
  isNonStop.value = (false);
  selectedAirlines.value = [];
  // departureTime.value = [false, false, false, false];
};
const emit = defineEmits(['updateFilters']);
// Filter emit function
const applyFilters = async () => {
  const filterValues = {
    maxPrice: priceRange.value[1],
    nonStop: isNonStop.value,
    includedAirlineCodes: selectedAirlines.value,
    // departureTime: departureTime.value,
  };

  // Store the applied filters in the filterData object
  filterData.value = filterValues;

  emit('updateFilters', filterValues); // Emit filters if needed
  console.log('Applied Filters:', filterValues);

  // Hit the API again after applying filters
  await findTicket();  // Call findTicket to apply filters and refetch flight offers
};


// Utility function to format date as YYYY-MM-DD
const formatDate = (dateString: string): string | null => {
  if (!dateString) return null
  const date = new Date(dateString)
  return date.toISOString().split('T')[0]  // Format as 'YYYY-MM-DD'
}

const toQueryString = (params: Record<string, string | null | undefined>): string => {
  return Object.keys(params)
    .filter(key => params[key] !== null && params[key] !== undefined)  // Only include non-null parameters
    .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key] as string))
    .join('&')
}

// Airline data
const preferredAirlines = ref([
  { name: 'Air India', code: 'AI', imgSrc: 'path/to/image1.svg' },
  { name: 'Malaysia Airlines', code: 'MH', imgSrc: 'path/to/image2.svg' },
  { name: 'Qatar Airways', code: 'QR', imgSrc: 'path/to/image3.svg' },
  { name: 'Singapore Airlines', code: 'SQ', imgSrc: 'path/to/image4.svg' },
  { name: 'SriLankan Airlines', code: 'UL', imgSrc: 'path/to/image5.svg' },
  { name: 'Thai Airways', code: 'TG', imgSrc: 'path/to/image6.svg' },
]);

// Custom styles for the slider
const dotStyle = { backgroundColor: '#5143d9', border: '5px solid #fff', boxShadow: '0px 0px 0px 1px #5143d9' };
const processStyle = { backgroundColor: '#5143d9' };
const railStyle = { backgroundColor: 'rgb(81, 67, 217, 0.1)' };

const getAccessToken = async (): Promise<string | null> => {
  const tokenApiUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';  // Replace with actual token endpoint

  // Prepare the body parameters for x-www-form-urlencoded format
  const bodyParams = new URLSearchParams();
  bodyParams.append('client_id', '7KOXHS8i358cGsv51Yfi988X4B3s0LyI');   // Replace with actual client_id
  bodyParams.append('client_secret', '3PlUEXSEGV8Wiy7E');             // Replace with actual client_secret
  bodyParams.append('grant_type', 'client_credentials');                // Ensure this is correct

  try {
    // Fetch access token
    const tokenResponse = await fetch(tokenApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: bodyParams.toString()  // Send the parameters as x-www-form-urlencoded body
    });

    // Check if the response is successful
    if (!tokenResponse.ok) {
      throw new Error(`Token API error! Status: ${tokenResponse.status}`);
    }

    // Parse the response JSON
    const tokenData = await tokenResponse.json();

    // Return the access token from the response
    return tokenData.access_token || null;
  } catch (error) {
    console.error('Error fetching access token:', error);
    return null;
  }
};

const findTicket = async (incomingData?: FormData) => {

  if (incomingData) {
    fillFormWithData(incomingData);
  }
  console.log(incomingData);

  // if (!validateForm()) return;
  loading.value = true;

  const accessToken = await getAccessToken();
  if (!accessToken) {
    console.error('No access token available.');
    loading.value = false;
    return;
  }

  const formData: Record<string, string | null> = {
    originLocationCode: show.value ? selectedDestination.value : selectedDestination3.value,
    destinationLocationCode: show.value ? selectedDestination2.value : selectedDestination4.value,
    departureDate: formatDate(departureDate.value),
    travelClass: selectedClass.value,
    adults: selectedTravelers.value ? String(selectedTravelers.value) : null,
    max: String(250), // Default max value or any number
  };

  // Include return date for round trip
  if (!show.value && returnDate.value) {
    formData.returnDate = formatDate(returnDate.value);
  }

  // If filters are applied, add filter-related data
  if (filterData.value) {
    if (filterData.value.maxPrice) {
      formData.maxPrice = String(filterData.value.maxPrice);  // Include max price
    }
    if (filterData.value.nonStop) {
      formData.nonStop = String(filterData.value.nonStop);  // Include max price
    }
    if (filterData.value?.includedAirlineCodes && filterData.value.includedAirlineCodes.length > 0) {
      formData.includedAirlineCodes = filterData.value.includedAirlineCodes.join(',');  // Include selected airline codes
    }
  }

  const queryString = toQueryString(formData);
  const apiEndpoint = 'https://test.api.amadeus.com/v2/shopping/flight-offers';
  const fullUrl = `${apiEndpoint}?${queryString}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);

    // Update offers and metadata
    flightOffers.value = data.data || [];
    dictionaries.value = data.dictionaries || {};
    meta.value = data.meta || {};

    if (flightListSection.value) {
      flightListSection.value.scrollIntoView({ behavior: 'smooth' });
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
};



const destinationOptions = [
{ value: 'select-class', text: 'Select Location' },
{ value: 'DAC', text: 'Dhaka, Bangladesh' },
{ value: 'SYD', text: 'Sydney, Australia' },
{ value: 'BKK', text: 'Bangkok, Thailand' },
{ value: 'NYC', text: 'New York City, USA' },
{ value: 'LON', text: 'London, United Kingdom' },
{ value: 'PAR', text: 'Paris, France' },
{ value: 'TYO', text: 'Tokyo, Japan' },
{ value: 'SIN', text: 'Singapore, Singapore' },
{ value: 'DXB', text: 'Dubai, UAE' },
{ value: 'LAX', text: 'Los Angeles, USA' },
{ value: 'BER', text: 'Berlin, Germany' },
{ value: 'ROM', text: 'Rome, Italy' },
{ value: 'TOR', text: 'Toronto, Canada' },
{ value: 'AMS', text: 'Amsterdam, Netherlands' },
{ value: 'HKG', text: 'Hong Kong, China' },
{ value: 'IST', text: 'Istanbul, Turkey' },
{ value: 'MOW', text: 'Moscow, Russia' },
{ value: 'MEX', text: 'Mexico City, Mexico' },
{ value: 'BCN', text: 'Barcelona, Spain' },
{ value: 'SFO', text: 'San Francisco, USA' },
{ value: 'MUC', text: 'Munich, Germany' },
{ value: 'JNB', text: 'Johannesburg, South Africa' },
{ value: 'BOM', text: 'Mumbai, India' },
{ value: 'BUE', text: 'Buenos Aires, Argentina' },
{ value: 'GRU', text: 'São Paulo, Brazil' },
{ value: 'LIS', text: 'Lisbon, Portugal' },
{ value: 'FCO', text: 'Rome, Italy' },
{ value: 'CAI', text: 'Cairo, Egypt' },
{ value: 'KUL', text: 'Kuala Lumpur, Malaysia' },
{ value: 'ZRH', text: 'Zurich, Switzerland' },
{ value: 'BOS', text: 'Boston, USA' },
{ value: 'MNL', text: 'Manila, Philippines' },
{ value: 'VIE', text: 'Vienna, Austria' },
{ value: 'ICN', text: 'Seoul, South Korea' },
{ value: 'ATH', text: 'Athens, Greece' },
{ value: 'CPT', text: 'Cape Town, South Africa' },
{ value: 'SHA', text: 'Shanghai, China' },
{ value: 'YVR', text: 'Vancouver, Canada' },
{ value: 'OSL', text: 'Oslo, Norway' },
{ value: 'DEL', text: 'Delhi, India' },
{ value: 'DUB', text: 'Dublin, Ireland' },
{ value: 'MEL', text: 'Melbourne, Australia' },
{ value: 'MAD', text: 'Madrid, Spain' },
{ value: 'CPH', text: 'Copenhagen, Denmark' },
{ value: 'SVO', text: 'Moscow, Russia' },
{ value: 'HEL', text: 'Helsinki, Finland' },
{ value: 'ARN', text: 'Stockholm, Sweden' },
{ value: 'DOH', text: 'Doha, Qatar' },
{ value: 'BNE', text: 'Brisbane, Australia' },
{ value: 'PRG', text: 'Prague, Czech Republic' }

]

const classOptions = [
  { value: 'select-class', text: 'Select Class' },
  { value: 'ECONOMY', text: 'Economy' },
  { value: 'PREMIUM_ECONOMY', text: 'Premium Economy' },
  { value: 'BUSINESS', text: 'Business' },
  { value: 'FIRST', text: 'First Class' }
]

const travelerOptions = [
  { value: 'select-travelers', text: 'Select Travelers' },
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '4', text: '4' }
]

import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
  const {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    travelClass,
    adults,
  } = route.query;

  // Helper function to get the first string if the value is an array
  const getQueryParam = (param: any) => {
    return Array.isArray(param) ? param[0] : param;
  };

  // Extract parameters and ensure they are strings
  const origin = getQueryParam(originLocationCode);
  const destination = getQueryParam(destinationLocationCode);
  const departure = getQueryParam(departureDate);
  const travelClassVal = getQueryParam(travelClass);
  const adultsCount = getQueryParam(adults);

  // Check if all required fields are present and valid
  if (
    origin &&
    destination &&
    departure &&
    travelClassVal &&
    adultsCount !== null // Ensure adults is checked against null
  ) {
    // Create a formData object
    const formData = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate: departure,
      travelClass: travelClassVal,
      adults: adultsCount,
    };

    console.log(formData); // Check the formData object
    findTicket(formData); // Call findTicket with the formData
  } else {
    console.log("Required parameters are missing");
  }
});




</script>

<style scoped>
/* Full-screen preloader styling */
.fullscreen-preloader {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* 40% opacity */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;  /* Make sure it's on top */
}

/* Spinner size */
.spinner-border {
  width: 4rem;
  height: 4rem;
}
</style>



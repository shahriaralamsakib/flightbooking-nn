<template>
  <AgentLayout>
    <section class="pt-0">
      <!-- Alert message -->
      <div 
    v-if="alertMessage" 
    :class="['alert', alertClass, { 'slide-down-alert': true, active: alertActive }]" 
    role="alert"
  >
    {{ alertMessage }}
  </div>
      <b-container class="vstack gap-4">
        <b-row>
          <b-col cols="12">
            <h1 class="fs-4 mb-0 items-center gap-1">
              <BIconBookmarkHeart class="fa-fw" />
              Flight Bookings
            </h1>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-card no-body class="border">
              <b-card-header class="border-bottom">
                <h5 class="card-header-title">
                  Bookings<span class="badge bg-primary bg-opacity-10 text-primary ms-2"></span>
                </h5>
              </b-card-header>
              <b-card-body class="pb-0">
                <b-row class="g-3 align-items-center justify-content-between mb-3">
                  <b-col md="8">
                    <b-form class="rounded position-relative">
                      <b-form-input
                        class="pe-5"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                      />
                      <button
                        class="btn border-0 px-3 py-0 position-absolute top-50 end-0 translate-middle-y"
                        type="submit"
                      >
                        <font-awesome-icon :icon="faSearch" />
                      </button>
                    </b-form>
                  </b-col>
                  <!-- <b-col md="3">
                    <b-form>
                      <SelectFormInput
                        id="sort-by"
                        v-model="selectedOption"
                        :options="sortOptions"
                        :choice-options="{ searchEnabled: false }"
                        @change="fetchUserData"
                      />
                    </b-form>
                  </b-col> -->
                </b-row>
                <div class="table-responsive border-0">
                  <table class="table align-middle p-4 mb-0 table-hover table-shrink">
                    <thead class="table-light">
                      <tr>
                        <th scope="col" class="border-0 rounded-start">Reference ID</th>
                        <th scope="col" class="border-0">Name</th>
                        <th scope="col" class="border-0">Date</th>
                        <th scope="col" class="border-0">Status</th>
                        <th scope="col" class="border-0 rounded-end">Action</th>
                      </tr>
                    </thead>
                    <tbody class="border-top-0">
                      <tr v-for="(booking, idx) in bookings" :key="idx">
                        <td>
                          <h6 class="mb-0">{{ booking.id }}</h6>
                        </td>
                        <td>
                          <h6 class="mb-0">
                            <router-link to="">{{ booking.firstname }} {{ booking.lastname }}</router-link>
                          </h6>
                        </td>
                        <td>{{ formatDate(booking.timespan) }}</td>
                        <td>
                          <!-- <select
                            v-model="booking.status"
                            :class="[
                              'form-select',
                              'form-select-sm',
                              'badge',
                              booking.status === 'pending'
                                ? 'bg-warning text-dark'
                                : booking.status === 'confirmed'
                                  ? 'bg-success text-light'
                                  : 'bg-danger text-light'
                            ]"
                            @change="updateStatus(booking)"
                            class="custom-select"
                            aria-label="Booking status"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select> -->
                          <select
                            v-model="booking.status"
                            :class="[
                              'form-select',
                              'form-select-sm',
                              'custom-select',
                              {
                                'bg-warning text-dark': booking.status === 'pending',
                                'bg-success text-light': booking.status === 'confirmed',
                                'bg-danger text-light': booking.status === 'cancelled'
                              }
                            ]"
                            @change="updateStatus(booking)"
                            aria-label="Booking status"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <button class="btn btn-sm btn-light mb-0" @click="showFlightDetails(booking.flightdetails)">
                            View
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </b-card-body>
              <b-card-footer class="pt-0">
                <!-- <div class="d-sm-flex justify-content-sm-between align-items-sm-center">
                  <p class="mb-sm-0 text-center text-sm-start">Showing 1 to 8 of 20 entries</p>
                  <nav class="mb-sm-0 d-flex justify-content-center" aria-label="navigation">
                    <ul class="pagination pagination-sm pagination-primary-soft mb-0">
                      <li class="page-item disabled">
                        <router-link class="page-link" to="#" tabindex="-1">Prev</router-link>
                      </li>
                      <li class="page-item">
                        <router-link class="page-link" to="#">1</router-link>
                      </li>
                      <li class="page-item active">
                        <router-link class="page-link" to="#">2</router-link>
                      </li>
                      <li class="page-item disabled">
                        <router-link class="page-link" to="#">..</router-link>
                      </li>
                      <li class="page-item">
                        <router-link class="page-link" to="#">15</router-link>
                      </li>
                      <li class="page-item">
                        <router-link class="page-link" to="#">Next</router-link>
                      </li>
                    </ul>
                  </nav>
                </div> -->
              </b-card-footer>
            </b-card>
          </b-col>
        </b-row>

        <!-- Modal for displaying flight details -->
        <!-- <b-modal
          v-model="showModal"
          title="Flight Details"
          size="lg"
        >
          <template #modal-footer="{ ok, cancel }">
            <b-button variant="secondary" @click="cancel">Close</b-button>
            <b-button variant="primary" @click="ok">Ok</b-button>
          </template>

          <div v-if="flightDetails">
            <h5>Flight ID: {{ flightDetails.id }}</h5>
            <p>Type: {{ flightDetails.type }}</p>
            <p>Price: {{ flightDetails.price.base }} {{ flightDetails.price.currency }}</p>
            <p>Total: {{ flightDetails.price.total }} {{ flightDetails.price.currency }}</p>
            <h6>Itineraries:</h6>
            <ul>
              <li v-for="(itinerary, index) in flightDetails.itineraries" :key="index">
                Duration: {{ itinerary.duration }}
                <ul>
                  <li v-for="(segment, segIndex) in itinerary.segments" :key="segIndex">
                    Flight Number: {{ segment.number }} - Departure: {{ segment.departure.iataCode }} at {{ segment.departure.at }} - Arrival: {{ segment.arrival.iataCode }} at {{ segment.arrival.at }}
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </b-modal> -->
       <!-- Modal Template -->
       <b-modal 
    v-model="showModal" 
    title="Flight Details"
    size="lg"
    hide-footer
  >
    <div v-if="Details" class="flight-details">
      <!-- Main Flight Info -->
      <div class="info-section mb-4">
        <h5 class="border-bottom pb-2 mb-3">Flight Information</h5>
        <div class="row g-3">
          <div class="col-md-6">
            <p class="mb-2"><strong>Flight ID:</strong> <span class="text-secondary">{{ Details.id }}</span></p>
            <p class="mb-2"><strong>Type:</strong> <span class="text-secondary">{{ toSentenceCase(Details.type) }}</span></p>
            <p class="mb-2"><strong>Last Ticketing Date:</strong> <span class="text-secondary">{{ formatDate(Details.lastTicketingDate) }}</span></p>
          </div>
          <div class="col-md-6">
            <div class="price-card p-3 bg-light rounded">
              <h6 class="mb-2">Price Details</h6>
              <p class="mb-1"><strong>Base Price:</strong> {{ Details.price.base }} {{ Details.price.currency }}</p>
              <p class="mb-1"><strong>Total Price:</strong> <span class="text-primary fw-bold">{{ Details.price.total }} {{ Details.price.currency }}</span></p>
            </div>
          </div>
        </div>
      </div>

      <!-- Itinerary Details -->
      <div class="itinerary-section">
        <h5 class="border-bottom pb-2 mb-3">Itinerary Details</h5>
        <div v-for="(itinerary, index) in Details.itineraries" :key="index">
          <div class="itinerary-card mb-3">
            <template v-for="(segment, segIndex) in itinerary.segments" :key="segIndex">
              <div class="segment-details p-3 bg-light rounded mb-2">
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <span class="badge bg-primary">Flight {{ segment.number }}</span>
                  </div>
                </div>
                <div class="row g-3">
                  <div class="col-md-6">
                    <div class="departure-details">
                      <h6 class="mb-2">Departure</h6>
                      <p class="mb-1"><strong>Airport:</strong> {{ segment.departure.iataCode }}</p>
                      <p class="mb-1"><strong>Time:</strong> {{ formatDate(segment.departure.at) }}</p>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="arrival-details">
                      <h6 class="mb-2">Arrival</h6>
                      <p class="mb-1"><strong>Airport:</strong> {{ segment.arrival.iataCode }}</p>
                      <p class="mb-1"><strong>Time:</strong> {{ formatDate(segment.arrival.at) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="text-center py-4">
      <p class="text-muted mb-0">No flight details available</p>
    </div>

    <template #modal-footer>
      <div class="w-100">
        <b-button variant="secondary" class="float-end" @click="showModal = false">
          Close
        </b-button>
      </div>
    </template>
  </b-modal>


      </b-container>
    </section>
  </AgentLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { BIconBookmarkHeart } from 'bootstrap-icons-vue'
import AgentLayout from '@/layouts/AgentLayout.vue'
import SelectFormInput from '@/components/SelectFormInput.vue'
import { kebabToTitleCase } from '@/helpers/change-casting'
import type { number } from 'yup'


interface FlightDetails {
  id: string;
  
  type: string;
  price: {
    total: number;
    currency: string;
    base: number;
  };
  lastTicketingDate: string;
  itineraries: Array<{
    segments: Array<{
      number: number;
      departure: {
        iataCode: string;
        at: string;
      };
      arrival: {
        iataCode: string;
        at: string;
      };
    }>;
  }>;
}

interface Booking {
  id: string;
  firstname: string;
  lastname: string;
  timespan: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  flightdetails: FlightDetails;
}

// State variable to hold user bookings data
const bookings = ref<Booking[]>([]);
const showModal = ref(false) // Variable to control modal visibility
const Details = ref<FlightDetails | null>(null);
const alertMessage = ref('');
const alertClass = ref('');
const alertActive = ref(false); // Variable to hold flight details
const selectedOption = ref('desc');

// Sort options for the dropdown
const sortOptions = [
  { value: 'asc', text: 'Oldest' },
  { value: 'desc', text: 'Newest' },
];

// Method to update booking status and hit the API using fetch
const updateStatus = (booking: any) => {
  fetch(`https://flightbooking-backend.vercel.app/api/flights/users/${booking.id}/${booking.status}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: booking.status
    })
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update status!');
      }
      return response.json();
    })
    .then(() => {
      alertMessage.value = 'Status updated successfully!';
      alertClass.value = 'alert-success';
      alertActive.value = true;
      setTimeout(() => {
        alertActive.value = false;
        alertMessage.value = '';
      }, 3000);
    })
    .catch((error) => {
      alertMessage.value = error.message || 'Failed to update status!';
      alertClass.value = 'alert-danger';
      alertActive.value = true;
      setTimeout(() => {
        alertActive.value = false;
        alertMessage.value = '';
      }, 3000);
    });
};

const showFlightDetails = (details: FlightDetails) => {
  if (details) {
    Details.value = details;
    showModal.value = true;
  } else {
    console.error('No flight details provided');
  }
};


// Fetch user data based on current page and limit
const fetchUserData = async () => {
  try {
    // API URL with sort parameter based on selected option
    const response = await fetch(`https://flightbooking-backend.vercel.app/api/flights/users`);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data = await response.json();
    bookings.value = data; // Assign response data to bookings
    console.log('Fetched bookings:', JSON.stringify(bookings.value, null, 2)); // Log fetched bookings in a readable format
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Watch for changes in the selected sort option
watch(selectedOption, fetchUserData);

// Fetch user data when the component is mounted
onMounted(() => {
  fetchUserData();
});

const formatDate = (isoDate: string) => {
  if (!isoDate) return 'N/A';
  const date = new Date(isoDate);
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

const toSentenceCase = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
</script>

<style scoped>
.flight-details {
  max-height: 70vh;
  overflow-y: auto;
}

.price-card {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.segment-details {
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.info-section, .itinerary-section {
  background-color: white;
  border-radius: 8px;
}

.custom-select {
  appearance: none; /* Remove default styles */
  background: #ffffff; /* White background */
  border: 1px solid #ced4da; /* Border color */
  border-radius: 10px; /* Rounded corners */
  padding: 0.375rem 1.5rem 0.375rem 0.75rem; /* Padding */
  font-size: 1rem; /* Font size */
  transition: border-color 0.2s ease-in-out; /* Transition effect */
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="%23ced4da"><path d="M7 10l5 5 5-5z"/></svg>'); /* Custom dropdown icon */
  background-repeat: no-repeat; /* No repeat */
  background-position: right 0.5rem center; /* Position the icon */
  background-size: 16px; /* Icon size */
}

.custom-select:focus {
  border-color: #80bdff; /* Border color on focus */
  outline: none; /* Remove outline */
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Shadow on focus */
}

.custom-select:hover {
  border-color: #80bdff; /* Border color on hover */
}

/* Custom design for the alert message */
.slide-down-alert {
  position: fixed;
  top: -50px; /* Initially off the screen */
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 80%; /* Adjust width as needed */
  max-width: 500px;
  text-align: center;
  font-weight: bold;
  transition: top 0.5s ease-in-out; /* Slide down effect */
  border-radius: 0.375rem;
  margin-top: 10px;
}

/* Animate the alert to slide down */
.slide-down-alert.active {
  top: 20px; /* Slide down into view */
}

/* Custom styling for the alert appearance */
.alert {
  padding: 15px;
  border-radius: 0.375rem;
}

/* Example colors for success and error alerts */
.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}
</style>
<template>
  <section class="py-0">
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

        <form class="bg-mode position-relative px-3 px-sm-4 pt-4 mb-4 mb-sm-0">

          <b-row class="g-4 position-relative">
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

            <div class="tab-content mt-4" id="pills-tabContent">
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
                        id="to"
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
                        id="departureDate"
                        placeholder="Select date"
                        v-model="departureDate"
                        :options="{ dateFormat: 'd M Y' }"
                      />
                    </div>
                  </b-col>

                  <b-col cols="12" class="text-end pt-0">
                    <a class="btn btn-primary mb-n4" href="#" @click.prevent="handleFindTicket">
                      Find ticket
                      <BIconArrowRight class="ps-3 w-25" />
                    </a>
                  </b-col>
                </b-row>
              </div>

              <div
                class="tab-pane fade"
                :class="!show && 'show active'"
                id="pills-round-trip"
                role="tabpanel"
                aria-labelledby="pills-round-trip-tab"
              >
                <b-row class="g-4">
                  <b-col md="6" xl="3" class="position-relative">
                    <div class="form-border-transparent form-fs-lg bg-light rounded-3 h-100 p-3">
                      <label class="mb-1">
                        <BIconGeoAlt class="me-2" />
                        From
                      </label>
                      <SelectFormInput
                        id="from"
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
                        id="to2"
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
                        id="departureDay"
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
                        id="return"
                        placeholder="Select date"
                        v-model="returnDate"
                        :options="{ dateFormat: 'd M Y' }"
                      />
                    </div>
                  </b-col>

                  <b-col cols="12" class="text-end pt-0">
                    <a class="btn btn-primary mb-n4" href="#" @click.prevent="handleFindTicket">
                      Find ticket
                      <BIconArrowRight class="ps-3 w-25" />
                    </a>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-row>
        </form>
      </div>
    </b-container>
  </section>
</template>

<script lang="ts" setup>
import bg01 from '@/assets/images/bg/01.jpg'
import SelectFormInput from '@/components/SelectFormInput.vue'
import { faRightLeft } from '@fortawesome/free-solid-svg-icons'
import { BIconGeoAlt, BIconSend, BIconCalendar, BIconArrowRight } from 'bootstrap-icons-vue'

import { ref } from 'vue'
import CustomFlatpicker from '@/components/CustomFlatpicker.vue'
import { useRouter } from 'vue-router'; // Import the router

const router = useRouter();

const selectedDestination = ref('select-location')
const selectedDestination2 = ref('select-location')
const selectedDestination3 = ref('select-location')
const selectedDestination4 = ref('select-location')
const selectedClass = ref('select-class')
const selectedTravelers = ref('select-travelers')

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

const show = ref(true) // toggle for one-way or round-trip
const departureDate = ref()
const returnDate = ref()

// Date formatting function
const formatDate = (date: any) => {
  if (!date) return null;
  const d = new Date(date);
  return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
};

// Function to handle the click event
const handleFindTicket = () => {
  const queryParams = {
  originLocationCode: show.value ? selectedDestination.value : selectedDestination3.value,
  destinationLocationCode: show.value ? selectedDestination2.value : selectedDestination4.value,
  departureDate: formatDate(departureDate.value),
  returnDate: !show.value && returnDate.value ? formatDate(returnDate.value) : null,
  travelClass: selectedClass.value,
  adults: selectedTravelers.value,
};
  console.log('Form Data:', queryParams);
router.push({ name: 'flights.list', query: queryParams });

  if (!show.value && returnDate.value) {
    queryParams.returnDate = formatDate(returnDate.value);
  }
};
</script>


<!-- <script lang="ts" setup>
import bg01 from '@/assets/images/bg/01.jpg'
import SelectFormInput from '@/components/SelectFormInput.vue'
import { faRightLeft } from '@fortawesome/free-solid-svg-icons'
import { BIconGeoAlt, BIconSend, BIconCalendar, BIconArrowRight } from 'bootstrap-icons-vue'

import { ref } from 'vue'
import CustomFlatpicker from '@/components/CustomFlatpicker.vue'

const selectedDestination = ref('select-location')
const selectedDestination2 = ref('select-location')
const selectedDestination3 = ref('select-location')
const selectedDestination4 = ref('select-location')
const selectedClass = ref('select-class')
const selectedTravelers = ref('select-travelers')

const destinationOptions = [
  { value: 'select-location', text: 'Select location' },
  { value: 'san-jacinto', text: 'San Jacinto, USA' },
  { value: 'north-dakota', text: 'North Dakota, Canada' },
  { value: 'west-virginia', text: 'West Virginia, Paris' }
]
const classOptions = [
  { value: 'select-class', text: 'Select Class' },
  { value: 'economy', text: 'Economy' },
  { value: 'Premium Economy', text: 'Premium Economy' },
  { value: 'Business', text: 'Business' },
  { value: 'First Class', text: 'First Class' }
]
const travelerOptions = [
  { value: 'select-travelers', text: 'Select Travelers' },
  { value: '1', text: '1' },
  { value: '2', text: '2' },
  { value: '3', text: '3' },
  { value: '4', text: '4' }
]

const show = ref(true)
const departureDate = ref()
const returnDate = ref()
</script> -->

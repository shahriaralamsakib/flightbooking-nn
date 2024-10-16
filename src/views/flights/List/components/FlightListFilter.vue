<template>
  <b-form class="rounded-3 shadow">
    <!-- Popular filters -->
    <b-card no-body class="card-body rounded-0 rounded-top p-4">
      <h6 class="mb-2">Stops</h6>
      <b-col cols="12">
        <div class="d-flex justify-content-between align-items-center">
          <b-form-checkbox v-model="onwardStops[1]">1 Stop</b-form-checkbox>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <b-form-checkbox v-model="onwardStops[2]">2 Stops</b-form-checkbox>
        </div>
        <div class="d-flex justify-content-between align-items-center">
          <b-form-checkbox v-model="onwardStops[0]">Non-Stop</b-form-checkbox>
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
          :max="1000"
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
    <b-card no-body class="card-body rounded-0 rounded-bottom p-4">
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
    </b-card>
  </b-form>

  <div class="d-flex justify-content-between p-2 p-xl-0 mt-xl-4">
    <b-button variant="link" class="p-0 mb-0" @click="clearFilters">Clear all</b-button>
    <b-button variant="primary" class="mb-0" @click="applyFilters">Filter Result</b-button>
  </div>
</template>


<script lang="ts" setup>
// import element12 from '@/assets/images/element/12.svg'
// import element13 from '@/assets/images/element/13.svg'
// import element14 from '@/assets/images/element/14.svg'
// import element15 from '@/assets/images/element/15.svg'

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import VueSlider from 'vue-3-slider-component'
import { currency } from '@/helpers/constants'
import { ref, defineProps } from 'vue';
import { onMounted, watch } from 'vue';
import type { PropType } from 'vue';
import { defineEmits } from 'vue';

// Use defineEmits to emit data to the parent component
const emit = defineEmits(['updateFilters']);

// Filter variables
const priceRange = ref([0, 1000]);  // Price range (min, max)
const onwardStops = ref([false, false, false]);  // Stops selection
const selectedAirlines = ref([]);  // Selected airlines
const departureTime = ref([false, false, false, false]);  // Departure times

// Airline data
const preferredAirlines = ref([
  { name: 'Air India', code: 'AI', imgSrc: 'path/to/image1.svg' },
  { name: 'Malaysia Airlines', code: 'MH', imgSrc: 'path/to/image2.svg' },
  { name: 'Qatar Airways', code: 'QR', imgSrc: 'path/to/image3.svg' },
  { name: 'Singapore Airlines', code: 'SQ', imgSrc: 'path/to/image4.svg' },
  { name: 'SriLankan Airlines', code: 'UL', imgSrc: 'path/to/image5.svg' },
  { name: 'Thai Airways', code: 'TG', imgSrc: 'path/to/image6.svg' },
]);

// Function to clear all filters
const clearFilters = () => {
  priceRange.value = [0, 1000];
  onwardStops.value = [false, false, false];
  selectedAirlines.value = [];
  departureTime.value = [false, false, false, false];
};

// Function to apply filters and log filter data
const applyFilters = async () => {
  // Create an object with the filter values
  const filterValues = {
    maxPrice: priceRange.value[1],  // Only take the max price
    onwardStops: onwardStops.value,
    selectedAirlines: selectedAirlines.value,
    departureTime: departureTime.value,
  };

  emit('updateFilters', filterValues);

console.log('Applied Filters:', filterValues);
};

// Example of slider value for price range
const value = ref([700, 1000]);

// Custom styles for the slider
const dotStyle = {
  backgroundColor: '#5143d9',
  border: '5px solid #fff',
  boxShadow: '0px 0px 0px 1px #5143d9'
};

const processStyle = {
  backgroundColor: '#5143d9'
};

const railStyle = {
  backgroundColor: 'rgb(81, 67, 217, 0.1)'
};
</script>

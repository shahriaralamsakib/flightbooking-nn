<template>
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
import FlightCard from '@/views/flights/List/components/FlightCard.vue'
import FlightCard3 from '@/views/flights/List/components/FlightCard3.vue'
import FlightDetailModal from '@/views/flights/List/components/FlightDetailModal.vue'
import FlightListFilter from '@/views/flights/List/components/FlightListFilter.vue'
import Pagination from '@/views/flights/List/components/Pagination.vue'

import { dictionaries, flightOffers } from '@/stores/flightStore'
import { computed, ref } from 'vue'

const currentPage = ref(1) // Current page
const pageSize = ref(5)    // Number of results per page

// Calculate paginated offers
const paginatedOffers = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return flightOffers.value.slice(start, end)
})

// Handle page change
const changePage = (newPage: number) => {
  currentPage.value = newPage
}
</script>

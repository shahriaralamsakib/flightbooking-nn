<template>
  <section class="pt-0">
    <b-container>
      <b-row style="display: flex;">

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

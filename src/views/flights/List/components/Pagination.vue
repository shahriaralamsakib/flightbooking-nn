<template>
  <nav class="d-flex justify-content-center" aria-label="navigation" v-if="totalPages > 1">
    <ul class="pagination pagination-primary-soft d-inline-block d-md-flex rounded mb-0">
      <!-- Previous button -->
      <li class="page-item mb-0" :class="{ disabled: currentPage === 1 }">
        <button class="page-link" @click="prevPage" tabindex="-1">
          <font-awesome-icon :icon="faAngleLeft" />
        </button>
      </li>

      <!-- First page always visible -->
      <li class="page-item mb-0" :class="{ active: currentPage === 1 }">
        <button class="page-link" @click="goToPage(1)">1</button>
      </li>

      <!-- Ellipsis before the dynamic range if needed -->
      <li v-if="startPage > 2" class="page-item mb-0 disabled">
        <span class="page-link">...</span>
      </li>

      <!-- Dynamic page range based on visible pages -->
      <li v-for="page in pagesInRange" :key="page" class="page-item mb-0" :class="{ active: currentPage === page }">
        <button class="page-link" @click="goToPage(page)">
          {{ page }}
        </button>
      </li>

      <!-- Ellipsis after the dynamic range if needed -->
      <li v-if="endPage < totalPages - 1" class="page-item mb-0 disabled">
        <span class="page-link">...</span>
      </li>

      <!-- Last page always visible if there are more than 2 pages -->
      <li v-if="totalPages > 1" class="page-item mb-0" :class="{ active: currentPage === totalPages }">
        <button class="page-link" @click="goToPage(totalPages)">
          {{ totalPages }}
        </button>
      </li>

      <!-- Next button -->
      <li class="page-item mb-0" :class="{ disabled: currentPage === totalPages }">
        <button class="page-link" @click="nextPage">
          <font-awesome-icon :icon="faAngleRight" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { computed, defineEmits, defineProps } from 'vue';

// Define the props expected from the parent component
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalOffers: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  }
})

// Emit the page change event back to the parent
const emit = defineEmits(['page-changed'])

// Calculate the total number of pages based on the total offers and page size
const totalPages = computed(() => {
  return Math.ceil(props.totalOffers / props.pageSize)
})

// Calculate the start page for the dynamic range (minimum value is 2)
const startPage = computed(() => {
  return Math.max(2, props.currentPage - 1)
})

// Calculate the end page for the dynamic range (exclude the last page)
const endPage = computed(() => {
  return Math.min(totalPages.value - 1, props.currentPage + 1)
})

// Calculate the visible pages in the range
const pagesInRange = computed(() => {
  let range = []
  for (let i = startPage.value; i <= endPage.value; i++) {
    range.push(i)
  }
  return range
})

// Method to handle direct page navigation
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value && page !== props.currentPage) {
    emit('page-changed', page)
  }
}

// Method to navigate to the previous page
const prevPage = () => {
  if (props.currentPage > 1) {
    emit('page-changed', props.currentPage - 1)
  }
}

// Method to navigate to the next page
const nextPage = () => {
  if (props.currentPage < totalPages.value) {
    emit('page-changed', props.currentPage + 1)
  }
}
</script>

<style scoped>
.page-item.disabled .page-link {
  cursor: not-allowed;
}
</style>

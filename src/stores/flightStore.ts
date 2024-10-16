// src/store/flightStore.ts
import { ref } from 'vue';

// Shared ref to hold the flight offers data
export const flightOffers = ref<any[]>([]);
export const meta = ref<any[]>([]);

// Shared ref to hold the dictionaries (e.g., carriers, currencies, etc.)
export const dictionaries = ref<any>({
  carriers: {}
});

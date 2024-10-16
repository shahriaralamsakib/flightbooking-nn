<template>
<!-- Centered Notifications Container -->
<div class="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 pt-6">
    <TransitionGroup 
      name="notification"
      tag="div"
      class="space-y-4"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification-slide-down"
        :class="[
          'p-4 rounded-lg shadow-md backdrop-blur-sm',
          notification.type === 'success' 
            ? 'success-notification' 
            : 'error-notification'
        ]"
      >
        <div class="flex items-center justify-center">
          <div class="flex-shrink-0">
            <svg
              v-if="notification.type === 'success'"
              class="h-5 w-5 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              class="h-5 w-5 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm font-medium" :class="[
              notification.type === 'success' 
                ? 'text-green-800' 
                : 'text-red-800'
            ]">
              {{ notification.message }}
            </p>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
  <b-col xl="8">
    <b-card no-body class="bg-transparent p-0">
      <b-card-header class="bg-transparent p-0">
        <b-card-title tag="h1" class="fs-2 mb-0">Enter Your Payment Details</b-card-title>
      </b-card-header>

      <b-card-body class="p-0 mt-3">
        <!-- <b-alert variant="success" v-model="showAlert">
          Hey' you are saving<strong class="mx-1">{{ currency }}2,560</strong>discount using coupon
          code
        </b-alert> -->

        <b-form @submit.prevent="handleSubmit" class="bg-light rounded-3 p-4">
          <div class="d-sm-flex justify-content-sm-between align-items-center mb-3">
            <h6 class="mb-2 mb-sm-0">We Accept:</h6>
            <ul class="list-inline mb-0 hstack gap-1 justify-content-end">
              <li class="list-inline-item">
                <a href="#"><img :src="visa" class="h-30px" alt="" /></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><img :src="mastercard" class="h-30px" alt="" /></a>
              </li>
              <li class="list-inline-item">
                <a href="#"><img :src="expresscard" class="h-30px" alt="" /></a>
              </li>
            </ul>
          </div>

          <b-row class="g-3">
            <b-col cols="12">
              <label class="form-label"><span class="h6 fw-normal">Card Number *</span></label>
              <div class="position-relative">
                <b-form-input v-model="paymentDetails.cardNumber" type="text" maxlength="14" placeholder="XXXX XXXX XXXX XXXX" />
                <img
                  :src="visa"
                  class="w-30px position-absolute top-50 end-0 translate-middle-y me-2 d-none d-sm-block"
                  alt=""
                />
              </div>
            </b-col>
            <b-col md="6">
              <label class="form-label"><span class="h6 fw-normal">Expiration date *</span></label>
              <div class="input-group">
                <b-form-input v-model="paymentDetails.expirationMonth" type="text" maxlength="2" placeholder="Month" />
                <b-form-input v-model="paymentDetails.expirationYear" type="text" maxlength="4" placeholder="Year" />
              </div>
            </b-col>
            <b-col md="6">
              <label class="form-label"><span class="h6 fw-normal">CVV / CVC *</span></label>
              <b-form-input v-model="paymentDetails.cvv" type="text" maxlength="3" placeholder="XXX" />
            </b-col>
            <b-col cols="12">
              <label class="form-label"><span class="h6 fw-normal">Name on Card *</span></label>
              <b-form-input
                v-model="paymentDetails.cardHolderName"
                type="text"
                aria-label="name of card holder"
                placeholder="Enter card holder name"
              />
            </b-col>

            <b-col cols="12">
              <b-button type="submit" variant="primary" class="w-100 mb-0">Pay Now</b-button>
            </b-col>>
          </b-row>
        </b-form>
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup lang="ts">
import { reactive, ref  } from 'vue'

import visa from '@/assets/images/element/visa.svg'
import mastercard from '@/assets/images/element/mastercard.svg'
import expresscard from '@/assets/images/element/expresscard.svg'
// import { currency } from '@/helpers/constants'

// Notification system
interface Notification {
  message: string;
  type: 'success' | 'error';
  id: number;
}

const notifications = ref<Notification[]>([]);
const notificationCount = ref(0);

const addNotification = (message: string, type: 'success' | 'error') => {
  const id = notificationCount.value++;
  notifications.value.push({ message, type, id });
  
  // Remove notification after 5 seconds
  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id);
  }, 5000);
};

const validateFields = () => {
  const emptyFields: string[] = [];
  
  if (!paymentDetails.cardNumber.trim()) {
    emptyFields.push('Card Number');
  }
  if (!paymentDetails.expirationMonth.trim()) {
    emptyFields.push('Expiration Month');
  }
  if (!paymentDetails.expirationYear.trim()) {
    emptyFields.push('Expiration Year');
  }
  if (!paymentDetails.cvv.trim()) {
    emptyFields.push('CVV');
  }
  if (!paymentDetails.cardHolderName.trim()) {
    emptyFields.push('Card Holder Name');
  }
  
  return emptyFields;
};

import { useRoute } from 'vue-router';

// Get the route object to access query parameters
const route = useRoute();

// Log the entire route object to debug
console.log(route.query); // Check if 'dictionaries' exists in route.query

// Parse the `offer` and `dictionaries` objects from query parameters
const offer = route.query.offer ? JSON.parse(route.query.offer as string) : null;
const dictionaries = route.query.dictionaries ? JSON.parse(route.query.dictionaries as string) : null;
const travelerDetails = route.query.travelerDetails ? JSON.parse(route.query.travelerDetails as string) : null;

console.log("Booking Offer:", offer);
console.log("Booking Dictionaries:", dictionaries);
console.log("Booking Dictionaries:", travelerDetails);

const paymentDetails = reactive({
  cardNumber: '',
  expirationMonth: '',
  expirationYear: '',
  cvv: '',
  cardHolderName: ''
});

// const handleSubmit = () => {
//   console.log('Payment Details:', paymentDetails);
// };

// const showAlert = ref(true)

// Function to handle API call
const handleSubmit = async () => {
  const emptyFields = validateFields();
  
  if (emptyFields.length > 0) {
    const fieldsList = emptyFields.join(', ');
    addNotification(`Please fill in all required fields: ${fieldsList}`, 'error');
    return;
  }

  try {
    const response = await fetch('https://flightbooking-backend.vercel.app/api/flights/receive-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ offer, dictionaries, travelerDetails, paymentDetails }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response from API:', data);
    addNotification(data.message || 'Payment processed successfully!', 'success');
  } catch (error) {
    console.error('Error making the API call:', error);
    addNotification('Error processing payment. Please try again.', 'error');
  }
};
</script>

<style scoped>
.notification-slide-down {
  animation: slideDown 0.5s ease-out forwards;
}

.success-notification {
  background: linear-gradient(to right, rgba(220, 252, 231, 0.95), rgba(187, 247, 208, 0.95));
  border: 1px solid rgba(134, 239, 172, 0.4);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.error-notification {
  background: linear-gradient(to right, rgba(254, 226, 226, 0.95), rgba(254, 202, 202, 0.95));
  border: 1px solid rgba(252, 165, 165, 0.4);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

@keyframes slideDown {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  70% {
    transform: translateY(10px);
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.notification-enter-active {
  animation: slideDown 0.5s ease-out forwards;
}

.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
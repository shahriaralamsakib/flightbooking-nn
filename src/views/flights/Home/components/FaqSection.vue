<template>
    <section class="container py-5">
      <div class="row mx-5">
        <!-- Left Section -->
        <div class="col-md-6 position-relative">
          <div class="position-absolute w-100 h-100 bg-cover bg-center"
            :style="{ backgroundImage: 'url(https://images.unsplash.com/photo-1587893904933-5b23fefaea6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }"
            style="opacity: 0.5;"></div>
          <div class="position-relative p-4">
            <h2 class="text-white font-weight-bold mb-4">Why choose us?</h2>
            <ul class="list-unstyled text-white">
              <li>✔ Your Trustworthy Travel Partner</li>
              <li>✔ Fully ATOL Bonded for Your Financial Safety and Peace of Mind</li>
              <li>✔ Custom Made Holidays Crafted by Seasoned Travel Professionals</li>
              <li>✔ Discover Unbeatable Discounts and Best Value for Money Offerings</li>
              <li>✔ Always Here For You: Open daily from 8:00 AM to Midnight</li>
            </ul>
          </div>
        </div>
   
        <!-- Right Section -->
        <div class="col-md-6">
          <div class="bg-white p-4 rounded shadow mb-4 d-flex align-items-center">
            <div class="text-secondary display-4 mr-3">
              📞
            </div>
            <div>
              <h3 class="h5 font-weight-bold">Call Us</h3>
              <p>For Bookings & Latest Offers</p>
              <p class="text-primary font-weight-bold cursor-pointer">Call Our Experts Now</p>
            </div>
          </div>
   
          <div class="bg-white p-4 rounded shadow mb-4 d-flex align-items-center">
            <div class="text-secondary display-4 mr-3">
              ✉️
            </div>
            <div>
              <h3 class="h5 font-weight-bold">Deals in your inbox</h3>
              <p>Subscribe to our newsletter for our latest offers</p>
            </div>
          </div>
   
          <div class="bg-white p-4 rounded shadow d-flex align-items-center">
            <div class="text-secondary display-4 mr-3">
              📧
            </div>
            <div>
              <h3 class="h5 font-weight-bold">Email Enquiry?</h3>
              <p>Get your tailor-made holiday quote, we’re here to make it easy...</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
   
  <script>
  export default {
    name: 'FaqSection',
  };
  </script>
   
  <style scoped>
  .bg-cover {
    background-size: cover;
  }
   
  .bg-center {
    background-position: center;
  }
  </style>
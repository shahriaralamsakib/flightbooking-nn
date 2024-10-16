<template>
  <!-- Section FAQ -->
  <section name="faq" class="container mx-auto py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mx-40">
      <!-- Left Section -->
      <div class="relative">
        <!-- Background Image -->
        <div
          class="absolute inset-0 bg-cover bg-center opacity-50"
          style="background-image: url('https://images.unsplash.com/photo-1587893904933-5b23fefaea6d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');"
        ></div>

        <div class="relative p-8">
          <h2 class="text-white text-2xl font-bold mb-4">Why choose us?</h2>
          <ul class="space-y-3 text-white">
            <li>✔ Your Trustworthy Travel Partner</li>
            <li>✔ Fully ATOL Bonded for Your Financial Safety and Peace of Mind</li>
            <li>✔ Custom Made Holidays Crafted by Seasoned Travel Professionals</li>
            <li>✔ Discover Unbeatable Discounts and Best Value for Money Offerings</li>
            <li>✔ Always Here For You: Open daily from 8:00 AM to Midnight</li>
          </ul>
        </div>
      </div>

      <!-- Right Section -->
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <div class="text-4xl text-gray-600 mr-4">📞</div>
          <div>
            <h3 class="text-xl font-semibold">Call Us</h3>
            <p>For Bookings & Latest Offers</p>
            <p class="text-blue-500 font-bold cursor-pointer">Call Our Experts Now</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <div class="text-4xl text-gray-600 mr-4">✉️</div>
          <div>
            <h3 class="text-xl font-semibold">Deals in your inbox</h3>
            <p>Subscribe to our newsletter for our latest offers</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-lg flex items-center">
          <div class="text-4xl text-gray-600 mr-4">📧</div>
          <div>
            <h3 class="text-xl font-semibold">Email Enquiry?</h3>
            <p>Get your tailor-made holiday quote, we’re here to make it easy...</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FaqSection",
};
</script>

<style scoped>
/* Add any specific styles if needed */
</style>

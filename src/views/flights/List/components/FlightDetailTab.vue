<template>
  <b-tabs
    nav-class="nav nav-pills nav-justified nav-responsive bg-primary bg-opacity-10 rounded p-2 mb-3"
  >
    <b-tab>
      <template #title> Flight Information </template>
      <b-card no-body class="border">
        <b-card-header>
          <div class="d-sm-flex justify-content-sm-between align-items-center">
            <div class="d-flex mb-2 mb-sm-0">
              <img :src="element9" class="w-40px me-2" alt="" />
              <h6 class="fw-normal mb-0">Phillippines Airline (PA - 5620)</h6>
            </div>
            <h6 class="fw-normal mb-0"><span class="text-body">Travel Class:</span> Economy</h6>
          </div>
        </b-card-header>

        <b-card-body class="p-4">
          <b-row class="g-4">
            <b-col sm="4">
              <h4>BOM</h4>
              <h6 class="mb-0">14:50</h6>
              <p class="mb-0">Chhatrapati Shivaji International Airport</p>
            </b-col>

            <b-col sm="4" class="my-sm-auto text-center">
              <h5>9hr 50min</h5>

              <div class="position-relative my-4">
                <hr class="bg-primary opacity-5 position-relative" />
                <div
                  class="icon-md bg-primary text-white rounded-circle position-absolute top-50 start-50 translate-middle"
                >
                  <font-awesome-icon :icon="faPlane" class="fa-fw rtl-flip" />
                </div>
              </div>
            </b-col>

            <b-col sm="4">
              <h4>CDG</h4>
              <h6 class="mb-0">11:50</h6>
              <p class="mb-0">Ch. De Gaulle, Paris, France</p>
            </b-col>
          </b-row>

          <div class="bg-light text-center fw-normal rounded-2 mt-3 mb-4 p-2">
            Change of planes: 3h 15m Layover in France
          </div>

          <b-row class="g-4">
            <b-col sm="4">
              <h4>CDG</h4>
              <h6 class="mb-0">2:50</h6>
              <p class="mb-0">Ch. De Gaulle, Paris, France</p>
            </b-col>

            <b-col sm="4" class="my-sm-auto text-center">
              <h5>5hr 50min</h5>

              <div class="position-relative my-4">
                <hr class="bg-primary opacity-5 position-relative" />
                <div
                  class="icon-md bg-primary text-white rounded-circle position-absolute top-50 start-50 translate-middle"
                >
                  <font-awesome-icon :icon="faPlane" class="fa-fw rtl-flip"></font-awesome-icon>
                </div>
              </div>
            </b-col>

            <b-col sm="4">
              <h4>JFK</h4>
              <h6 class="mb-0">7:35</h6>
              <p class="mb-0">John F Kennedy Intl-NY</p>
            </b-col>
          </b-row>
        </b-card-body>
      </b-card>
    </b-tab>
    <b-tab>
      <template #title> Fare Detail </template>
      <b-card no-body>
        <div class="table-responsive-lg">
          <table class="table caption-bottom mb-0">
            <caption class="pb-0">
              *From The Date Of Departure
            </caption>
            <thead class="table-dark">
              <tr>
                <th scope="col" class="border-0 rounded-start">Base Fare</th>
                <th scope="col" class="border-0">Taxes and Fees</th>
                <th scope="col" class="border-0 rounded-end">Total Fees</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ currency }}36,500</td>
                <td>{{ currency }}1,050</td>
                <td>
                  <h5 class="mb-0">{{ currency }}37,550</h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </b-card>
    </b-tab>
    <b-tab>
      <template #title> Baggage Rules </template>
      <b-card no-body class="border">
        <b-card-header class="d-flex align-items-center border-bottom">
          <img :src="element9" class="h-20px me-1" alt="" />
          <b-card-title tag="h5" class="mb-0">BOM - CDG</b-card-title>
        </b-card-header>

        <b-card-body>
          <div class="table-responsive-lg">
            <table class="table caption-bottom mb-0">
              <caption class="pb-0">
                *1PC = 23KG
              </caption>
              <thead class="table-dark">
                <tr>
                  <th scope="col" class="border-0 rounded-start">Baggage Type</th>
                  <th scope="col" class="border-0">Check In</th>
                  <th scope="col" class="border-0 rounded-end">Cabin</th>
                </tr>
              </thead>
              <tbody class="border-top-0">
                <tr>
                  <td>Adult</td>
                  <td>2 PC</td>
                  <td>7 Kg</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card-body>
      </b-card>
    </b-tab>
    <b-tab>
      <template #title> Cancellation Rules </template>
      <b-card no-body class="border">
        <b-card-header class="d-flex align-items-center border-bottom">
          <img :src="element9" class="h-20px me-1" alt="" />
          <b-card-title tag="h5" class="mb-0">BOM - CDG</b-card-title>
        </b-card-header>

        <b-card-body>
          <div class="table-responsive-lg">
            <table class="table caption-bottom mb-0">
              <caption class="pb-0">
                *From The Date Of Departure
              </caption>
              <thead class="table-dark">
                <tr>
                  <th scope="col" class="border-0 rounded-start">Time Frame</th>
                  <th scope="col" class="border-0 rounded-end">Air Free + MMT Free</th>
                </tr>
              </thead>
              <tbody class="border-top-0">
                <tr>
                  <td>0 hours to 24 hours</td>
                  <td>Non Refundable</td>
                </tr>
                <tr>
                  <td>24 hours to 365 days</td>
                  <td>{{ currency }}16,325 + {{ currency }}250</td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-card-body>
      </b-card>
    </b-tab>
  </b-tabs>
</template>

<script lang="ts" setup>
import element9 from '@/assets/images/element/09.svg';
import { currency } from '@/helpers/constants';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
</script>
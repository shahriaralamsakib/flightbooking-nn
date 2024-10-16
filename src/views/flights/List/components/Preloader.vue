<template>
    <div class="preloader d-flex justify-content-center align-items-center">
      <b-spinner label="Loading..." />
    </div>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  .preloader {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.8);
    z-index: 10;
  }
  </style>
  
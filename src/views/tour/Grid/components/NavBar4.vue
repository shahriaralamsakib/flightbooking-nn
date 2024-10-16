<template>
  <header class="navbar-light header-sticky" :class="{ 'header-sticky-on': isSticky }">
    <nav class="navbar navbar-expand-xl">
      <b-container>
        <LogoBox />

        <!-- Responsive navbar toggler -->
        <button
          class="navbar-toggler ms-auto mx-3 p-0 p-sm-2"
          type="button"
          v-b-toggle="'navbar-collapse'"
        >
          <span class="navbar-toggler-animation py-1">
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span class="d-none d-sm-inline-block small ms-1">Menu</span>
        </button>

        <MobileMenu v-if="isMobileMenu" show-extra-pages />

        <AppMenu v-else show-extra-pages menu-class="mx-auto" />

        <ul class="nav flex-row align-items-center list-unstyled ms-xl-auto">
          <!-- Search -->
          <CustomDropDown is="li" custom-class="nav-item nav-search me-3 d-none d-sm-block">
            <a
              class="nav-notification btn btn-light mb-0 p-0"
              href="#"
              id="searchDropdown"
              role="button"
              data-bs-auto-close="outside"
              data-bs-display="static"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BIconSearch />
            </a>

            <div
              class="dropdown-menu dropdown-animation dropdown-menu-end p-2"
              aria-labelledby="searchDropdown"
            >
              <div class="nav flex-nowrap align-items-center">
                <div class="nav-item w-100">
                  <b-form class="input-group">
                    <b-form-input class="border-primary" type="search" placeholder="Search..." />
                    <b-button variant="primary" class="m-0" type="submit">Search</b-button>
                  </b-form>
                </div>
              </div>
            </div>
          </CustomDropDown>

          <!-- Notification -->
          

          <!-- Profile -->
          <CustomDropDown is="li" custom-class="nav-item">
            <a
              class="avatar avatar-sm p-0"
              href="#"
              role="button"
              data-bs-auto-close="outside"
              data-bs-display="static"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img class="avatar-img rounded-2" :src="avatar1" alt="avatar" />
            </a>

            <ul
              class="dropdown-menu dropdown-animation dropdown-menu-end shadow pt-3"
              aria-labelledby="profileDropdown"
            >
              

              <!-- Dark mode options -->
              <li>
                <div
                  class="nav-pills-primary-soft theme-icon-active d-flex justify-content-between align-items-center p-2 pb-0"
                >
                  <span>Mode:</span>

                  <button
                    v-for="mode in themeModes"
                    :key="mode.theme"
                    type="button"
                    class="btn btn-link nav-link text-primary-hover mb-0 p-0"
                    :class="{ active: mode.theme === useLayout.theme }"
                    @click="useLayout.setTheme(mode.theme)"
                    v-b-tooltip.hover
                    :title="mode.theme"
                  >
                    <component :is="mode.icon" />
                  </button>
                </div>
              </li>
            </ul>
          </CustomDropDown>
        </ul>
      </b-container>
    </nav>
  </header>
</template>

<script setup lang="ts">
import {
  BIconSearch,
  BIconBell,
  BIconBookmarkCheck,
  BIconHeart,
  BIconGear,
  BIconInfoCircle,
  BIconPower,
  BIconSun,
  BIconMoonStars,
  BIconCircleHalf
} from 'bootstrap-icons-vue'

import avatar1 from '@/assets/images/avatar/01.jpg'
import { computed, onMounted, ref } from 'vue'

import type { BSIconType } from '@/types'
import type { LayoutState } from '@/types/layout'
import { useLayoutStore } from '@/stores/layout'

import LogoBox from '@/components/LogoBox.vue'
import AppMenu from '@/components/navbar/AppMenu.vue'
import MobileMenu from '@/components/navbar/mobile-menu/MobileMenu.vue'
import CustomDropDown from '@/components/CustomDropDown.vue'

type ThemeModeType = {
  theme: LayoutState['theme']
  icon: BSIconType
}

const themeModes: ThemeModeType[] = [
  {
    icon: BIconSun,
    theme: 'light'
  },
  {
    icon: BIconMoonStars,
    theme: 'dark'
  },
  {
    icon: BIconCircleHalf,
    theme: 'auto'
  }
]

let isSticky = ref<boolean>(false)

onMounted(() => {
  window.addEventListener('scroll', () => {
    isSticky.value = window.scrollY >= 400
  })
})

const useLayout = useLayoutStore()

const isMobileMenu = computed(() => {
  return window.innerWidth <= 1200
})

type NotificationType = {
  title: string
  content?: string
  time: string
}

const notificationData: NotificationType[] = [
  {
    title: 'New! Booking flights from New York ✈️',
    content: 'Find the flexible ticket on flights around the world. Start searching today',
    time: '05 Feb 2024'
  },
  {
    title: 'Sunshine saving are here 🌞 save 30% or more on a stay',
    time: '24 Aug 2024'
  }
]
</script>

<template>
  <header class="">
    <nav class="navbar navbar-light navbar-expand-xl">
      <b-container>
        <LogoBox />

        <!-- Responsive navbar toggler -->
        <button
          class="navbar-toggler ms-auto me-3 p-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          v-b-toggle="'navbar-collapse'"
        >
          <span class="navbar-toggler-animation">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        <MobileMenu v-if="isMobileMenu" show-extra-pages />
        <div v-else class="z-1 ms-auto">
          <AppMenu show-extra-pages />
        </div>
        <ul class="nav flex-row align-items-center list-unstyled ms-xl-auto">
          

          <!-- Profile -->
          <CustomDropDown is="li" custom-class="nav-item ms-3">
           

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

import { computed } from 'vue'

import AppMenu from '@/components/navbar/AppMenu.vue'
import MobileMenu from '@/components/navbar/mobile-menu/MobileMenu.vue'
import CustomDropDown from '@/components/CustomDropDown.vue'

import type { ThemeModeType } from '@/types/layout'
import { useLayoutStore } from '@/stores/layout'
import LogoBox from '@/components/LogoBox.vue'

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

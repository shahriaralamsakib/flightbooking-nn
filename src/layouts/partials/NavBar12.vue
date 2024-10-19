<template>
  <header class="navbar-light header-sticky" :class="{ 'header-sticky-on': isSticky }">
    <nav class="navbar navbar-expand-xl">
      <b-container>
        <LogoBox />

        <b-button class="navbar-toggler ms-auto" v-b-toggle="'navbarCollapse'">
          <span class="navbar-toggler-animation">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </b-button>

        <b-collapse class="navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav navbar-nav-scroll ms-auto">
            <b-nav-item-dropdown no-caret toggle-class="p-0">
              <template v-slot:button-content>
                <a class="nav-link" href="#" id="helpMenu"
                  >Help Center
                  <font-awesome-icon :icon="faChevronDown" size="xs" />
                </a>
              </template>

              <router-link
                class="dropdown-item"
                :class="{ active: currentRouteName === '' }"
                :to="{ name: '' }"
                >Help center
              </router-link>

              <router-link
                class="dropdown-item"
                :class="{ active: currentRouteName === 'pages.help.detail' }"
                :to="{ name: 'pages.help.detail' }"
                >Help Detail
              </router-link>
            </b-nav-item-dropdown>

            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: currentRouteName === 'pages.help.privacy-policy' }"
                :to="{ name: 'pages.help.privacy-policy' }"
                >Privacy Policy
              </router-link>
            </li>

            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: currentRouteName === 'pages.help.service' }"
                :to="{ name: 'pages.help.service' }"
                >Terms of Service
              </router-link>
            </li>
          </ul>
        </b-collapse>

        
      </b-container>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  BIconBookmarkCheck,
  BIconCircleHalf,
  BIconGear,
  BIconHeart,
  BIconInfoCircle,
  BIconMoonStars,
  BIconPower,
  BIconSun
} from 'bootstrap-icons-vue'

import avatar1 from '@/assets/images/avatar/01.jpg'

import router from '@/router'

import LogoBox from '@/components/LogoBox.vue'
import CustomDropDown from '@/components/CustomDropDown.vue'

import type { ThemeModeType } from '@/types/layout'
import { useLayoutStore } from '@/stores/layout'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const isSticky = ref<boolean>(false)

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

onMounted(() => {
  window.addEventListener('scroll', () => {
    isSticky.value = window.scrollY >= 400
  })
})

const currentRouteName = router.currentRoute.value.name
</script>

<template>
  <b-collapse class="navbar-collapse">
    <b-navbar-nav v-if="startBookingMenu" class="navbar-nav-scroll me-auto">
      <b-nav-item-dropdown class="" toggle-class="ps-md-3 m-0" menu-class="z-3" no-caret>
        
      </b-nav-item-dropdown>
    </b-navbar-nav>

    <ul class="navbar-nav navbar-nav-scroll me-auto" :class="menuClass">
      <template v-for="item in menuItems" :key="item.key">
        <MenuItemWithChildren
          v-if="item.children"
          :item="item"
          :level="0"
          item-class="nav-item"
          link-class="nav-link arrow-none d-flex align-items-center gap-1 justify-content-between"
        />
        <MenuItem v-else :item="item" link-class="nav-link" />
      </template>

     
    </ul>
  </b-collapse>
</template>

<script setup lang="ts">
import { faEllipsis, faSuitcaseRolling, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import {
  BIconCardText,
  BIconCloudDownloadFill,
  BIconLifePreserver,
  BIconPuzzleFill
} from 'bootstrap-icons-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { getAppMenuItems } from '@/helpers/menu'
import MenuItemWithChildren from '@/components/navbar/MenuItemWithChildren.vue'
import MenuItem from '@/components/navbar/MenuItem.vue'
import { bookingHomeMenuItems } from '@/assets/data/menu-items'
import router from '@/router'
import { buyLink, supportLink } from '@/helpers/constants'

type AppMenuProps = {
  showExtraPages?: boolean
  startBookingMenu?: boolean
  menuClass?: string
}

defineProps<AppMenuProps>()

const menuItems = getAppMenuItems()

const currentRouteName = router.currentRoute.value.name
</script>

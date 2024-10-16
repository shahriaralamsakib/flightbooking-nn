<template>
  <label v-if="label" class="form-label">{{ label }}</label>

  <CustomDropDown custom-class="guest-selector me-2">
    <input
      type="text"
      class="form-guest-selector form-control selection-result"
      :class="inputClass"
      :value="getGuestsValue()"
      data-bs-auto-close="outside"
      data-bs-toggle="dropdown"
      :style="{ width: `${inputWidth}px` }"
    />

    <ul class="dropdown-menu guest-selector-dropdown">
      <li class="d-flex justify-content-between">
        <div>
          <h6 class="mb-0">Adults</h6>
          <small>Ages 13 or above</small>
        </div>

        <div class="hstack gap-1 align-items-center">
          <b-button
            variant="link"
            class="adult-remove p-0 mb-0"
            @click="() => updateGuests('adults', false)"
          >
            <BIconDashCircle class="fs-5 fa-fw" />
          </b-button>
          <h6 class="guest-selector-count mb-0 adults">{{ formValue.guests.adults ?? 0 }}</h6>
          <b-button variant="link" class="adult-add p-0 mb-0" @click="() => updateGuests('adults')">
            <BIconPlusCircle class="fs-5 fa-fw" />
          </b-button>
        </div>
      </li>

      <li class="dropdown-divider"></li>

      <li class="d-flex justify-content-between">
        <div>
          <h6 class="mb-0">Child</h6>
          <small>Ages 13 below</small>
        </div>

        <div class="hstack gap-1 align-items-center">
          <b-button
            variant="link"
            class="adult-remove p-0 mb-0"
            @click="() => updateGuests('children', false)"
          >
            <BIconDashCircle class="fs-5 fa-fw" />
          </b-button>
          <h6 class="guest-selector-count mb-0 child">{{ formValue.guests.children ?? 0 }}</h6>
          <b-button
            variant="link"
            class="adult-add p-0 mb-0"
            @click="() => updateGuests('children')"
          >
            <BIconPlusCircle class="fs-5 fa-fw" />
          </b-button>
        </div>
      </li>

      <li class="dropdown-divider"></li>

      <li class="d-flex justify-content-between">
        <div>
          <h6 class="mb-0">Rooms</h6>
          <small>Max room 8</small>
        </div>

        <div class="hstack gap-1 align-items-center">
          <b-button
            variant="link"
            class="adult-remove p-0 mb-0"
            @click="() => updateGuests('rooms', false)"
          >
            <BIconDashCircle class="fs-5 fa-fw" />
          </b-button>
          <h6 class="guest-selector-count mb-0 rooms">{{ formValue.guests.rooms ?? 0 }}</h6>
          <b-button variant="link" class="adult-add p-0 mb-0" @click="() => updateGuests('rooms')">
            <BIconPlusCircle class="fs-5 fa-fw" />
          </b-button>
        </div>
      </li>
    </ul>
  </CustomDropDown>
</template>

<script setup lang="ts">
import CustomDropDown from '@/components/CustomDropDown.vue'
import { BIconDashCircle, BIconPlusCircle } from 'bootstrap-icons-vue'
import { ref } from 'vue'
import type { GuestAndRoomFormType } from '@/types'

type GuestAndRoomFormPropType = {
  id?: string
  label?: string
  modelValue?: GuestAndRoomFormType
  inputWidth?: number
  inputClass?: string
}

const props = defineProps<GuestAndRoomFormPropType>()

const initialValue: GuestAndRoomFormType = {
  guests: {
    adults: 2,
    rooms: 1,
    children: 0
  }
}

const formValue = ref<GuestAndRoomFormType>(props.modelValue ?? initialValue)

const emit = defineEmits(['update:modelValue'])
const updateValue = () => {
  emit('update:modelValue', formValue.value)
}

const updateGuests = (type: keyof GuestAndRoomFormType['guests'], increase: boolean = true) => {
  const val = formValue.value.guests[type]
  formValue.value = {
    ...formValue.value,
    guests: {
      ...formValue.value.guests,
      [type]: increase ? val + 1 : val > 1 ? val - 1 : 0
    }
  }
  updateValue()
}

const getGuestsValue = (): string => {
  let value = ''
  const guests = formValue.value.guests
  if (guests.adults) {
    value += guests.adults + (guests.adults > 1 ? ' Adults ' : ' Adult ')
  }
  if (guests.children) {
    value += guests.children + (guests.children > 1 ? ' Children ' : ' Child ')
  }
  if (guests.rooms) {
    value += guests.rooms + (guests.rooms > 1 ? ' Rooms ' : ' Room ')
  }
  return value
}
</script>

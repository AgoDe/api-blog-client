<script setup>
import { ref, watchEffect } from 'vue'
import FlatPicker from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import dayjs from 'dayjs'
import { useRequestsStore } from '@/stores/requestsStore'

const requestsStore = useRequestsStore()

const pickerConfig = ref({
  wrap: true,
  enableTime: true,
  dateFormat: 'Y-m-d H:i',
  time_24hr: true,
  altFormat: 'd-m-Y H:i',
  altInput: true,
  allowInput: true,
  maxDate: dayjs().format('YYYY-MM-DD HH:mm')
})

// to data minima from
</script>

<template>
  <div>
    <div class="text-danger mb-3 text-center" v-if="requestsStore.getDateError">
      <em> {{ $t('validations.date.' + requestsStore.getDateError) }}</em>
    </div>

    <div class="d-flex align-items-center gap-1">
      <label class="form-label w-25" for="t_from">{{ $t('filters.date.from') }}</label>
      <div class="input-group">
        <flat-picker
          id="from"
          :config="pickerConfig"
          class="form-control"
          v-model="requestsStore.filters.date.from"
        />
        <button
          class="btn btn-sm btn-outline-primary"
          @click="requestsStore.resetDatePicker('from')"
        >
          <i class="fa fa-delete-left"></i>
        </button>
      </div>
    </div>
    <div class="d-flex align-items-center gap-1 mt-2">
      <label class="form-label w-25" for="t_to">{{ $t('filters.date.to') }}</label>
      <div class="input-group">
        <flat-picker
          id="to"
          :config="pickerConfig"
          class="form-control w-75"
          v-model="requestsStore.filters.date.to"
        />
        <button class="btn btn-sm btn-outline-primary" @click="requestsStore.resetDatePicker('to')">
          <i class="fa fa-delete-left"></i>
        </button>
      </div>
    </div>
  </div>
</template>

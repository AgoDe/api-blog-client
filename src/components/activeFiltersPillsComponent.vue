<script setup>
import { computed } from 'vue'
import dayjs from 'dayjs'
import { useRequestsStore } from '@/stores/requestsStore'

const requestsStore = useRequestsStore()

const filters = computed(() => {
  return requestsStore.getFilters
})

const getFilterPill = (filter, value) => {
  if (filter === 'date') {
    return dayjs(filters.value.date[value]).format('DD/MM/YYYY HH:mm:ss')
  }
}
</script>

<template>
  <div class="d-flex gap-2 flex-wrap">
    <button
      class="btn rounded-pill btn-primary btn-sm"
      v-for="(filter, index) in requestsStore.getActiveFilters"
      :key="index"
      @click="requestsStore.resetFilter(filter[0], filter[1])"
    >
      {{ $t(`filters.${filter[0]}.title`) }}: {{ $t(`filters.${filter[0]}.${filter[1]}`) }}
      {{ getFilterPill(filter[0], filter[1]) }}

      <i class="fa fa-xmark"></i>
    </button>
  </div>
</template>

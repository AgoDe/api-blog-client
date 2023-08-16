<script setup>
import dateTimeFilterComponent from '@/components/DateTimeFilterComponent.vue'
import { ref, watchEffect, onMounted } from 'vue'
import dayjs from 'dayjs'

import { useRequestsStore } from '@/stores/requestsStore'

const requestsStore = useRequestsStore()

let offcanvas = null

onMounted(() => {
  offcanvas = document.getElementById('periodFiltersOffcanvas')

  offcanvas.addEventListener('hide.bs.offcanvas', function () {
    // requestsStore.dateTimeinputModel.error = null
  })
})

requestsStore.setPeriodFilter()

watchEffect(() => {
  requestsStore.setPeriodFilter()
})
</script>

<template>
  <div
    class="offcanvas offcanvas-end bg-body-extra-light"
    tabindex="-1"
    id="periodFiltersOffcanvas"
    aria-labelledby="periodFiltersOffcanvasLabel"
  >
    <div class="offcanvas-header bg-body-light">
      <h5 class="offcanvas-title" id="periodFiltersOffcanvasLabel">
        {{ $t('filters.time.title') }}
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <div class="d-flex flex-column gap-4">
        <!-- oneHour -->
        <div
          class="form-check form-block"
          v-for="(filter, index) in requestsStore.periodFilters"
          :key="index"
        >
          <input
            class="form-check-input"
            type="radio"
            :id="filter"
            :value="filter"
            name="periodFilterModel"
            v-model="requestsStore.periodSelectModel"
          />
          <label
            class="form-check-label btn"
            :class="
              requestsStore.periodSelectModel == filter ? 'btn-info text-white' : 'btn-outline-info'
            "
            :for="filter"
          >
            {{ $t('filters.time.' + filter) }}
          </label>
        </div>

        <!-- selectDate -->
        <div class="form-check form-block">
          <input
            class="form-check-input"
            type="radio"
            id="selectDate"
            value="selectDate"
            name="periodSelectModelModel"
            v-model="requestsStore.periodSelectModel"
          />
          <label
            class="form-check-label btn"
            :class="
              requestsStore.periodSelectModel == 'selectDate'
                ? 'btn-info text-white'
                : 'btn-outline-info'
            "
            for="selectDate"
          >
            {{ $t('filters.time.selectDate') }} <i class="ms-4 fa fa-calendar-days"></i>
          </label>

          <div v-if="requestsStore.periodSelectModel == 'selectDate'" class="w-75 mt-4 m-auto">
            <dateTimeFilterComponent></dateTimeFilterComponent>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-block .form-check-input:checked ~ .form-check-label::before {
  display: none;
}
</style>

<script setup>
import { computed, onMounted, onUnmounted, ref, onUpdated, watch } from 'vue'
import { useTemplateStore } from '@/stores/template'
import { useRoute } from 'vue-router'
import { useRequestsStore } from '@/stores/requestsStore'
import dateTimeFilterComponent from '@/components/DateTimeFilterComponent.vue'

const requestsStore = useRequestsStore()

const hideOffcanvas = () => {
  let offcanvas = document.getElementById('requestsFilters')
  let bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas)
  bsOffcanvas.hide()
}

const toggleFilter = (filter, value) => {
  requestsStore.filters[filter][value] = !requestsStore.filters[filter][value]
}
</script>

<template>
  <div
    class="offcanvas offcanvas-end bg-body-extra-light"
    tabindex="-1"
    id="requestsFilters"
    aria-labelledby="requestsFiltersLabel"
  >
    <div class="offcanvas-header bg-body-light">
      <h3 class="offcanvas-title" id="requestFiltersLabel">
        {{ $t('filters.title') }}
      </h3>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <BaseBlock transparent :rounded="false" class="pull-x pull-t">
        <template #content>
          <!-- Direction -->
          <div class="block-content mb-3">
            <h4 class="mb-3">
              {{ $t('filters.direction.title') }}
            </h4>

            <div class="d-flex gap-4">
              <button
                class="btn fs-2 w-50"
                @click="toggleFilter('direction', 'inbound')"
                :class="
                  requestsStore.filters['direction']['inbound']
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                "
              >
                <i class="fa fa-arrow-right-to-bracket"></i>
              </button>
              <button
                class="btn fs-2 w-50"
                @click="toggleFilter('direction', 'outbound')"
                :class="
                  requestsStore.filters['direction']['outbound']
                    ? 'btn-primary'
                    : 'btn-outline-primary'
                "
              >
                <i class="fa fa-arrow-right-from-bracket"></i>
              </button>
            </div>
          </div>

          <!-- Status -->
          <div class="block-content mb-3">
            <h4 class="mb-3">
              {{ $t('filters.status.title') }}
            </h4>

            <div class="d-flex justify-content-around gap-3">
              <button
                class="btn fs-2 w-25"
                @click="toggleFilter('status', 'PEND')"
                :class="
                  requestsStore.filters['status']['PEND'] ? 'btn-primary' : 'btn-outline-primary'
                "
              >
                <i class="fa fa-clock-rotate-left"></i>
              </button>
              <button
                class="btn fs-2 w-25"
                @click="toggleFilter('status', 'OK')"
                :class="
                  requestsStore.filters['status']['OK'] ? 'btn-success' : 'btn-outline-success'
                "
              >
                <i class="fa fa-check"></i>
              </button>
              <button
                class="btn fs-2 w-25"
                @click="toggleFilter('status', 'KO')"
                :class="
                  requestsStore.filters['status']['KO'] ? 'btn-warning' : 'btn-outline-warning'
                "
              >
                <i class="fa fa-exclamation"></i>
              </button>

              <button
                class="btn fs-2 w-25"
                @click="toggleFilter('status', 'ERR')"
                :class="
                  requestsStore.filters['status']['ERR'] ? 'btn-danger' : 'btn-outline-danger'
                "
              >
                <i class="fa fa-xmark"></i>
              </button>
            </div>
          </div>

          <!-- Date -->
          <div class="block-content mb-3">
            <h4 class="mb-3">
              {{ $t('filters.date.title') }}
            </h4>
            <dateTimeFilterComponent></dateTimeFilterComponent>
          </div>

          <!-- destination -->
          <div class="block-content mb-3">
            <h4 class="mb-3">
              {{ $t('filters.endpoint.title') }}
            </h4>

            <div class="d-flex justify-content-around gap-4">
              <button
                class="btn w-50"
                @click="toggleFilter('endpoint', 'sybil')"
                :class="
                  requestsStore.filters['endpoint']['sybil'] ? 'btn-primary' : 'btn-outline-primary'
                "
              >
                Sybil
              </button>
              <button
                class="btn w-50"
                @click="toggleFilter('endpoint', 'cup')"
                :class="
                  requestsStore.filters['endpoint']['cup'] ? 'btn-primary' : 'btn-outline-primary'
                "
              >
                CUP
              </button>
            </div>
          </div>
        </template>
      </BaseBlock>
    </div>
  </div>
</template>

<style scoped>
.form-block .form-check-input:checked ~ .form-check-label::before {
  display: none !important;
}

.form-block .form-check-input:checked ~ .form-check-label {
  background-color: #f6f6f6;
  border-color: #f6f6f6;
  color: #000;
}
</style>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRequestsStore } from '@/stores/requestsStore'
import throttle from 'lodash/throttle'
import dayjs from 'dayjs'
import router from '@/router'

const requestsStore = useRequestsStore()

let offcanvas = null

const searchInputModel = ref('')

const goToRequestShow = (request) => {
  const uuid = request.parent_uuid ? request.parent_uuid : request.uuid
  let bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas)
  bsOffcanvas.hide()
  router.push({ name: 'request-show', params: { uuid: uuid } })
}

const resetSearchInput = () => {
  searchInputModel.value = ''
  requestsStore.resetSearchResult()
}

watch(
  searchInputModel,
  throttle((value) => {
    if (value === '') {
      requestsStore.searchResult = null
      return
    }
    requestsStore.searchRequests(value)
  }, 500)
)
onMounted(() => {
  offcanvas = document.getElementById('searchOffcanvas')

  offcanvas.addEventListener('shown.bs.offcanvas', function () {
    document.getElementById('searchInput').focus()
  })

  offcanvas.addEventListener('hide.bs.offcanvas', function () {
    requestsStore.resetSearchResult()
    searchInputModel.value = ''
  })
})
</script>

<template>
  <div
    class="offcanvas offcanvas-top bg-body-extra-light"
    tabindex="-1"
    id="searchOffcanvas"
    aria-labelledby="searchOffcanvasLabel"
  >
    <div class="offcanvas-header bg-body-light">
      <div class="input-group w-75">
        <input
          type="text"
          class="form-control form-control-alt"
          :placeholder="$t('request.searchPlaceholder')"
          id="searchInput"
          name="searchInput"
          v-model="searchInputModel"
        />
        <button class="btn btn-sm btn-outline-primary" @click="resetSearchInput()">
          <i class="fa fa-delete-left"></i>
        </button>
      </div>

      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <table class="table table-bordered table-striped table-vcenter">
        <thead>
          <tr>
            <th class="text-center">
              <i class="si si-directions"></i>
            </th>
            <th class="d-none d-md-table-cell">Endpoint</th>
            <th class="d-table-cell d-md-none">
              Endpoint
              <hr />
              {{ $t('request.id_request') }}
            </th>
            <th class="d-none d-md-table-cell">uuId</th>
            <th class="d-none d-md-table-cell">{{ $t('request.id_event') }}</th>
            <th class="d-none d-md-table-cell">{{ $t('request.id_request') }}</th>
            <th class="d-none d-md-table-cell">{{ $t('request.id_activity') }}</th>
            <th class="d-none d-md-table-cell">{{ $t('request.id_appointment') }}</th>
            <th class="text-center">{{ $t('pages.requests.startedAt') }}</th>
          </tr>
        </thead>
        <tbody v-if="!requestsStore.isLoading">
          <tr v-for="request in requestsStore.searchResult" :key="request.id">
            <td class="text-center">
              <button
                class="btn"
                :class="requestsStore.getStatusColor(request.response_status, 'btn')"
                @click="goToRequestShow(request)"
              >
                <i :class="requestsStore.getDirectionIcon(request.direction)"></i>
              </button>
            </td>
            <td class="fw-semibold fs-sm">
              {{ request.endpoint }}
            </td>
            <td class="d-none d-md-table-cell fs-sm">
              <em class="">{{ request.uuid }}</em>
            </td>
            <td class="d-none d-md-table-cell fs-sm">
              <em class="">{{ request.id_evento }}</em>
            </td>
            <td class="d-none d-md-table-cell fs-sm">
              <em class="">{{ request.id_richiesta }}</em>
            </td>
            <td class="d-none d-md-table-cell fs-sm">
              <em class="">{{ request.id_attivita }}</em>
            </td>
            <td class="d-none d-md-table-cell fs-sm">
              <em class="">{{ request.id_appuntamento }}</em>
            </td>

            <td class="text-center">
              {{ dayjs(request.started_at).format('DD/MM/YYYY HH:mm:ss') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.offcanvas {
  height: 60vh !important;
}
</style>

<script setup>
import { useRequestsStore } from '@/stores/requestsStore'

import LoadingIcon from '@/components/LoadingIcon.vue'

const requestsStore = useRequestsStore()
</script>

<template>
  <div
    class="offcanvas offcanvas-end bg-body-extra-light"
    tabindex="-1"
    id="RequestDetailsOffcanvas"
    aria-labelledby="RequestDetailsOffcanvasLabel"
  >
    <div class="offcanvas-header bg-body-light">
      <h5 class="offcanvas-title" id="RequestDetailsOffcanvasLabel">
        {{ $t('pages.requestShow.requestDetails') }}
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>

    <div class="p-6 text-center" v-show="requestsStore.getIsLoadingRequest">
      <i class="fa fa-3x fa-cog fa-spin"></i>
    </div>

    <div class="offcanvas-body" v-if="!requestsStore.getIsLoadingRequest && requestsStore.request">
      <div class="">
        <div class="title">{{ $t('filters.direction.title') }}:</div>
        <div class="">{{ $t('filters.direction.' + requestsStore.request.direction) }}</div>
      </div>
      <div class="">
        <div class="title">{{ $t('filters.status.title') }}:</div>
        <div class="">
          {{ $t('filters.status.' + requestsStore.request.response_status) }}
        </div>
      </div>
      <div class="">
        <div class="title">endpoint:</div>
        <div class="">{{ requestsStore.request.endpoint }}</div>
      </div>

      <div class="">
        <div class="title">uuid:</div>
        <div class="">{{ requestsStore.request.uuid }}</div>
      </div>

      <div class="">
        <div class="title">{{ $t('request.id_event') }}:</div>
        <div class="">{{ requestsStore.request.id_evento }}</div>
      </div>
      <div class="">
        <div class="title">{{ $t('request.id_request') }}:</div>
        <div class="">{{ requestsStore.request.id_richiesta }}</div>
      </div>
      <div class="">
        <div class="title">{{ $t('request.id_activity') }}:</div>
        <div class="">{{ requestsStore.request.id_attivita }}</div>
      </div>
      <div class="">
        <div class="title">{{ $t('request.id_appointment') }}:</div>
        <div class="">{{ requestsStore.request.id_appuntamento }}</div>
      </div>

      <hr />
      <BaseBlock
        :title="$t('request.he_request')"
        btn-option-content
        mode-content-hide
        class="col-12 mt-4"
      >
        <p>
          {{ requestsStore.request.request_headers }}
        </p>
      </BaseBlock>
      <BaseBlock
        :title="$t('request.bo_request')"
        btn-option-content
        mode-content-hide
        class="col-12 mt-4"
      >
        <p>
          {{ requestsStore.request.request_body }}
        </p>
      </BaseBlock>
      <hr />
      <BaseBlock
        :title="$t('request.he_response')"
        btn-option-content
        mode-content-hide
        class="col-12 mt-4"
      >
        <p>
          {{ requestsStore.request.response_headers }}
        </p>
      </BaseBlock>
      <BaseBlock
        :title="$t('request.bo_response')"
        btn-option-content
        mode-content-hide
        class="col-12 mt-4"
      >
        <p>
          {{ requestsStore.request.response_body }}
        </p>
      </BaseBlock>
    </div>
  </div>
</template>

<style scoped>
.offcanvas {
  width: 650px !important;
}
.row {
  margin-bottom: 10px;
}
.title {
  text-transform: uppercase;
  font-weight: bold;
}

.title + div {
  padding-left: 15px;
  margin-bottom: 20px;
}

p {
  overflow-wrap: break-word;
}
</style>

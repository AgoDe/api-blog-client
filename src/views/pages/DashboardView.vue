<script setup>
import { ref, watchEffect, onMounted, watch } from 'vue'
import dayjs from 'dayjs'

import router from '@/router'
import LoadingIcon from '@/components/LoadingIcon.vue'


</script>

<template>
  <!-- Hero -->
  <div class="content">
    <div
      class="d-flex flex-column justify-content-md-between align-items-md-center py-2 text-center"
    >
      <div class="flex-grow-1 mb-1 mb-md-0">
        <h1 class="h3 fw-bold mb-2">{{ $t('pages.dashboard.title') }}</h1>
      </div>
    </div>

    
  </div>
  <!-- END Hero -->
  <!-- Page Content -->

  <!-- END Page Content -->

</template>

<!-- PEND blue fa fa-business-time  fa-circle-notch fa-clock-rotate-left-->
<!-- OK green fa fa-check -->
<!-- FAIL red fa fa-xmark -->
<!-- KO yellow fa fa-exclamation -->

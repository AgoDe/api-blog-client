<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  request: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['openRequestDetails'])

const openOffcanvas = () => {
  emits.openRequestDetails(props.request)
}

const getDirectionIcon = (direction) => {
  if (direction === 'IN') {
    return 'fa fa-arrow-right-to-bracket'
  } else if (direction === 'OUT') {
    return 'fa fa-arrow-right-from-bracket'
  }
}

const getStatusColor = (status, element) => {
  switch (status) {
    case 'OK':
      return element + '-success'
      break
    case 'ERR':
      return element + '-danger'
      break
    case 'KO':
      return element + '-warning'
      break
    case 'PEND':
      return element + '-primary'
      break
  }
}

const getDate = (request) => {
  const date = dayjs(request.started_at).format('DD/MM/YYYY HH:mm:ss').toString()

  // if (request.ended_at != null) {
  //   return date + ' -> ' + dayjs(request.ended_at).format('DD/MM/YYYY HH:mm:ss').toString()
  // }

  return date
}
</script>

<template>
  <div
    class="timeline-event-icon"
    :class="getStatusColor(props.request.response_status, 'bg')"
    @click="$emit('openRequestDetails', props.request)"
  >
    <i :class="getDirectionIcon(props.request.direction)"></i>
  </div>
  <BaseBlock
    :title="getDate(props.request)"
    class="timeline-event-block js-appear-enabled animated fadeIn"
    @click="$emit('openRequestDetails', props.request)"
  >
    <div class="d-flex fs-sm">
      <div class="flex-grow-1">
        <p><strong>UUID: </strong> {{ props.request.uuid }}</p>
        <p><strong>ENDPOINT: </strong> {{ props.request.endpoint }}</p>
        <p>
          <strong>{{ $t('request.id_event') }}: </strong> {{ props.request.id_evento }}
        </p>
        <p>
          <strong>{{ $t('request.id_request') }}: </strong>
          {{ props.request.id_richiesta }}
        </p>
        <p>
          <strong>{{ $t('request.id_activity') }}: </strong>
          {{ props.request.id_attivita }}
        </p>
        <p>
          <strong>{{ $t('request.id_appointment') }}: </strong>
          {{ props.request.id_appuntamento }}
        </p>
      </div>
    </div>
  </BaseBlock>
</template>

<style>
.timeline-event-icon,
.timeline-event-block {
  cursor: pointer;
}
</style>

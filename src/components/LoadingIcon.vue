<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  store : Object
})

</script>

<template>
  <div class="p-6 text-center" v-show="props.store.getIsLoading">
    <i class="fa fa-3x fa-cog fa-spin"></i>
  </div>
</template>

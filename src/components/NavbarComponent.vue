<script setup>
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore'
import { useAuthStore } from '@/stores/auth.js'

// Main store and Route
const router = useRouter()
const authStore = useAuthStore()

const isActive = false
</script>

<template>
  <ul class="nav-main">
    <li class="nav-main-heading">
      {{ $t('menu.user') }}
    </li>
    <li class="nav-main-item">
      <a href="" class="nav-main-link" @click.prevent="authStore.logout()">
        <i class="nav-main-link-icon fa fa-power-off"></i>
        <span class="nav-main-link-name">
          {{ $t('menu.logout') }}
        </span>
      </a>
    </li>
    
  </ul>
</template>

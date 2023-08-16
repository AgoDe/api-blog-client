<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSessionStore } from '@/stores/sessionStore'

import { useAuthStore } from '@/stores/auth.js'

// Vuelidate, for more info and examples you can check out https://github.com/vuelidate/vuelidate
import useVuelidate from '@vuelidate/core'
import { required, email } from '@/utils/i18n-validators'

// Main store and Router

const router = useRouter()
const sessionStore = useSessionStore()
const authStore = useAuthStore()

const credentials = ref({
  email: null,
  password: null
})

// Validation rules
const rules = computed(() => {
  return {
    email: {
      required,
      email
    },
    password: {
      required
    }
  }
})

// Use vuelidate
const v$ = useVuelidate(rules, credentials)

// On form submission
async function onSubmit() {
  const validation = await v$.value.$validate()

  if (!validation) {
    // notify user form is invali
    return
  }

  const data = {
    
    email: credentials.value.email,
    password: credentials.value.password
    
  }

  await authStore.login(data)
}
</script>

<template>
  <form @submit.prevent="onSubmit()">
    <div class="mb-4">
      <input
        type="text"
        class="form-control form-control-lg form-control-alt py-3"
        id="login-email"
        name="login-email"
        placeholder="email"
        :class="{
          'is-invalid': v$.email.$errors.length
        }"
        v-model="credentials.email"
        @blur="v$.email.$touch"
      />
      <div v-if="v$.email.$errors.length" class="invalid-feedback animated fadeIn">
        {{ v$.email.$errors[0].$message }}
      </div>
    </div>
    <div class="mb-4">
      <input
        type="password"
        class="form-control form-control-lg form-control-alt py-3"
        id="login-password"
        name="login-password"
        placeholder="Password"
        :class="{
          'is-invalid': v$.password.$errors.length
        }"
        v-model="credentials.password"
        @blur="v$.password.$touch"
      />
      <div v-if="v$.password.$errors.length" class="invalid-feedback animated fadeIn">
        {{ v$.password.$errors[0].$message }}
      </div>
    </div>
    <div class="text-center mb-4">
      <div>
        <button
          type="submit"
          class="btn btn-lg btn-alt-primary"
          v-show="!sessionStore.getIsLoading"
        >
          <i class="fa fa-fw fa-sign-in-alt me-1 opacity-50"></i>
          {{ $t('auth.signin') }}
        </button>
        <button class="btn btn-lg btn-alt-primary" v-show="sessionStore.getIsLoading">
          <i class="fa fa-cog fa-spin"></i>
        </button>
      </div>
    </div>
  </form>
</template>

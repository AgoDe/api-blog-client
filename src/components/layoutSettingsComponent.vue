<script setup>
import { ref, watch, onMounted } from 'vue'
import { useTemplateStore } from '@/stores/template'
import SimpleBar from 'simplebar'
import { useI18n } from 'vue-i18n'

// Main store
const store = useTemplateStore()

const { t, locale } = useI18n()

// Dark Mode preference helper for radios
const radioDarkMode = ref()

// Locale preference helper for radios
const radioLocale = ref()

// Sets default dark mode preferences for radios
function setDarkModeRadioDefault() {
  if (store.settings.darkModeSystem) {
    radioDarkMode.value = 'system'
  } else {
    if (store.settings.darkMode) {
      radioDarkMode.value = 'dark'
    } else {
      radioDarkMode.value = 'light'
    }
  }
}

// When the user sets dark mode preference through the radios
function onDarkModeRadioChange() {
  if (radioDarkMode.value === 'system') {
    store.darkModeSystem({ mode: 'on' })
  } else {
    store.darkModeSystem({ mode: 'off' })

    if (radioDarkMode.value === 'dark') {
      store.darkMode({ mode: 'on' })
    } else {
      store.darkMode({ mode: 'off' })
    }
  }
}

function setLocaleDefault() {
  if (locale.value === 'en') {
    radioLocale.value = 'en'
  } else if (locale.value === 'it') {
    radioLocale.value = 'it'
  }
}

function onLocaleChange() {
  if (radioLocale.value === 'en') {
    locale.value = 'en'
  } else if (radioLocale.value === 'it') {
    locale.value = 'it'
  }
}

// Set dark mode preference radios default and watch for changes to store
setDarkModeRadioDefault()
setLocaleDefault()
watch(
  () => store.settings.darkModeSystem,
  () => {
    setDarkModeRadioDefault()
  }
)
watch(
  () => store.settings.darkMode,
  () => {
    setDarkModeRadioDefault()
  }
)

// Init SimpleBar (custom scrolling)
onMounted(() => {
  new SimpleBar(document.getElementById('simplebar-sidebar'))
})
</script>

<template>
  <!-- sidebar Mini -->
  <button
    type="button"
    class="btn btn-sm btn-alt-secondary d-none d-lg-block"
    @click="store.sidebarMini({ mode: 'toggle' })"
  >
    <i class="fa fa-fw fa-ellipsis-v"></i>
  </button>

  <!-- dark mode select -->
  <div class="dropdown d-inline-block mx-1">
    <button
      type="button"
      class="btn btn-sm btn-alt-secondary"
      id="sidebar-dark-mode-dropdown"
      data-bs-toggle="dropdown"
      data-bs-auto-close="outside"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i v-if="!store.settings.darkMode" class="far fa-fw fa-moon"></i>
      <i v-if="store.settings.darkMode" class="fa fa-fw fa-moon"></i>
    </button>
    <div
      class="dropdown-menu dropdown-menu-end dropdown-menu fs-sm smini-hide border-0"
      style="min-width: 8rem"
      aria-labelledby="sidebar-dark-mode-dropdown"
    >
      <div class="px-3 py-2 space-y-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            id="radio-dark-mode-off"
            value="light"
            v-model="radioDarkMode"
            @change="onDarkModeRadioChange"
          />
          <label class="form-check-label fw-medium" for="radio-dark-mode-off">{{
            $t('theme.light')
          }}</label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            id="radio-dark-mode-on"
            value="dark"
            v-model="radioDarkMode"
            @change="onDarkModeRadioChange"
          />
          <label class="form-check-label fw-medium" for="radio-dark-mode-on">
            {{ $t('theme.dark') }}
          </label>
        </div>
        <div class="form-check mb-0">
          <input
            class="form-check-input"
            type="radio"
            id="radio-dark-mode-system"
            value="system"
            v-model="radioDarkMode"
            @change="onDarkModeRadioChange"
          />
          <label class="form-check-label fw-medium" for="radio-dark-mode-system">
            {{ $t('theme.system') }}
          </label>
        </div>
      </div>
    </div>
  </div>
  <!-- END dark mode select -->

  <!-- locale select -->
  <div class="dropdown d-inline-block mx-1">
    <button
      type="button"
      class="btn btn-sm btn-alt-secondary"
      id="locale-dropdown"
      data-bs-toggle="dropdown"
      data-bs-auto-close="outside"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <i class="fa fa-fw fa-language"></i>
    </button>
    <div
      class="dropdown-menu dropdown-menu-end dropdown-menu fs-sm smini-hide border-0"
      style="min-width: 8rem"
      aria-labelledby="locale-dropdown"
    >
      <div class="px-3 py-2 space-y-2">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            id="radio-locale-it"
            value="it"
            v-model="radioLocale"
            @change="onLocaleChange"
          />
          <label class="form-check-label fw-medium" for="radio-locale-it"> Italiano </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            id="radio-locale-en"
            value="en"
            v-model="radioLocale"
            @change="onLocaleChange"
          />
          <label class="form-check-label fw-medium" for="radio-locale-en">English</label>
        </div>
      </div>
    </div>
  </div>
  <!-- END locale select -->
</template>

<style scoped>
.w_20 {
  width: 20px;
}
</style>

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'

// You can use the following starter router instead of the default one as a clean starting point
import router from './router'
import i18n from './i18n'

// Template components
import BaseBlock from '@/components/BaseBlock.vue'
import BaseBackground from '@/components/BaseBackground.vue'
import BasePageHeading from '@/components/BasePageHeading.vue'

// Template directives
import clickRipple from '@/directives/clickRipple'

// Bootstrap framework
import * as bootstrap from 'bootstrap'
window.bootstrap = bootstrap

import { useSessionStore } from '@/stores/sessionStore'

// Craft new application
const app = createApp(App)

const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router)
})
pinia.use(piniaPluginPersistedstate)

// Register global components
app.component('BaseBlock', BaseBlock)
app.component('BaseBackground', BaseBackground)
app.component('BasePageHeading', BasePageHeading)

// Register global directives
app.directive('click-ripple', clickRipple)

// Use Pinia and Vue Router
app.use(i18n)
app.use(pinia)
app.use(router)

// ..and finally mount it!
app.mount('#app')

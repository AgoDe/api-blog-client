import { createI18n } from 'vue-i18n'
import it from './it.js'
import en from './en.js'

const messages = {
  it: it,
  en: en
}

const i18n = createI18n({
  legacy: false,
  locale: 'it',
  fallbackLocale: 'it',
  messages: messages
})

export default i18n
1

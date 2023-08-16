import i18n from '@/i18n'
import Swal from 'sweetalert2'
import router from '@/router'
import { useSessionStore } from '@/stores/sessionStore'

const toast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  Toast.fire({
    icon: icon,
    title: i18n.global.t('alert.' + title)
  })
}

const redirectAlert = (icon, title, text, button, destination = null) => {
  const sessionStore = useSessionStore()
  Swal.fire({
    icon: icon,
    title: i18n.global.t('alert.' + title),
    text: i18n.global.t('alert.' + text),
    confirmButtonText: i18n.global.t('alert.' + button),
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterKey: true
  }).then(() => {
    sessionStore.resetUserInfo()
    router.push({ name: destination })
  })
}

const simpleAlert = (icon, title, text) => {
  Swal.fire({
    icon: icon,
    title: i18n.global.t('alert.' + title),
    text: i18n.global.t('alert.' + text)
  })
}

export default { toast, redirectAlert, simpleAlert }

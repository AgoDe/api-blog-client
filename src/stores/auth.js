import { defineStore } from 'pinia'
// import router from '@/router'
import { useRouter } from 'vue-router'
import alertHelper from '@/helpers/alertHelper'
import { useUserStore } from '@/stores/user.js'
import { useApi } from '@/api/useAPI'
const web = useApi('web')

export const useAuthStore = defineStore({
	id: 'auth',

	state: () =>
		JSON.parse(localStorage.getItem('AUTH_STATE')) ?? {
			email: null,
			isLoggedIn: false,
		},

	actions: {
		updateState(payload) {
			let newUserState = { ...this.$state, ...payload }
			localStorage.removeItem('AUTH_STATE')
			localStorage.setItem('AUTH_STATE', JSON.stringify(newUserState))
			this.$reset()
		},
		async login({ email, password }) {
			const user = useUserStore()
			try {
				await web.post('/login', { email, password })
				this.updateState({ email, isLoggedIn: true })
				await user.storeInfo()
				alertHelper.toast('success', 'login.success')
				this.router.push({ name: 'dashboard' })
			} catch (error) {
				
				if(error.response?.status == 422) {
					alertHelper.simpleAlert('error', 'login.failed', 'login.failed_text')
				} else {
					alertHelper.redirectAlert(
						'error',
						'server_error.title',
						'server_error.message',
						'server_error.button',
						'login'
					  )
				}
			}
		},
		async register(props) {
			const user = useUserStore()
			try {
				await web.post('/register', props)
				this.updateState({ email: props.email, isLoggedIn: true })
				await user.storeInfo()
			} catch (error) {
				console.log('Error at register: ', error.message)
				throw error
			}
		},
		async forgotPassword({ email }) {
			try {
				await web.post('/forgot-password', { email })
			} catch (error) {
				console.log('ERROR WITH FORGOT-PASSWORD ENDPOINT: ', error.message)
				throw error
			}
		},

		async logout() {
			const user = useUserStore()
			const router = useRouter()
			localStorage.clear() // always clean localStorage before reset the state
			this.$reset()
			user.$reset()

			try {
				await web.post('/logout')
				await router.push({ name: 'login' })
			} catch (error) {
				window.location.pathname = '/login'
			}
		},
	},
})

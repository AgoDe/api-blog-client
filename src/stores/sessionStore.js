import { defineStore } from 'pinia'
import axios from 'axios'
import { useTemplateStore } from '@/stores/template'
import alertHelper from '@/helpers/alertHelper'
import axiosRequests from '@/helpers/axiosRequests'

const baseUrl = (import.meta.env.VITE_API_URL || '<<ENV_BASE_URL>>')

axios.defaults.withCredentials = true

export const useSessionStore = defineStore({
  id: 'session',

  state: () => ({
    user: {},
    authenticated: false,
    isLoading: false,
    template: useTemplateStore()
  }),
  
  persist: true,

  actions: {

    async getUserInfo() {
      
      await axiosRequests.fetch('/api/user')
        .then((res) => {
          this.authenticated = true
          this.user = res
          
        })
        .catch(() => {
          this.authenticated = false
          this.user = {}
        } )

      
    },

    resetUserInfo() {
      this.authenticated = false 
      this.user = {}
    },

    async userLogin(data) {

      await axiosRequests.fetch('sanctum/csrf-cookie')
      await axiosRequests.login(data)
      await this.getUserInfo()

      alertHelper.toast('success', 'login.success')
      this.router.push({ name: 'dashboard' })

    },

    async userLogout() {

      await axiosRequests.post('logout')
     
      this.resetUserInfo()
      alertHelper.toast('success', 'logout.success')
      this.router.push({ name: 'login' })
       
    },


    setUserSettings() {
      const data = {
        user_setting: {
          user_id: this.user.id,
          dark_mode: this.template.settings.darkMode,
          dark_mode_system: this.template.settings.darkModeSystem,
          sidebar_mini: this.template.settings.sidebarMini
        }
      }

      axios.post(`${baseUrl}/set_user_settings`, data)
    },

    setAuthToken(token) {
      this.auth_token = token
    }
  },
  getters: {
    getAuthToken() {
      return this.auth_token
    },
    getUserID(state) {
      return state.user?.id
    },
    getUserEmail(state) {
      return state.user?.email
    },
    isLoggedIn(state) {
      return state.auth_token ? true : false
    },
    getIsLoading(state) {
      return state.isLoading
    }
  },

  
})

import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { useSessionStore } from '@/stores/sessionStore'
import axios from 'axios'

import axiosRequests from '@/helpers/axiosRequests'

// for use router in store // this.router

const baseUrl = '/request_logs'

export const useRequestsStore = defineStore({
  id: 'requests',

  state: () => ({
    sessionStore: useSessionStore(),

    isLoading: false,

    isLoadingRequest: false,

    request: null,

    requests: [],

    childrenRequests: [],

    activeFilters: [],

    searchResult: [],

    filters: {
      direction: {
        outbound: false,
        inbound: false
      },
      status: {
        OK: false,
        KO: false,
        ERR: false,
        PEND: false
      },
      date: {
        from: null,
        to: null
      },
      endpoint: {
        sybil: false,
        cup: false
      }
    },

    periodFilters: ['oneHour', 'sixHours', 'oneDay', 'oneWeek', 'oneMonth'],

    periodSelectModel: 'oneDay'
  }), // END of state

  actions: {
    //fetching requests from API
    async fetchRequests() {
      this.isLoading = true
      const query = this.setQueryFilters()
      const path = `${baseUrl}?${query}`
      let res = await axiosRequests.fetch(path)
      this.requests = res.data
      this.isLoading = false
    },

    async fetchRequestShow(uuid) {
      this.isLoading = true
      const path = `${baseUrl}/children_requests/${uuid}`

      let res = await axiosRequests.fetch(path)

      this.childrenRequests = res.data

      this.isLoading = false
    },

    async fetchRequest(id, direction) {
      this.isLoadingRequest = true
      const path = `${baseUrl}/${id}?direction=${direction}`
      let res = await axiosRequests.fetch(path)
      this.request = res.data
      this.isLoadingRequest = false
    },

    // search filter
    async searchRequests(search) {
      this.isLoading = true
      const path = `${baseUrl}?search=${search}`

      let res = await axiosRequests.fetch(path)
      this.searchResult = res.data

      this.isLoading = false
    },

    reprocessRequest(id) {
      const path = `${baseUrl}/reprocess/${id}`
      let res = axiosRequests.fetch(path)
      this.router.push({ name: 'requests' })
      // todo: redirect to requests
    },

    // set filters

    setFilter(filter, value, toggle = true) {
      if (toggle) {
        this.filters[filter][value] = !this.filters[filter][value]
      } else {
        this.filters[filter][value] = true
      }
    },

    setQueryFilters() {
      let query = ''

      this.filters.direction.outbound ? (query += 'direction[]=OUT&') : null
      this.filters.direction.inbound ? (query += 'direction[]=IN&') : null
      this.filters.status.OK ? (query += 'status[]=OK&') : null
      this.filters.status.KO ? (query += 'status[]=KO&') : null
      this.filters.status.ERR ? (query += 'status[]=ERR&') : null
      this.filters.status.PEND ? (query += 'status[]=PEND&') : null
      this.filters.endpoint.sybil ? (query += 'endpoint[]=sybil&') : null
      this.filters.endpoint.cup ? (query += 'endpoint[]=cup_pie&') : null
      this.filters.date.from ? (query += 't_from=' + this.filters.date.from + '&') : null
      this.filters.date.to ? (query += 't_to=' + this.filters.date.to + '&') : null

      return query
    },

    setPeriodFilter() {
      switch (this.periodSelectModel) {
        case 'oneHour':
          this.filters.date.from = dayjs().subtract(1, 'hour').format('YYYY-MM-DD HH:mm:ss')
          break

        case 'sixHours':
          this.filters.date.from = dayjs().subtract(6, 'hour').format('YYYY-MM-DD HH:mm:ss')
          break

        case 'oneDay':
          this.filters.date.from = dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss')
          break

        case 'oneWeek':
          this.filters.date.from = dayjs().subtract(1, 'week').format('YYYY-MM-DD HH:mm:ss')
          break

        case 'oneMonth':
          this.filters.date.from = dayjs().subtract(1, 'month').format('YYYY-MM-DD HH:mm:ss')
          break

        case 'selectDate':
          this.filters.date.from = null
          this.filters.date.to = dayjs().format('YYYY-MM-DD HH:mm:ss')
          break
      }
    },

    setDateTimeFilter(dateTime) {
      console.log(dateTime)

      if (dateTime.from == null) {
        this.filters.date.from = null
      } else {
        this.filters.date.from = dateTime.from
      }

      if (dateTime.to == null) {
        this.filters.date.to = null
      } else {
        this.filters.date.to = dateTime.to
      }
    },

    // reset filters

    resetFilters() {
      this.filters.direction.outbound = false
      this.filters.direction.inbound = false
      this.filters.status.OK = false
      this.filters.status.KO = false
      this.filters.status.ERR = false
      this.filters.status.PEND = false
      this.filters.endpoint.sybil = false
      this.filters.endpoint.cup = false
      // this.filters.date.from = null
      // this.filters.date.to = null
    },

    resetFilter(filter, value) {
      if (filter === 'date') {
        this.filters[filter][value] = null
        return
      }
      this.filters[filter][value] = false
    },

    resetDateFilters() {
      this.filters.date.from = null
      this.filters.date.to = null
    },

    resetDatePicker(date) {
      this.filters.date[date] = null
    },

    resetSearchResult() {
      this.searchResult = []
    }
  }, // END of actions
  getters: {
    getRequests: (state) => {
      return state.requests
    },

    getStatusColor: (state) => {
      return (status, element) => {
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
    },

    getStatusIcon: (state) => {
      return (status) => {
        switch (status) {
          case 'OK':
            return 'fa-check'
            break
          case 'ERR':
            return 'fa-xmark'
            break
          case 'KO':
            return 'fa-exclamation'
            break
          case 'PEND':
            return 'fa-clock-rotate-left'
            break
        }
      }
    },

    getDirectionIcon: (state) => {
      return (direction) => {
        if (direction === 'IN') {
          return 'fa fa-arrow-right-to-bracket'
        } else {
          return 'fa fa-arrow-right-from-bracket'
        }
      }
    },

    getRequestsCount: (state) => {
      return state.requests.length
    },

    getRequestsCountByStatus: (state) => {
      return (status) =>
        state.requests.filter((request) => request.response_status === status).length
    },

    getFilters: (state) => {
      return state.filters
    },

    getActiveFilters: (state) => {
      state.activeFilters = []
      Object.keys(state.filters).forEach((key) => {
        Object.keys(state.filters[key]).forEach((value) => {
          if (state.filters[key][value]) {
            state.activeFilters.push([key, value])
          }
        })
      })

      return state.activeFilters
    },

    getDateError: (state) => {
      if (state.filters.date.from > state.filters.date.to) {
        return 'fromBeforeTo'
      }
    },

    getAuthToken: (state) => {
      return state.sessionStore.auth_token
    },

    getIsLoading: (state) => {
      return state.isLoading
    },

    getIsLoadingRequest: (state) => {
      return state.isLoadingRequest
    }
  }
})


import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { useApi } from '@/api/useAPI'
// for use router in store // this.router

const api = useApi()


export const usePostStore = defineStore({
  id: 'post',

  state: () => ({
    isLoading: false,

    isLoadingPost: false,

    post: null,

    posts: [],

    activeFilters: [],

    searchResult: [],

    filters: {
      date: {
        from: null,
        to: null
      },
    },

  }), // END of state

  actions: {
    //fetching requests from API


    async index() {
      this.isLoading = true
      //const query = this.setQueryFilters()
      //const path = `${baseUrl}?${query}`
      await api.get('posts')
        .then((res) => this.posts = res.data )
        .finally(() => this.isLoading = false )
      
      
    },

    async show(slug) {
        this.isLoading = true
        await api.get(`posts/${slug}`)
            .then((res) => this.post = res.data)
            .finally(() => this.isLoading = false )
        
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
    },
  }, // END of actions
  getters: {
    getPosts: (state) => {
      return state.posts
    },

    getPostsCount: (state) => {
      return state.posts.length
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

    getIsLoading: (state) => {
      return state.isLoading
    },

    getIsLoadingRequest: (state) => {
      return state.isLoadingRequest
    },
  }
})

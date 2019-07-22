<template>
  <v-text-field name="search" label="search" id="search" prepend-icon="search" clearable v-model="searchInput"
                @click:prepend="search()" :loading="loadingSearch" @keyup.enter="search">
  </v-text-field>
</template>

<script>
import tmdbService from '../services/tmdbService'
// import config from '../conf'
// import _ from 'lodash'

export default {
  props: ['type', 'mediadata'],
  data () {
    return {
      searchInput: '',
      searchResults: [],
      loadingSearch: false
    }
  },
  methods: {
    search: function () {
      this.loadingSearch = true
      tmdbService.searchTvShows(this.searchInput, 'en-US')
        .then((response) => {
          this.searchResults = response.data
          this.loadingSearch = false
          this.router.push({ name: 'search', query: { q: this.searchInput } })
        })
        .catch(function (error) {
          console.log(error)
        })

    }
  },
  computed: {

  }
}
</script>
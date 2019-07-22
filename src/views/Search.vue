<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout justify-start row wrap fill-height>
      <v-flex xs6 sm4 md2 v-for="show in shows.results" v-bind:key="show.id">
        <CardSeriesMoviesGrid type="series" :mediadata="show" />
      </v-flex>
      <v-flex xs12 text-sm-center>
        <!-- <v-pagination v-model="shows.page" :length="shows.total_pages" :total-visible="5"
                      @input="getPopularShows('en-us',shows.page)" @next="getPopularShows('en-us',shows.page)"
                      @previous="getPopularShows('en-us',shows.page)">
        </v-pagination> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import tmdbService from '../services/tmdbService'
import CardSeriesMoviesGrid from '../components/CardSeriesMoviesGrid'
export default {
  props: ['mediadata'],
  components: {
    CardSeriesMoviesGrid
  },
  data: () => ({
    shows: {}
  }),
  mounted: function () {
    this.getSearchShows('en-us')
  },
  methods: {
    getSearchShows (lang) {
      let query = this.$route.query.q
      tmdbService.searchTvShows(query, lang)
        .then((response) => {
          // handle success
          this.shows = response.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
  },
  watch: {
    '$route.query.q' () {
      this.getSearchShows()
    }
  }
}
</script>

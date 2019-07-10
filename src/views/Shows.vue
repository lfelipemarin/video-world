<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout justify-start row wrap fill-height>
      <v-flex xs6 sm4 md2 v-for="show in shows.results" v-bind:key="show.id">
        <CardSeriesMoviesGrid type="series" :mediadata="show" />
      </v-flex>
      <v-flex xs12 text-sm-center>
        <v-pagination v-model="shows.page" :length="shows.total_pages" :total-visible="5"
                      @input="getPopularShows('en-us',shows.page)" @next="getPopularShows('en-us',shows.page)"
                      @previous="getPopularShows('en-us',shows.page)">
        </v-pagination>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import tmdbService from '../services/tmdbService'
import CardSeriesMoviesGrid from '../components/CardSeriesMoviesGrid'
export default {
  components: {
    CardSeriesMoviesGrid
  },
  data: () => ({
    shows: {}
  }),
  mounted: function () {
    this.getPopularShows('en-us', 1)
  },
  methods: {
    getPopularShows (lang, page) {
      tmdbService.getPopularShows(lang, page)
        .then((response) => {
          // handle success
          this.shows = response.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    }
  }
}
</script>

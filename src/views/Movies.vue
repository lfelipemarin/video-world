<template>
  <v-container>
    <v-flex xs12 sm6 offset-sm3>
      About
    </v-flex>
  </v-container>
</template>

<script>
import tmdbService from '../services/tmdbService'
export default {
  components: {
  },
  data: () => ({
    movies: null
  }),
  mounted: function () {
    tmdbService.getPopularShows('en-us', 1)
      .then((response) => {
        // handle success
        this.movies = response.data
      })
      .catch(function (error) {
        // handle error
        console.log(error)
      })
  },
  methods: {
    getPopularMovies () {

    }
  }
}
</script>

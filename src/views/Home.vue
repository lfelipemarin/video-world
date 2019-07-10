<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout align-center justify-center row fill-height>
      <CardSeriesMoviesHome type="movies" />
      <CardSeriesMoviesHome type="series" />
    </v-layout>
  </v-container>
</template>

<script>
import CardSeriesMoviesHome from '../components/CardSeriesMoviesHome'

export default {
  components: {
    CardSeriesMoviesHome
  }
}
</script>

<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout align-center justify-center row fill-height>
      <CardSeriesMovies />
      <CardSeriesMovies />
    </v-layout>
  </v-container>
</template>

<script>
import CardSeriesMovies from '../components/CardSeriesMovies'

export default {
  components: {
    CardSeriesMovies
  }
}
</script>

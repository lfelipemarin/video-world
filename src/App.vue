<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <v-list dense>
        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon medium>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/shows">
          <v-list-tile-action>
            <v-icon medium>tv</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>TV Shows</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/movies">
          <v-list-tile-action>
            <v-icon medium>camera_roll</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Movies</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Video World</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs2>
        <v-text-field name="search" label="search" id="search" prepend-icon="search" clearable v-model="searchInput"
                      @click:prepend="search()" :loading="loadingSearch" @keyup.enter="search">
        </v-text-field>
      </v-flex>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer app fixed>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import tmdbService from './services/tmdbService'

export default {
  data: () => ({
    drawer: false,
    searchInput: '',
    searchResults: [],
    loadingSearch: false
  }),
  props: {
    source: String
  },
  methods: {
    search: function () {
      this.loadingSearch = true
      tmdbService.searchTvShows(this.searchInput, 'en-us')
        .then((response) => {
          this.searchResults = response.data
          this.loadingSearch = false
          this.$router.push({ name: 'search', query: { q: this.searchInput } })
          this.$forceUpdate()
        })
        .catch(function (error) {
          console.log(error)
        })

    }
  },
};
</script>

<style lang="scss">
</style>
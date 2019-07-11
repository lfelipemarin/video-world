<template>
  <v-container fluid>
    <v-layout justify-start row wrap>
      <v-flex xs12>
        <v-tabs v-model="model" centered color="cyan" slider-color="yellow">
          <v-tab to="#overview">
            Overview
          </v-tab>
          <v-tab v-for="season in details.seasons" :key="season.id" :to="`#${standardizeSeasonName(season.name)}`">
            {{ season.name }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="model">
          <v-tab-item value="overview">
            <v-card flat>
              <v-img :src="backdropImage" aspect-ratio="3.75"></v-img>
              <v-card-text>{{details.overview}}</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-for="season in details.seasons" :key="season.id" :value="standardizeSeasonName(season.name)">
            <v-card flat>
              <v-layout row wrap>
                <v-flex xs3>
                  <v-img :src="imagePath(season.poster_path)" aspect-ratio=".7" width="300px" contain></v-img>
                </v-flex>
                <v-flex xs9>
                  <v-card-text>{{ season.overview }}</v-card-text>
                </v-flex>
              </v-layout>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import tmdbService from '../services/tmdbService'
import config from '../conf'
import _ from 'lodash'

export default {
  components: {

  },
  data: () => ({
    id: 0,
    model: 'overview',
    details: {},
    backdropImage: '',
    active: null,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.'

  }),
  created () {
    this.id = this.$route.params.id
    this.getShowDetails('en-US', this.id)
    setTimeout(() => {
      this.backdropImage = config.imgApiConfig.baseUrl + 'original' + this.details.backdrop_path
    }, 300);
  },
  mounted () {
  },
  methods: {
    getShowDetails (lang, id) {
      tmdbService.getShowDetails(lang, id)
        .then((response) => {
          // handle success
          this.details = response.data
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    imagePath (posterPath) {
      return config.imgApiConfig.baseUrl + 'original' + posterPath
    },
    standardizeSeasonName (season) {
      return _.replace(season, / /g, '-')
    }

  },
  computed: {
    // imagePath: function (posterPath) {
    //   return config.imgApiConfig.baseUrl + 'w500' + posterPath
    // }
    // toRoute: function () {
    //   let dynamic = _.replace(this.mediadata.name, / /g, '-')
    //   return '/shows/' + this.mediadata.id + '/' + _.toLower(dynamic)
    // }
  }
}
</script>

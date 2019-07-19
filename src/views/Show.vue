<template>
  <v-container fluid>
    <v-layout justify-start row wrap>
      <v-flex xs12>
        <v-tabs v-model="model" centered color="cyan" slider-color="yellow">
          <v-tab to="#overview">
            Overview
          </v-tab>
          <v-tab v-for="season in details.seasons" :key="season.id" :to="`#season-${season.season_number}`">
            Season {{ season.season_number }}
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="model">
          <v-tab-item value="overview">
            <v-card flat>
              <v-img :src="backdropImage" aspect-ratio="3.75"></v-img>
              <v-card-text>{{details.overview}}</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-for="season in seasons" :key="season.id" :value="`season-${season.season_number}`">
            <v-card flat>
              <v-layout row wrap>
                <v-flex xs12 sm6 md3>
                  <v-img :src="imagePath(season.poster_path)" aspect-ratio=".7" contain></v-img>
                </v-flex>
                <v-flex xs12 sm6 md9>
                  <v-card-text>{{ season.overview }}</v-card-text>
                  <v-container grid-list-sm>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 md3 v-for="episode in season.episodes" :key="episode.id" justify-space-around
                              align-space-around>
                        <v-card>
                          <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px">
                          </v-img>

                          <v-card-title primary-title>
                            <div>
                              <div class="headline">Top western road trips</div>
                              <span class="grey--text">1,000 miles of wonder</span>
                            </div>
                          </v-card-title>
                          <v-card-actions>
                            <v-btn flat>Share</v-btn>
                            <v-btn flat color="purple">Explore</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn icon @click="showDescription(episode)">
                              <v-icon>{{ episode.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
                              </v-icon>
                            </v-btn>
                          </v-card-actions>
                          <v-slide-y-transition>
                            <v-card-text v-show="episode.show">
                              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't
                              have
                              time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go
                              with
                              that
                              data file! Hey, you add a one and two zeros to that or we walk! You're going to do his
                              laundry?
                              I've got to find a way to escape.
                            </v-card-text>
                          </v-slide-y-transition>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
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
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
    seasons: [],
  }),
  created () {
    this.id = this.$route.params.id
    this.getShowDetails('en-US', this.id)
  },
  mounted () {
    setTimeout(() => {
      this.backdropImage = config.imgApiConfig.baseUrl + 'original' + this.details.backdrop_path
      this.model = _.replace(this.$route.hash, '#', '')
    }, 300)
  },
  methods: {
    getShowDetails (lang, id) {
      tmdbService.getShowDetails(lang, id)
        .then((response) => {
          // handle success
          this.details = response.data
          this.getShowSeasons()
        })
        .catch(function (error) {
          // handle error
          console.log(error)
        })
    },
    getShowSeasons () {
      let eachSeason = {}
      _.forEach(this.details.seasons, (season) => {
        tmdbService.getShowSeasons(this.details.id, season.season_number, 'en-US')
          .then((response) => {
            eachSeason = response.data
            this.seasons.push(eachSeason)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
    },
    imagePath (posterPath) {
      return config.imgApiConfig.baseUrl + 'original' + posterPath
    },
    //Todo implement force update
    showDescription (episode) {
      episode.show = !episode.show
      this.$forceUpdate()
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
  },
  watch: {
    seasons: function (val) {
      _.forEach(val, (season) => {
        _.forEach(season.episodes, (episode) => {
          episode.show = false
        })
      })

    }
  }
}
</script>

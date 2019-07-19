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
              <v-img v-if="backdropImage" :src="backdropImage" aspect-ratio="3.75"></v-img>
              <v-card-text>{{details.overview}}</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item v-for="season in seasons" :key="season.id" :value="`season-${season.season_number}`">
            <v-card flat>
              <v-layout row wrap>
                <v-flex v-show="season.poster_path" xs12 sm6 md3>
                  <v-img :src="imagePath(season.poster_path)" aspect-ratio=".7" contain></v-img>
                  <v-card-text>{{ season.overview }}</v-card-text>
                </v-flex>
                <v-flex xs12 sm6 md9>
                  <v-container grid-list-sm>
                    <v-layout row wrap>
                      <v-flex xs12 sm6 md3 v-for="episode in season.episodes" :key="episode.id" justify-space-around
                              align-space-around>
                        <v-card>
                          <v-img v-show="episode.still_path" :src="imagePath(episode.still_path)" height="200px">
                          </v-img>
                          <v-card-title primary-title>
                            <div id="title-link">
                              <div class="headline" @click.stop="dialog = true"
                                   @click="goToMediaLink(details.name,season.season_number,episode.episode_number)">
                                {{episode.name}}</div>
                              <span class="grey--text">Air date: {{episode.air_date}}</span>
                            </div>
                          </v-card-title>
                          <v-card-actions>
                            <!-- <v-btn flat>Share</v-btn>
                            <v-btn flat color="purple">Explore</v-btn> -->
                            <v-spacer></v-spacer>
                            <v-btn icon @click="showDescription(episode)">
                              <v-icon>{{ episode.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}
                              </v-icon>
                            </v-btn>
                          </v-card-actions>
                          <v-slide-y-transition>
                            <v-card-text v-show="episode.show">
                              {{episode.overview}}
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
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="primary">
            <v-btn icon dark @click="closeIframe()">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark flat @click="dialog = false">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <iframe id="media-iframe" height="100%" width="100%" :src="mediaLink" name="iframe_media"
                  sandbox="allow-same-origin allow-scripts" allowfullscreen @load="iframeLoad"></iframe>
        </v-card>
      </v-dialog>
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
    seasons: [],
    dialog: false,
    mediaLink: ''
  }),
  created () {
    this.id = this.$route.params.id
    this.getShowDetails('en-US', this.id)
  },
  mounted () {
    setTimeout(() => {
      this.backdropImage = config.imgApiConfig.baseUrl + 'original' + this.details.backdrop_path
      this.model = _.replace(this.$route.hash, '#', '')
    }, 500)
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
      return posterPath ? config.imgApiConfig.baseUrl + 'original' + posterPath : ''
    },
    showDescription (episode) {
      episode.show = !episode.show
      this.$forceUpdate()
    },
    goToMediaLink (showName, seasonNumber, showNumber) {
      showName = _.replace(showName, / /g, '-')
      seasonNumber = String(seasonNumber).padStart(2, 0)
      showNumber = String(showNumber).padStart(2, 0)
      this.mediaLink = config.mediaApiConfig.baseUrlShow + showName + '/' + seasonNumber + '-' + showNumber
    },
    closeIframe () {
      this.dialog = false
      this.mediaLink = ''
    },
    iframeLoad (){
      alert('iframe loaded')
      let mediaIframe = document.getElementById('media-iframe')
      let innerDoc = mediaIframe.contentDocument || mediaIframe.contentWindow.document
      let innerIframe = innerDoc.getElementById('openloadIframe')
      console.log(innerIframe)
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
<style lang="scss">
iframe {
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 64px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}
#title-link {
  cursor: pointer;
}
</style>

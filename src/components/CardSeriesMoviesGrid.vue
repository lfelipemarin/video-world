<template>
  <v-card v-if="type=='movies'" to="/movies" height="200px">
    <v-img :src="imagePath" aspect-ratio="2.75"></v-img>
    <v-card-title primary-title class="justify-center">
      <div>
        <h3 class="headline mb-0">{{type}}</h3>
      </div>
    </v-card-title>
  </v-card>
  <v-card v-else to="/series">
    <v-img :src="imagePath" height="350px"></v-img>
    <v-card-title primary-title class="justify-center">
      <div>
        <h3 class="headline mb-0">{{mediadata.name}}</h3>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
import config from '../conf'

export default {
  props: ['type', 'mediadata'],
  data () {
    return {
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
    }
  },
  computed: {
    imagePath: function () {
      return config.imgApiConfig.baseUrl + "w500" + this.mediadata.poster_path
    }
  }
}
</script>
<template>
  <v-flex xs3>
    <v-card v-if="type=='movies'" to="/movies">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
      <v-card-title primary-title class="justify-center">
        <div>
          <h3 class="headline mb-0">Movies</h3>
        </div>
      </v-card-title>
    </v-card>
    <v-card v-else to="/shows">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
      <v-card-title primary-title class="justify-center">
        <div>
          <h3 class="headline mb-0">TV Shows</h3>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ['type'],
  data () {
    return {
      card_text: 'Lorem ipsum dolor sit amet, brute iriure accusata ne mea. Eos suavitate referrentur ad, te duo agam libris qualisque, utroque quaestio accommodare no qui. Et percipit laboramus usu, no invidunt verterem nominati mel. Dolorem ancillae an mei, ut putant invenire splendide mel, ea nec propriae adipisci. Ignota salutandi accusamus in sed, et per malis fuisset, qui id ludus appareat.'
    }
  }
}
</script>
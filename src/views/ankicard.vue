<template>
  <v-card class="card">
    <v-card-text rounded>

      <div>{{ deckname }}</div>
      <p class="text-h4 text--primary">
        {{ card.question }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-flex class='mb-5'>
        <v-btn style='width:130px; margin-right:20px;' text color="teal accent-4"
          @click="reveal = !reveal">
          <span v-if="reveal">Close</span>
          <span v-else>See Answer</span>
        </v-btn>
        <v-btn rounded class='mr-4' id="easy" @click="setFamilarity(2)" large>easy</v-btn>
        <v-btn rounded class='mr-4' id="medium" @click="setFamilarity(1)" large>medium</v-btn>
        <v-btn rounded class='mr-4' id="hard" @click="setFamilarity(0)" large>hard</v-btn>
        <v-btn rounded class="float-right mr-4" @click="setFamilarity(card.familiarity)" id="next" large>next</v-btn>
      </v-flex>
    </v-card-actions>
    <v-expand-transition>
      <v-card v-if="reveal" class="v-card--reveal">
        <v-card-text class="pb-0">
          <p class="text-h4 text--primary">
            Answer
          </p>
          <div>
            <v-html>
            <h3 style='margin-bottom:10px;'>{{ card.answer }} </h3>
            <h3></h3>
            </v-html>
          </div>
        </v-card-text>
        <v-card-actions class="pt-0">
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>


</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";


export default Vue.extend({
  name: "anki-card",
  data() {
    return {
      deckid : '',
      deckname : '',
      card : {question:'',answer:'',familiarity:0,},
      reveal: false
      
    };
  },



  created () {
      this.deckid = this.$route.params.deckid;
      this.deckname = this.$route.params.deckname;
      this.initialize();
      
      
    },
  methods: {
    initialize() {
      console.log(this.deckid)
      axios.get("/decks/"+ this.deckid).then(resp => {
        console.log(resp.data);
        this.card = resp.data;
      });
    },
    setFamilarity(familiarity:number){
      this.card.familiarity = familiarity;
      axios.post("/decks/"+ this.deckid,this.card).then(resp=>{
        this.reveal =  false;
        this.initialize();
      })
    }

}});

</script>

<style scoped>
.card {
  width: 50%;
  margin: auto;
  margin-top: 10%;
}

.v-card--reveal {
  opacity: 1;
  width: 100%;
}


#easy:hover {
  background-color: lightgreen;
}

#medium:hover {
  background-color: lightyellow;
}

#hard:hover {
  background-color: lightpink;
}
</style>

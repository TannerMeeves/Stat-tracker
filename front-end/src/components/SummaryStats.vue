<template>
<div class="main">
  <hr/>
    <button v-if="!calculated" @click="groupStats" id="total-button" class="pure-button button-xsmall">
        Calculate Totals
    </button>
    <div v-for="stat in summedstats" v-bind:key="stat.id">
        <p>{{stat.shottype}} - {{stat.makes}}/{{stat.total}}</p>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'SummaryStats',
  data() {
    return {
      stats: [],
      summedstats: [],
      calculated: false,
    }
  },
  created() {
    this.getStats();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async getStats() {
      try {
        let response = await axios.get("/api/stats");
        this.stats = response.data.stats;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    camelize(str) {
      return str.replace(/\W+(.)/g, function(match, chr)
       {
            return chr.toUpperCase();
        });
    },
    groupStats() {
        let found = false;
        for (let i = 0; i < this.stats.length; i++){
            for (let j = 0; j < this.summedstats.length; j++){
                if ((this.stats[i].shottype).toUpperCase() === (this.summedstats[j].shottype).toUpperCase()){
                    this.summedstats[j].makes += parseInt(this.stats[i].makes, 10);
                    this.summedstats[j].total += 10;
                    found = true;
                }
            }
            if (!found){
                console.log(i);
                let newStat = {shottype: this.stats[i].shottype, makes: parseInt(this.stats[i].makes, 10), total: 10};
                this.summedstats.push(newStat);
            }
            found = false;
        }
        this.calculated = true;
    }
  }
}
</script>

<style>
  #total-button {
    background-color: #BAB9BD;
    color: blue;
    margin: 1em;
  }
</style>

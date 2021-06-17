<template>
<div class="main">
<div v-for="stat in stats" v-bind:key="stat.id">
  <div class="stat">
    <div class="shottype">
      <h3>Shots taken on {{time(stat.created)}}</h3>
      <p>{{stat.shottype}} - {{stat.makes}}/10</p>
      <button @click="deleteStat(stat)" class="pure-button button-xsmall">
        <i class="fas fa-plus" />
      </button>
      <div>
        <button @click="setUpdating(stat)" class="pure-button button-xsmall">
            <i class="fas fa-plus" />
        </button>
      </div>
      <form class="pure-form" v-if="stat === findStat" @submit="updateStat(stat)">
        <legend>Update the type of shot, and the number of makes out of 10</legend>         
        <fieldset>
            <textarea v-model="shottypeupdate"></textarea>
            <textarea v-model="makesupdate"></textarea>
            <br />
            <button @click="cancelUpdating" class="pure-button space-right">Cancel</button>
            <button class="pure-button pure-button-primary" shottype="submit">Submit</button>
        </fieldset>
      </form>
    </div>
  </div>
</div>
</div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'IndividualStats',
  data() {
    return {
      shottype: '',
      makes: '',
      shottypeupdate: '',
      makesupdate: '',
      stats: [],
      findStat: '',
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
    time(d) {
      return moment(d).format('D MMMM YYYY, h:mm:ss a');
    },
    async deleteStat(stat) {
      try {
        await axios.delete("/api/stats/" + stat._id);
        this.getStats();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    setUpdating(stat) {
      this.findStat = stat;
    },
    cancelUpdating() {
      this.findStat = '';
    },
    async updateStat(stat) {
      try {
          await axios.put("/api/stats/" + stat._id, {
              shottype: this.shottypeupdate,
              makes: this.makesupdate
          });
          this.shottypeupdate = "";
          this.makesupdate = "";
          this.updating = false;
          this.getStats();
      } catch (error) {
          console.log(error);
      }
    },
  }
}
</script>

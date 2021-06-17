<template>
<div class="main">
<form class="pure-form" @submit="addStat">
  <legend>Enter the type of shot, and the number of makes out of 10</legend>
  <fieldset>
    <textarea v-model="shottype"></textarea>
    <textarea v-model="makes"></textarea>
    <br />
    <button class="pure-button pure-button-primary" shottype="submit">Submit</button>
  </fieldset>
</form>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'CreateStat',
  data() {
    return {
      shottype: '',
      makes: '',
      stats: [],
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
    setCreating() {
      this.creating = true;
    },
    cancelCreating() {
      this.creating = false;
    },
    async addStat() {
      try {
        await axios.post("/api/stats", {
          shottype: this.shottype,
          makes: this.makes
        });
        this.shottype = "";
        this.makes = "";
        this.creating = false;
        this.getStats();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

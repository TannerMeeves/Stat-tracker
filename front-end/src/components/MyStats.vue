<template>
<div class="main">
  <h2>Logged in as: {{user.firstName}} {{user.lastName}} <button @click="logout">Logout</button></h2>
  <h1>My Stats</h1>
<div class="menu">
  <div class="option">
  <button @click="setCreating" class="pure-button button-xsmall">
    Create New Stat
  </button>
  </div>
  <div class="option">
  <button @click="setIndividual" class="pure-button button-xsmall">
    Individual Stats
  </button>
  </div>
  <div class="option">
  <button @click="setSummary" class="pure-button button-xsmall">
    Stat Totals
  </button>
  </div>
</div>
<CreateStat v-if="creating"/>
<IndividualStats v-else-if="individual"/>
<SummaryStats v-else-if="summary"/>
</div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';
import IndividualStats from '@/components/IndividualStats.vue'
import CreateStat from '@/components/CreateStat.vue'
import SummaryStats from '@/components/SummaryStats.vue'
export default {
  name: 'MyStats',
  components: {
      IndividualStats,
      CreateStat,
      SummaryStats
  },
  data() {
    return {
      creating: false,
      individual: false,
      summary: false,
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
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
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
      this.individual = false;
      this.summary = false;
    },
    setIndividual() {
      this.creating = false;
      this.individual = true;
      this.summary = false;
    },
    setSummary() {
      this.creating = false;
      this.individual = false;
      this.summary = true;
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

<style>
.menu {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.main {
  background-color: #ffd68f;
}

.option {
  width: 30em;
}

h2 {
  font-size: 24px;
}

h2 button{
  font-size: 20px;
  margin: 1em;
}
</style>

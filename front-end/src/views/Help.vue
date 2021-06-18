<template>
  <div class="help">
    <h1>Welcome to the Basketball Stats Tracker</h1>
    <div id="info">
    <p>This site was created for your benefit as you seek to keep track of your shooting percentages
    throughout your individual workouts. Register with a free account and you will be able to access
    your shooting numbers both individually, and as summed up percentages. Upon logging in, click the
    Create New Stat button, and enter in a shot type, and the number of makes out of 10. For conveniency, 
    always shoot each shot in groups of ten so that you can easily record them here. Then if you click
    on IndividualStats, you will be able to see each entry and when you inputted it. If you click on Edit
    or Delete, it will allow you to manipulate whatever data entry you messed up. Then if you click on 
    Stat Totals, and click Calculate Totals, it will show your totals as well as your percentages for each
    shot! Them you can analyze and see what areas you need to improve on. Be careful to type the words in
    correctly as if you misspell a word, it will count it as a different category in your summed totals. 
    We hope you enjoy this website and that it helps you in your skill enhancement!</p> 
    </div>
    <router-link to="/"><h5>Return</h5></router-link>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Help',
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>

<style>
    #info {
        display: flex;
        align-items: center;
        font-size: 24px;
        padding: 0em 5em 0em;
    }

    h5 {
        font-size: 36px;
    }

    .help h1 {
        padding: 1em;
    }
</style>
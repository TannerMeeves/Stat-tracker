<template>
  <div class="home">
    <MyStats v-if="user" />
    <LoginPage v-else/>
  </div>
</template>

<script>

import LoginPage from '@/components/LoginPage.vue'
import MyStats from '@/components/MyStats.vue'
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    LoginPage,
    MyStats
  },
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

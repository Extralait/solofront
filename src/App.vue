<template>
  <div id="app">
    <Navbar/>
    <RegPopup
        v-if="$route.hash==='#auth'"
        :auth="auth"
        :allPosition="allPosition"
        :allDivision="allDivision"
    />
    <CreateVocation
      v-if="$route.hash==='#create-vacation'"
      :auth="auth"
      :allPosition="allPosition"
      :allDivision="allDivision"
    />
    <router-view
    />
  </div>
</template>

<script>

import RegPopup from "@/components/common/RegPopup";
import {mapActions, mapGetters} from "vuex";
import Navbar from "./components/common/Navbar";
import axios from "axios";
import CreateVocation from "./components/common/CreateVocation";

export default {
  name: 'App',
  components: {
    RegPopup, Navbar,CreateVocation
  },
  data() {
    return {
      loading: true,
      auth: []
    }
  },
  methods: {
    ...mapActions(['getVacancy','getMe', 'getDivision','leaderCheck', 'getPosition','refresh','verifyToken']),
  },
  computed: {
    ...mapGetters(['allVacancy', 'allDivision', 'allPosition']),
  },
  async mounted() {
    await this.getDivision()
    await this.getPosition()
    this.loading = false
    if (localStorage.token) {
      let token =localStorage.getItem('token')
      if (token) {
        axios.defaults.headers.common['Authorization'] = 'JWT '+token
        await this.verifyToken({"token":token})
        await this.leaderCheck()
      }
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
}

#app {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: relative;
}

.no-scroll {
  overflow-y: hidden;
  overflow-x: hidden;
  display: block;
}

::-webkit-scrollbar {
  width: 0;
}


</style>

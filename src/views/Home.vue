<template>
  <div class="main">
    <Vocations
      :allVacancy="allVacancy"
    />
  </div>
</template>

<script>

import Vocations from "../components/baseComponents/pagesComponents/Vocations";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "Home",
  components:{
    Vocations
  },
  data(){
    return{
    }
  },
  methods: {
    ...mapActions(['getVacancy'])
  },
  computed: {
    ...mapGetters(['allVacancy']),

  },
  async mounted() {
    await this.getVacancy()
  },

}
</script>

<style scoped>
.main{
  width: 100%;
  position: relative;
  background-size: 100%;
  background-position-y: center;
  top: 92px;
}

</style>
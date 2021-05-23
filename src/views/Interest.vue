<template>
  <div class="main">
    <Interest
      :allInterest="allInterest"
    />
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import Interest from "../components/baseComponents/pagesComponents/Interest";

export default {
  name: "Home",
  components: {
    Interest
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['getInterest'])
  },
  computed: {
    ...mapGetters(['allInterest']),

  },
  async mounted() {
    await this.getInterest()
  },


}
</script>

<style scoped>
.main {
  width: 100%;
  position: relative;
  background-size: 100%;
  background-position-y: center;
  top: 92px;
}

</style>


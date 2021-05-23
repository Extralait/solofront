<template>
  <div class="vocation-main">
    <BaseVocation
        v-for="(content,i) in usingAllVacancy"
        :date="content.date"
        :code="content.code"
        :address="content.address"
        :position="content.position"
        :user="content.owner.name+content.owner.surname"
        :email="content.owner.email"
        :vocationId="content.id"
        :key="i"
    />
  </div>
</template>

<script>
import BaseVocation from "../BaseVocation";

export default {
  name: "Vocations",
  components: {
    BaseVocation
  },
  props:[
    'allVacancy'
  ],
  data() {
    return {}
  },
  computed: {
    usingAllVacancy: function () {
      return JSON.parse(JSON.stringify(this.allVacancy))
    },

  }
}
</script>

<style scoped>
.vocation-main {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
}
</style>
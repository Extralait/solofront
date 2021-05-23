<template>
  <div class="vocation-main">
    <BaseInterest
        v-for="(content,i) in usingAllInterest"
        :InterestId="content.id"
        :status="content.status"
        :code="content.code"
        :position="content.position"
        :user="content.owner.name+content.owner.surname"
        :email="content.owner.email"
        :vocation="content.vocation"
        :owner="content.owner"
        :key="i"
    />
  </div>
</template>

<script>
import BaseInterest from "../BaseInterest";

export default {
  name: "Vocations",
  components: {
    BaseInterest
  },
  props:[
    'allInterest'
  ],
  data() {
    return {}
  },
  computed: {
    usingAllInterest: function () {
      return JSON.parse(JSON.stringify(this.allInterest))
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
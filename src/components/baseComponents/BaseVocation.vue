<template>
  <div class="vocation-container">
    <div class="title"
         v-bind:style='styleObject'
    >
      <BaseH2Text
          :text="position"
          :style-object="{color:'#232323'}"
      />
    </div>
    <div class="content-body">
      <div class="info">
        <BaseParagraphText
            :text="user"
            :style-object="{color:'#232323'}"
        />
        <BaseParagraphText
            :text="address"
            :style-object="{color:'#232323'}"
        />
        <BaseParagraphText
            :text="code"
            :style-object="{color:'#232323'}"
        />
        <BaseParagraphText
            :text="date.slice(0,10)"
            :style-object="{color:'#232323'}"
        />
      </div>
      <div class="action"
           @click="removeVocation"
           v-if="selfCheck"
      >
        <BaseButton
            :text="`Отменить`"
        />
      </div>
      <div class="action"
          v-else
           @click="createInterest(
               {vocation:vocationId}
           )"
      >
        <BaseButton
            :text="`Откликнуться`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseH2Text from "./texts/BaseH2Text";
import BaseParagraphText from "./texts/BaseParagraphText";
import BaseButton from "./BaseButton";
import {mapActions} from "vuex";

export default {
  name: "BaseVocation",
  components: {
    BaseH2Text, BaseParagraphText, BaseButton
  },
  props: {
    date: {
      default: null
    },
    code: {
      default: null
    },
    email: {
      default: null
    },
    vocationId: {
      default: null
    },
    user: {
      default: null
    },
    address: {
      default: null
    },
    position: {
      default: null
    },
    // styleObject: {
    //   type: Object,
    //   default: function () {
    //     return {}
    //   }
    // },
  },
  data(){
    return{
      isMe:false
    }
  },
  methods:{
    ...mapActions(['getMe','deleteVacancy','createInterest']),
    removeVocation:function (){
      this.deleteVacancy(this.vocationId)
    }
  },
  computed: {
    selfCheck:function (){
      return localStorage.getItem('email')===this.email
    },
    color: function () {
      if (this.position === "Старший менеджер по обслуживанию") {
        return 'red'
      }
      if (this.position === "Ведущий менеджер по обслуживанию") {
        return 'yellow'
      }
      if (this.position === "Менеджер по обслуживанию") {
        return 'brown'
      }
      if (this.position === "Старший клиентский менеджер") {
        return 'green'
      }
      if (this.position === "Клиентский менеджер") {
        return 'blue'
      } else (this.position === "Консультант")
      {
        return 'gray'
      }
    },
    styleObject: function (){
      return{
          backgroundColor: this.color
      }
    }
  },
  created() {
    this.getMe()
  }

}
</script>

<style scoped>
.vocation-container {
  position: relative;
  box-shadow: 0 10px 31px rgba(0, 0, 0, 0.3);
  height: 200px;
  width: 450px;
  border-radius: 10px;
  margin: 20px;
  overflow-y: hidden;
  overflow-x: hidden;
}

.title {
  height: 20%;
  display: flex;
}

.title h2 {
  display: block;
  margin: auto;
}

.content-body {
  /*border: solid 1px #232323;*/
  border-top: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  height: calc(80% - 1px);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: auto;
}

.content-body .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.content-body .info p {
  margin-top: 5%;
}

.action {
  width: 40%;
}
</style>
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
            :text="`Статус заявки `+status"
            :style-object="{color:'#232323'}"
        />
      </div>
      <div class="buttons-container">
        <div class="action"
             v-if="isLeader"
             @click="patchInterest(
               {
                 id:InterestId,
                 status:'confirm',
               }
           )"
        >
          <BaseButton
              :text="`Подтвердить`"
          />
        </div>
        <div class="action"
             v-if="isLeader"
             @click="patchInterest(
               {
                 id:InterestId,
                 status:'miss',
               }
           )"
        >
          <BaseButton
              :text="`Отклонить`"
          />
        </div>
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
    code: {
      default: null
    },
    status: {
      default: null
    },
    email: {
      default: null
    },
    InterestId: {
      default: null
    },
    user: {
      default: null
    },
    owner: {
      default: null
    },
    vocation: {
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
      isLeader:localStorage.getItem('leader')
    }
  },
  methods:{
    ...mapActions(['getMe','deleteVacancy','patchInterest']),
    removeVocation:function (){
      this.deleteVacancy(this.vocationId)
    }
  },
  computed: {

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
.buttons-container{
  display: flex;
  flex-direction: column;
  width: 50%;
}
.action+.action{
  margin-top: 5%;
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
  width: 80%;
}
</style>
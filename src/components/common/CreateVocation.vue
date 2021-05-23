<template>
  <div class="popup-container" @click="back" style="background-color: rgba(0,0,0,0);">
    <div class="popup-container"></div>
    <div class="reg-container"
         @mousedown="isInBoxDown=true"
         @mouseup="isInBoxUp=true"
    >
      <form
      >
        <BaseInput
            :placeholder="placeholders.position"
            :type="`text`"
            :theme="theme.position"
            :inputValues="UsingAllPosition"
            @inputValue="form.position=$event
            errors.position=false"
        />
        <div class="log-in-row"
             v-if="choice==='Войти'"
        >
          <div
              class="button-container"
              @click="checkForm"
          >
            <BaseButton
                :text="`Создать`"
            />
          </div>
        </div>
        <div class="log-up-column" v-else>
          <div
              class="button-container"
              @click="checkForm"
          >
            <BaseButton
                :text="`Зарегистрироваться`"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/baseComponents/BaseInput";
import BaseButton from "@/components/baseComponents/BaseButton";
import {mapActions} from "vuex";

export default {
  name: "RegPopup",
  components: {
    BaseInput, BaseButton
  },
  props: ['allPosition', 'allDivision', 'auth'],
  data() {
    return {
      updateKey: 0,
      choice: 'Войти',
      defaultPlaceholders: {
        position: 'Введите должность',
      },
      placeholders: {
        position: 'Введите должность',
      },
      required: {
        position: false,

      },
      form: {
        position: '',
      },
      errors: {
        position: false,
      },
    }
  },
  methods: {
    ...mapActions(['createUser', 'authorization']),
    clearFormat: function () {
      for (let key of Object.keys(this.errors)) {
        this.errors[key] = false
      }

      this.placeholders = JSON.parse(JSON.stringify(this.defaultPlaceholders))
    },
    back: function () {
      if (!this.isInBoxDown && !this.isInBoxUp) {
        this.$router.push(this.$route.path)
      } else {
        this.isInBoxDown = false
        this.isInBoxUp = false
      }
      this.isInBoxDown = false
      this.isInBoxUp = false
    },
    checkForm: function () {
      this.clearFormat()

      if (!this.form.position) {
        this.errors.position = true
      }
      if (this.positionList.indexOf(this.form.position.slice(0, 4)) !== -1) {
        this.placeholders.position = 'Такой должности не существует'
        this.errors.position = true
      }


      for (let error in this.errors) {
        if (this.errors[error]) {
          return false
        }
      }
      if (this.$store.state.auth.auth.length===0){
        return false
      }
      this.createVacation()
      this.back()
    },
    createVacation:function (){
      this.createVacancy({position:this.form.position})
    },
    sortValue: function (a, b, param) {
      if (a[param] > b[param]) {
        return 1
      }
      if (a[param] < b[param]) {
        return -1
      }
      return 0
    },
    ...mapActions(['createVacancy'])
  },
  computed: {
    UsingAllPosition: function () {
      return (JSON.parse(JSON.stringify(this.allPosition))).sort((a, b) => this.sortValue(a, b, 'long_name'))
    },
    positionList: function () {
      let positionList = []
      for (let position of (JSON.parse(JSON.stringify(this.UsingAllPosition)))) {
        positionList.push(position.long_name)
      }
      return positionList
    },
    actualPosition: function () {
      let position = this.form.position
      let actualPosition = JSON.parse(JSON.stringify(this.UsingAllPosition)).filter(function (x) {
        return x.long_name.toLowerCase() === position.toLowerCase()
      })
      return actualPosition[0].id
    },
    theme: function () {
      let form = this.form
      let errors = this.errors
      let placeholders = this.placeholders
      let positionList = this.positionList
      return {
        position: function () {
          if (errors.position) {
            return 'error'
          }
          if (!form.position) {
            placeholders.position = 'Введите должность'
            return 'default'
          }
          if (positionList.indexOf(form.position) === -1) {
            placeholders.position = 'Такой должности не существует'
            return 'error'
          } else {
            placeholders.position = 'Должность введена корректно'
            return 'right'
          }
        }(),
      }
    }
  },
  created() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
  },
  destroyed() {
    document.getElementsByTagName('body')[0].style.overflow = 'visible'
  },
}
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 4;
  display: flex;
  cursor: pointer;
  transition: all 0.1s;
}

.popup-container:hover {
  background-color: rgba(0, 0, 0, 0.4);
}

.reg-container {
  padding-top: 20px;

  width: 448px;
  cursor: default;
  z-index: 5;
  background: #323232;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin: auto;
  display: flex;
}

form {
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: auto;
}

.choice-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 8%;
  padding-bottom: 8%;
}

.choice {
  transition: all 0.3s;
  opacity: 0.7;
}

.choice:hover {
  opacity: 1;
}

.active-choice {
  padding-left: 2%;
  padding-right: 2%;
  border-bottom: 1px solid #FFFFFF;
  opacity: 1;
}


.pseudo-input {
  margin-bottom: 4%;
}

.log-in-row {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 6%;
  margin-bottom: 10%;
}

.log-in-row .button-container {
  width: 40%;
  margin-left: 10%;
}

.log-in-row a p {
  opacity: 0.7;
  transition: all 0.3s;
}

.log-in-row a:hover p {
  opacity: 1;
}

.remember {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2%;
}

.remember input {
  margin-right: 4%;
}

.remember a p {
  margin-left: 3px;
  color: #00FFC2;
  transition: all 0.3s;
}

.check-box {
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 2px;
  transition: all 0.3s;
  height: 24px;
  width: 24px;
  display: flex;
  margin-right: 4%;
}

.check-box img {
  width: 90%;
  margin: auto;
}

.remember:hover a p {
  text-decoration: underline;
}

.remember .check-box {
  text-decoration: underline;
  border: 1px solid rgba(255, 255, 255, 0.7);
}

.log-up-column .button-container {
  width: 50%;
  margin-top: 10%;
  margin-bottom: 10%;
  margin-left: auto;
  margin-right: auto;
}

.remember .error {
  border-color: rgba(231, 82, 82, 0.5);;
}

</style>
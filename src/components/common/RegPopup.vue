<template>
  <div class="popup-container" @click="back" style="background-color: rgba(0,0,0,0);">
    <div class="popup-container"></div>
    <div class="reg-container"
         @mousedown="isInBoxDown=true"
         @mouseup="isInBoxUp=true"
    >
      <form
      >
        <div class="choice-row">
          <div class="choice"
               v-bind:class="{'active-choice':choice==='Войти'}"
               @click="choice='Войти'
               required.passwordRepeat=false
               required.remember=false
               required.name=false
               required.surname=false
               clearFormat()"
          >
            <BaseButtonText
                :text="`Войти`"
                :theme="`white`"
            />
          </div>
          <div class="choice"
               v-bind:class="{'active-choice':choice==='Регистрация'}"
               @click="choice='Регистрация'
               required.passwordRepeat=true
               required.remember=true
               required.name=true
               required.surname=true
               clearFormat()"
          >
            <BaseButtonText
                :text="`Регистрация`"
                :theme="`white`"
            />
          </div>
        </div>
        <BaseInput
            v-if="choice==='Регистрация'"
            :placeholder="placeholders.name"
            :type="`text`"
            :value="form.name"
            :theme="theme.name"
            @inputValue="
            form.name=$event
            errors.name=false"
        />
        <BaseInput
            v-if="choice==='Регистрация'"
            :placeholder="placeholders.surname"
            :type="`text`"
            :value="form.surname"
            :theme="theme.surname"
            @inputValue="form.surname=$event
            errors.surname=false"
        />
        <BaseInput
            v-if="choice==='Регистрация'"
            :placeholder="placeholders.number"
            :type="`text`"
            :value="form.number"
            :theme="theme.number"
            @inputValue="form.number=$event
            errors.number=false"
        />
        <BaseInput
            v-if="choice==='Регистрация'"
            :placeholder="placeholders.position"
            :type="`text`"
            :theme="theme.position"
            :inputValues="UsingAllPosition"
            @inputValue="form.position=$event
            errors.position=false"
        />
        <BaseInput
            :placeholder="placeholders.email"
            :type="`text`"
            :theme="theme.email"
            :img="`${require('../../static/icons/email-input.svg')}`"
            @inputValue="form.email=$event
            errors.email=false"
            :key="updateKey"
        />
        <BaseInput
            v-if="choice==='Войти'"
            :placeholder="placeholders.code"
            :type="`password`"
            :value="form.code"
            :theme="theme.code"
            :img="`${require('../../static/icons/password-input.svg')}`"
            @inputValue="form.code=$event
            errors.code=false"
            :key="updateKey+1"
        />
        <div class="remember"
             v-if="choice==='Войти'"
        >
          <div
              v-bind:class="{'error':errors.remember}"
              class="check-box"
              @click="form.remember =!form.remember"
          >
            <img
                v-if="form.remember"
                src="../../static/icons/check-marker.svg"
                alt=""
            >
          </div>
          <BaseParagraphText
              :text="`Запомнить меня`"
          />
        </div>

        <div class="log-in-row"
             v-if="choice==='Войти'"
        >
          <a href="" target="_blank">
            <BaseDescriptionText
                :text="`Забыли пароль?`"
            />
          </a>
          <div
              class="button-container"
              @click="checkForm"
          >
            <BaseButton
                :text="`Войти`"
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
import BaseButtonText from "@/components/baseComponents/texts/BaseButtonText";
import BaseDescriptionText from "@/components/baseComponents/texts/BaseDescriptionText";
import BaseButton from "@/components/baseComponents/BaseButton";
import BaseParagraphText from "@/components/baseComponents/texts/BaseParagraphText";
import {mapActions} from "vuex";

export default {
  name: "RegPopup",
  components: {
    BaseInput, BaseButtonText, BaseDescriptionText, BaseButton, BaseParagraphText
  },
  props: ['allPosition', 'allDivision','auth'],
  data() {
    return {
      updateKey: 0,
      choice: 'Войти',
      defaultPlaceholders: {
        email: 'Введите корпоративную почту',
        password: 'Введите пароль',
        passwordRepeat: 'Повторите пароль',
        name: 'Введите имя',
        surname: 'Введите фамилию',
        number: 'Введите код подразделения',
        position: 'Введите должность',
        code: 'Введите код'
      },
      placeholders: {
        email: 'Введите корпоративную почту',
        password: 'Введите пароль',
        passwordRepeat: 'Повторите пароль',
        name: 'Введите имя',
        surname: 'Введите фамилию',
        fathers_name: 'Введите отчество (если есть)',
        number: 'Введите код подразделения',
        position: 'Введите должность',
        code: 'Введите код'
      },
      required: {
        email: true,
        password: true,
        passwordRepeat: false,
        remember: true,
        name: false,
        surname: false,
        fathers_name: false,
        number: false,
        position: false,
        code: false

      },
      form: {
        email: '',
        password: '',
        passwordRepeat: '',
        remember: false,
        name: '',
        surname: '',
        fathers_name: '',
        number: '',
        position: '',
        code: ''
      },
      errors: {
        email: false,
        password: false,
        passwordRepeat: false,
        remember: false,
        name: false,
        surname: false,
        fathers_name: false,
        number: false,
        position: false,
        code: false,
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

      if (!this.form.email) {
        this.errors.email = true
      }
      if (!this.validEmail(this.form.email)) {
        this.errors.email = true
        this.placeholders.email = 'Email введен некорректно'
      }


      if (this.choice === 'Войти') {
        if (!this.form.code) {
          this.errors.code = true
        }
      }

      if (this.choice === 'Регистрация') {
        if (!this.form.name) {
          this.errors.name = true
        }
        if (!this.validName(this.form.name)) {
          this.placeholders.name = 'Имя должно быть на русском языке'
          this.errors.name = true
        }

        if (!this.validName(this.form.surname)) {
          this.placeholders.surname = 'Фамилия должна быть на русском языке'
          this.errors.surname = true
        }

        if (!this.validNumber(this.form.number)) {
          this.placeholders.number = 'Код подразделения должен быть в формате 9070/117'
          this.errors.number = true
        }
        {
          if (this.numberList.indexOf(this.form.number.slice(0, 4)) !== -1) {
            this.placeholders.number = 'Такого подразделения не существует'
            this.errors.number = true
          }
        }


        if (!this.form.position) {
          this.errors.position = true
        }
        if (this.positionList.indexOf(this.form.position.slice(0, 4)) !== -1) {
          this.placeholders.position = 'Такой должности не существует'
          this.errors.position = true
        }
      }

      for (let error in this.errors) {
        if (this.errors[error]) {
          return false
        }
      }

      if (this.choice === 'Войти') {
        this.authFunction()
      } else {
        if (this.choice === 'Регистрация') {
          this.createUserFunc()
        }
      }
      this.back()
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
    createUserFunc: function () {
      let codeLen = this.form.code.length
      let email = this.form.email
      let json = {
        'name': this.form.name,
        'surname': this.form.surname,
        'email': email,
        'code': this.actualNumber,
        'sub_code': this.form.code.slice(5, codeLen - 1),
        'position': this.actualPosition,
        'password': 'USNqItakH2m8X01',
      }
      this.createUser(json)
      this.choice = 'Войти'
      // this.updateKey+=1
      // this.form.email=email
    },
    authFunction: function () {
      let json = {
        email: this.form.email,
        password: this.form.code
      }
      localStorage.setItem('email',this.form.email)
      return this.authorization(json)
    },
    validPassword: function () {
      if (this.form.password.length <= 8) {
        return 'Длина пароля меньше 8 символов'
      }
      if (!/\d/.test(this.form.password)) {
        return 'Пороль должен содержать числа'
      }
      if (/[а-яА-Я]/.test(this.form.password)) {
        return 'Пароль не должен содержать кирилицу'
      }
      if (!/[A-Z]/.test(this.form.password)) {
        return 'Пороль должен содержать заглавные буквы'
      }
      if (!/[a-z]/.test(this.form.password)) {
        return 'Пороль должен содержать прописные буквы'
      } else {
        return false
      }
    },

    validName: function (name) {
      return /[а-яА-Я]+/.test(name)
    },
    validNumber: function (name) {
      return /[0-9]{4}\/[0-9]+/.test(name)
    },
    validEmail: function (email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    ...mapActions(['login'])
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
    numberList: function () {
      let numberList = []
      for (let number of (JSON.parse(JSON.stringify(this.allDivision)))) {
        numberList.push(number.code + '/')
      }
      return numberList
    },
    actualNumber: function () {
      let number = this.form.number
      let actualNumber = JSON.parse(JSON.stringify(this.allDivision)).filter(function (x) {
        return x.code === number.slice(0, 4)
      })
      return actualNumber[0].id
    },
    theme: function () {
      let form = this.form
      let errors = this.errors
      let placeholders = this.placeholders
      let validEmail = this.validEmail
      let validNumber = this.validNumber
      let validPassword = this.validPassword
      let validName = this.validName
      let numberList = this.numberList
      let positionList = this.positionList
      return {
        email: function () {
          if (errors.email) {
            return 'error'
          }
          if (!form.email) {
            placeholders.email = 'Введите корпоративную почту'
            return 'default'
          }
          if (!validEmail(form.email)) {
            placeholders.email = 'Email введен некорректно'
            return 'error'
          } else {
            placeholders.email = 'Email введен корректно'
            return 'right'
          }
        }(),
        password: function () {
          if (errors.password) {
            return 'error'
          }
          if (!form.password) {
            placeholders.password = 'Введите пароль'
            return 'default'
          }
          let passwordPlaceholder = validPassword()
          if (passwordPlaceholder) {
            placeholders.password = passwordPlaceholder
            return 'error'
          } else {
            placeholders.password = 'Корректный пароль'
            return 'right'
          }
        }(),
        passwordRepeat: function () {
          if (errors.passwordRepeat) {
            return 'error'
          }
          if (!form.passwordRepeat) {
            placeholders.passwordRepeat = 'Повторите пароль'
            return 'default'
          }
          if (form.password !== form.passwordRepeat) {
            placeholders.passwordRepeat = 'Пароли не совпадают'
            return 'error'
          } else {
            placeholders.passwordRepeat = 'Пароли совпадают'
            return 'right'
          }
        }(),
        name: function () {
          if (errors.name) {
            return 'error'
          }
          if (!form.name) {
            placeholders.name = 'Введите имя'
            return 'default'
          }
          if (!validName(form.name)) {
            placeholders.name = 'Имя должно быть на русском языке'
            return 'error'
          } else {
            placeholders.name = 'Имя введено корректно'
            return 'right'
          }
        }(),
        surname: function () {
          if (errors.surname) {
            return 'error'
          }
          if (!form.surname) {
            placeholders.surname = 'Введите фамилию'
            return 'default'
          }
          if (!validName(form.surname)) {
            placeholders.surname = 'Фамилия должна быть на русском языке'
            return 'error'
          } else {
            placeholders.surname = 'Фамилия введена корректно'
            return 'right'
          }
        }(),
        fathers_name: function () {
          if (errors.fathers_name) {
            return 'error'
          }
          if (!form.fathers_name) {
            placeholders.fathers_name = 'Введите отчество'
            return 'default'
          }
          if (!validName(form.fathers_name)) {
            placeholders.fathers_name = 'Отчество должно быть на русском языке'
            return 'error'
          } else {
            placeholders.fathers_name = 'Отчество введено корректно'
            return 'right'
          }
        }(),
        number: function () {
          if (errors.number) {
            return 'error'
          }
          if (!form.number) {
            placeholders.number = 'Введите код подразделения'
            return 'default'
          }
          if (!validNumber(form.number)) {
            placeholders.number = 'Код подразделения должен быть в формате 9070/117'
            return 'error'
          } else {
            if (numberList.indexOf(form.number.slice(0, 4)) !== -1) {
              placeholders.number = 'Такого подразделения не существует'
              return 'error'
            } else {
              placeholders.number = 'Код подразделения введен корректно'
              return 'right'
            }
          }
        }(),
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
        code: function () {
          if (errors.code) {
            return 'error'
          }
          if (!form.code) {
            placeholders.code = 'Введите код'
            return 'default'
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
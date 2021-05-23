<template>
  <div class="navbar-container">
    <div class="label"
      @click="$router.push('/')"
    >
      <h1>SOLO</h1>
    </div>
    <div class="nav-bar">
      <div class="input-container">
        <div class="pseudo-input">
          <input type="text"
                 required
                 id="selection-input"
                 placeholder="Интересующая должность"
                 autocomplete="off"
          >
        </div>
        <div class="icon-container"
             onmousedown="return false"
        >
          <img
              src="../../static/icons/search.svg"
              alt=""
          >
        </div>
      </div>
      <div class="button-container"
      >
        <router-link tag="div" class="nav-button"
                     style="width: 25%;"

                     v-if="isLeader"

                     :to="'/Interest'"
        >
          <BaseButton
              :text="`Отклики`"
          />
        </router-link>
        <router-link tag="div" class="nav-button"
                     v-if="isLeader"

                     :to="'#create-vacation'"
             id="create-event-nav-btn"
        >
          <BaseButton
              :text="`Создать вакансию`"
          />
        </router-link>
        <router-link
            v-if="$store.state.auth.auth.length===0"
            tag="div"
            :to="`#auth`"
            class="nav-button"
            id="log-in-nav-btn">
          <BaseButton
              :text="`Войти`"
              :theme="`white`"
          />
        </router-link>
        <div v-else
             class="nav-button"
             id="log-in-nav-btn-2"
             @click="out"
        >
          <BaseButton
              :text="`Выйти`"
              :theme="`white`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BaseButton from "@/components/baseComponents/BaseButton";
import {mapActions} from "vuex";

export default {
  name: "Navbar",
  components: {
    BaseButton
  },
  data(){
    return{
     isLeader:localStorage.getItem('leader')
    }
  },
  methods:{
    ...mapActions(['logout','createVacancy']),
    out:function (){
      this.logout()
    },
  }
}
</script>

<style scoped>
.navbar-container {
  width: 100%;
  background-color: #232323;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: fixed;
  height: 72px;
  z-index: 100;
}

.label, .category {
  width: calc(100% / 5);
  background-color: #232323;
}

.label, .nav-bar {
  position: relative;
  height: 72px;
  /*box-shadow: 0 5px 30px 10px rgba(0, 0, 0, 0.15);*/
  z-index: 3;
  border-bottom: 1px solid #858585;
}

.nav-bar, .slider {
  width: calc(100% * 4 / 5);
}

.label {
  display: flex;
}

.label h1 {
  font-family: Roboto;
  display: block;
  margin: auto;
  color: #FFFFFF;
}

.label img {
  margin: auto;
  max-height: 75%;
  max-width: 75%;
}


.category {
  position: relative;
  height: 100%;
}

.category::after {
  content: '';
  display: block;
  padding-top: 52.5%;
}

.content {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.button-container {
  display: flex;
  height: 100%;
  width: 380px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-right: 2%;
}

#create-event-nav-btn {
  width: 60%;
}

#log-in-nav-btn, #log-in-nav-btn-2 {
  width: 20%;
}

.nav-button {
  display: flex;
}

.nav-button + .nav-button {
  margin-left: 6%;
}

.org-button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1%;
  padding-right: 1%;
  height: 100%;
  border-left: 1px solid #858585;
  transition: all 0.3s;
}

.org-button:hover {
  background-color: #3F3F3F;;
}

.input-container {
  width: 30%;
  display: flex;
  position: relative;
}

.pseudo-input {
  width: 100%;
  height: 40px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  border-radius: 2px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.input-container input {
  background: none;
  border: none;
  height: 100%;
  width: calc(97% - 43px);
  outline: none;
  padding-left: 3%;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #FFFFFF;
  opacity: 0.9;

}

.icon-container {
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  right: 15px;
}

.category .content {
  background: #F5F5F5;
}


</style>
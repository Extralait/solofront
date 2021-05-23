import Vue from 'vue'
import Vuex from 'vuex'
import vacancy from "@/store/modulse/vacancy";
import position from "@/store/modulse/position";
import division from "@/store/modulse/division";
import user from "@/store/modulse/users";
import auth from "@/store/modulse/auth";
import interest from "@/store/modulse/interest";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        vacancy,
        position,
        division,
        user,
        auth,
        interest
    }
})
import {
    Auth, VerifyToken, MyProfile, LeaderCheck
} from '@/api/elements'
import {
    AUTH, AUTH_ERROR, LOG_OUT, TOKEN_VERIFY, GET_ME, LEADER_CHECK
} from '../mutation-types'
import axios from "axios";

// Геттеры
export default {
    state: {
        auth: [],
    },
// Мутации
    mutations: {
        [AUTH](state, auth) {
            state.auth = auth
        },
        [GET_ME](state, auth) {
            state.me = auth
        },
        [AUTH_ERROR](state, err) {
            state.auth = []
            state.authError = err
        },
        [LOG_OUT](state) {
            state.auth = []
        },
        [TOKEN_VERIFY](state, auth) {
            if (auth === 200) {
                state.auth = localStorage.getItem('token')
            } else {
                state.auth = []
            }
        },
        [LEADER_CHECK](state, auth) {
            console.log(auth)
            localStorage.setItem('leader', true)
            state.leader = auth === true;
        },
    },
// Действия
    actions: {
        async authorization({commit}, authData) {
            await Auth.post(authData).then(resp => {
                    commit(AUTH, resp['access'])
                    let token = resp['access']
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = 'JWT ' + token
                }
            ).catch(err => {
                commit(AUTH_ERROR, err)
                localStorage.removeItem('token')
                alert('Неправильный email или пароль')
            })
        },
        async logout({commit}) {
            commit(LOG_OUT)
            localStorage.removeItem('token')
            localStorage.removeItem('leader')
            delete axios.defaults.headers.common['Authorization']
        },
        async verifyToken({commit}, authData) {
            await VerifyToken.post(authData).then(resp => {
                commit(TOKEN_VERIFY, resp)
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            })
        },
        async getMe({commit}) {
            await MyProfile.get().then(resp => {
                commit(GET_ME, resp)
            })
        },
        async leaderCheck({commit}) {
            await LeaderCheck.get().then(resp => {
                commit(LEADER_CHECK, resp)
            })
        }
    },
}
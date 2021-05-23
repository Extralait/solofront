import {
    Users,
} from '@/api/elements'
import {
    ADD_USER,  REMOVE_USER, SET_USER
} from '../mutation-types'


// Геттеры
export default {
    state: {
        user: [],
    },
    getters: {
        allUser(state) {
            return state.user
        }
    },
// Мутации
    mutations: {
        [ADD_USER](state, user) {
            state.user = [user, ...state.user]
        },
        [REMOVE_USER](state, {id}) {
            state.user = state.user.filter(user => {
                return user.id !== id
            })
        },
        [SET_USER](state, {user}) {
            state.user = user
        },
    },
// Действия
    actions: {
        async createUser({commit}, userData) {
            await Users.post(userData).then(user => {
                commit(ADD_USER, user)
            }).catch(err => {
                console.log(err)
                alert('Пользователь с таким email уже существует')
            })
        },
        async deleteUser({commit}, userData) {
            await Users.delete(userData).then(user => {
                commit(REMOVE_USER, user)
            })
        },
        async getUser({commit}) {
            await Users.list().then(user => {
                commit(SET_USER, {user})
            })
        },
    },
}

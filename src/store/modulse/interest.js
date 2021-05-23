import {
    Interest,
} from '@/api/elements'
import {
    ADD_INTEREST, REMOVE_INTEREST, PATCH_INTEREST,SET_INTEREST
} from '../mutation-types'


// Геттеры
export default {
    state: {
        interest: [],
    },
    getters: {
        allInterest(state) {
            return state.interest
        }
    },
// Мутации
    mutations: {
        [ADD_INTEREST](state, interest) {
            state.interest = [interest, ...state.interest]
        },
        [REMOVE_INTEREST](state, {id}) {
            state.interest = state.interest.filter(interest => {
                return interest.id !== id
            })
        },
        [SET_INTEREST](state, {interest}) {
            state.interest = interest
        },
        [PATCH_INTEREST](state, {interest}) {
            state.interest = interest
        },
    },
// Действия
    actions: {
        async createInterest({commit}, interestData) {
            await Interest.post(interestData).then(interest => {
                commit(ADD_INTEREST, interest)
            })
        },
        async deleteInterest({commit}, interestData) {
            await Interest.delete(interestData).then(interest => {
                commit(REMOVE_INTEREST, interest)
            })
        },
        async patchInterest({commit}, interestData) {
            await Interest.patch(interestData).then(interest => {
                commit(PATCH_INTEREST, interest)
            })
        },
        async getInterest({commit}) {
            await Interest.list().then(interest => {
                commit(SET_INTEREST, {interest})
            })
        },
    },
}
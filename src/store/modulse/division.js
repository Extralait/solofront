import {
    Division,
} from '@/api/elements'
import {
    ADD_DIVISION, REMOVE_DIVISION, SET_DIVISION
} from '../mutation-types'


// Геттеры
export default {
    state: {
        division: [],
    },
    getters: {
        allDivision(state) {
            return state.division
        }
    },
// Мутации
    mutations: {
        [ADD_DIVISION](state, division) {
            state.division = [division, ...state.division]
        },
        [REMOVE_DIVISION](state, {id}) {
            state.division = state.division.filter(division => {
                return division.id !== id
            })
        },
        [SET_DIVISION](state, {division}) {
            state.division = division
        },
    },
// Действия
    actions: {
        async createDivision({commit}, divisionData) {
            await Division.post(divisionData).then(division => {
                commit(ADD_DIVISION, division)
            })
        },
        async deleteDivision({commit}, divisionData) {
            await Division.delete(divisionData).then(division => {
                commit(REMOVE_DIVISION, division)
            })
        },
        async getDivision({commit}) {
            await Division.list().then(division => {
                commit(SET_DIVISION, {division})
            })
        },
    },
}
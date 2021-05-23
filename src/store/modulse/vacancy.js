import {
    Vacancy,
} from '@/api/elements'
import {
    ADD_VACANCY, REMOVE_VACANCY, SET_VACANCY
} from '../mutation-types'


// Геттеры
export default {
    state: {
        vacancy: [],
    },
    getters: {
        allVacancy(state) {
            return state.vacancy
        }
    },
// Мутации
    mutations: {
        [ADD_VACANCY](state, vacancy) {
            state.vacancy = [vacancy, ...state.vacancy]
        },
        [REMOVE_VACANCY](state, id) {
            state.vacancy = state.vacancy.filter(vacancy => {
                return vacancy.id !== id
            })
        },
        [SET_VACANCY](state, {vacancy}) {
            state.vacancy = vacancy
        },
    },
// Действия
    actions: {
        async createVacancy({commit}, vacancyData) {
            await Vacancy.post(vacancyData).then(vacancy => {
                commit(ADD_VACANCY, vacancy)
            })
        },
        async deleteVacancy({commit}, vacancyData) {
            await Vacancy.delete(vacancyData).then(vacancy => {
                commit(REMOVE_VACANCY, vacancy)
            })
        },
        async getVacancy({commit}) {
            await Vacancy.list().then(vacancy => {
                commit(SET_VACANCY, {vacancy})
            })
        },
    },
}
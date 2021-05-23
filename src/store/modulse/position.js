import {
    Position,
} from '@/api/elements'
import {
    ADD_POSITION, REMOVE_POSITION, SET_POSITION
} from '../mutation-types'


// Геттеры
export default {
    state: {
        position: [],
    },
    getters: {
        allPosition(state) {
            return state.position
        }
    },
// Мутации
    mutations: {
        [ADD_POSITION](state, position) {
            state.position = [position, ...state.position]
        },
        [REMOVE_POSITION](state, {id}) {
            state.position = state.position.filter(position => {
                return position.id !== id
            })
        },
        [SET_POSITION](state, {position}) {
            state.position = position
        },
    },
// Действия
    actions: {
        async createPosition({commit}, positionData) {
            await Position.post(positionData).then(position => {
                commit(ADD_POSITION, position)
            })
        },
        async deletePosition({commit}, positionData) {
            await Position.delete(positionData).then(position => {
                commit(REMOVE_POSITION, position)
            })
        },
        async getPosition({commit}) {
            await Position.list().then(position => {
                commit(SET_POSITION, {position})
            })
        },
    },
}
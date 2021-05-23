import {HTTP} from './common'

function createHTTP(url) {
    return {
        async post(config) {
            return HTTP.post(`${url}`, config).then(response => {
                console.log(response)
                return response.data
            })
        },
        async get(element) {
            return HTTP.get(`${url}${element.id}/`)
        },
        async patch(element) {
            console.log(element)
            return HTTP.patch(`${url}${element.id}/`, element).then(response => {
                console.log(response)
                return response.data
            })
        },
        async delete(id) {
            HTTP.delete(`${url}${id}/`)
            return id
        },
        async list() {
            return HTTP.get(`${url}`).then(response => {
                return response.data
            })
        }
    }
}

export const Position = createHTTP(`/position/`)
export const Division = createHTTP(`/division/`)
export const Vacancy = createHTTP(`/vocation/`)
export const Users = createHTTP(`/auth/users/`)
export const Interest = createHTTP(`/interest/`)

export const Auth = {
    async post(config) {
        return HTTP.post(`/auth/jwt/create/`, config).then(response => {
            console.log(response)
            return response.data
        })
    },
}
export const VerifyToken = {
    async post(config) {
        return HTTP.post(`/auth/jwt/verify`, config).then(response => {
            console.log(response)
            return response.status
        })
    },
}
export const MyProfile = {
    async get() {
        return HTTP.get(`/auth/users/me/`).then(response => {
            console.log(response)
            return response.status
        })
    },
}

export const LeaderCheck = {
    async get() {
        return HTTP.get(`/leader-check/`).then(response => {
            console.log(response)
            return response.data
        })
    },
}

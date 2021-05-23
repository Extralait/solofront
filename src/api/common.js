import axios from 'axios'

let token = localStorage.getItem('token')
let headers ={}
if (token){
    headers = {
        Authorization: 'JWT ' + token
    }
} else {
    headers = {}
}

export const HTTP = axios.create({
    baseURL: ' http://127.0.0.1:8000/api',
    headers: headers
})
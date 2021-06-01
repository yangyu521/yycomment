import Vue from 'vue'
import axios from "axios"

Vue.prototype.axios = axios

const instance = new axios.create({
    baseURL:"https://cnodejs.org/api/v1",
    timeout:5000
})

export default instance
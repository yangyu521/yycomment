import Vue from 'vue'
import axios from "axios"

Vue.prototype.axios = axios

const instance = new axios.create({
    baseURL:"https://cnodejs.org/api/v1"
})

export default instance
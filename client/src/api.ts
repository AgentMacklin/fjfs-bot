import axios from 'axios'


export default axios.create({
    baseURL: "http://pi-bot:3000/"
})
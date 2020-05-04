import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.koprabuh-member.com',
  })

export default instance
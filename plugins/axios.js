import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://api.koprabuh-member.com',
  })

  // const instance = axios.create({
  //   baseURL: 'http://localhost:9080',
  // })

export default instance
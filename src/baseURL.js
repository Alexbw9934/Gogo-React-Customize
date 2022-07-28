import axios from 'axios'

export default axios.create({
  baseURL: `https://94.130.236.116:10972/api`,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
  },
})

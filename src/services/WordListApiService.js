import config from '../config'
import TokenService from './token-service'


const WordListApiService = {
  getWords() {
    return fetch(`${config.API_ENDPOINT}/language`, {
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
       
        // Authorization: 'Bearer spaced-repetition-auth-token',
    },
    // body: JSON.stringify()
  })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

}

export default WordListApiService
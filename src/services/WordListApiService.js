import config from '../config'
import TokenService from './token-service'




const WordListApiService = {
  getWords(languageId = 1) {
    return fetch(`${config.API_ENDPOINT}/language/${languageId}`, {
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
       
        // Authorization: 'Bearer spaced-repetition-auth-token',
    },
    // body: JSON.stringify()
  })
      .then(res => {
        return (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      }
      )
  },

}

export default WordListApiService
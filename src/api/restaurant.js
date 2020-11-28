import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexRestaurant = user => {
  return axios({
    url: apiUrl + '/restaurant',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const showRestaurant = (user, id) => {
  return axios({
    url: apiUrl + '/restaurant/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexReviews = user => {
  return axios({
    url: apiUrl + '/reviews',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const showReview = (user, id) => {
  return axios({
    url: apiUrl + '/reviews/' + id,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createReview = (review, user) => {
  return axios({
    url: apiUrl + '/reviews',
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { review }
  })
}

export const updateReview = (review, user, id) => {
  return axios({
    url: apiUrl + '/reviews/' + id,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { review }
  })
}

export const deleteReview = (user, id) => {
  return axios({
    url: apiUrl + '/reviews/' + id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

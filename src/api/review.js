import apiUrl from '../apiConfig'
import axios from 'axios'

export const indexReviews = (user, rid) => {
  return axios({
    url: apiUrl + '/reviews/' + rid,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const showReview = (user, id, rid) => {
  return axios({
    url: apiUrl + `/reviews/${rid}/${id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createReview = (review, user, rid) => {
  return axios({
    url: apiUrl + '/reviews/' + rid,
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { review }
  })
}

export const updateReview = (review, user, id, rid) => {
  return axios({
    url: apiUrl + `/reviews/${rid}/${id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: { review }
  })
}

export const deleteReview = (user, id, rid) => {
  return axios({
    url: apiUrl + `/reviews/${rid}/${id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

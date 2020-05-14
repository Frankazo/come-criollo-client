import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { indexReviews, createReview, deleteReview } from '../../api/review'
import { showRestaurant } from '../../api/restaurant'

import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import styled from 'styled-components'

// import Button from '../Button'
import ReviewForm from '../ReviewForm'

const LgDiv = styled.div`
  &:media (min-width: 992px) {
    flex: 0 0 66.6666666667%;
    max-width: 66.6666666667%;
  }
`

const SmDiv = styled.div`
  &:media (min-width: 992px) {
    flex: 0 0 33.3333333333%;
    max-width: 33.3333333333%;
  }
`

const Review = styled(Accordion)`
  height: auto;
  margin-left: 30px;
  margin-top: 50px;
  padding: 10px;
`

const Restaurant = (props) => {
  // // deconstruction of the props
  const { user, msgAlert, match } = props
  // const restId = match.params.id
  // state variables
  const [restaurant, setRestaurant] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [review, setReview] = useState({
    title: '',
    text: '',
    rating: ''
  })

  const handleChange = event => {
    setReview({ ...review, [event.target.name]: event.target.value })
  }

  const handleDelete = event => {
    const id = event.target.id
    deleteReview(user, id, match.params.id)
      .then(() => {
        msgAlert({
          heading: 'Review Deleted',
          variant: 'success',
          message: 'Succesfully deleted Review'
        })
      })
      .then(() => indexReviews(user, match.params.id))
      .then(res => {
        setReviews(res.data.reviews)
      })
      .catch((error) => {
        setReviews(null)
        msgAlert({
          heading: 'Reviews Failed to delete with error: ' + error.message,
          message: 'Failed delete Review',
          variant: 'danger'
        })
      })
  }

  const handleSubmit = () => {
    event.preventDefault()

    createReview(review, user, match.params.id)
      .then(() => {
        msgAlert({
          heading: 'Create Review Success',
          variant: 'success',
          message: 'Review Is Now Displayed. Look at the page.'
        })
      })
      .then(() => indexReviews(user, match.params.id))
      .then(res => {
        setReviews(res.data.reviews)
      })
      .catch(err => {
        msgAlert({
          heading: 'Create Review Failed',
          variant: 'danger',
          message: 'Review is not displayed due to error: ' + err.message
        })
      })
  }

  // on mount runt showRestaurant and indexReviews
  useEffect(() => {
    showRestaurant(user, match.params.id)
      .then(res => {
        setRestaurant(res.data.restaurant)
        return res
      })
      .then(() => indexReviews(user, match.params.id))
      .then(res => {
        setReviews(res.data.reviews)
      })
      .then(() => msgAlert({
        heading: 'Show Restaurant Successfully',
        message: 'Succesfully retrieve restaurant',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Show Failed with error: ' + error.message,
          message: 'Error retrieving restaurant',
          variant: 'danger'
        })
      })
  }, [])

  let reviewsJsx

  if (!reviews) {
    reviewsJsx = 'Loading...'
  } else {
    reviewsJsx = reviews.map(review => {
      if (review.owner === user._id) {
        return (<Review key={review._id} className="img-preview d-block shadow-lg rounded mb-4">
          <h2>{review.title}</h2>
          {review.text}
          {review.rating}
          <Link to={`/restaurant/${match.params.id}/edit/${review._id}`}>Edit</Link>
          <button id={review._id} onClick={handleDelete}>Delete</button>
        </Review>)
      } else {
        return (<Review key={review._id} className="img-preview d-block shadow-lg rounded mb-4">
          <h2>{review.title}</h2>
          {review.text}
          {review.rating}
        </Review>)
      }
    })
  }

  let restJsx
  if (!restaurant) {
    restJsx = 'Loading...'
  } else {
    restJsx = (
      <Card style={{ margin: '40px', width: '27rem', height: '15rem' }}>
        <Card.Img variant="top" src={restaurant.imageUrl} />
        <Card.Body>
          <Card.Title>{restaurant.restName}</Card.Title>
          <Card.Title>{restaurant.email}</Card.Title>
        </Card.Body>
      </Card>)
  }

  return (
    <div className="Container">
      <div className="row">
        <LgDiv className="col-lg-8">
          <Review className="img-preview d-block shadow-lg rounded mb-4 text-center">
            <Accordion.Toggle eventKey="0">
              Leave a Review
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <ReviewForm
                review={review}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </Accordion.Collapse>
          </Review>
          {reviewsJsx}
        </LgDiv>
        <SmDiv className="col-lg-4">
          {restJsx}
        </SmDiv>
      </div>
    </div>
  )
}

export default Restaurant

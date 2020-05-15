import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { showReview, updateReview } from '../../api/review'
import { showRestaurant } from '../../api/restaurant'

import Card from 'react-bootstrap/Card'
import styled from 'styled-components'
import Spinner from '../Spinner'
import ReviewForm from '../ReviewForm'
import GoogleApiWrapper from '../googlemap'

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
const Review = styled.div`
  height: 50vh;
  margin-left: 30px;
  margin-top: 50px;
  padding: 10px;
`
const RestCont = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: auto;
`

const EditReview = (props) => {
  const { user, msgAlert, history } = props
  const [restaurant, setRestaurant] = useState(null)
  const [review, setReview] = useState({
    title: '',
    text: '',
    rating: ''
  })

  const handleChange = event => {
    setReview({ ...review, [event.target.name]: event.target.value })
  }
  const handleSubmit = () => {
    event.preventDefault()

    updateReview(review, user, props.match.params.id, props.match.params.rid)
      .then(() => {
        msgAlert({
          heading: 'Update Review Success',
          variant: 'success',
          message: 'Update Is Now Displayed. Look at the page.'
        })
      })
      .then(() => history.push(`/restaurant/${props.match.params.rid}`))
      .catch(err => {
        msgAlert({
          heading: 'Update Review Failed',
          variant: 'danger',
          message: 'Review is not displayed due to error: ' + err.message
        })
      })
  }

  useEffect(() => {
    showRestaurant(user, props.match.params.rid)
      .then(res => {
        setRestaurant(res.data.restaurant)
        return res
      })
      .then(() => showReview(user, props.match.params.id, props.match.params.rid))
      .then(res => {
        setReview(res.data.review)
      })
      .then(() => {
        msgAlert({
          heading: 'Index Review Success',
          variant: 'success',
          message: 'Succesfully retrieve Reviews'
        })
      })
      .catch((error) => {
        setReview(null)
        msgAlert({
          heading: 'Index Reviews Failed with error: ' + error.message,
          message: 'Failed retrieve Review',
          variant: 'danger'
        })
      })
  }, [])

  // Jsx that contains the restaurant
  let restJsx
  if (!restaurant) {
    restJsx = <Spinner />
  } else {
    restJsx = (
      <RestCont>
        <Card style={{ margin: '40px', width: '27rem', height: '15rem' }}>
          <Card.Img variant="top" src={restaurant.imageUrl} />
          <Card.Body>
            <Card.Title>{restaurant.restName}</Card.Title>
            <Card.Title>{restaurant.description}</Card.Title>
          </Card.Body>
        </Card>
        <div style={{ marginTop: '110px', marginLeft: '40px' }}>
          <h3>Contact Info</h3>
          <p>{restaurant.email}</p>
          <p>{restaurant.phone}</p>
          <p>{restaurant.website}</p>
          <p>{restaurant.location}</p>
          <GoogleApiWrapper
            address = {restaurant.location}
          />
        </div>
      </RestCont>
    )
  }

  return (
    <div className="Container">
      <div className="row">
        <LgDiv className="col-lg-8">
          <Review className="img-preview d-block shadow-lg rounded mb-4">
            <h3>Edit Review</h3>
            <ReviewForm
              review={review}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cancelPath={`/restaurant/${props.match.params.rid}`}
            />
          </Review>
        </LgDiv>
        <SmDiv className="col-lg-4">
          {restJsx}
        </SmDiv>
      </div>
    </div>
  )
}

export default withRouter(EditReview)

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

// components imports
import Spinner from '../Spinner'
import RestCont from '../RestCont'
import ReviewForm from '../ReviewForm'

// api calls
import { indexReviews, createReview, deleteReview } from '../../api/review'
import { showRestaurant } from '../../api/restaurant'

// styles
import Accordion from 'react-bootstrap/Accordion'
import { LgDiv, SmDiv, Review, AccrToggle, Button } from './styles'

const Restaurant = (props) => {
  // deconstruction of the props
  const { user, msgAlert, match } = props

  // State variables
  const [restaurant, setRestaurant] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [toggle, setToggle] = useState(null)
  const [review, setReview] = useState({
    title: '',
    text: '',
    rating: ''
  })

  // run whenever we need to update text in an input
  const handleChange = event => {
    setReview({ ...review, [event.target.name]: event.target.value })
  }

  // function to toggle accordion on click
  // in order to be able to toggle back on submit
  const toggleHandler = event => {
    if (toggle) {
      setToggle(null)
    } else {
      setToggle('0')
    }
  }

  // delete handler function
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

  // submit handler function
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
      .then(() => setReview({
        title: '',
        text: '',
        rating: ''
      }),
      setToggle(null)
      )
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

  // Jsx that contains reviews
  let reviewsJsx
  if (!reviews) {
    reviewsJsx = <Spinner />
  } else {
    reviewsJsx = reviews.map(review => {
      if (review.owner === user._id) {
        return (
          <Review key={review._id} className="img-preview d-block shadow-lg rounded mb-4">
            <div style={{ padding: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>{review.title}</h2>
                <img style={{ width: '130px', height: '30px' }} src={require(`../../../public/${review.rating}.png`)} />
              </div>
              <p>{review.text}</p>
              <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <Button variant="dark" id={review._id} onClick={handleDelete}>X</Button>
                <Link style={{ color: 'white' }} to={`/restaurant/${match.params.id}/edit/${review._id}`}><Button variant="dark"><FontAwesomeIcon icon={faEdit} /></Button></Link>
              </div>
            </div>
          </Review>
        )
      } else {
        return (
          <Review key={review._id} className="img-preview d-block shadow-lg rounded mb-4">
            <div style={{ padding: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>{review.title}</h2>
                <img style={{ width: '140px', height: '30px' }} src={require(`../../../public/${review.rating}.png`)} />
              </div>
              <p>{review.text}</p>
            </div>
          </Review>
        )
      }
    })
  }

  // Jsx that contains the restaurant
  let restJsx
  if (!restaurant) {
    restJsx = <Spinner />
  } else {
    restJsx = (
      <RestCont
        restaurant={restaurant}
      />
    )
  }

  // Jsx that contains the create form inside an accordion
  const accordion = (
    <Review activeKey={toggle} className="img-preview d-block shadow-lg rounded mb-4">
      <AccrToggle eventKey="0" onClick={toggleHandler}>
        Leave a Review
      </AccrToggle>
      <Accordion.Collapse eventKey="0">
        <ReviewForm
          review={review}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Accordion.Collapse>
    </Review>
  )

  // return statement
  return (
    <div className="Container">
      <div className="row">
        <LgDiv className="col-lg-8">
          {accordion}
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

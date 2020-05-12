import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { showReview, updateReview } from '../../api/review'

import Card from 'react-bootstrap/Card'
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
const Review = styled.div`
  height: 50vh;
  margin-left: 30px;
  margin-top: 50px;
  padding: 10px;
`

const EditReview = (props) => {
  const { user, msgAlert, history } = props
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

    updateReview(review, user, props.match.params.rid)
      .then(() => {
        msgAlert({
          heading: 'Update Review Success',
          variant: 'success',
          message: 'Update Is Now Displayed. Look at the page.'
        })
      })
      .then(() => history.push('/restaurant/:id'))
      .catch(err => {
        msgAlert({
          heading: 'Update Review Failed',
          variant: 'danger',
          message: 'Review is not displayed due to error: ' + err.message
        })
      })
  }

  useEffect(() => {
    showReview(user, props.match.params.rid)
      .then(res => {
        console.log(res)
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

  return (
    <div className="Container">
      <div className="row">
        <LgDiv className="col-lg-8">
          <Review className="img-preview d-block shadow-lg rounded mb-4 text-center">
            <ReviewForm
              review={review}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              cancelPath="/restaurant/:id"
            />
          </Review>
        </LgDiv>
        <SmDiv className="col-lg-4">
          <Card style={{ margin: '40px', width: '27rem', height: '15rem' }}>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" />
            <Card.Body>
              <Card.Title>Mamas salad</Card.Title>
            </Card.Body>
          </Card>
        </SmDiv>
      </div>
    </div>
  )
}

export default withRouter(EditReview)

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Spinner from '../Spinner'
import { Container, Row, Col } from 'react-bootstrap'
import { indexRestaurant } from '../../api/restaurant'
import styled from 'styled-components'

const Img = styled.img`
  width: auto;
  height: 300px;
  border-radius: 5px;

  &:hover{
    display: inline-block;
    vertical-align: middle;
    -webkit-transform: perspective(1px) translateZ(0);
    transform: perspective(1px) translateZ(0);
    box-shadow: 0 0 8px rgba(0, 0, 0, 1);
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: box-shadow;
    transition-property: box-shadow;
  }
`

const RestaurantIndex = props => {
  const [restaurants, setRestaurants] = useState(null)
  const { msgAlert, user } = props

  useEffect(() => {
    indexRestaurant(user)
      .then(res => setRestaurants(res.data.restaurant))
      .then(() => msgAlert({
        heading: 'Index Restaurants Successfully',
        message: 'Succesfully retrieve restaurants',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Index Failed with error: ' + error.message,
          message: 'Error retrieving restaurants',
          variant: 'danger'
        })
      })
  }, [])

  let restJsx
  if (!restaurants) {
    restJsx = <Spinner />
  } else {
    restJsx = restaurants.map(rest => {
      return (
        <Link style={{ color: 'black' }} key={rest._id} to={`/restaurant/${rest._id}`}>
          <Col md={4} key={rest._id}>
            <Img alt="restaurant image" src={rest.imageUrl} />
            <div style={{ marginTop: '10px', width: '300px' }}>
              <p style={{ fontSize: '1.4rem' }} >{rest.restName}</p>
            </div>
          </Col>
        </Link>
      )
    })
  }
  return (
    <Container style={{ display: 'flex', justifyContent: 'space-evenly', marginTop: '40px' }} fluid="md">
      <Row>
        {restJsx}
      </Row>
    </Container>
  )
}

export default RestaurantIndex

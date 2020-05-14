import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import Card from 'react-bootstrap/Card'

import { indexRestaurant } from '../../api/restaurant'

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
    restJsx = 'Loading...'
  } else {
    restJsx = restaurants.map(rest => {
      return (
        <Link key={rest._id} to={`/restaurant/${rest._id}`}>
          <Card style={{ margin: '40px', width: '27rem', height: '15rem' }}>
            <Card.Img variant="top" src={rest.imageUrl} />
            <Card.Body>
              <Card.Title>{rest.restName}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      )
    })
  }
  return (
    <div>
      <div className="row row-cols-1 row-cols-md-4">
        {restJsx}
      </div>
    </div>
  )
}

export default RestaurantIndex

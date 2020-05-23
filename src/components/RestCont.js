import React from 'react'
// import Card from 'react-bootstrap/Card'
import styled from 'styled-components'

const RestCont = styled.div`
  display: flex;
  flex-flow: column wrap;
  height: auto;
  margin-top: 50px;
`

const Img = styled.img`
  width: 500px;
  height: auto;
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

const RestaurantContainer = ({ restaurant }) => {
  return (
    <RestCont>
      <Img alt="restaurant image" src={restaurant.imageUrl} />
      <h3 style={{ marginTop: '10px' }}>{restaurant.restName}</h3>
      <h5 style={{ color: '#292b2c90', marginLeft: '5px' }}>{restaurant.description}</h5>
      <h3>Contact Info</h3>
      <p>{restaurant.email}</p>
      <p>{restaurant.phone}</p>
      <p>{restaurant.website}</p>
      <p>{restaurant.location}</p>
      <iframe src={restaurant.map} width="90%" height="450" frameBorder="0"/>
    </RestCont>
  )
}

export default RestaurantContainer

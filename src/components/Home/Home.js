import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
// import Nav from 'react-bootstrap/Nav'

import HeroImage from '../HeroImage'
import Container from '../Container'
import Button from '../Button'

const Div = styled.div`
  display: flex;
`

const Home = () => {
  return (
    <Div>
      <HeroImage>
        <div>
          <h1 style={{ fontSize: '3rm' }}>Come</h1>
          <h1 style={{ fontSize: '3rm' }}>Criollo</h1>
        </div>
      </HeroImage>
      <Container>
        <ul>
          <h1 style={{ textAlign: 'center' }} >Connect with Restaurant in your Area</h1>
          <h1 style={{ textAlign: 'center' }} >Review, Like and love</h1>
          <div style={{ justifyContent: 'center', alignItems: 'center' }} className="row">
            <Link to='/sign-up'>
              <Button>Sign Up</Button>
            </Link>
            <Link to='/sign-in' style={{ marginLeft: '5px' }}>
              <Button>Sign In</Button>
            </Link>
          </div>
        </ul>
      </Container>
    </Div>
  )
}

export default Home

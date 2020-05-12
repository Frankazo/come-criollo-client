import React from 'react'
import styled from 'styled-components'
import HeroImage from '../HeroImage'
// import { Link } from 'react-router-dom'
import Container from '../Container'
import Nav from 'react-bootstrap/Nav'

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
        <div>
          <h1>Placeholder</h1>
          <div className="row">
            <Nav.Link className="btn btn-info" style={{ color: 'black' }} href="#sign-up">Sign Up</Nav.Link>
            <Nav.Link className="btn btn-info" style={{ color: 'black' }} href="#sign-in">Sign In</Nav.Link>
          </div>
        </div>
      </Container>
    </Div>
  )
}

export default Home

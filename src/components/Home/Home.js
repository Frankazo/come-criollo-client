import React from 'react'
import styled from 'styled-components'
import HeroImage from '../HeroImage'
// import { Link } from 'react-router-dom'

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

    </Div>
  )
}

export default Home

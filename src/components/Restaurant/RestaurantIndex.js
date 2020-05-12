import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'

import Card from 'react-bootstrap/Card'

// import { GetRest } from '../../api/auth'
// import messages from '../AutoDismissAlert/messages'

// This Class will eventually make an api call to get a list of Restaurants
// Rigth now will only display Restaurant Dummy Data
class RestaurantIndex extends Component {
  constructor () {
    super()

    this.state = {}
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  render () {
    return (
      <div>
        <div className="row row-cols-1 row-cols-md-4">
          <Link to='/restaurant/:id'>
            <Card style={{ margin: '40px', width: '27rem', height: '15rem' }}>
              <Card.Img variant="top" src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" />
              <Card.Body>
                <Card.Title>Mamas salad</Card.Title>
              </Card.Body>
            </Card>
          </Link>
          <Card style={{ margin: '40px', width: '27rem', height: '15rem' }}>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" />
            <Card.Body>
              <Card.Title>Wok N Roll</Card.Title>
            </Card.Body>
          </Card>
          <Card style={{ margin: '40px', width: '27rem', height: '15rem' }}>
            <Card.Img variant="top" src="https://images.unsplash.com/photo-1499028344343-cd173ffc68a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80" />
            <Card.Body>
              <Card.Title>Burgatory</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
    )
  }
}

export default withRouter(RestaurantIndex)

import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import HeroImage from '../HeroImage'

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 50%;
`

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign Up Success',
        message: messages.signUpSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/restaurant'))
      .catch(error => {
        this.setState({ email: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, passwordConfirmation } = this.state

    return (
      <div style={{ display: 'flex' }}>
        <HeroImage>
          <div>
            <h1 style={{ fontSize: '3rm' }}>Come</h1>
            <h1 style={{ fontSize: '3rm' }}>Criollo</h1>
          </div>
        </HeroImage>
        <Div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3>Sign Up</h3>
            <Form onSubmit={this.onSignUp}>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted">
                  We will never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="passwordConfirmation">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  required
                  name="passwordConfirmation"
                  value={passwordConfirmation}
                  type="password"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="dark"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </Div>
      </div>
    )
  }
}

export default withRouter(SignUp)

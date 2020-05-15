import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const MyFormControl = styled(Form.Control)`
  color: #000000;
  background-color: transparent;
  border-size: 0.5px;
  border-color:  #00000030;
  border-radius: 0px;
  border-top: transparent;
  border-right: transparent;
  border-left: transparent;

  &:hover,
  &:active{
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
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ReviewForm = ({ review, handleSubmit, handleChange, cancelPath }) => {
  let cancelJsx = null
  if (cancelPath) {
    cancelJsx = (
      <Link style={{ marginLeft: '5px' }} to={cancelPath}>
        <Button variant="dark"> Cancel </Button>
      </Link>
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group style={{ width: '30%' }} controlId="title">
        <MyFormControl
          required
          type="text"
          name="title"
          value={review.title}
          placeholder="Enter Title"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="text">
        <Form.Control
          required
          type="text"
          name="text"
          value={review.text}
          placeholder="Enter Review"
          onChange={handleChange}
          as="textarea"
          rows="5"
        />
      </Form.Group>

      <Form.Group controlId="rating">
        <MyFormControl
          style={{ width: '20%' }}
          required
          type="number"
          name="rating"
          value={review.rating}
          onChange={handleChange}
          as="select">
          <option>Rating</option>
          <option value="5" >5</option>
          <option value="4" >4</option>
          <option value="3" >3</option>
          <option value="2" >2</option>
          <option value="1" >1</option>
        </MyFormControl>
      </Form.Group>
      <Container>
        <Button variant="dark" type="submit"> Submit </Button>
        {cancelJsx}
      </Container>

    </Form>
  )
}

export default ReviewForm

import React from 'react'
import { Link } from 'react-router-dom'
// import styled from 'styled-components'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// const Title = styled.input`
//   color: #000000;
//   background-color: transparent;
//   border-size: 0.5px;
//   border-color:  #00000030;
//
//   border-top: transparent;
//   border-right: transparent;
//   border-left: transparent;
// `
//
// const Description = styled.input`
//   margin-top: 10px;
//   flex-grow: 1;
//   border-size: 0.5px;
//   border-color:  #00000030;
//   border-radius: 3px;
// `
//
// const Rating = styled.input`
// `

// const MyForm = styled(Form)`
//   display: flex;
//   flex-wrap: wrap;
//   flex-direction: column;
// `

const ReviewForm = ({ review, handleSubmit, handleChange, cancelPath }) => {
  let cancelJsx = null
  if (cancelPath) {
    cancelJsx = (
      <Link to={cancelPath}>
        <Button variant="dark"> Cancel </Button>
      </Link>
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="title">
        <Form.Label>Review title</Form.Label>
        <Form.Control
          required
          type="text"
          name="title"
          value={review.title}
          placeholder="Enter Title"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="text">
        <Form.Label>Review</Form.Label>
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
        <Form.Label>Example select</Form.Label>
        <Form.Control
          required
          type="number"
          name="rating"
          value={review.rating}
          onChange={handleChange}
          as="select">
          <option>Select one</option>
          <option value="5" >5</option>
          <option value="4" >4</option>
          <option value="3" >3</option>
          <option value="2" >2</option>
          <option value="1" >1</option>
        </Form.Control>
      </Form.Group>
      <Button variant="dark" type="submit"> Submit </Button>
      {cancelJsx}
    </Form>
  )
}

export default ReviewForm

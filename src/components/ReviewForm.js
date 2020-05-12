import React from 'react'
import { Link } from 'react-router-dom'

const ReviewForm = ({ review, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="A Wonderful Film"
      value={review.title}
      name="title"
      onChange={handleChange}
    />

    <label>Description</label>
    <input
      placeholder="John Doe"
      value={review.text}
      name="text"
      onChange={handleChange}
    />

    <label>Rating</label>
    <input
      type="number"
      placeholder="0 to 5"
      value={review.rating}
      name="rating"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ReviewForm

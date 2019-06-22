import React from 'react'

const RandomEntry = (props) => {
  return (
    <div>
      <br></br>
      {new Date(props.randomPost.date_created).toDateString()}
      <br></br>
      <div className="random-entry-container">
        {props.randomPost.content}
      </div>
    </div>
  )
}

export default RandomEntry
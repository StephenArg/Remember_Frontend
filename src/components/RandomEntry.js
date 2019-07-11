import React from 'react'
import skipIcon from '../icons/skip.png'

const RandomEntry = (props) => {

  const handleSkip = () => {

    const user = {user: props.user}

    fetch(`${process.env.REACT_APP_API_LOCATION}/entries/skip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(props.handleRandomPost)
  }

  const dateString = new Date(props.randomPost.date_created).toLocaleString('en-us', {  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div>
      <br></br>
      <strong>{dateString}</strong>
      <br></br>
      <div className="random-entry-container">
        {props.randomPost.content}
        <div onClick={handleSkip} style={{backgroundImage: `url(${skipIcon})`, backgroundSize: "25px 25px"}} className="tooltip wobble-horizontal">
          <span class="tooltiptext">Click to skip</span>
        </div>
      </div>
    </div>
  )
}

export default RandomEntry
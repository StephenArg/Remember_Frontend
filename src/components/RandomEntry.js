import React from 'react'
import skipIcon from '../icons/skip.png'

const RandomEntry = (props) => {

  console.log(props)

  const handleSkip = () => {

    const user = {user: props.user}

    fetch(`http://${process.env.REACT_APP_API_LOCATION}/entries/skip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
      .then(props.handleRandomPost)
  }

  return (
    <div>
      <br></br>
      {new Date(props.randomPost.date_created).toDateString()}
      <br></br>
      <div className="random-entry-container">
        {props.randomPost.content}
        <img onClick={handleSkip} className="skip_icon" src={skipIcon}></img>
      </div>
    </div>
  )
}

export default RandomEntry
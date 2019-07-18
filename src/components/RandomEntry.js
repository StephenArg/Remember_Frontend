import React from 'react'
// import skipIcon from '../icons/skip.png'
import {motion} from 'framer-motion'

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

  const dateString = new Date(props.randomPost.date_created).toLocaleString('en-us', {  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: "UTC" })

  return (
    <div style={{marginTop: "35px"}}>
      <br></br>
      <strong>{dateString}</strong>
      <br></br>
      <div style={{marginTop: "20px"}} className="random-entry-container">
        {props.randomPost.content}
        <motion.div onClick={handleSkip}
         className="tooltip"
         whileHover={{rotate: 360}}
         transition={{ duration: 1 }}>
          <span className="tooltiptext">Click to skip</span>
        </motion.div>
      </div>
    </div>
  )
}

export default RandomEntry
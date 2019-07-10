import React, {useState, useEffect} from 'react'
import userAuthFetch from '../globallyUsedFunctions.js/UserAuthFetch'

 
const Calendar = props => {

  const [user, setUser] = useState({})
  const [date, setDate] = useState("default")
  const [entries, setEntries] = useState([])

  useEffect(() => {
    userAuthFetch(setUser)
  }, [])

  useEffect(()=>{
    if (user.current_date !== undefined && date === "default"){
      setDate(user.current_date)
    }
  })

  const handleSubmit = () => {
    fetch(`http://${process.env.REACT_APP_API_LOCATION}/entries/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({userId: user.id, date: date})
        }).then(res => res.json()).then(console.log)
  }

  return (
    <div>
      <br></br>
      <strong for="start">Select Date To Show Up To 15 Entries Made On Or Before That Day:</strong>
      <br></br>
      <br></br>
      {date === "default" ?  <h2>Loading...</h2> : 
      <div>
        <input type="date" id="start" name="trip-start"
          value={date}
          min="2016-01-01" max="2100-12-31"
          onChange={e => setDate(e.target.value)} ></input>
        <br></br>
        <button style={{backgroundColor: "olive", border: "solid black 1px"}} onClick={handleSubmit} >Search Entries</button>
      </div>}


    </div>
  )
}
 
export default Calendar
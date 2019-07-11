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
        }).then(res => res.json()).then(setEntries)
  }

  const handleDelete = (e) => {

    let entryId = e.target.parentElement.dataset.id

    fetch(`http://${process.env.REACT_APP_API_LOCATION}/entries/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({fromTile: true ,entryId: entryId})
    }).then(() => {removeTile(entryId)})
  }

  const removeTile = (tileId) => {
    setEntries(entries.filter((entry) => {
        return entry.id !== parseInt(tileId)
     })
    )
  }

  let allEntries = entries.map((entry) => {
    return (
      <div className="entry-tile" data-id={entry.id}>
        <button className="tile-button-delete" style={{backgroundColor: "olive", border: "solid black 1px"}} onClick={handleDelete} >Delete</button>
        {new Date(entry.date_created).toLocaleString('en-us', {  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        <br></br>
        <hr></hr>
        {entry.content.replace(/\/\/t/g, '\t').replace(/\/\/n/g, '\n')}
      </div>
    )
  })

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
        <button className='submit-buttons' style={{backgroundColor: "olive", border: "solid black 1px"}} onClick={handleSubmit} >Search Entries</button>
      </div>}

      <br></br>

      {allEntries.length > 0 ? 
        <div className="entry-tile-container">
          {allEntries} 
        </div>
        : null}

    </div>
  )
}
 
export default Calendar
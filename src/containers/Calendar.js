import React, {useState, useEffect} from 'react'
import userAuthFetch from '../globallyUsedFunctions.js/UserAuthFetch'
import {motion} from 'framer-motion'

 
const Calendar = props => {

  const [user, setUser] = useState({})
  const [date, setDate] = useState("default")
  const [entries, setEntries] = useState([])
  const [searched, setSearched] = useState(false)
  const [newEntry, setNewEntry] = useState(false)
  const [entry, setEntry] = useState("")

  useEffect(() => {
    userAuthFetch(setUser)
  }, [])

  useEffect(()=>{
    if (user.current_date !== undefined && date === "default"){
      setDate(user.current_date)
    }
  })

  const handleSubmit = () => {
    fetch(`${process.env.REACT_APP_API_LOCATION}/entries/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({userId: user.id, date: date})
        }).then(res => res.json()).then((e) => {
                        setEntries(e)
                        setSearched(true)
                        setNewEntry(false)})
  }

  const handleSubmitEntry = () => {

    if (date !== "default") {
      const finalized_entry = {
        date: date,
        user_id: user.id,
        content: entry.replace(/\t/g, '//t').replace(/\n/g, '//n')
      }
    
      fetch(`${process.env.REACT_APP_API_LOCATION}/entries/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(finalized_entry)
      }).then(res => res.json())
      .then(()=>{
        setNewEntry(false)
        setEntry("")
      })
    }
  }

  const handleDelete = (e) => {

    let entryId = e.target.parentElement.dataset.id

    fetch(`${process.env.REACT_APP_API_LOCATION}/entries/delete`, {
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

  const handleTextAreaKeys = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault()
      var val = entry,
      start = e.target.selectionStart,
      end = e.target.selectionEnd;
      setEntry(val.substring(0, start) + '\t' + val.substring(end))
    }
  }

  let allEntries = entries.map((entry) => {
    return (
      <div className="entry-tile" data-id={entry.id} key={entry.id}>
        <div className="inner-entry-tile">
          <button className="tile-button-delete" style={{left:"400px", top:"18px", position: "sticky", backgroundColor: "olive", border: "solid black 1px"}} onClick={handleDelete} >Delete</button>
          <br></br>
          {new Date(entry.date_created).toLocaleString('en-us', {  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: "UTC"})}
          <br></br>
          <hr></hr>
          {entry.content.replace(/\/\/t/g, '\t').replace(/\/\/n/g, '\n')}
          <fade></fade>
        </div>
      </div>
    )
  })

  return (
    <div>
      <br></br>
      <strong for="start">Select Date To Show Up To 15 Entries Made On Or Before That Day or Create Entry For Selected Date:</strong>
      <br></br>
      <br></br>
      {date === "default" ?  
        <motion.div
          animate={{scale: 1.3}}
          transition={{flip: Infinity, duration: .75, repeatDelay: .15 }}
          style={{maxWidth: "50%", display: "inline-block"}}>
            <h2 style={{fontFamily: "Superclarendon", textShadow: '-1px -1px tan, 1px -1px 0 tan, -1px 1px 0 tan, 1px 1px 0 tan'}}>Loading...</h2>
        </motion.div> : 
      <div>
        <input type="date" id="start" name="trip-start"
          value={date}
          min="1950-01-01" max="2150-12-31"
          onChange={e => setDate(e.target.value)} ></input>
        <br></br>
        <button className='submit-buttons' style={{backgroundColor: "olive", border: "solid black 1px"}} onClick={handleSubmit} >Search Entries</button>
        <text style={{cursor: 'default'}}> </text>
        <button 
        className='submit-buttons' 
        style={{backgroundColor: "olive", border: "solid black 1px"}} 
        onClick={()=> {
          setSearched(false)
          setNewEntry(!newEntry)
          }} >Create Entry</button>
      </div>}

      <br></br>
      {searched ? (allEntries.length > 0 ? 
        <div className="entry-tile-container">
          {allEntries} 
        </div>
        : <text style={{fontWeight: "700", fontSize: 27}}>You have no entries on or before this date </text>) : null}

      {newEntry ? 
        <div>
          <textarea id="text-area-input" rows="12" cols="80" autoFocus="true" value={entry} onChange={(e)=> setEntry(e.target.value)} onKeyDown={handleTextAreaKeys} >
          </textarea>
          <br></br>
          <button className='submit-buttons' style={{backgroundColor: "olive", border: "solid black 1px"}} onClick={handleSubmitEntry} >Submit Entry</button>
        </div> : null}

    </div>
  )
}
 
export default Calendar
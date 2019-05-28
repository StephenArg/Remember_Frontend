import React, {useState} from 'react'
 
const TextAreaInput = props => {

  const [entry, setEntry] = useState("")

  const handleSubmit = () => {

    const finalized_entry = {
      date: props.user.current_date,
      user_id: props.user.id,
      content: entry
    }

    fetch(`http://${process.env.REACT_APP_API_LOCATION}/entries/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalized_entry)
    }).then(res => res.json())
    .then(console.log())

    props.setCurrentCondition("closed")
  }

  return (
      <div>
        <textarea id="text-area-input" rows="12" cols="80" value={entry} onChange={(e)=> setEntry(e.target.value)} >
        </textarea>
        <br></br>
        <button style={{backgroundColor: "olive", border: "solid black 1px"}} onClick={handleSubmit} >Submit Entry</button>
      </div>
  )
}
 
export default TextAreaInput
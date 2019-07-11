import React, {useState} from 'react'
 
const TextAreaInput = props => {

  const [entry, setEntry] = useState("")

  const handleSubmit = () => {

    const finalized_entry = {
      date: props.user.current_date,
      user_id: props.user.id,
      content: entry.replace(/\t/g, '//t').replace(/\n/g, '//n')
    }
  
    fetch(`${process.env.REACT_APP_API_LOCATION}/entries/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(finalized_entry)
    }).then(res => res.json())
    .then(props.verifyCondition)
  
    props.setCurrentCondition("closed")
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

  return (
      <div>
        <textarea id="text-area-input" rows="12" cols="80" autoFocus="true" value={entry} onChange={(e)=> setEntry(e.target.value)} onKeyDown={handleTextAreaKeys} >
        </textarea>
        <br></br>
        <button className='submit-buttons' style={{backgroundColor: "olive", border: "solid black 1px"}} onClick={handleSubmit} >Submit Entry</button>
      </div>
  )
}
 
export default TextAreaInput
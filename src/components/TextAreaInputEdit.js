import React, {useState, useEffect} from 'react'
 
const TextAreaInputEdit = props => {

  const [entry, setEntry] = useState("")

  useEffect(()=> {
    setEntry(props.currentEntry.content)
  }, [])

  const handleSubmit = () => {

    const finalized_entry = {
      content: entry,
      entry_id: props.currentEntry.id
    }

    fetch(`${process.env.REACT_APP_API_LOCATION}/entries/edit`, {
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
      <div style={{marginTop:"20px"}}>
        <textarea id="text-area-input" rows="12" cols="80" autoFocus="true" value={entry} onChange={(e)=> setEntry(e.target.value)} onKeyDown={handleTextAreaKeys} >
        </textarea>
        <br></br>
        <button className='submit-buttons' style={{backgroundColor: "olive", border: "solid black 1px"}} onClick={handleSubmit} >Submit Entry</button>
      </div>
  )
}
 
export default TextAreaInputEdit
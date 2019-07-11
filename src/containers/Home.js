import React, {useState, useEffect} from 'react'
import RandomEntry from '../components/RandomEntry'
import AuthContainer from './AuthContainer'
import TextAreaInput from '../components/TextAreaInput'
import TextAreaInputEdit from '../components/TextAreaInputEdit'
 
const Home = props => {

  const [randomJournalPost, setRandomJournalPost] = useState(false)
  const [currentCondition, setCurrentCondition] = useState("loading")
  const [currentEntry, setCurrentEntry] = useState(null)

  useEffect(() => {
    const date = {date: props.user.current_date}

    if (currentCondition === "loading" && date.date !== undefined){
      verifyCondition(date)
    }
  })

  useEffect(()=>{

    const user = {user: props.user}

    if (!randomJournalPost && user.user !== undefined){

      fetch(`http://${process.env.REACT_APP_API_LOCATION}/entries/random`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
        }).then(res => res.json())
        .then(handleRandomPost)
    }
  })

  const handleCondition = (e) => {
    if (e.entry === "none"){
      setCurrentCondition("open")
    } else {
      setCurrentEntry(e.entry)
      setCurrentCondition("closed")
    }
  }

  const handleRandomPost = (random) => {
    random.post.content = random.post.content.replace(/\/\/t/g, '\t').replace(/\/\/n/g, '\n')
    setRandomJournalPost(random.post)
  }

  const verifyCondition = () => {
    const date = {date: props.user.current_date}

    fetch(`http://${process.env.REACT_APP_API_LOCATION}/entries/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(date)
    }).then(res => res.json())
      .then(handleCondition)
  }

  const handleEdit = () => {
    setCurrentCondition("edit")
  }

  const handleDelete = () => {
    const date = {fromTile: false, date: props.user.current_date}

    fetch(`http://${process.env.REACT_APP_API_LOCATION}/entries/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(date)
    }).then(verifyCondition)
  }

  const handleHide = () => {
    setCurrentCondition("closed")
  }


   if (!localStorage.getItem("token")) {
      return (
          <div>
            <AuthContainer {...props}/>
          </div>
        )
   }
    else if(currentCondition === "loading") {
    return (
      <div>
          <h2>Loading...</h2>
      </div>
    )
   } else if (currentCondition === "open") {
     return (
       <div>
         {randomJournalPost ? <RandomEntry user={props.user} randomPost={randomJournalPost} handleRandomPost={handleRandomPost} />: null}
         <br></br>
         <br></br>
         <label style={{fontWeight: "bold"}}>Today's Entry:</label>
         <br></br>
         <TextAreaInput user={props.user} setCurrentCondition={setCurrentCondition} verifyCondition={verifyCondition} />
       </div>
     )
    } else if (currentCondition === "closed") {
      return (
        <div>
          {randomJournalPost ? <RandomEntry user={props.user} randomPost={randomJournalPost} handleRandomPost={handleRandomPost}/> : null}
          <br></br>
          <div style={{border:'solid black 2px', width: '185px', display: 'inline-block', borderRadius: '5px'}}>
            <p>Daily post completed!</p>
        
            <p><button className="edit_delete_buttons" onClick={handleEdit}>Edit</button> / <button className="edit_delete_buttons" onClick={handleDelete}>Delete</button></p>
          </div>
        </div>
      )
    } else if (currentCondition === "edit") {
      return (
        <div>
          {randomJournalPost ? <RandomEntry user={props.user} randomPost={randomJournalPost} handleRandomPost={handleRandomPost} /> : null}
          <br></br>
          <br></br>
          <label style={{fontWeight: "bold"}}>Today's Entry:</label>
          <br></br>
          <TextAreaInputEdit user={props.user} setCurrentCondition={setCurrentCondition} currentEntry={currentEntry} verifyCondition={verifyCondition} />
          <p><button className="edit_delete_buttons" onClick={handleHide}>Hide</button> / <button className="edit_delete_buttons" onClick={handleDelete}>Delete</button></p>
        </div>
      )
    }
}
 
export default Home
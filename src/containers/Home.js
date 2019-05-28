import React, {useState, useEffect} from 'react'
import RandomEntry from '../components/RandomEntry'
import AuthContainer from './AuthContainer'
import TextAreaInput from '../components/TextAreaInput'
 
const Home = props => {

  const [randomJournalPost, setRandomJournalPost] = useState(true)
  const [currentCondition, setCurrentCondition] = useState("loading")
  const [currentEntry, setCurrentEntry] = useState(null)

  useEffect(() => {

    const date = {date: props.user.current_date}

    if (currentCondition === "loading" && date.date){
      console.log(date)

      const handleCondition = (e) => {
        console.log(e)
        if (e.entry === "none"){
          setCurrentCondition("open")
        } else {
          setCurrentEntry(e.entry)
          setCurrentCondition("closed")
        }
      }

      console.log("what")
      fetch(`http://${process.env.REACT_APP_API_LOCATION}/entries/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(date)
    }).then(res => res.json())
      .then(handleCondition)
    }
  })

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
         {randomJournalPost ? <RandomEntry /> : null}
         <br></br>
         <br></br>
         <label style={{fontWeight: "bold"}}>Today's Entry:</label>
         <br></br>
         <TextAreaInput user={props.user} setCurrentCondition={setCurrentCondition} />
       </div>
     )
    } else if (currentCondition === "closed") {
      return (
        <div>
          {randomJournalPost ? <RandomEntry /> : null}
          <p>Closed text box / edit/delete previous</p>
        </div>
      )
    }
}
 
export default Home
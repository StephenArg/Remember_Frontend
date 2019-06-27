import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Home from './containers/Home'
import Calender from './containers/Calender'

function App() {

  const [user, setUser] = useState({})


  useEffect(() => {
      if (localStorage.getItem("token")){

        const today = new Date().toISOString().slice(0, 10)

        fetch(`http://${process.env.REACT_APP_API_LOCATION}/users/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({jwt: localStorage.getItem("token"), date: today})
          }).then(res => res.json())
          .then((u)=>{
            if (u["error"] === "token error"){
              localStorage.removeItem("token")
              setUser({})
            } else {
              setUser(u)
            }
          })
        }
       }
       , [])
  
    
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 id="header-h1" >Remember</h1>
        </header>
        

        <Route path='/calender/' component={Calender} />
        <Route path='/' exact 
               render={() => <Home user={user} setUser={setUser}/>} />
      </div>
    </Router>
  );
}

export default App;

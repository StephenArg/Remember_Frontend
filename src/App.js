import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import AuthContainer from './containers/AuthContainer'
import Home from './containers/Home'
import Calender from './containers/Calender'

function App() {

  const [user, setUser] = useState({})
  console.log(user)

  // if (!localStorage.getItem("token") && window.location.pathname !== "/auth/"){
  //   window.location.pathname = "/auth/"
  // }

  useEffect(() => {
    if (window.location.pathname !== "/auth/"){
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
            if (u === null){
              localStorage.removeItem("token")
              setUser({})
              window.location.pathname = '/auth/'
            } else {
              setUser(u)
            }
          })
        } else {
            window.location.pathname = '/auth/'
        }
      }
      }, [])
  
    


  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 id="header-h1" >Remember</h1>
        </header>
        

        <Route path='/' exact component={Home} />
        <Route path='/auth/'
               render={() => <AuthContainer setUser={setUser} />} />
        <Route path='/calender/' component={Calender} />
      </div>
    </Router>
  );
}

export default App;

import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';
import Home from './containers/Home'
import Calendar from './containers/Calendar'
import HeaderLinks from './containers/HeaderLinks'
import Backup from './components/Backup'
import userAuthFetch from './globallyUsedFunctions.js/UserAuthFetch'

function App(){

  const [user, setUser] = useState({})
  const [onHome, setOnHome] = useState(true)
  const [onBackup, setOnBackup] = useState(false)


  useEffect(() => {
      if (localStorage.getItem("token")){

        userAuthFetch(setUser)
      
        if (window.location.pathname === '/backup') {
          setOnBackup(true)
          setOnHome(false)
        } else if(window.location.pathname !== '/') {
          setOnHome(false)
        }
      }
    }, [])
    
  
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 id="header-h1" >Remember</h1>
          {user.username !== undefined ? <HeaderLinks onHome={onHome} onBackup={onBackup} />: 
                null
          }
          
        </header>
         
        {/* <Route path='/backup/'
              render={() => <Backup />} /> */}
        <Route path='/calendar/' 
              render={() => <Calendar />} />
        <Route path='/' exact 
               render={() => <Home user={user} setUser={setUser}/>} />
      </div>
    </Router>
  );
}

export default App;

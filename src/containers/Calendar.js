import React, {useState, useEffect} from 'react'
import userAuthFetch from '../globallyUsedFunctions.js/UserAuthFetch'

 
const Calendar = props => {

  const [user, setUser] = useState({})

  useEffect(() => {
    userAuthFetch(setUser)
  }, [])


  return (
    <div>
      
    </div>
  )
}
 
export default Calendar
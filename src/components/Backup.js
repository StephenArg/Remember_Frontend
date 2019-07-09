import React, {useState, useEffect} from 'react'
import userAuthFetch from '../globallyUsedFunctions.js/UserAuthFetch'

const Backup = props => {
  const [user, setUser] = useState({})
  const [backupJson, setBackupJson] = useState("")

  useEffect(()=> {
    userAuthFetch(setUser)
  }, [])

  if (user.id !== undefined && backupJson === "") {
    fetch(`http://${process.env.REACT_APP_API_LOCATION}/entries/backup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({userId: user.id})
        }).then(res => res.json())
          .then((e) => setBackupJson(JSON.stringify(e.backup)))
  }

  return (
    <div>
      <textarea id="text-area-input" rows="12" cols="80" autoFocus="true" value={backupJson} readOnly>
      </textarea>
    </div>
  )
}
 
export default Backup
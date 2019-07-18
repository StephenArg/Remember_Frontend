import React, {useState} from 'react'
import userAuthFetch from '../globallyUsedFunctions.js/UserAuthFetch'
import ReactFileReader from 'react-file-reader';
 
const HeaderLinks = props => {

  const [blobLink, setBlobLink] = useState("")

  const handleClick = () => {
    if (window.location.pathname === '/') {
      window.location.href = '/calendar'
    } else {
      window.location.pathname = '/'
    }
  }

  const handleBackupClick = async () => {
    // window.location.href = '/backup'
    const user = await userAuthFetch()

    await fetch(`${process.env.REACT_APP_API_LOCATION}/entries/backup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({userId: user.id})
      }).then(res => res.json())
        .then((e) => {
          // setBackupJson(`'${JSON.stringify(e.backup).replace(/'/g, "\\'").replace(/\"/g, '\\"')}'`)
          const backupJson = JSON.stringify(e).replace(/'/g, "singQuot;").replace(/\\"/g, 'insideQuot;').replace(/"/g,'quot;')
          setBlobLink(window.URL.createObjectURL(new Blob([btoa(backupJson)], {type: 'text/plain'})))
        })
  
  }

  const handleRestore = async (restoreText) => {
    const user = await userAuthFetch()

    if (window.confirm("Restoring will erase whatever current entries are present to prevent duplicates. Is that alright?")) {
      fetch(`${process.env.REACT_APP_API_LOCATION}/entries/restore`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({userId: user.id, restoreJSON: JSON.parse(restoreText.replace(/quot;/g, '"').replace(/singQuot;/g, "\'").replace(/insideQuot;/g, '\\"'))})
          }).then(() => {window.confirm("Finished! Navigate back to the main page")
          {
              window.location.pathname = '/';
          }})
        }    
  }

  const handleFiles = (files) => {
    const text = files.base64.toString()
    handleRestore(atob(atob(text.slice(23))))
  }

  const handleLogOut = () => {
    localStorage.removeItem("token")
    window.location.href = '/'
  }

  if (blobLink !== "") {
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = blobLink
    a.download = "remember-journal-backup.txt";
    a.click();
  }

  return (
    <React.Fragment>
      {props.onBackup ? null : <strong className="header-link" style={{top: "12%", right: "22%"}} onClick={handleBackupClick} download="remember-backup.txt" href={blobLink}>Backup</strong> }
      {props.onBackup ? null : <strong style={{position: "absolute", fontSize:"20px", top: "12%", right: "21%"}} >/</strong> }
      {props.onBackup ? null :  <ReactFileReader fileTypes={[".txt"]} base64={true} handleFiles={handleFiles}><strong className="header-link" style={{top: "12%", right: "15%"}}>Restore</strong></ReactFileReader> }
      {props.onHome ? <strong className='header-link' style={{top: "12%", right: "8%"}} onClick={handleClick}>Search</strong> :
      <strong className='header-link' style={{top: "12%", right: "8.3%"}} onClick={handleClick}>Home</strong> }
      <strong className='header-link' style={{top: "12%", right: "1%"}} onClick={handleLogOut}>Log out</strong>
    </React.Fragment>
  )
}
 
export default HeaderLinks
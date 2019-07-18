// import React, {useState, useEffect} from 'react'
// import ReactFileReader from 'react-file-reader';
// import userAuthFetch from '../globallyUsedFunctions.js/UserAuthFetch'

// const Backup = () => {
//   const [user, setUser] = useState({})
//   const [backupJson, setBackupJson] = useState(``)
//   const [restoreJson, setRestoreJson] = useState("")

//   useEffect(()=> {
//     userAuthFetch(setUser)
//   }, [])

//   if (user.id !== undefined && backupJson === "") {
//     fetch(`${process.env.REACT_APP_API_LOCATION}/entries/backup`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({userId: user.id})
//         }).then(res => res.json())
//           .then((e) => {
//             // setBackupJson(`'${JSON.stringify(e.backup).replace(/'/g, "\\'").replace(/\"/g, '\\"')}'`)
//             setBackupJson(JSON.stringify(e).replace(/'/g, "singQuot;").replace(/\\"/g, 'insideQuot;').replace(/"/g,'quot;'))
//           })
//   }

//   const handleSubmit = (restoreText) => {
//   //  JSON.parse(restoreJson.replace(/quot;/g, '"').replace(/singQuot;/g, "\'").replace(/insideQuot;/g, '\\"'))

//     if (window.confirm("Restoring will erase whatever current entries are present to prevent duplicates. Is that alright?")) {
//       fetch(`${process.env.REACT_APP_API_LOCATION}/entries/restore`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({userId: user.id, restoreJSON: JSON.parse(restoreText.replace(/quot;/g, '"').replace(/singQuot;/g, "\'").replace(/insideQuot;/g, '\\"'))})
//           }).then(() => {window.confirm("Finished! Navigate back to the main page")
//           {
//               window.location.pathname = '/';
//           }})
//         }    
//     }

//   let blobLink = window.URL.createObjectURL(new Blob([backupJson], {type: 'text/plain'}))

//   const handleFiles = (files) => {
//     const text = files.base64.toString()
//     handleSubmit(atob(text.slice(23)))
//   }

//   return (
//     <div>
//       <br></br>
//       <strong>Backup JSON : </strong>
//       <br></br>
//       <text>Copy this exact encoded format of your data and paste in Restore box below to reload.</text>
//       <br></br>
//       <a download="remember-journal-backup.txt" id="downloadlink" style={{display: "block"}} href={blobLink}>Download</a>
//       <textarea id="text-area-input" rows="12" cols="80" autoFocus="true" value={backupJson} readOnly>
//       </textarea>
//       <br></br>
//       <br></br>
//       <strong>Restore</strong>
//       <br></br>
//       <textarea id="text-area-input" rows="12" cols="80" placeholder="Paste previously copied JSON here to reload backup." onChange={(e) => {setRestoreJson(e.target.value)}} autoFocus="true" value={restoreJson} >
//       </textarea>
//       <br></br>
//       <button style={{backgroundColor: "olive", border: "solid black 1px"}} onClick={handleSubmit} >Restore Entries</button>
//       <br></br>
//       <ReactFileReader fileTypes={[".txt"]} base64={true} handleFiles={handleFiles}>
//         <button>Upload</button>
//       </ReactFileReader>
//     </div>
//   )
// }
 
// export default Backup
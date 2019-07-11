import React, {useState} from 'react'

const Login = (props) => {

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const setLocalStorage = (object) => {
    localStorage.setItem("token", object.jwt)
    props.setUser(object.user)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(`${process.env.REACT_APP_API_LOCATION}`)

    const today = new Date().toISOString().slice(0, 10)

    const user = {
      username: username,
      password: password,
      date: today
    }

    fetch(`${process.env.REACT_APP_API_LOCATION}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
    .then(setLocalStorage)
      
  }

  return (
    <div id="login">
      <p>Login</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="username" value={username} onChange={(event) => {setUserName(event.target.value)}} placeholder="Enter Username"/>
        <input name="password" type="password" value={password} onChange={(event) => {setPassword(event.target.value)}} placeholder="Enter Password"/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default Login
import React, {useState} from 'react'

const SignUp = (props) => {

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")


  const setLocalStorage = (object) => {
    localStorage.setItem("token", object.jwt)
    props.setUser(object.user)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const today = new Date().toISOString().slice(0, 10)

    const user = {
      username: username,
      password: password,
      name: name,
      date: today
    }
    
    fetch(`${process.env.REACT_APP_API_LOCATION}/users/create`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(res => res.json())
    .then(setLocalStorage)

  }


  return (
    <div id="signup">
      <p>Sign Up</p>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="username" value={username} onChange={(event) => {setUserName(event.target.value)}} placeholder="Enter Username"/>
        <input name="password" type="password" value={password} onChange={(event) => {setPassword(event.target.value)}} placeholder="Enter Password"/>
        <input name="name" value={name} onChange={(event) => {setName(event.target.value)}} placeholder="Enter Display Name"/>
        <input type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default SignUp
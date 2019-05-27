import React from 'react'
import Login from '../components/Login'
import SignUp from '../components/SignUp'


const AuthContainer = (props) => {
  return (
    <div>
      <Login {...props} />
      <SignUp {...props} />
    </div>
  )
}

export default AuthContainer

import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
const { Link } = require('react-router')

const LoginButton = (props) => {
  const loggedIn = props.loggedIn
  const loginButton =
  (
    <div className='button'>
      <RaisedButton onClick={props.dispatch({type: 'SHOWING_LOGIN'})}> Login </RaisedButton>
    </div>
  )
  const logoutButton =
  (
    <div className='button'>
      <RaisedButton>Logout</RaisedButton>
    </div>
  )
  return loggedIn
    ? logoutButton
    : loginButton
}
module.exports = (LoginButton)
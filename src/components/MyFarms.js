const React = require('react')
const { connect } = require('react-redux')
import '../App.css'
const { Link } = require('react-router')

const MyFarms = (props) => {
  const loggedIn = props.loggedIn
  const hidden =
  (
    <div>
      <h1> This is a secure route </h1>
    </div>
  )
  const pushToHome =
  (
    <h1> Please login to view this page</h1>
  )
  return loggedIn
    ? hidden
    : pushToHome
}

module.exports = connect((state) => state)(MyFarms)

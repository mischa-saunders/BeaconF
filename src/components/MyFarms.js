import React from 'react'
import { connect } from 'react-redux'
import '../App.css'

const MyFarms = (props) => {
  return (
    <div>
      <h1> This is a secure route </h1>
    </div>
  )
}

module.exports = connect((state) => state)(MyFarms)
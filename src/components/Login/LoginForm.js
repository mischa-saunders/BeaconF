import React from 'react'
import { connect } from 'react-redux'
import request from 'superagent'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'

class Login extends React.Component {
  render () {
    const loginForm =
      <div>
        <form>
          <Paper className='paper' zDepth={3}>
            <TextField hintText='User Name' className='input' ref='userName' />
            <br />
            <TextField hintText='Password' className='input' type='password' ref='password' />
            <br />
          </Paper>
          <br />
          <div className='button'>
            <RaisedButton onClick={this.handleLoginSubmit.bind(this)}>Login</RaisedButton>
          </div>
        </form>
      </div>

    return (
      loginForm
    )
  }
  handleLoginSubmit (e) {
    const { dispatch } = this.props
    const userName = this.refs.userName.input.value
    const password = this.refs.password.input.value

    request.post('/api/v1/farms/login')
      .send({userName: userName, password: password})
      .end((err, res) => {
        console.log('login form response', res)
        if (err) console.log('error', err)
        else if (res.body.login) {
          dispatch({type: 'LOGIN', payload: res.body.userName})
          dispatch({type: 'HIDING_LOGIN'})

        } else {
          console.log("that's not right")
          dispatch({type: 'LOGIN', payload: false})
        }
      })
  }
}

module.exports = connect((state) => state)(Login)

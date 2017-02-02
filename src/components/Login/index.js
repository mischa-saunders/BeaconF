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
            <TextField hintText='Name' className='input' ref='name' />
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
    console.log('render props', this.props)
    return (
      loginForm
    )
  }
  handleLoginSubmit (e) {
    const name = this.refs.name.input.value
    const password = this.refs.password.input.value

    this.dispatch({type: 'LOGIN', payload: 'loading'})
    request.post('/api/v1/farms/login')
      .send({name: name, password: password})
      .end((err, res) => {
        if (err) console.log('error', err)
        else if (res.body.text === true) {
          this.dispatch({type: 'LOGIN', payload: res.body.text})
        } else {
          this.dispatch({type: 'LOGIN', payload: false})
        }
      })
  }
}

module.exports = connect((state) => state)(Login)

import React from 'react'
import {connect} from 'react-redux'
import {findPoll} from '../redux/poll'

class AccessPoll extends React.Component {
  constructor() {
    super()
    this.state = {
      key: ''
    }
  }

  submitHandler = evt => {
    evt.preventDefault()
    this.props.findPoll(this.state.key)
  }

  handleChange = evt => {
    evt.preventDefault()
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render() {
    return (
      <div id="access-poll-wrapper">
        <form id="access-poll-form" onSubmit={evt => this.submitHandler(evt)}>
          <label>Key: </label>
          <input name="key" onChange={evt => this.handleChange(evt)} />
          <button type="submit">Find Poll</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    poll: state.pollReducer
  }
}

function mapDispatchToProps(dispatch) {
  return {
    findPoll: key => dispatch(findPoll(key))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessPoll)

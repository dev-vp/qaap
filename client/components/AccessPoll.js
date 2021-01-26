import React from 'react'
import {connect} from 'react-redux'
// import {findPoll} from '../redux/poll'

class AccessPoll extends React.Component {
  constructor() {
    super()
    this.state = {
      key: ''
    }
  }

  submitHandler = evt => {
    evt.preventDefault()
    // histoy.push redirect will need to be dependent on the key type (creator vs participant)
    if (this.state.key.includes('PNV')) {
      this.props.history.push(`/vote/${this.state.key}`)
    } else {
      this.props.history.push(`/visualpoll/${this.state.key}`)
    }
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
          <input
            name="key"
            onChange={evt => this.handleChange(evt)}
            placeholder="Enter Your Key Here"
            required={true}
            minLength="18"
            maxLength="22"
          />
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

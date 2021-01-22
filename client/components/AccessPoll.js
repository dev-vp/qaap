import React from 'react'
import {connect} from 'react-redux'

class AccessPoll extends React.Component {
  render() {
    return (
      <div id="access-poll-wrapper">
        <form id="access-poll-form">
          <label>Key: </label>
          <input />
          <button type="submit">Find Poll</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessPoll)

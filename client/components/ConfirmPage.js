import React from 'react'
import {Link} from 'react-router-dom'

class ConfirmPage extends React.Component {
  render() {
    return (
      <div id="confirm-wrapper">
        <h2>Your Poll has been created!</h2>
        <p>
          Creator Key: <span>{this.props.match.params.key}</span>
        </p>
        <p>
          Participant Key: <span>{`PNV${this.props.match.params.key}`}</span>
        </p>
        <Link to={`/visualpoll/${this.props.match.params.key}`}>View Poll</Link>
      </div>
    )
  }
}

export default ConfirmPage

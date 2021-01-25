import React from 'react'
import {connect} from 'react-redux'
import {AccessPoll, CreatePoll} from './index'

class Home extends React.Component {
  render() {
    return (
      <div id="home-wrapper">
        <p>
          Q+AP Interative Polling provides you with simple and intuitive
          solutions for audience engagement by leveraging real-time surveying
          capabilities. If you're just starting out, please create your poll by
          filling out the fields below. Upon finishing, you will receive a
          unique identification key for your poll. If you're a participant,
          please enter your key below to start voting.
        </p>
        <AccessPoll history={this.props.history} />
        <CreatePoll history={this.props.history} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)

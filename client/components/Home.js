import React from 'react'
import {connect} from 'react-redux'
import {AccessPoll, CreatePoll} from './index'

class Home extends React.Component {
  render() {
    return (
      <div id="home-wrapper">
        <h1>Q+A Polling</h1>
        <AccessPoll history={this.props.history} />
        <hr /> {/****** REMOVE THIS WHEN STYLING ******/}
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

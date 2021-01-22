import React from 'react'
import {connect} from 'react-redux'
import {AccessPoll, CreatePoll} from './index'

class Home extends React.Component {
  render() {
    return (
      <div id="home-wrapper">
        <h1>Q+A Polling</h1>
        <AccessPoll />
        <hr /> {/****** REMOVE THIS WHEN STYLING ******/}
        <CreatePoll />
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

import React from 'react'
import {Link} from 'react-router-dom'

class Nav extends React.Component {
  render() {
    return (
      <div id="header">
        <Link to="/">
          <h1 id="logo">Q+AP</h1>
        </Link>
        <span>Interactive Polling</span>
        <div id="nav">
          <a href="#">Export Data</a>
          <a href="#">Close Session</a>
        </div>
      </div>
    )
  }
}

export default Nav

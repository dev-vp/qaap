import React from 'react'
import {connect} from 'react-redux'
import {Switch, Router, Route, Link} from 'react-router-dom'

class ChartVisualization extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id="chart-visualization">
        <h1>Chart Visualization</h1>
        <div id="selection-wrapper">
          <Link to="/bar">Bar Graph</Link>
          <Link to="/pie">Pie Chart</Link>
        </div>
        <div>
          <Switch>
            {/* <Route path='/bar' component={}/>
            <Route path='/pie' component={}/> */}
          </Switch>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    key: state.key
  }
}

function mapDispatchToProps() {}

export default connect(mapStateToProps, null)(ChartVisualization)

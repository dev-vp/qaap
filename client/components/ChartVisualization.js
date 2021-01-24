import React from 'react'
import {connect} from 'react-redux'
import {ChartBar, ChartPie} from './index'
import {findPoll} from '../redux/poll'

class ChartVisualization extends React.Component {
  constructor() {
    super()
    this.state = {
      pollType: 'bar',
      key: '',
      poll: {},
      fetched: false
    }
  }

  async componentDidMount() {
    await this.props.findPoll(this.props.match.params.key)
    this.setState({
      key: this.props.match.params.key,
      poll: this.props.poll[0],
      fetched: true
    })
    console.log('CHARTVISUAL - componentDidMount', this.props)
  }

  componentDidUpdate() {
    console.log('CHARTVISUAL - componentDidUpdate', this.props)
  }

  clickHandler = evt => {
    evt.preventDefault()
    this.setState({
      pollType: evt.target.value
    })
  }

  render() {
    return (
      <div id="chart-visualization">
        <h1 id="poll-title">
          {this.state.poll
            ? `${this.state.poll.title}`.toUpperCase()
            : 'Loading'}
        </h1>
        <div id="selection-wrapper">
          <button
            name="pollType"
            value="bar"
            type="button"
            onClick={evt => this.clickHandler(evt)}
          >
            Bar Graph
          </button>
          <button
            name="pollType"
            value="pie"
            type="button"
            onClick={evt => this.clickHandler(evt)}
          >
            Pie Chart
          </button>
        </div>
        <div>
          {this.state.pollType === 'bar' && this.state.fetched ? (
            <ChartBar poll={this.state.poll} skey={this.state.key} />
          ) : (
            <h1>Loading</h1>
          )}
          {this.state.pollType === 'pie' && this.state.fetched ? (
            <ChartPie poll={this.state.poll} skey={this.state.key} />
          ) : (
            <h1>Loading</h1>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChartVisualization)

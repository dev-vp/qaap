import React from 'react'
import {connect} from 'react-redux'
import {ChartBar, ChartPie, NotFound} from './index'
import {findPoll, submitVote} from '../redux/poll'
import socket from '../socket'

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

    socket.on(`${this.state.key}`, message => {
      console.log('Message Received in FrontEnd')

      let newPollState = this.state.poll

      for (let i = 0; i < newPollState.options.length; i++) {
        if (newPollState.options[i].vote.id === Number(message.voteId)) {
          newPollState.options[i].vote.vote++
          this.setState({
            poll: newPollState
          })
          this.props.submitVote(Number(message.voteId))
        }
      }
    })
  }

  // componentDidUpdate() {
  //   console.log('CHARTVISUAL - componentDidUpdate', this.props)
  // }

  clickHandler = evt => {
    evt.preventDefault()
    this.setState({
      pollType: evt.target.value
    })
  }

  // eslint-disable-next-line complexity
  render() {
    return (
      <div id="chart-visualization">
        <h3 id="poll-title">
          {this.state.poll ? `${this.state.poll.title}`.toUpperCase() : <hr />}
        </h3>
        <h1 id="poll-question">
          {this.state.poll ? (
            `${this.state.poll.question}`.toUpperCase()
          ) : (
            <hr />
          )}
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
        <div id="pie-label" />
        <div>
          {this.state.pollType === 'bar' &&
          this.state.fetched &&
          this.state.poll !== undefined ? (
            <ChartBar poll={this.state.poll} skey={this.state.key} />
          ) : (
            <hr />
          )}
          {this.state.pollType === 'pie' &&
          this.state.fetched &&
          this.state.poll !== undefined ? (
            <ChartPie poll={this.state.poll} skey={this.state.key} />
          ) : (
            <NotFound />
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
    findPoll: key => dispatch(findPoll(key)),
    submitVote: voteKey => dispatch(submitVote(voteKey))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartVisualization)

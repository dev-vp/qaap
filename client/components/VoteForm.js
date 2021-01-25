import React from 'react'
import {connect} from 'react-redux'
import {findPoll} from '../redux/poll'
import socket from '../socket'

class VoteForm extends React.Component {
  constructor() {
    super()
    this.state = {
      pollType: 'bar',
      key: '',
      poll: {},
      options: [],
      fetched: false
    }
  }

  async componentDidMount() {
    let PNVKey = this.props.match.params.key
    await this.props.findPoll(PNVKey.slice(3))
    this.setState({
      key: this.props.match.params.key,
      poll: this.props.poll[0],
      options: this.props.poll[0].options.filter(opt => opt.option !== null),
      fetched: true
    })
    console.log('VoteForm - componentDidMount', this.props)
  }

  voteHandler(evt) {
    evt.preventDefault()
    let message = {
      key: this.state.key.slice(3),
      voteId: evt.target.value
    }
    socket.emit('vote', message)
  }

  render() {
    return (
      <div id="vote-form">
        <h3>{this.state.poll.title}</h3>
        <h1>{this.state.poll.question}</h1>
        {this.state.options.map(opt => {
          return (
            <div className="vote-button" key={opt.id}>
              {/* <label>{opt.option}</label> */}
              <button
                type="button"
                value={opt.vote.id}
                onClick={evt => this.voteHandler(evt)}
              >
                {opt.option}
              </button>
            </div>
          )
        })}
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

export default connect(mapStateToProps, mapDispatchToProps)(VoteForm)

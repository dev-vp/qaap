import React from 'react'
import {connect} from 'react-redux'
import {saveCreatedPoll} from '../redux/poll'
// import {history} from '../history'

class CreatePoll extends React.Component {
  constructor() {
    super()
    this.currentSession = new Date()
    this.state = {
      title: '',
      chartType: 'bar',
      question: '',
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      option5: null,
      pollSession: `${Math.ceil(
        Math.random() * (8888 - 0) + 0
      )}${this.currentSession.getFullYear()}${this.currentSession.getMonth()}${this.currentSession.getDate()}${this.currentSession.getHours()}${this.currentSession.getMinutes()}${this.currentSession.getMilliseconds()}`
    }
  }

  onChange(evt) {
    evt.preventDefault()
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  onSubmit(evt) {
    evt.preventDefault()
    this.props.createPoll(this.state)
    // history.push('/');
  }

  addMoreOptions() {
    try {
      const optionNode = document.querySelectorAll('.option-hide')
      optionNode[0].className = 'option'
      optionNode[1].className = 'option'
    } catch (error) {
      console.error('No more options can be added. 5 is the Maximum.')
    }
  }

  render() {
    return (
      <div id="create-form-wrapper">
        <form id="create-form" onSubmit={evt => this.onSubmit(evt)}>
          <label>Presentation Name:</label>
          <input name="title" onChange={evt => this.onChange(evt)} />

          <label>How would you like your data visualized?</label>
          <select name="chartType" onChange={evt => this.onChange(evt)}>
            <option value="bar"> (Select an Option) </option>
            <option value="bar"> Bar Graph </option>
            <option value="pie"> Pie Chart </option>
          </select>

          <label>Polling Question For Your Audience:</label>
          <span>
            <input name="question" onChange={evt => this.onChange(evt)} />
          </span>

          <div id="option-container">
            <label className="option">Option #1:</label>
            <input
              className="option"
              name="option1"
              onChange={evt => this.onChange(evt)}
            />
            <label className="option">Option #2:</label>
            <input
              className="option"
              name="option2"
              onChange={evt => this.onChange(evt)}
            />
            <label className="option-hide">Option #3:</label>
            <input
              className="option-hide"
              name="option3"
              onChange={evt => this.onChange(evt)}
            />
            <label className="option-hide">Option #4:</label>
            <input
              className="option-hide"
              name="option4"
              onChange={evt => this.onChange(evt)}
            />
            <label className="option-hide">Option #5:</label>
            <input
              className="option-hide"
              name="option5"
              onChange={evt => this.onChange(evt)}
            />
          </div>

          <button type="button" onClick={() => this.addMoreOptions()}>
            Add More Options
          </button>

          <button>Create My Poll!</button>
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPoll: newPoll => {
      dispatch(saveCreatedPoll(newPoll))
    }
  }
}

export default connect(null, mapDispatchToProps)(CreatePoll)

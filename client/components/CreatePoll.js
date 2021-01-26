import React from 'react'
import {connect} from 'react-redux'
import {saveCreatedPoll} from '../redux/poll'

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

    const postObject = {
      pollSession: this.state.pollSession,
      poll: {
        title: this.state.title,
        chartType: this.state.chartType,
        question: this.state.question
      },
      options: [
        {option: this.state.option1},
        {option: this.state.option2},
        {option: this.state.option3},
        {option: this.state.option4},
        {option: this.state.option5}
      ]
    }

    this.props.createPoll(postObject)
    this.props.history.push(`/confirm/${this.state.pollSession}`)
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
          <label>Name of your Presentation</label>
          <input
            name="title"
            onChange={evt => this.onChange(evt)}
            placeholder="i.e. Best Camera on the Market for Mirrorless"
            required={true}
            minLength="6"
          />

          <label>Type of Data Visualization</label>
          <select name="chartType" onChange={evt => this.onChange(evt)}>
            <option value="bar"> (Select an Option) </option>
            <option value="bar"> Bar Graph </option>
            <option value="pie"> Pie Chart </option>
          </select>

          <label>A Question For Your Audience</label>
          <span>
            <input
              name="question"
              onChange={evt => this.onChange(evt)}
              placeholder="i.e. What is your camera of choice?"
              required={true}
              minLength="8"
            />
          </span>

          <div id="option-container">
            <p>VOTING OPTION(S)</p>
            <label className="option">Option #1:</label>
            <input
              className="option"
              name="option1"
              onChange={evt => this.onChange(evt)}
              placeholder="i.e. Canon EOS R"
              required={true}
              minLength="2"
            />
            <label className="option">Option #2:</label>
            <input
              className="option"
              name="option2"
              onChange={evt => this.onChange(evt)}
              placeholder="i.e. Nikon Z7"
              required={true}
              minLength="2"
            />
            <label className="option-hide">Option #3:</label>
            <input
              className="option-hide"
              name="option3"
              onChange={evt => this.onChange(evt)}
              placeholder="i.e. Sony A7"
            />
            <label className="option-hide">Option #4:</label>
            <input
              className="option-hide"
              name="option4"
              onChange={evt => this.onChange(evt)}
              placeholder="i.e. Mirrorless is not my style."
            />
            <label className="option-hide">Option #5:</label>
            <input
              className="option-hide"
              name="option5"
              onChange={evt => this.onChange(evt)}
              placeholder="i.e. I like film cameras."
            />
          </div>

          <button
            id="add-option"
            type="button"
            onClick={() => this.addMoreOptions()}
          >
            Add More Options
          </button>

          <button id="create-button" type="submit">
            Create My Poll!
          </button>
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

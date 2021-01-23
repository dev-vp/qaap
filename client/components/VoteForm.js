import React from 'react'
import {connect} from 'react-redux'

class VoteForm extends React.Component {
  constructor() {
    super()
    this.state = {
      options: {
        option1: '',
        vote1: 0,
        option2: '',
        vote2: 0,
        option3: null,
        vote3: 0,
        option4: null,
        vote4: 0,
        option5: null,
        vote5: 0
      }
    }
  }

  render() {
    const optkeys = Object.keys(this.state.options)
    // let options = [];
    // for(let i = 0; i < optkeys.length; i++){
    //   if(this.state[optkeys[i]] === null){
    //     break
    //   } else {
    //     let optvote =
    //     options.push()
    //   }
    // }

    return (
      <div>
        {
          // optkeys.map(optkey => {
          //   if(optkey.includes('option')){
          //     return (
          //         <label key={optkey}>{optkey.option}</label>
          //     )
          //   } else {
          //     return <button type="button" key={optkey} >Vote</button>
          //   }
          // })
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(VoteForm)

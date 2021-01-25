import axios from 'axios'

const CREATE_POLL = 'CREATE_POLL'
const ACCESS_POLL = 'ACCESS_POLL'
const VOTE = 'VOTE'

function createPoll(newPoll) {
  return {
    type: CREATE_POLL,
    newPoll
  }
}

function accessPoll(poll) {
  return {
    type: ACCESS_POLL,
    poll
  }
}

function votePoll(vote) {
  return {
    type: VOTE,
    vote
  }
}

export function saveCreatedPoll(newPoll) {
  return async dispatch => {
    try {
      const response = await axios.post('/api/session', newPoll)
      dispatch(createPoll(newPoll))
    } catch (error) {
      console.error(error)
    }
  }
}

export function findPoll(key) {
  //HASH THE KEY HERE
  let sessionKey = key
  return async dispatch => {
    try {
      const response = await axios.get(`/api/session/${sessionKey}`)
      dispatch(accessPoll(response.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export function submitVote(voteId) {
  return async dispatch => {
    try {
      await axios.put(`/api/session/${voteId}`)
      // dispatch(votePoll())
    } catch (error) {
      console.error(error)
    }
  }
}

//FETCH POLL

const initialState = {}

export default function pollReducer(state = initialState, action) {
  let newState
  switch (action.type) {
    case CREATE_POLL:
      newState = {newPoll: action.newPoll}
      return newState
    case ACCESS_POLL:
      return action.poll
    default:
      return state
  }
}

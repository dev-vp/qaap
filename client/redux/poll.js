import axios from 'axios'

const CREATE_POLL = 'CREATE_POLL'
const ACCESS_POLL = 'ACCESS_POLL'
const FETCH_POLL = 'FETCH_POLL'

function createPoll(newPoll) {
  return {
    type: CREATE_POLL,
    newPoll
  }
}

function accessPoll(sessionKey) {
  return {
    type: ACCESS_POLL,
    sessionKey
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

export function findPoll(sessionKey, user) {
  //HASH THE KEY HERE
  //let key=
  //if(user !== 'creator'){key=...} else {key=...}
  return async dispatch => {
    try {
      const response = await axios.get(`/api/session/${sessionKey}`)
      dispatch(accessPoll(response.data))
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
    default:
      return state
  }
}

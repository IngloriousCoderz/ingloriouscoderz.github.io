import { RECEIVE_DATA, RECEIVE_ERROR } from '../constants/actionTypes'

export const getPage = (state, id) => state[id]

const pages = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case RECEIVE_DATA:
    case RECEIVE_ERROR:
      return {
        ...state,
        [payload.id]: payload
      }
    default:
      return state
  }
}

export default pages

import * as types from '../constants/actionTypes'

export const isLoading = state => state.loading
export const getError = state => state.error

const resource = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.REQUEST_PAGE:
    case types.REQUEST_POST:
      return { loading: true }
    case types.RECEIVE_PAGE:
      return payload.page
    case types.RECEIVE_POST:
      return payload.post
    case types.RECEIVE_PAGE_ERROR:
    case types.RECEIVE_POST_ERROR:
      return { error: payload.message }
    default:
      return state
  }
}

export default resource

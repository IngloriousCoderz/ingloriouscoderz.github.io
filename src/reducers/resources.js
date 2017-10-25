import * as types from '../constants/actionTypes'
import resource, * as fromResource from './resource'

export const getResource = (state, id) => state[id] || {}
export const isLoading = (state, id) =>
  fromResource.isLoading(getResource(state, id))
export const getError = (state, id) =>
  fromResource.getError(getResource(state, id))

const resources = (state = {}, action) => {
  const { type, payload } = action
  switch (type) {
    case types.RECEIVE_FEATURED_POSTS_LIST:
      return {
        ...state,
        ...payload.posts.reduce((posts, post) => {
          posts[post.id] = post
          return posts
        }, {})
      }
    case types.REQUEST_PAGE:
    case types.REQUEST_POST:
    case types.RECEIVE_PAGE:
    case types.RECEIVE_POST:
    case types.RECEIVE_PAGE_ERROR:
    case types.RECEIVE_POST_ERROR:
      return {
        ...state,
        [payload.id]: resource(state[payload.id], action)
      }
    default:
      return state
  }
}

export default resources

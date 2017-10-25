import {
  REQUEST_FEATURED_POSTS_LIST,
  RECEIVE_FEATURED_POSTS_LIST,
  RECEIVE_FEATURED_POSTS_ERROR
} from '../constants/actionTypes'

export const isLoading = state => state.loading
export const getIds = state => state.ids || []
export const getError = state => state.error

const featuredPosts = (state = { ids: [] }, action) => {
  const { type, payload } = action
  switch (type) {
    case REQUEST_FEATURED_POSTS_LIST:
      return { loading: true, ids: [] }
    case RECEIVE_FEATURED_POSTS_LIST:
      return { ids: payload.list.map(({ id }) => id) }
    case RECEIVE_FEATURED_POSTS_ERROR:
      return { error: payload, ids: [] }
    default:
      return state
  }
}

export default featuredPosts

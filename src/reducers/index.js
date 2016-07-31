import { RECEIVE_LIST, RECEIVE_DATA, RECEIVE_ERROR } from '../constants/actionTypes'
import pages, * as fromPages from './pages'

export const getNavLinks = state => state.navLinks
export const getPostPreviews = state => state.postPreviews

export const getPages = state => state.pages
export const getPage = (state, id) => fromPages.getPage(getPages(state), id)

export const getPosts = state => state.posts
export const getPost = (state, id) => state.posts[id]

const initialState = {
  pages: {},
  posts: {},
  postPreviews: []
}

const rootReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case RECEIVE_LIST:
      return {
        ...state,
        postPreviews: payload.list
      }
    case RECEIVE_DATA:
    case RECEIVE_ERROR:
      return {
        ...state,
        [`${payload.type}s`]: pages(state[`${payload.type}s`], action)
      }
    default:
      return state
  }
}

export default rootReducer

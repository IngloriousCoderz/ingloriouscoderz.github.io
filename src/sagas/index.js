import {takeEvery} from 'redux-saga'
import {REQUEST_FEATURED_POSTS_LIST, REQUEST_PAGE, REQUEST_POST} from '../constants/actionTypes'
import fetchFeaturedPosts from './fetchFeaturedPosts'
import fetchPage from './fetchPage'
import fetchPost from './fetchPost'

export default function* rootSaga() {
  yield [
    takeEvery(REQUEST_FEATURED_POSTS_LIST, fetchFeaturedPosts),
    takeEvery(REQUEST_PAGE, fetchPage),
    takeEvery(REQUEST_POST, fetchPost)
  ]
}

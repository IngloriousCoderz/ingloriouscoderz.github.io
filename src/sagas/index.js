import { takeLatest } from 'redux-saga/effects'
import {
  REQUEST_FEATURED_POSTS_LIST,
  REQUEST_PAGE,
  REQUEST_POST
} from '../constants/actionTypes'
import fetchFeaturedPosts from './fetchFeaturedPosts'
import fetchPage from './fetchPage'
import fetchPost from './fetchPost'

export default function* rootSaga() {
  yield takeLatest(REQUEST_FEATURED_POSTS_LIST, fetchFeaturedPosts)
  yield takeLatest(REQUEST_PAGE, fetchPage)
  yield takeLatest(REQUEST_POST, fetchPost)
}

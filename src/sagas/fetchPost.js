import { call, put } from 'redux-saga/effects'
import fetchResource from './fetchResource'
import { requestResource, receivePost, receivePostError } from '../actions'

export default function* fetchPost({ payload }) {
  const { id } = payload
  try {
    const post = yield call(fetchResource, requestResource('post', id))
    yield put(receivePost(id, post))
  } catch ({ message }) {
    yield put(receivePostError(message))
  }
}

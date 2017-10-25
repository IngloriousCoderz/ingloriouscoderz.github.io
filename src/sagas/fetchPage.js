import {call, put} from 'redux-saga/effects'
import fetchResource from './fetchResource'
import {requestResource, receivePage, receivePageError} from '../actions'

export default function* fetchPage({payload}) {
  const {id} = payload
  try {
    const page = yield call(fetchResource, requestResource('page', id))
    yield put(receivePage(id, page))
  } catch ({message}) {
    yield put(receivePageError(message))
  }
}

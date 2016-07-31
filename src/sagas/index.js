import {takeEvery} from 'redux-saga'
import {REQUEST_LIST, REQUEST_DATA} from '../constants/actionTypes'
import fetchList from './fetchList'
import fetchData from './fetchData'

export default function* rootSaga() {
  yield [
    takeEvery(REQUEST_LIST, fetchList),
    takeEvery(REQUEST_DATA, fetchData)
  ]
}

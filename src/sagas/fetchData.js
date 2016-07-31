import { call, put } from 'redux-saga/effects'
import { receiveData, receiveError } from '../actions'
import fetch from './fetch'
import {markdownUrl} from '../../blog-config'

export default function* fetchData({ payload }) {
  const { type, id } = payload
  try {
    const markdown = yield call(fetch, `${markdownUrl}${type}s/${id}.md`)

    const data = markdown.split('---')

    const meta = {}
    if (type === 'post') {
      meta.date = new Date(id.slice(0, 10))
    }

    const info = data[1].trim().split(/[\n\r]+/)

    info.reduce((meta, info) => {
      const tokens = info.split(':')
      meta[tokens[0].trim()] = tokens[1].trim()
      return meta
    }, meta)

    const content = data[2].trim()

    yield put(receiveData(type, id, meta, content))
  } catch ({ message }) {
    yield put(receiveError(message))
  }
}

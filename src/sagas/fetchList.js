import { call, put } from 'redux-saga/effects'
import { receiveList, receiveError } from '../actions'
import fetch from './fetch'
import {postPreviewsUrl, markdownUrl} from '../../blog-config'

export default function* fetchList({ payload }) {
  const { type } = payload
  try {
    const list = yield call(fetch, `${postPreviewsUrl}${type}s`)

    const posts = JSON.parse(list).filter(({name}) => name.endsWith('.md'))
    .map(({name}) => ({
      id: name.slice(0, -3),
      date: new Date(name.slice(0, 10))
    }))
    .sort(({date: date1}, {date: date2}) => date1 < date2)

    for (let i = 0; i < posts.length; i++) {
      const post = posts[i]
      const markdown = yield call(fetch, `${markdownUrl}${type}s/${post.id}.md`)
      const data = markdown.split('---')

      const info = data[1].trim().split(/[\n\r]+/)

      info.forEach(info => {
        const tokens = info.split(':')
        if (tokens[0].trim() === 'title') {
          post.title = tokens[1].trim()
        }
      })

      const content = data[2].trim()
      post.breadcrumb = content.split(/[\n\r]{2,}/)[0]
    }

    yield put(receiveList(type, posts))
  } catch ({ message }) {
    yield put(receiveError(message))
  }
}

import {all, call, put} from 'redux-saga/effects'
import {
  receiveFeaturedPostsList,
  receiveFeaturedPostsError,
  requestResource,
} from '../actions'
import fetch from './fetch'
import fetchResource from './fetchResource'
import {featuredPosts} from '../config'

export default function* fetchFeaturedPosts({payload}) {
  try {
    let {list, url} = featuredPosts

    if (list == null && !list.length) {
      list = yield call(fetch, `${url}posts`)

      list = JSON.parse(list)
        .filter(({name}) => name.endsWith('.md'))
        .map(({name}) => ({
          id: name.slice(0, -3),
          date: new Date(name.slice(0, 10)),
        }))
        .sort(({date: date1}, {date: date2}) => date1 < date2)
    }

    const posts = yield all(list.map(({id}) =>
      call(fetchResource, requestResource('post', id)))
    )

    yield put(receiveFeaturedPostsList(list, posts))
  } catch ({message}) {
    yield put(receiveFeaturedPostsError(message))
  }
}

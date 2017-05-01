import {call} from 'redux-saga/effects';
import fetch from './fetch';
import {markdownUrl} from '../config';

export default function* fetchResource({payload}) {
  const {type, id} = payload;

  const markdown = yield call(fetch, `${markdownUrl}${type}s/${id}.md`);

  const tokens = markdown.split('---');

  const resource = {id};
  if (type === 'post') {
    resource.date = new Date(id.slice(0, 10));
  }

  const info = tokens[1].trim().split(/[\n\r]+/);

  info.reduce((resource, info) => {
    const tokens = info.split(':');
    resource[tokens[0].trim()] = tokens[1].trim();
    return resource;
  }, resource);

  resource.content = tokens[2].trim();

  return resource;
}

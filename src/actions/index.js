import * as types from '../constants/actionTypes';

export const requestFeaturedPostsList = () => ({
  type: types.REQUEST_FEATURED_POSTS_LIST,
});

export const receiveFeaturedPostsList = (list, posts) => ({
  type: types.RECEIVE_FEATURED_POSTS_LIST,
  payload: {list, posts},
});

export const receiveFeaturedPostsError = message => ({
  type: types.RECEIVE_FEATURED_POSTS_ERROR,
  payload: message,
  error: true,
});

export const requestResource = (type, id) => ({
  type: types.REQUEST_RESOURCE,
  payload: {type, id},
});

export const receiveResource = (type, id, resource) => ({
  type: types.RECEIVE_RESOURCE,
  payload: {type, id, resource},
});

export const receiveError = (type, id, message) => ({
  type: types.RECEIVE_ERROR,
  payload: {type, id, message},
  error: true,
});

export const requestPage = id => ({
  type: types.REQUEST_PAGE,
  payload: {id},
});

export const receivePage = (id, page) => ({
  type: types.RECEIVE_PAGE,
  payload: {id, page},
});

export const receivePageError = (id, message) => ({
  type: types.RECEIVE_PAGE_ERROR,
  payload: {id, message},
  error: true,
});

export const requestPost = id => ({
  type: types.REQUEST_POST,
  payload: {id},
});

export const receivePost = (id, post) => ({
  type: types.RECEIVE_POST,
  payload: {id, post},
});

export const receivePostError = (id, message) => ({
  type: types.RECEIVE_POST_ERROR,
  payload: {id, message},
  error: true,
});
